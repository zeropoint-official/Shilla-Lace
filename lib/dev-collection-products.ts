import type { SourcingProduct } from "./sourcing-products";

/**
 * Development / team collection — products from ELLOLACE Official Store.
 * Source store: https://tr.aliexpress.com/store/1798981/pages/all-items.html
 *
 * To add more products: paste AliExpress item links (one per line) in
 * scripts/links.txt, then run:
 *   node scripts/import-aliexpress-links.mjs
 * That overwrites lib/dev-collection-import.json; this file uses it.
 */

import imported from "./dev-collection-import.json";

export const devCollectionProducts: SourcingProduct[] = imported as SourcingProduct[];
