# Importing products from AliExpress

## 1. Node script (good when it works)

```bash
# Paste URLs (one per line) in scripts/links.txt, then:
node scripts/import-aliexpress-links.mjs

# If many fail (blocked), use longer delay and retry:
DELAY_MS=5000 node scripts/import-aliexpress-links.mjs
```

Re-running keeps products that already have images and only re-fetches the rest.

---

## 2. Browser import (for the remaining products)

When the node script returns “Untitled” and 0 images (AliExpress blocking server requests), use the browser so the page loads normally.

### Option A – Store page (one run)

1. Open: https://tr.aliexpress.com/store/1798981/pages/all-items.html  
2. Scroll down so all needed products are loaded.  
3. Open DevTools (F12) → **Console**.  
4. Paste the full contents of `scripts/browser-scrape-products.js` and press Enter.  
5. Copy the printed JSON (from the first `[` to the last `]`).  
6. Save it as `scripts/browser-import.json` (replace the file).  
7. Run:

```bash
node scripts/merge-browser-import.mjs
```

That updates `lib/dev-collection-import.json` with titles and images from the store listing (one image per product).

### Option B – Single product page (full title + all images)

For each product that still has no/missing images:

1. Open the product page (e.g. `https://www.aliexpress.com/item/1005009896390790.html`).  
2. F12 → Console, run: `scrapeCurrentPage()`  
   (that function is in `browser-scrape-products.js`; you can paste just that function and call it).  
3. Copy the printed object.  
4. Add it to the array in `scripts/browser-import.json` (comma-separated in the array).  
5. When done, run: `node scripts/merge-browser-import.mjs`

Merge accepts either an array or a single product object in `browser-import.json`.
