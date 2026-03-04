"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/shopify/types";

type Props = {
  title: string;
  subtitle?: string;
  products: Product[];
  collectionHref?: string;
};

function HeroProduct({ product }: { product: Product }) {
  const { featuredImage, title, handle, priceRange, compareAtPriceRange } =
    product;
  const price = priceRange.minVariantPrice;
  const compareAtPrice = compareAtPriceRange?.minVariantPrice;
  const isOnSale =
    compareAtPrice &&
    parseFloat(compareAtPrice.amount) > parseFloat(price.amount);
  const discount = isOnSale
    ? Math.round(
        ((parseFloat(compareAtPrice.amount) - parseFloat(price.amount)) /
          parseFloat(compareAtPrice.amount)) *
          100
      )
    : 0;

  return (
    <Link href={`/products/${handle}`} className="group block relative">
      <div className="relative aspect-[3/4] md:aspect-auto md:h-full min-h-[500px] bg-bg-card overflow-hidden">
        {featuredImage && (
          <Image
            src={featuredImage.url}
            alt={featuredImage.altText || title}
            fill
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}

        {isOnSale && (
          <span className="absolute top-4 left-4 md:top-5 md:left-5 bg-accent text-cream text-[10px] md:text-[11px] tracking-[0.12em] uppercase px-2.5 py-1">
            -{discount}%
          </span>
        )}

        {/* Shimmer on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.2s_ease-in-out] pointer-events-none" />

        {/* Bottom gradient with product info */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-32 pb-6 px-5 md:px-7 md:pb-8">
          <span className="inline-block text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-accent-light mb-3">
            Featured
          </span>
          <h3 className="font-heading text-xl md:text-2xl lg:text-3xl text-cream font-light leading-tight mb-2">
            {title}
          </h3>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-base md:text-lg text-cream">
              {formatPrice(price.amount, price.currencyCode)}
            </span>
            {isOnSale && (
              <span className="text-xs text-muted line-through">
                {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-2 text-[10px] md:text-xs tracking-[0.2em] uppercase text-cream/60 group-hover:text-cream transition-colors duration-400">
            Shop Now
            <svg
              className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-1 transition-transform duration-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedProducts({
  title,
  subtitle,
  products,
  collectionHref = "/collections",
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: isMobile ? 0.6 : 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 98%" : "top 85%",
          once: true,
        },
      });

      gsap.from(headerRef.current, {
        y: isMobile ? 15 : 30,
        opacity: 0,
        duration: isMobile ? 0.5 : 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 98%" : "top 85%",
          once: true,
        },
      });

      const allCards = layoutRef.current?.querySelectorAll("[data-card]");
      if (allCards) {
        gsap.from(Array.from(allCards), {
          y: isMobile ? 20 : 60,
          opacity: 0,
          duration: isMobile ? 0.4 : 0.8,
          ease: "power3.out",
          stagger: isMobile ? 0.04 : 0.08,
          scrollTrigger: {
            trigger: layoutRef.current,
            start: isMobile ? "top 98%" : "top 85%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!products.length) return null;

  const [heroProduct, ...restProducts] = products.slice(0, 8);
  const gridProducts = restProducts.slice(0, 6);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div
          ref={lineRef}
          className="h-px bg-gradient-to-r from-accent/60 via-cream/10 to-transparent mb-10 md:mb-14"
        />

        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14"
        >
          <div>
            {subtitle && (
              <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent-light mb-2 md:mb-3">
                {subtitle}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-cream leading-[1.1]">
              {title}
            </h2>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-8 h-px bg-accent/50" />
              <span className="text-[9px] tracking-[0.3em] uppercase text-cream/25">
                Curated for you
              </span>
            </div>
          </div>
          <Link
            href={collectionHref}
            className="group inline-flex items-center gap-3 text-[10px] md:text-xs tracking-[0.25em] uppercase text-cream/50 hover:text-cream transition-colors duration-400 shrink-0"
          >
            View All
            <span className="block w-6 h-px bg-current transition-all duration-400 group-hover:w-10" />
          </Link>
        </div>

        {/* Desktop: hero product on left, 6-product grid on right */}
        <div ref={layoutRef}>
          <div className="hidden md:grid md:grid-cols-2 gap-3 lg:gap-4">
            {/* Left: large hero product */}
            <div data-card>
              <HeroProduct product={heroProduct} />
            </div>

            {/* Right: 3x2 grid of remaining products */}
            <div className="grid grid-cols-3 gap-3 lg:gap-4">
              {gridProducts.map((product, i) => (
                <div key={product.handle} data-card>
                  <ProductCard product={product} priority={i < 3} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: horizontal scroll strip */}
          <div className="md:hidden -mx-5 px-5">
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 snap-x snap-mandatory">
              {products.slice(0, 8).map((product, i) => (
                <div
                  key={product.handle}
                  data-card
                  className="flex-shrink-0 w-[42vw] snap-start"
                >
                  <ProductCard product={product} priority={i < 2} />
                </div>
              ))}
              {/* View all card at the end */}
              <Link
                href={collectionHref}
                data-card
                className="flex-shrink-0 w-[42vw] snap-start flex items-center justify-center aspect-[3/4] bg-bg-card border border-cream/5 hover:border-cream/10 transition-colors duration-500 group"
              >
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full border border-cream/15 flex items-center justify-center group-hover:border-accent/50 transition-colors duration-500">
                    <svg
                      className="w-4 h-4 text-cream/40 group-hover:text-cream transition-colors duration-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </div>
                  <span className="text-[10px] tracking-[0.25em] uppercase text-cream/40 group-hover:text-cream/70 transition-colors duration-500">
                    View All
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
