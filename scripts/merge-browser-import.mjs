#!/usr/bin/env node
/**
 * Merge browser-import.json into dev-collection-import.json.
 * Use after running the browser snippet and saving output to scripts/browser-import.json.
 *
 * Run: node scripts/merge-browser-import.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BROWSER_FILE = join(ROOT, "scripts", "browser-import.json");
const OUTPUT_FILE = join(ROOT, "lib", "dev-collection-import.json");

function cleanUrl(url) {
  const m = String(url).match(/aliexpress\.com\/item\/(\d+)\.html/);
  return m ? `https://www.aliexpress.com/item/${m[1]}.html` : url;
}

function hasImages(product) {
  return Array.isArray(product?.images) && product.images.some((u) => typeof u === "string" && u.length > 0);
}

const browserRaw = readFileSync(BROWSER_FILE, "utf8");
let browserProducts = JSON.parse(browserRaw);
if (!Array.isArray(browserProducts)) browserProducts = [browserProducts];
const byUrl = new Map();
for (const p of browserProducts) {
  const url = cleanUrl(p.url);
  if (url && (p.title || hasImages(p))) byUrl.set(url, p);
}

const existing = JSON.parse(readFileSync(OUTPUT_FILE, "utf8"));
let updated = 0;
for (let i = 0; i < existing.length; i++) {
  const url = cleanUrl(existing[i].url);
  const fromBrowser = byUrl.get(url);
  if (!fromBrowser) continue;
  const hasNewImages = hasImages(fromBrowser);
  const hadImages = hasImages(existing[i]);
  if (hasNewImages && (fromBrowser.title || fromBrowser.images?.length)) {
    existing[i] = {
      id: existing[i].id,
      url: url,
      title: fromBrowser.title || existing[i].title || "Untitled",
      images: Array.isArray(fromBrowser.images) && fromBrowser.images.length ? fromBrowser.images : existing[i].images,
      price: existing[i].price || { original: "€—", sale: "€—" },
      tag: existing[i].tag || "Lingerie",
    };
    if (!hadImages && hasNewImages) updated++;
  }
}

writeFileSync(OUTPUT_FILE, JSON.stringify(existing, null, 2), "utf8");
console.log(`Merged ${byUrl.size} browser entries. Updated ${updated} products with new images/titles.`);
console.log(`Wrote lib/dev-collection-import.json`);
