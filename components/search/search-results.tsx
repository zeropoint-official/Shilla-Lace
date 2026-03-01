"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/shopify/types";
import { ProductCard } from "@/components/product/product-card";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { SearchIcon } from "@/components/ui/icons";

type Props = {
  products: Product[];
  query: string;
};

export function SearchResults({ products, query }: Props) {
  const [searchInput, setSearchInput] = useState(query);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  }

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl mb-8">
            {query ? `Results for "${query}"` : "Search"}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto relative"
          >
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for lingerie, bodysuits..."
              className="w-full border border-black/15 py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-gold transition-colors bg-transparent"
            />
          </form>
        </div>

        {query && (
          <p className="text-xs text-muted mb-8">
            {products.length} result{products.length !== 1 ? "s" : ""}
          </p>
        )}

        {products.length === 0 && query ? (
          <div className="text-center py-20">
            <p className="text-muted text-sm mb-4">
              No products found for &quot;{query}&quot;
            </p>
            <p className="text-xs text-muted">
              Try a different search term or browse our collections.
            </p>
          </div>
        ) : (
          <ScrollReveal stagger={0.08}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {products.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={i < 4}
                />
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}
