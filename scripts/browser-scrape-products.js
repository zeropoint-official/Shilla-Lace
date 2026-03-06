/**
 * IMPORT REMAINING PRODUCTS (when node script gets blocked)
 *
 * --- Option A: Store page (one run for many products) ---
 * 1. Open: https://tr.aliexpress.com/store/1798981/pages/all-items.html
 * 2. Scroll to load products you need.
 * 3. F12 → Console, paste this whole file, Enter.
 * 4. Copy the printed JSON into: scripts/browser-import.json
 * 5. Run: node scripts/merge-browser-import.mjs
 *
 * --- Option B: Single product page (run once per product) ---
 * 1. Open one product page, e.g. https://www.aliexpress.com/item/1005009896390790.html
 * 2. F12 → Console, paste only: scrapeCurrentPage()
 * 3. Copy the one product JSON; append it to the array in scripts/browser-import.json
 *    (or run Option A first, then add these to the array and merge).
 */

function scrapeStorePage() {
  const links = document.querySelectorAll('a[href*="aliexpress.com/item/"][href*=".html"]');
  const seen = new Set();
  const products = [];
  links.forEach((a) => {
    const m = a.href.match(/\/item\/(\d+)\.html/);
    if (!m || seen.has(m[1])) return;
    seen.add(m[1]);
    const url = "https://www.aliexpress.com/item/" + m[1] + ".html";
    const card = a.closest("[class*='product'], [class*='card'], [class*='item'], li, .list--item") || a;
    const img = card.querySelector("img");
    let imgSrc = (img?.src || img?.getAttribute("data-src") || "").replace(/_\d+x\d+\./, ".").replace(/\.(jpg|jpeg|png)\?.*$/, ".$1");
    const titleEl = card.querySelector("[class*='title'], [class*='name'], h3, .title, [class*='Title']");
    const title = (titleEl?.textContent || a.title || "").trim().slice(0, 200) || "Untitled";
    products.push({ url, title: title || "Untitled", images: imgSrc ? [imgSrc] : [] });
  });
  console.log("Copy the JSON below to scripts/browser-import.json");
  console.log(JSON.stringify(products, null, 2));
  return products;
}

function scrapeCurrentPage() {
  const url = document.querySelector('link[rel="canonical"]')?.href || window.location.href;
  const m = url.match(/\/item\/(\d+)\.html/);
  if (!m) return console.warn("Not an item page");
  const baseUrl = "https://www.aliexpress.com/item/" + m[1] + ".html";
  const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute("content") || "";
  const title = ogTitle.replace(/\s*-\s*AliExpress\s+\d+.*$/, "").trim() || "Untitled";
  const images = [];
  const seen = new Set();
  document.querySelectorAll("img").forEach((img) => {
    const s = (img.src || img.getAttribute("data-src") || "").trim();
    if (!s || !s.includes("alicdn.com/kf/") || s.includes("_80x80") || s.includes("/208x")) return;
    const clean = s.replace(/\?.*$/, "").replace(/_.*\.(jpg|jpeg|png)$/, ".$1");
    if (!seen.has(clean)) { seen.add(clean); images.push(clean); }
  });
  const product = { url: baseUrl, title, images };
  console.log("Copy this product and add to browser-import.json array:");
  console.log(JSON.stringify(product, null, 2));
  return product;
}

// Run store scraper by default when pasted
scrapeStorePage();
