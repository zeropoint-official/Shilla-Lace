"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/shopify/types";

function ProductCard({
  product,
  large = false,
}: {
  product: Product;
  large?: boolean;
}) {
  const image = product.images[0];
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const onSale =
    compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block"
    >
      <div
        className={`relative overflow-hidden bg-surface ${
          large ? "aspect-[3/4]" : "aspect-[3/4]"
        }`}
      >
        {image && (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes={large ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
          />
        )}
        {onSale && (
          <span className="absolute top-3 left-3 bg-accent text-white text-[10px] tracking-[0.15em] uppercase px-2.5 py-1">
            Sale
          </span>
        )}
      </div>
      <div className="mt-3.5">
        <h3 className="text-xs tracking-wide text-cream/80 group-hover:text-accent transition-colors line-clamp-1">
          {product.title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs ${onSale ? "text-accent-glow" : "text-cream/60"}`}>
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
}

export function TheEdit({ products }: { products: Product[] }) {
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

  const hero = products[0];
  const side = products.slice(1, 3);
  const bottom = products.slice(3, 7);

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
              Just Arrived
            </p>
            <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] leading-[1] text-cream font-light">
              The Edit
            </h2>
          </div>
          <Link
            href="/collections/newin"
            className="text-[10px] tracking-[0.2em] uppercase text-cream/40 hover:text-accent transition-colors border-b border-cream/20 hover:border-accent/30 pb-0.5 hidden md:block"
          >
            View All
          </Link>
        </div>

        {/* Asymmetric grid: hero left + 2 stacked right */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-5 mb-5 transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {hero && (
            <div>
              <ProductCard product={hero} large />
            </div>
          )}
          <div className="grid grid-cols-2 gap-5">
            {side.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {/* Bottom row under the stacked pair */}
            {bottom.slice(0, 2).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Mobile-only: remaining products */}
        {bottom.length > 2 && (
          <div className="grid grid-cols-2 gap-5 lg:hidden mt-5">
            {bottom.slice(2).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Mobile view all link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/collections/newin"
            className="text-[10px] tracking-[0.2em] uppercase text-cream/40 hover:text-accent transition-colors border-b border-cream/20 hover:border-accent/30 pb-0.5"
          >
            View All New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}
