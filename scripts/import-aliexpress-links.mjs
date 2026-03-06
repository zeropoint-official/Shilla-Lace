#!/usr/bin/env node
/**
 * Import products from AliExpress item links.
 *
 * 1. Paste one product URL per line in scripts/links.txt
 * 2. Run: node scripts/import-aliexpress-links.mjs
 * 3. Re-run to retry failed imports (keeps existing good data, only re-fetches missing).
 *
 * Env options:
 *   DELAY_MS=4000   Delay between requests in ms (default 3000). Use 4000–5000 if many fail.
 *   RETRIES=3       Max fetch attempts per URL (default 3).
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const LINKS_FILE = join(ROOT, "scripts", "links.txt");
const OUTPUT_FILE = join(ROOT, "lib", "dev-collection-import.json");

const DELAY_MS = parseInt(process.env.DELAY_MS || "3000", 10);
const MAX_RETRIES = parseInt(process.env.RETRIES || "3", 10);

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const HEADERS = {
  "User-Agent": UA,
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
  Referer: "https://www.aliexpress.com/",
};

function cleanUrl(url) {
  const m = url.match(/aliexpress\.com\/item\/(\d+)\.html/);
  return m ? `https://www.aliexpress.com/item/${m[1]}.html` : url;
}

function parsePage(html) {
  let title = "";
  const titleMatch = html.match(/og:title"\s+content="([^"]+)"/);
  if (titleMatch) {
    title = titleMatch[1].replace(/\s*-\s*AliExpress\s+\d+.*$/, "").trim();
  }
  const images = [];
  const seen = new Set();
  const re = /https:\/\/ae\d+\.alicdn\.com\/kf\/S[a-zA-Z0-9]+\.(jpg|jpeg|png)/g;
  let match;
  while ((match = re.exec(html)) !== null) {
    const url = match[0];
    if (url.includes("_80x80") || url.includes("/208x")) continue;
    if (!seen.has(url)) {
      seen.add(url);
      images.push(url);
    }
  }
  return { title: title || "Untitled", images };
}

async function fetchProduct(url) {
  const res = await fetch(url, { headers: HEADERS });
  const html = await res.text();
  const baseUrl = cleanUrl(url);
  const { title, images } = parsePage(html);
  return {
    url: baseUrl,
    title,
    images,
    price: { original: "€—", sale: "€—" },
    tag: "Lingerie",
  };
}

async function fetchWithRetries(url) {
  let lastErr;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fetchProduct(url);
    } catch (e) {
      lastErr = e;
      if (attempt < MAX_RETRIES) {
        const wait = Math.min(2000 * Math.pow(2, attempt - 1), 15000);
        console.log(`    Retry ${attempt}/${MAX_RETRIES} in ${wait / 1000}s...`);
        await new Promise((r) => setTimeout(r, wait));
      }
    }
  }
  throw lastErr;
}

function hasImages(product) {
  return Array.isArray(product?.images) && product.images.some((u) => typeof u === "string" && u.length > 0);
}

async function main() {
  let linksText;
  try {
    linksText = readFileSync(LINKS_FILE, "utf8");
  } catch (e) {
    console.error("Create scripts/links.txt with one AliExpress item URL per line.");
    process.exit(1);
  }
  const lines = linksText
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s && s.includes("aliexpress.com/item/"));
  const urls = [...new Set(lines)];
  if (urls.length === 0) {
    console.error("No valid URLs in scripts/links.txt");
    process.exit(1);
  }

  let existingByUrl = new Map();
  if (existsSync(OUTPUT_FILE)) {
    try {
      const existing = JSON.parse(readFileSync(OUTPUT_FILE, "utf8"));
      for (const p of existing) {
        if (p.url) existingByUrl.set(cleanUrl(p.url), p);
      }
      console.log(`Loaded ${existing.length} existing products (will skip ones that already have images).`);
    } catch (_) {}
  }

  console.log(`Delay between requests: ${DELAY_MS}ms. Retries: ${MAX_RETRIES}.`);
  console.log(`Processing ${urls.length} URL(s)...\n`);

  const products = [];
  let fetched = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < urls.length; i++) {
    const u = urls[i];
    const baseUrl = cleanUrl(u);
    const existing = existingByUrl.get(baseUrl);

    if (existing && hasImages(existing)) {
      products.push({ id: i + 1, ...existing, id: i + 1 });
      skipped++;
      console.log(`  ${i + 1}/${urls.length} [cached] ${(existing.title || "").slice(0, 45)}...`);
    } else {
      try {
        const p = await fetchWithRetries(u);
        products.push({ id: i + 1, ...p });
        fetched++;
        console.log(`  ${i + 1}/${urls.length} ${p.title.slice(0, 50)}... ${p.images.length} image(s)`);
      } catch (e) {
        failed++;
        const fallback = existing
          ? { id: i + 1, ...existing, id: i + 1 }
          : { id: i + 1, url: baseUrl, title: "Untitled", images: [], price: { original: "€—", sale: "€—" }, tag: "Lingerie" };
        products.push(fallback);
        console.warn(`  ${i + 1}/${urls.length} FAILED ${baseUrl}: ${e.message}`);
      }
    }

    if (i < urls.length - 1) await new Promise((r) => setTimeout(r, DELAY_MS));
  }

  writeFileSync(OUTPUT_FILE, JSON.stringify(products, null, 2), "utf8");
  console.log(`\nDone. Fetched: ${fetched}, skipped (had images): ${skipped}, failed: ${failed}`);
  console.log(`Wrote ${products.length} products to lib/dev-collection-import.json`);
  if (failed > 0) {
    console.log(`\nTo retry only (with longer delay): DELAY_MS=5000 node scripts/import-aliexpress-links.mjs`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
