#!/usr/bin/env node
/**
 * Playwright-based AliExpress product importer.
 * Uses a real Chromium browser to bypass CAPTCHAs.
 *
 * Usage: npx playwright test --config=scripts/playwright-import.mjs
 * Or:    node scripts/playwright-import.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const LINKS_FILE = join(ROOT, "scripts", "links.txt");
const OUTPUT_FILE = join(ROOT, "lib", "dev-collection-import.json");

const DELAY_MS = parseInt(process.env.DELAY_MS || "4000", 10);

function cleanUrl(url) {
  const m = url.match(/aliexpress\.com\/item\/(\d+)\.html/);
  return m ? `https://www.aliexpress.com/item/${m[1]}.html` : url;
}

function hasImages(product) {
  return (
    Array.isArray(product?.images) &&
    product.images.some((u) => typeof u === "string" && u.length > 0)
  );
}

async function main() {
  // Dynamic import of playwright
  let chromium;
  try {
    const pw = await import("playwright");
    chromium = pw.chromium;
  } catch {
    try {
      const pw = await import("playwright-core");
      chromium = pw.chromium;
    } catch {
      console.error(
        "Playwright not found. Install with: npm i -D playwright"
      );
      process.exit(1);
    }
  }

  // Read links
  let linksText;
  try {
    linksText = readFileSync(LINKS_FILE, "utf8");
  } catch {
    console.error("Create scripts/links.txt with one AliExpress URL per line.");
    process.exit(1);
  }
  const lines = linksText
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s && s.includes("aliexpress.com/item/"));
  const urls = [...new Set(lines)];

  // Load existing data
  let existingByUrl = new Map();
  if (existsSync(OUTPUT_FILE)) {
    try {
      const existing = JSON.parse(readFileSync(OUTPUT_FILE, "utf8"));
      for (const p of existing) {
        if (p.url) existingByUrl.set(cleanUrl(p.url), p);
      }
      console.log(
        `Loaded ${existing.length} existing products (skipping ones with images).`
      );
    } catch {}
  }

  // Count how many need fetching
  const toFetch = [];
  for (let i = 0; i < urls.length; i++) {
    const baseUrl = cleanUrl(urls[i]);
    const existing = existingByUrl.get(baseUrl);
    if (!existing || !hasImages(existing)) {
      toFetch.push({ index: i, url: urls[i], baseUrl });
    }
  }

  if (toFetch.length === 0) {
    console.log("All products already have images. Nothing to fetch.");
    process.exit(0);
  }

  console.log(
    `Need to fetch ${toFetch.length} products (${urls.length - toFetch.length} already cached).`
  );
  console.log(`Delay between pages: ${DELAY_MS}ms\n`);

  // Launch VISIBLE browser (headless: false) so CAPTCHAs can be solved manually
  console.log("Opening browser window. If a CAPTCHA appears, please solve it manually.\n");
  const browser = await chromium.launch({
    channel: "chrome",
    headless: false,
    args: [
      "--disable-blink-features=AutomationControlled",
    ],
  });

  const context = await browser.newContext({
    locale: "en-US",
    viewport: { width: 1440, height: 900 },
    javaScriptEnabled: true,
  });

  // Disable webdriver detection
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", {
      get: () => undefined,
    });
  });

  const page = await context.newPage();

  // Warmup: visit the store page first to establish a session
  console.log("Warming up: visiting the store page first...");
  try {
    await page.goto("https://www.aliexpress.com/store/1798981", { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(5000);
    let warmupUrl = page.url();
    if (warmupUrl.includes("punish") || warmupUrl.includes("captcha")) {
      console.log("CAPTCHA on store page! Please solve it in the browser window...");
      for (let wait = 0; wait < 60; wait++) {
        await page.waitForTimeout(1000);
        warmupUrl = page.url();
        if (!warmupUrl.includes("punish") && !warmupUrl.includes("captcha")) {
          console.log("CAPTCHA solved!");
          break;
        }
      }
    }
    await page.waitForTimeout(3000);
    console.log("Session established. Starting product fetch...\n");
  } catch (e) {
    console.log("Store page warmup failed, continuing anyway...");
  }

  let fetched = 0;
  let failed = 0;

  for (const { index, url, baseUrl } of toFetch) {
    try {
      console.log(
        `  ${index + 1}/${urls.length} Fetching ${baseUrl}...`
      );
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

      // Wait for page to fully render (AliExpress is an SPA)
      await page.waitForTimeout(5000);

      // Check if we hit a CAPTCHA - wait for user to solve it
      let currentUrl = page.url();
      if (currentUrl.includes("punish") || currentUrl.includes("captcha")) {
        console.log(`    CAPTCHA detected! Please solve it in the browser window...`);
        for (let wait = 0; wait < 90; wait++) {
          await page.waitForTimeout(1000);
          currentUrl = page.url();
          if (!currentUrl.includes("punish") && !currentUrl.includes("captcha")) {
            console.log(`    CAPTCHA solved! Waiting for page to load...`);
            await page.waitForTimeout(5000);
            break;
          }
        }
      }

      // Try waiting for the product gallery to actually appear
      try {
        await page.waitForSelector('img[src*="alicdn.com"]', { timeout: 8000 });
        await page.waitForTimeout(2000);
      } catch { /* gallery may load differently */ }

      // Extract data from the page
      const data = await page.evaluate(() => {
        // ── Title extraction ──
        let title = "";
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
          title = ogTitle.content || "";
        }
        if (!title) {
          const h1 = document.querySelector("h1");
          if (h1) title = h1.textContent?.trim() || "";
        }
        title = title.replace(/\s*[-–|]\s*AliExpress\s*\d*.*$/i, "").trim();

        // ── Image extraction ──
        const images = [];
        const seen = new Set();

        function isProductImage(url) {
          if (!url || typeof url !== "string") return false;
          if (!url.includes("alicdn.com")) return false;
          // Reject URLs with embedded size dimensions (UI icons like /24x48.png, /154x64.png)
          if (/\/\d+x\d+/.test(url)) return false;
          // Reject tiny thumbnail variants
          if (/_\d+x\d+/.test(url)) return false;
          // Reject known AliExpress UI/platform asset patterns
          if (url.includes("/208x") || url.includes("/150x150")) return false;
          // Only accept image file extensions
          if (!/\.(jpg|jpeg|png|webp)(\?|$)/i.test(url)) return false;
          return true;
        }

        function addImg(url) {
          if (!url) return;
          // Normalize: strip query params and size suffixes for dedup
          let clean = url.split("?")[0].replace(/_\d+x\d+[^.]*/, "");
          if (seen.has(clean)) return;
          if (!isProductImage(clean)) return;
          seen.add(clean);
          images.push(clean);
        }

        // Method 1: Extract from AliExpress's embedded JSON data (most reliable)
        // AliExpress stores product data in script tags as JSON
        const scripts = document.querySelectorAll("script");
        for (const script of scripts) {
          const text = script.textContent || "";
          // Look for image gallery data in JSON structures
          const imgPatterns = text.match(
            /https?:\/\/[a-z0-9-]+\.alicdn\.com\/kf\/[A-Za-z0-9_-]+\.(jpg|jpeg|png|webp)/g
          );
          if (imgPatterns && imgPatterns.length > 0) {
            for (const u of imgPatterns) {
              addImg(u);
            }
          }
        }

        // Method 2: og:image meta tags
        document.querySelectorAll('meta[property="og:image"]').forEach((m) => {
          addImg(m.content);
        });

        // Method 3: Product gallery images (various AliExpress layout selectors)
        const gallerySelectors = [
          ".image-view-magnifier-wrap img",
          "[class*='slider'] img",
          "[class*='gallery'] img",
          "[class*='Gallery'] img",
          "[class*='Slider'] img",
          "[class*='magnifier'] img",
          "[class*='Magnifier'] img",
          "[class*='product-image'] img",
          "[class*='ProductImage'] img",
          ".pdp-info-right img",
        ];
        for (const sel of gallerySelectors) {
          document.querySelectorAll(sel).forEach((img) => {
            addImg(img.src);
            addImg(img.dataset?.src);
          });
        }

        // Method 4: Large images only (filter by rendered dimensions)
        document.querySelectorAll("img").forEach((img) => {
          const src = img.src || "";
          if (!src.includes("alicdn.com")) return;
          // Only consider images that are rendered large enough to be product photos
          const w = img.naturalWidth || img.width || 0;
          const h = img.naturalHeight || img.height || 0;
          if (w >= 200 || h >= 200) {
            addImg(src);
          }
        });

        return { title: title || "Untitled", images };
      });

      if (data.images.length > 0) {
        existingByUrl.set(baseUrl, {
          url: baseUrl,
          title: data.title,
          images: data.images.slice(0, 8), // Max 8 images
          price: { original: "€—", sale: "€—" },
          tag: "Lingerie",
        });
        fetched++;
        console.log(
          `    OK: "${data.title.slice(0, 50)}..." (${data.images.length} images)`
        );
      } else {
        failed++;
        console.warn(`    FAILED: No images found (title: "${data.title}")`);
      }
    } catch (e) {
      failed++;
      console.warn(`    ERROR: ${e.message}`);
    }

    // Delay between requests
    if (toFetch.indexOf(arguments) < toFetch.length - 1) {
      await page.waitForTimeout(DELAY_MS);
    }
  }

  await browser.close();

  // Rebuild the full product list maintaining order
  const products = [];
  for (let i = 0; i < urls.length; i++) {
    const baseUrl = cleanUrl(urls[i]);
    const data = existingByUrl.get(baseUrl) || {
      url: baseUrl,
      title: "Untitled",
      images: [],
      price: { original: "€—", sale: "€—" },
      tag: "Lingerie",
    };
    products.push({ id: i + 1, ...data });
  }

  writeFileSync(OUTPUT_FILE, JSON.stringify(products, null, 2), "utf8");
  console.log(
    `\nDone. Newly fetched: ${fetched}, failed: ${failed}`
  );
  console.log(`Wrote ${products.length} products to lib/dev-collection-import.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
