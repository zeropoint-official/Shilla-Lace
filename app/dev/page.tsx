import type { Metadata } from "next";
import { SourcingGrid } from "@/components/sourcing/sourcing-grid";
import { devCollectionProducts } from "@/lib/dev-collection-products";

export const metadata: Metadata = {
  title: "Dev Collection — Team",
  description: "Development page: ELLOLACE store products for team review.",
  robots: { index: false, follow: false },
};

const STORE_URL = "https://tr.aliexpress.com/store/1798981/pages/all-items.html";

function hasValidImage(images: unknown): boolean {
  return Array.isArray(images) && images.some((url) => typeof url === "string" && url.length > 0);
}

export default function DevPage() {
  const withImages = devCollectionProducts.filter((p) => hasValidImage(p.images));
  const skipped = devCollectionProducts.length - withImages.length;
  const count = withImages.length;
  return (
    <div className="pt-24 md:pt-32 pb-24 md:pb-32">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="h-px bg-gradient-to-r from-accent/60 via-cream/10 to-transparent mb-10 md:mb-14" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent-light mb-2 md:mb-3">
                Development — Team
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-cream leading-[1.1]">
                ELLOLACE Store Collection
              </h1>
            </div>
            <p className="text-xs text-muted max-w-xs leading-relaxed">
              Products imported from store item links. Add more: paste links in <code className="text-cream/70">scripts/links.txt</code>, run <code className="text-cream/70">node scripts/import-aliexpress-links.mjs</code>.
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-8 mb-10 md:mb-14 pb-8 border-b border-cream/5">
          {[
            { label: "Products", value: String(count) },
            { label: "Store", value: "ELLOLACE Official" },
            { label: "Source", value: "AliExpress" },
          ].map((stat) => (
            <div key={stat.label} className="hidden md:block">
              <p className="text-[9px] tracking-[0.2em] uppercase text-muted mb-1">{stat.label}</p>
              <p className="text-sm text-cream/70 font-light">{stat.value}</p>
            </div>
          ))}
          <div className="md:hidden flex gap-6">
            <div>
              <p className="text-[9px] tracking-[0.2em] uppercase text-muted mb-1">Products</p>
              <p className="text-sm text-cream/70">{count}</p>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.2em] uppercase text-muted mb-1">Store</p>
              <p className="text-sm text-cream/70">ELLOLACE</p>
            </div>
          </div>
          <a
            href={STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-[9px] tracking-[0.18em] uppercase text-accent-glow border border-accent/30 px-3 py-1.5 hover:border-accent/60 transition-colors"
          >
            View store ↗
          </a>
        </div>

        {skipped > 0 && (
          <p className="mb-6 text-xs text-muted border border-cream/10 bg-cream/5 px-4 py-3">
            Showing {count} products with images. {skipped} product{skipped !== 1 ? "s" : ""} skipped (no images from import — re-run the import script or add links manually).
          </p>
        )}

        {/* Grid — only products that have at least one image */}
        <SourcingGrid products={withImages} />

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-cream/5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-[10px] tracking-[0.15em] uppercase text-muted">
            Shilla Lace — Dev Collection
          </p>
          <p className="text-[10px] text-muted">
            Click any product to view images and source link. To add more: paste AliExpress item URLs in <code className="text-cream/60">scripts/links.txt</code>, then run the import script.
          </p>
        </div>

      </div>
    </div>
  );
}
