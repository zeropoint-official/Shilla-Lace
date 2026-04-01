"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/shopify/types";

export function CollectionRow({
  products,
  title,
  subtitle,
  href,
}: {
  products: Product[];
  title: string;
  subtitle: string;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
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
    <section ref={ref} className="py-16 md:py-24 bg-bg">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div
          className={`flex items-end justify-between mb-8 md:mb-12 px-5 md:px-10 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-accent mb-2">
              {subtitle}
            </p>
            <h2 className="font-heading text-[clamp(1.8rem,3.5vw,3rem)] leading-[1] text-cream font-light">
              {title}
            </h2>
          </div>
          <Link
            href={href}
            className="text-[10px] tracking-[0.2em] uppercase text-cream/40 hover:text-accent transition-colors border-b border-cream/20 hover:border-accent/30 pb-0.5 hidden md:block"
          >
            View All
          </Link>
        </div>

        {/* Mobile: horizontal scroll / Desktop: 4-col grid */}
        <div
          className={`transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Mobile scroll */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 pb-4 hide-scrollbar md:hidden"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="snap-start shrink-0 w-[68vw] max-w-[280px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
            {/* View all card */}
            <Link
              href={href}
              className="snap-start shrink-0 w-[68vw] max-w-[280px] flex items-center justify-center aspect-[3/4] bg-surface group"
            >
              <div className="text-center px-6">
                <span className="block w-8 h-px bg-accent mx-auto mb-4 group-hover:w-12 transition-all duration-300" />
                <span className="text-[10px] tracking-[0.25em] uppercase text-cream/50 group-hover:text-accent transition-colors">
                  View All
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-4 gap-5 px-5 md:px-10">
            {products.slice(0, 4).map((product, i) => (
              <div
                key={product.id}
                className={`transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: visible ? `${250 + i * 80}ms` : "0ms" }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile view all link */}
        <div className="mt-5 text-center md:hidden">
          <Link
            href={href}
            className="text-[10px] tracking-[0.2em] uppercase text-cream/40 hover:text-accent transition-colors border-b border-cream/20 hover:border-accent/30 pb-0.5"
          >
            View All {title}
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange?.minVariantPrice;
  const onSale =
    compareAt && parseFloat(compareAt.amount) > parseFloat(price.amount);

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-surface">
        {image && (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(min-width: 768px) 25vw, 68vw"
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
          <span className={`text-xs ${onSale ? "text-accent" : "text-cream/60"}`}>
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
