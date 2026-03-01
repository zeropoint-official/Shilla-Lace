import type { Metadata } from "next";
import { SourcingGrid, ExistingHarnessSection } from "@/components/sourcing/sourcing-grid";
import { IntimateDirectionPreview } from "@/components/sourcing/intimate-direction-preview";

export const metadata: Metadata = {
  title: "Sourcing Preview — Internal",
  description: "Internal team preview of potential collection items.",
  robots: { index: false, follow: false },
};

export default function SourcingPreviewPage() {
  return (
    <div className="pt-24 md:pt-32 pb-24 md:pb-32">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="h-px bg-gradient-to-r from-accent/60 via-cream/10 to-transparent mb-10 md:mb-14" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent-light mb-2 md:mb-3">
                Internal Preview — March 2026
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-cream leading-[1.1]">
                Potential Collection Items
              </h1>
            </div>
            <p className="text-xs text-muted max-w-xs leading-relaxed">
              A curated selection sourced from Ellolace via AliExpress, presented for team review and collection consideration.
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-8 mb-10 md:mb-14 pb-8 border-b border-cream/5">
          {[
            { label: "Products", value: "13" },
            { label: "Brand", value: "Ellolace" },
            { label: "Category", value: "Lingerie & Intimates" },
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
              <p className="text-sm text-cream/70">13</p>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.2em] uppercase text-muted mb-1">Brand</p>
              <p className="text-sm text-cream/70">Ellolace</p>
            </div>
          </div>
          <div className="ml-auto">
            <span className="text-[9px] tracking-[0.18em] uppercase text-accent-glow border border-accent/30 px-3 py-1.5">
              Internal Use Only
            </span>
          </div>
        </div>

        {/* Grid */}
        <SourcingGrid />

        {/* Existing harness products */}
        <ExistingHarnessSection />

        {/* Intimate direction preview */}
        <IntimateDirectionPreview />

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-cream/5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-[10px] tracking-[0.15em] uppercase text-muted">
            Shilla Lace — Sourcing Preview Document
          </p>
          <p className="text-[10px] text-muted">
            Click any product to view all images and source link
          </p>
        </div>

      </div>
    </div>
  );
}
