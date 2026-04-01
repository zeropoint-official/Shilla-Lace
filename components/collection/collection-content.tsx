"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { gsap } from "@/lib/gsap/config";
import type { Collection, Product } from "@/lib/shopify/types";
import { ProductCard } from "@/components/product/product-card";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

/* ─── Sort options ───────────────────────────────────────────────────────── */

const sortOptions = [
  { label: "Best Selling",      value: "BEST_SELLING" },
  { label: "Price: Low → High", value: "PRICE",  order: "asc"  },
  { label: "Price: High → Low", value: "PRICE",  order: "desc" },
  { label: "Newest",            value: "CREATED" },
  { label: "A – Z",             value: "TITLE"   },
];

/* ─── Color → hex mapping ────────────────────────────────────────────────── */

const COLOR_MAP: Record<string, string> = {
  black:     "#0e0c0b",
  white:     "#f5f0eb",
  ivory:     "#fffff0",
  cream:     "#f0e8dc",
  red:       "#8b0000",
  crimson:   "#8b0000",
  burgundy:  "#6d0101",
  wine:      "#722f37",
  pink:      "#e8a0a0",
  blush:     "#d4a0a0",
  rose:      "#c97878",
  dusty:     "#c0908a",
  beige:     "#c8aa88",
  nude:      "#c8a882",
  champagne: "#d4c080",
  caramel:   "#c08040",
  brown:     "#6b4020",
  mocha:     "#7a5030",
  grey:      "#7a7067",
  gray:      "#7a7067",
  charcoal:  "#3a3630",
  navy:      "#1a2444",
  blue:      "#2040a0",
  purple:    "#6b3d7a",
  plum:      "#4a1a4a",
  lavender:  "#a080c0",
  gold:      "#b89040",
  silver:    "#a0a0a0",
  leopard:   "#b07830",
  animal:    "#b07830",
};

function getColorHex(name: string): string {
  const key = name.toLowerCase().split(/[\s-_]/)[0];
  return COLOR_MAP[key] ?? "#7a7067";
}

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 140;
}

/* ─── Props ──────────────────────────────────────────────────────────────── */

type Props = {
  collection: Collection;
  products: Product[];
  currentSort: string;
};

/* ─── Small icons ────────────────────────────────────────────────────────── */

function Chevron({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M2 4.5L6 8L10 4.5" />
    </svg>
  );
}

function PlusMinus({ open }: { open: boolean }) {
  return (
    <span className="relative w-3 h-3 flex-shrink-0">
      <span className="absolute inset-y-[5px] inset-x-0 h-px bg-current transition-all duration-300" />
      <span className={`absolute inset-x-[5px] inset-y-0 w-px bg-current transition-all duration-300 origin-center ${open ? "scale-y-0 opacity-0" : ""}`} />
    </span>
  );
}

/* ─── Reusable accordion filter section ─────────────────────────────────── */

function FilterSection({
  id, label, openId, onToggle, children,
}: {
  id: string;
  label: string;
  openId: string | null;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}) {
  const isOpen = openId === id;
  return (
    <div className="border-b border-cream/6">
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between py-4 text-[9px] tracking-[0.32em] uppercase text-cream/45 hover:text-cream/70 transition-colors duration-300 font-body"
      >
        {label}
        <PlusMinus open={isOpen} />
      </button>
      <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isOpen ? "max-h-80 pb-4" : "max-h-0"}`}>
        {children}
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */

export function CollectionContent({ collection, products, currentSort }: Props) {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const metaRef      = useRef<HTMLDivElement>(null);
  const toolbarRef   = useRef<HTMLDivElement>(null);

  /* Filter state */
  const [showFilters,       setShowFilters]       = useState(false);
  const [showSortDropdown,  setShowSortDropdown]  = useState(false);
  const [openSection,       setOpenSection]       = useState<string | null>("type");
  const [priceRange,        setPriceRange]        = useState<[number, number]>([0, 200]);
  const [selectedSizes,     setSelectedSizes]     = useState<string[]>([]);
  const [selectedColors,    setSelectedColors]    = useState<string[]>([]);
  const [selectedTypes,     setSelectedTypes]     = useState<string[]>([]);
  const [onSaleOnly,        setOnSaleOnly]        = useState(false);
  const [inStockOnly,       setInStockOnly]       = useState(false);

  /* Derived filter options from product data */
  const allSizes = useMemo(() => {
    const s = new Set<string>();
    products.forEach((p) =>
      p.options.find((o) => o.name.toLowerCase() === "size")?.values.forEach((v) => s.add(v))
    );
    return Array.from(s);
  }, [products]);

  const allColors = useMemo(() => {
    const c = new Set<string>();
    products.forEach((p) =>
      p.options.find((o) => o.name.toLowerCase() === "color")?.values.forEach((v) => c.add(v))
    );
    return Array.from(c).sort();
  }, [products]);

  const allTypes = useMemo(() => {
    const t = new Set<string>();
    products.forEach((p) => {
      if (p.productType) t.add(p.productType);
    });
    return Array.from(t).sort();
  }, [products]);

  /* Price bounds derived from actual products */
  const maxPrice = useMemo(() => {
    const max = Math.max(...products.map((p) => parseFloat(p.priceRange.maxVariantPrice.amount)));
    return Math.ceil(max / 10) * 10 || 200;
  }, [products]);

  /* Filtered products */
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const price = parseFloat(p.priceRange.minVariantPrice.amount);
      if (price < priceRange[0] || price > priceRange[1]) return false;

      if (onSaleOnly) {
        const compareAt = parseFloat(p.compareAtPriceRange?.minVariantPrice?.amount ?? "0");
        if (!(compareAt > price)) return false;
      }

      if (inStockOnly && !p.availableForSale) return false;

      if (selectedSizes.length > 0) {
        const productSizes = p.options
          .find((o) => o.name.toLowerCase() === "size")
          ?.values.map((v) => v.toLowerCase()) ?? [];
        if (!selectedSizes.some((s) => productSizes.includes(s.toLowerCase()))) return false;
      }

      if (selectedColors.length > 0) {
        const productColors = p.options
          .find((o) => o.name.toLowerCase() === "color")
          ?.values.map((v) => v.toLowerCase()) ?? [];
        if (!selectedColors.some((c) => productColors.includes(c.toLowerCase()))) return false;
      }

      if (selectedTypes.length > 0) {
        if (!selectedTypes.includes(p.productType)) return false;
      }

      return true;
    });
  }, [products, priceRange, selectedSizes, selectedColors, selectedTypes, onSaleOnly, inStockOnly]);

  const activeFilterCount =
    selectedSizes.length +
    selectedColors.length +
    selectedTypes.length +
    (onSaleOnly ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (priceRange[1] < maxPrice ? 1 : 0);

  function clearFilters() {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedTypes([]);
    setOnSaleOnly(false);
    setInStockOnly(false);
    setPriceRange([0, maxPrice]);
  }

  function toggleSection(id: string) {
    setOpenSection((prev) => (prev === id ? null : id));
  }

  function toggle<T>(arr: T[], item: T, set: (v: T[]) => void) {
    set(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  }

  const currentSortLabel =
    sortOptions.find(
      (o) =>
        o.value === currentSort &&
        (o.order ?? undefined) === (searchParams.get("order") ?? undefined)
    )?.label ?? "Best Selling";

  function handleSort(value: string, order?: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    if (order) params.set("order", order);
    else params.delete("order");
    router.push(`?${params.toString()}`, { scroll: false });
    setShowSortDropdown(false);
  }

  /* Entrance animation */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(titleRef.current, { y: 50, opacity: 0, duration: 1.1 }, 0.1)
        .from(metaRef.current,  { y: 20, opacity: 0, duration: 0.8 }, 0.4)
        .from(toolbarRef.current, { y: 16, opacity: 0, duration: 0.7 }, 0.65);
    });
    return () => ctx.revert();
  }, []);

  /* ─── Shared filter UI blocks ─────────────────────────────────────────── */

  const typeFilterContent = allTypes.length > 0 && (
    <div className="flex flex-wrap gap-2">
      {allTypes.map((type) => (
        <button
          key={type}
          onClick={() => toggle(selectedTypes, type, setSelectedTypes)}
          className={`px-3 py-1.5 text-[9px] tracking-[0.18em] uppercase border transition-all duration-300 font-body
            ${selectedTypes.includes(type)
              ? "bg-accent border-accent text-white"
              : "border-cream/12 text-cream/35 hover:border-cream/30 hover:text-cream/65"}`}
        >
          {type}
        </button>
      ))}
    </div>
  );

  const colorFilterContent = allColors.length > 0 && (
    <div className="flex flex-wrap gap-2.5">
      {allColors.map((color) => {
        const hex      = getColorHex(color);
        const selected = selectedColors.includes(color);
        const light    = isLight(hex);
        return (
          <button
            key={color}
            title={color}
            onClick={() => toggle(selectedColors, color, setSelectedColors)}
            className="group flex flex-col items-center gap-1.5"
          >
            <span
              className={`block w-6 h-6 rounded-full transition-all duration-300 ring-offset-1 ring-offset-bg-elevated
                ${selected ? "ring-2 ring-cream/60 scale-110" : "ring-1 ring-cream/10 group-hover:ring-cream/30"}
                ${light ? "border border-cream/20" : ""}`}
              style={{ background: hex }}
            />
            <span className={`text-[7px] tracking-[0.15em] uppercase font-body transition-colors duration-300 ${selected ? "text-cream/80" : "text-cream/25 group-hover:text-cream/45"}`}>
              {color.length > 8 ? color.slice(0, 7) + "…" : color}
            </span>
          </button>
        );
      })}
    </div>
  );

  const sizeFilterContent = allSizes.length > 0 && (
    <div className="flex flex-wrap gap-2">
      {allSizes.map((size) => (
        <button
          key={size}
          onClick={() => toggle(selectedSizes, size, setSelectedSizes)}
          className={`px-3 py-1.5 text-[9px] tracking-[0.18em] uppercase border transition-all duration-300 font-body min-w-[2.5rem] text-center
            ${selectedSizes.includes(size)
              ? "bg-accent border-accent text-white"
              : "border-cream/12 text-cream/35 hover:border-cream/30 hover:text-cream/65"}`}
        >
          {size}
        </button>
      ))}
    </div>
  );

  const priceFilterContent = (
    <div className="space-y-3">
      <input
        type="range"
        min={0}
        max={maxPrice}
        step={5}
        value={priceRange[1]}
        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
        className="w-full h-px appearance-none bg-cream/15 accent-accent cursor-pointer"
        style={{ accentColor: "var(--color-accent)" }}
      />
      <div className="flex items-center justify-between text-[9px] text-cream/30 font-body tracking-wide">
        <span>$0</span>
        <span className={priceRange[1] < maxPrice ? "text-cream/60" : ""}>
          ${priceRange[1]}{priceRange[1] >= maxPrice ? "+" : ""}
        </span>
      </div>
    </div>
  );

  const availabilityFilterContent = (
    <div className="space-y-3">
      {[
        { label: "In Stock",  state: inStockOnly, set: setInStockOnly },
        { label: "On Sale",   state: onSaleOnly,  set: setOnSaleOnly  },
      ].map(({ label, state, set }) => (
        <button
          key={label}
          onClick={() => set(!state)}
          className="flex items-center gap-3 w-full group"
        >
          <span className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-all duration-300
            ${state ? "bg-accent border-accent" : "border-cream/20 group-hover:border-cream/40"}`}
          >
            {state && (
              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M1.5 5L4 7.5L8.5 2.5" />
              </svg>
            )}
          </span>
          <span className={`text-[9px] tracking-[0.22em] uppercase font-body transition-colors duration-300 ${state ? "text-cream/80" : "text-cream/35 group-hover:text-cream/60"}`}>
            {label}
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-bg text-cream">

      {/* ── Collection Header ──────────────────────────────────────────── */}
      <header className="relative pt-28 md:pt-36 pb-12 md:pb-16 overflow-hidden border-b border-cream/6">
        <span
          aria-hidden
          className="pointer-events-none select-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-heading text-[18vw] md:text-[12vw] leading-none text-cream/[0.025] font-light italic whitespace-nowrap overflow-hidden"
        >
          {collection.title}
        </span>
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg to-transparent" />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
          <nav className="flex items-center gap-2 text-[9px] tracking-[0.28em] uppercase text-cream/30 mb-8 font-body">
            <Link href="/" className="hover:text-cream/60 transition-colors duration-300">Home</Link>
            <span className="text-cream/15">·</span>
            <Link href="/collections" className="hover:text-cream/60 transition-colors duration-300">Collections</Link>
            <span className="text-cream/15">·</span>
            <span className="text-cream/50">{collection.title}</span>
          </nav>

          <h1 ref={titleRef} className="font-heading font-light text-[clamp(2.8rem,7vw,6rem)] leading-[0.9] text-cream italic mb-5">
            {collection.title}
          </h1>

          <div ref={metaRef} className="flex flex-col md:flex-row md:items-end gap-4 md:gap-10">
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-accent/50" />
              <span className="text-[8px] tracking-[0.35em] uppercase text-cream/20 font-body">
                {filteredProducts.length} piece{filteredProducts.length !== 1 ? "s" : ""}
              </span>
            </div>
            {collection.description && (
              <p className="text-[11px] md:text-xs text-cream/35 leading-relaxed max-w-md font-body tracking-wide">
                {collection.description}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* ── Sticky Toolbar ─────────────────────────────────────────────── */}
      <div ref={toolbarRef} className="sticky top-[60px] z-20 bg-bg/90 backdrop-blur-md border-b border-cream/6">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-12 flex items-center justify-between gap-4">

          <div className="flex items-center gap-5">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 text-[9px] tracking-[0.28em] uppercase text-cream/50 hover:text-cream transition-colors duration-300 font-body"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={1.5}>
                <path d="M2 4h12M4 8h8M6 12h4" />
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-accent text-white text-[7px] flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Desktop: product count */}
            <span className="hidden lg:block text-[9px] tracking-[0.3em] uppercase text-cream/25 font-body">
              {filteredProducts.length} {filteredProducts.length !== 1 ? "pieces" : "piece"}
            </span>

            {/* Active filter pills (desktop) */}
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              {selectedTypes.map((t) => (
                <Pill key={t} label={t} onRemove={() => toggle(selectedTypes, t, setSelectedTypes)} />
              ))}
              {selectedColors.map((c) => (
                <Pill key={c} label={c} color={getColorHex(c)} onRemove={() => toggle(selectedColors, c, setSelectedColors)} />
              ))}
              {selectedSizes.map((s) => (
                <Pill key={s} label={s} onRemove={() => toggle(selectedSizes, s, setSelectedSizes)} />
              ))}
              {onSaleOnly && <Pill label="On Sale" onRemove={() => setOnSaleOnly(false)} />}
              {inStockOnly && <Pill label="In Stock" onRemove={() => setInStockOnly(false)} />}
              {priceRange[1] < maxPrice && (
                <Pill label={`≤ $${priceRange[1]}`} onRemove={() => setPriceRange([0, maxPrice])} />
              )}
              {activeFilterCount > 1 && (
                <button
                  onClick={clearFilters}
                  className="text-[8px] tracking-[0.22em] uppercase text-accent-light hover:text-accent transition-colors duration-300 font-body ml-1"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Sort */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 text-[9px] tracking-[0.28em] uppercase text-cream/45 hover:text-cream/80 transition-colors duration-300 font-body"
            >
              <span className="text-cream/20 hidden sm:inline">Sort:</span>
              {currentSortLabel}
              <Chevron className={`w-3 h-3 transition-transform duration-300 ${showSortDropdown ? "rotate-180" : ""}`} />
            </button>
            {showSortDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
                <div className="absolute right-0 top-full mt-2 bg-bg-elevated border border-cream/8 z-20 min-w-[200px] py-1">
                  {sortOptions.map((option) => {
                    const isActive =
                      option.value === currentSort &&
                      (option.order ?? undefined) === (searchParams.get("order") ?? undefined);
                    return (
                      <button
                        key={`${option.value}-${option.order ?? ""}`}
                        onClick={() => handleSort(option.value, option.order)}
                        className={`flex items-center justify-between w-full text-left px-5 py-3 text-[9px] tracking-[0.22em] uppercase transition-colors duration-200 font-body
                          ${isActive ? "text-cream" : "text-cream/40 hover:text-cream/80 hover:bg-cream/[0.03]"}`}
                      >
                        {option.label}
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile filter panel ─────────────────────────────────────────── */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out bg-bg-elevated border-b border-cream/6 ${showFilters ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-6">

          {/* Availability toggles */}
          <div>
            <p className="text-[8px] tracking-[0.38em] uppercase text-cream/35 mb-4 font-body">Availability</p>
            <div className="flex gap-6">
              {[
                { label: "In Stock", state: inStockOnly, set: setInStockOnly },
                { label: "On Sale",  state: onSaleOnly,  set: setOnSaleOnly  },
              ].map(({ label, state, set }) => (
                <button key={label} onClick={() => set(!state)} className="flex items-center gap-2.5 group">
                  <span className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-all duration-300 ${state ? "bg-accent border-accent" : "border-cream/20 group-hover:border-cream/40"}`}>
                    {state && (
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M1.5 5L4 7.5L8.5 2.5" />
                      </svg>
                    )}
                  </span>
                  <span className={`text-[9px] tracking-[0.22em] uppercase font-body transition-colors duration-300 ${state ? "text-cream/80" : "text-cream/35"}`}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Type */}
          {allTypes.length > 0 && (
            <div>
              <p className="text-[8px] tracking-[0.38em] uppercase text-cream/35 mb-4 font-body">Type</p>
              {typeFilterContent}
            </div>
          )}

          {/* Colors */}
          {allColors.length > 0 && (
            <div>
              <p className="text-[8px] tracking-[0.38em] uppercase text-cream/35 mb-4 font-body">Color</p>
              {colorFilterContent}
            </div>
          )}

          {/* Sizes */}
          {allSizes.length > 0 && (
            <div>
              <p className="text-[8px] tracking-[0.38em] uppercase text-cream/35 mb-4 font-body">Size</p>
              {sizeFilterContent}
            </div>
          )}

          {/* Price */}
          <div>
            <p className="text-[8px] tracking-[0.38em] uppercase text-cream/35 mb-4 font-body">Price</p>
            {priceFilterContent}
          </div>

          {/* Clear */}
          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className="text-[9px] tracking-[0.28em] uppercase text-accent-light hover:text-accent transition-colors duration-300 font-body">
              Clear all filters ({activeFilterCount})
            </button>
          )}
        </div>
      </div>

      {/* ── Main layout ─────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 md:py-14 flex gap-12 xl:gap-16">

        {/* ── Desktop sidebar ──────────────────────────────────────────── */}
        <aside className="hidden lg:block w-52 xl:w-60 flex-shrink-0 self-start sticky top-[108px]">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[9px] tracking-[0.38em] uppercase text-cream/35 font-body">Filters</span>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="flex items-center gap-1.5 text-[8px] tracking-[0.22em] uppercase text-accent-light hover:text-accent transition-colors duration-300 font-body">
                Clear
                <span className="w-4 h-4 rounded-full bg-accent/20 text-white text-[7px] flex items-center justify-center">
                  {activeFilterCount}
                </span>
              </button>
            )}
          </div>

          <div className="border-t border-cream/6">
            {/* Availability */}
            <FilterSection id="availability" label="Availability" openId={openSection} onToggle={toggleSection}>
              {availabilityFilterContent}
            </FilterSection>

            {/* Type */}
            {allTypes.length > 0 && (
              <FilterSection id="type" label="Type" openId={openSection} onToggle={toggleSection}>
                {typeFilterContent}
              </FilterSection>
            )}

            {/* Color */}
            {allColors.length > 0 && (
              <FilterSection id="color" label="Color" openId={openSection} onToggle={toggleSection}>
                {colorFilterContent}
              </FilterSection>
            )}

            {/* Size */}
            {allSizes.length > 0 && (
              <FilterSection id="size" label="Size" openId={openSection} onToggle={toggleSection}>
                {sizeFilterContent}
              </FilterSection>
            )}

            {/* Price */}
            <FilterSection id="price" label="Price" openId={openSection} onToggle={toggleSection}>
              {priceFilterContent}
            </FilterSection>
          </div>
        </aside>

        {/* ── Product grid ─────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 text-center">
              <span className="font-heading text-[5rem] text-cream/8 italic leading-none mb-4">0</span>
              <p className="text-[11px] tracking-[0.28em] uppercase text-cream/30 font-body mb-6">
                No pieces match your filters
              </p>
              <button
                onClick={clearFilters}
                className="text-[9px] tracking-[0.28em] uppercase text-accent-light hover:text-accent transition-colors duration-300 font-body border border-accent/20 hover:border-accent/50 px-6 py-2"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <ScrollReveal stagger={0.06} y={40}>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-5 gap-y-10 md:gap-y-14">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} priority={i < 6} />
                ))}
              </div>
            </ScrollReveal>
          )}

          {filteredProducts.length > 0 && (
            <div className="mt-16 flex items-center gap-5">
              <div className="flex-1 h-px bg-cream/6" />
              <span className="text-[8px] tracking-[0.35em] uppercase text-cream/20 font-body">
                {filteredProducts.length} {filteredProducts.length !== 1 ? "pieces" : "piece"} shown
              </span>
              <div className="flex-1 h-px bg-cream/6" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Filter pill ────────────────────────────────────────────────────────── */

function Pill({ label, color, onRemove }: { label: string; color?: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="flex items-center gap-1.5 text-[8px] tracking-[0.18em] uppercase text-cream/40 border border-cream/12 hover:border-accent/40 hover:text-cream/70 px-2 py-0.5 transition-all duration-300 font-body"
    >
      {color && (
        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
      )}
      {label}
      <span className="text-cream/25 ml-0.5">×</span>
    </button>
  );
}
