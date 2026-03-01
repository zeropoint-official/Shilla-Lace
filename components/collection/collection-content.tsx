"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Collection, Product } from "@/lib/shopify/types";
import { ProductCard } from "@/components/product/product-card";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { ChevronRightIcon, FilterIcon, ChevronDownIcon } from "@/components/ui/icons";

const sortOptions = [
  { label: "Best Selling", value: "BEST_SELLING" },
  { label: "Price: Low to High", value: "PRICE", order: "asc" },
  { label: "Price: High to Low", value: "PRICE", order: "desc" },
  { label: "Newest", value: "CREATED" },
  { label: "A-Z", value: "TITLE" },
];

type Props = {
  collection: Collection;
  products: Product[];
  currentSort: string;
};

export function CollectionContent({ collection, products, currentSort }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const allSizes = useMemo(() => {
    const sizes = new Set<string>();
    products.forEach((p) =>
      p.options
        .find((o) => o.name.toLowerCase() === "size")
        ?.values.forEach((v) => sizes.add(v))
    );
    return Array.from(sizes);
  }, [products]);

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const price = parseFloat(product.priceRange.minVariantPrice.amount);
      if (price < priceRange[0] || price > priceRange[1]) return false;

      if (selectedSizes.length > 0) {
        const productSizes =
          product.options
            .find((o) => o.name.toLowerCase() === "size")
            ?.values.map((v) => v.toLowerCase()) || [];
        if (
          !selectedSizes.some((s) => productSizes.includes(s.toLowerCase()))
        ) {
          return false;
        }
      }

      return true;
    });
  }, [products, priceRange, selectedSizes]);

  function handleSort(value: string, order?: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    if (order) {
      params.set("order", order);
    } else {
      params.delete("order");
    }
    router.push(`?${params.toString()}`, { scroll: false });
    setShowSortDropdown(false);
  }

  function toggleSize(size: string) {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }

  const currentSortLabel =
    sortOptions.find(
      (o) =>
        o.value === currentSort &&
        (o.order || undefined) === (searchParams.get("order") || undefined)
    )?.label || "Best Selling";

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-muted mb-8">
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <ChevronRightIcon className="w-3 h-3" />
          <Link
            href="/collections"
            className="hover:text-gold transition-colors"
          >
            Collections
          </Link>
          <ChevronRightIcon className="w-3 h-3" />
          <span className="text-black">{collection.title}</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="text-muted text-sm tracking-wide max-w-xl mx-auto">
              {collection.description}
            </p>
          )}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/10">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase hover:text-gold transition-colors lg:hidden"
          >
            <FilterIcon className="w-4 h-4" />
            Filters
          </button>
          <p className="text-xs text-muted hidden lg:block">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase"
            >
              Sort: {currentSortLabel}
              <ChevronDownIcon className="w-3 h-3" />
            </button>
            {showSortDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowSortDropdown(false)}
                />
                <div className="absolute right-0 top-full mt-2 bg-cream border border-black/10 shadow-lg z-20 min-w-[200px]">
                  {sortOptions.map((option) => (
                    <button
                      key={`${option.value}-${option.order || ""}`}
                      onClick={() => handleSort(option.value, option.order)}
                      className="block w-full text-left px-4 py-3 text-xs tracking-wide hover:bg-black/5 transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-12">
          {/* Filter Sidebar */}
          <aside
            className={`w-64 flex-shrink-0 space-y-8 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            {allSizes.length > 0 && (
              <div>
                <h3 className="text-xs tracking-[0.15em] uppercase mb-4">
                  Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-4 py-2 text-xs border transition-colors ${
                        selectedSizes.includes(size)
                          ? "bg-black text-cream border-black"
                          : "border-black/15 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-xs tracking-[0.15em] uppercase mb-4">
                Price
              </h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min={0}
                  max={200}
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full accent-gold"
                />
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}+</span>
                </div>
              </div>
            </div>

            {selectedSizes.length > 0 && (
              <button
                onClick={() => setSelectedSizes([])}
                className="text-xs text-muted underline hover:text-gold transition-colors"
              >
                Clear all filters
              </button>
            )}
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted text-sm">
                  No products match your filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedSizes([]);
                    setPriceRange([0, 200]);
                  }}
                  className="mt-4 text-xs underline hover:text-gold transition-colors"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <ScrollReveal stagger={0.08}>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                  {filteredProducts.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      priority={i < 6}
                    />
                  ))}
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
