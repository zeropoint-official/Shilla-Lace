"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/shopify/types";

export function BestsellersGrid({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!products.length) return null;

  return (
    <section ref={ref} className="py-20 md:py-28 bg-bg">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        {/* Section header */}
        <div
          className={`flex items-end justify-between mb-10 md:mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-accent-glow mb-2">
              Most Loved
            </p>
            <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] leading-[1] text-cream font-light">
              Bestsellers
            </h2>
          </div>
          <Link
            href="/collections/lingerie-new"
            className="text-[10px] tracking-[0.2em] uppercase text-cream/40 hover:text-accent transition-colors border-b border-cream/20 hover:border-accent/30 pb-0.5 hidden md:block"
          >
            View All
          </Link>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8 md:gap-y-10">
          {products.slice(0, 8).map((product, i) => {
            const image = product.images[0];
            const price = product.priceRange.minVariantPrice;
            const compareAt = product.compareAtPriceRange?.minVariantPrice;
            const onSale =
              compareAt &&
              parseFloat(compareAt.amount) > parseFloat(price.amount);

            return (
              <Link
                key={product.id}
                href={`/products/${product.handle}`}
                className={`group block transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: visible ? `${200 + i * 80}ms` : "0ms" }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                  {image && (
                    <Image
                      src={image.url}
                      alt={image.altText || product.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(min-width: 768px) 25vw, 50vw"
                    />
                  )}
                  {onSale && (
                    <span className="absolute top-3 left-3 bg-accent text-white text-[10px] tracking-[0.15em] uppercase px-2.5 py-1">
                      Sale
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <h3 className="text-xs tracking-wide text-cream/80 group-hover:text-accent transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-xs ${
                        onSale ? "text-accent-glow" : "text-cream/60"
                      }`}
                    >
                      {formatPrice(price.amount, price.currencyCode)}
                    </span>
                    {onSale && (
                      <span className="text-xs text-cream/30 line-through">
                        {formatPrice(compareAt.amount, compareAt.currencyCode)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile view all */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/collections/lingerie-new"
            className="text-[10px] tracking-[0.2em] uppercase text-cream/40 hover:text-accent transition-colors border-b border-cream/20 hover:border-accent/30 pb-0.5"
          >
            View All Bestsellers
          </Link>
        </div>
      </div>
    </section>
  );
}
