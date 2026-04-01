"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap/config";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/shopify/types";

type Props = {
  title: string;
  subtitle?: string;
  products: Product[];
  collectionHref?: string;
};

/* ─── Helpers ────────────────────────────────────────────────────────────── */

function getSaleInfo(product: Product) {
  const price = product.priceRange.minVariantPrice;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice;
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
  return { price, compareAtPrice, isOnSale, discount };
}

/* ─── Desktop hero card (left, large) ───────────────────────────────────── */

function HeroCard({ product }: { product: Product }) {
  const { featuredImage, title, handle } = product;
  const { price, compareAtPrice, isOnSale, discount } = getSaleInfo(product);

  return (
    <Link href={`/products/${handle}`} className="group block h-full">
      <div className="relative h-full min-h-[560px] bg-bg-card overflow-hidden">
        {featuredImage && (
          <Image
            src={featuredImage.url}
            alt={featuredImage.altText || title}
            fill
            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}

        {isOnSale && (
          <span className="absolute top-5 left-5 bg-accent text-white text-[9px] tracking-[0.18em] uppercase px-2.5 py-1 font-body">
            -{discount}%
          </span>
        )}

        {/* Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:animate-[shimmer_1.4s_ease-in-out] pointer-events-none" />

        {/* Bottom overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pt-36 pb-7 px-7">
          <span className="block text-[8px] tracking-[0.3em] uppercase text-accent-light mb-3 font-body">
            Featured
          </span>
          <h3 className="font-heading text-2xl lg:text-3xl text-cream font-light leading-tight mb-2.5">
            {title}
          </h3>
          <div className="flex items-baseline gap-2.5 mb-5">
            <span className="text-base text-cream font-body">
              {formatPrice(price.amount, price.currencyCode)}
            </span>
            {isOnSale && compareAtPrice && (
              <span className="text-xs text-muted line-through font-body">
                {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-2.5 text-[9px] tracking-[0.28em] uppercase text-cream/50 group-hover:text-cream transition-colors duration-500 font-body">
            Shop Now
            <span className="block w-5 h-px bg-current transition-all duration-500 group-hover:w-8" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Small grid card (desktop right column) ─────────────────────────────── */

function GridCard({
  product,
  priority,
}: {
  product: Product;
  priority: boolean;
}) {
  const { featuredImage, title, handle } = product;
  const { price, compareAtPrice, isOnSale, discount } = getSaleInfo(product);

  return (
    <Link href={`/products/${handle}`} className="group block">
      <div className="relative aspect-[3/4] bg-bg-card overflow-hidden">
        {featuredImage && (
          <Image
            src={featuredImage.url}
            alt={featuredImage.altText || title}
            fill
            className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.05]"
            sizes="(max-width: 1280px) 20vw, 15vw"
            priority={priority}
          />
        )}
        {isOnSale && (
          <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-[7px] uppercase text-white tracking-wide font-body">
            -{discount}%
          </span>
        )}
        {/* Hover reveal */}
        <div className="absolute inset-x-0 bottom-0 h-14 flex items-end pb-3.5 px-3.5 bg-gradient-to-t from-black/65 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-[8px] tracking-[0.22em] uppercase text-cream/80 font-body">
            Shop Now
          </span>
          <span className="ml-auto block w-4 h-px bg-cream/50" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:animate-[shimmer_1.2s_ease-in-out] pointer-events-none" />
      </div>
      <div className="pt-2.5">
        <h3 className="text-[10px] lg:text-xs text-cream/65 group-hover:text-cream/90 transition-colors duration-400 line-clamp-1 font-body tracking-wide">
          {title}
        </h3>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-xs lg:text-sm text-cream font-body">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          {isOnSale && compareAtPrice && (
            <span className="text-[9px] text-muted line-through font-body">
              {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ─── Mobile featured card (full-width, portrait, overlay) ──────────────── */

function MobileFeaturedCard({ product }: { product: Product }) {
  const { featuredImage, title, handle } = product;
  const { price, compareAtPrice, isOnSale, discount } = getSaleInfo(product);

  return (
    <Link href={`/products/${handle}`} className="group block">
      <div className="relative aspect-[3/4] bg-bg-card overflow-hidden">
        {featuredImage && (
          <Image
            src={featuredImage.url}
            alt={featuredImage.altText || title}
            fill
            className="object-cover transition-transform duration-[1200ms] ease-out group-active:scale-[1.02]"
            sizes="100vw"
            priority
          />
        )}
        {isOnSale && (
          <span className="absolute top-4 left-4 bg-accent text-white text-[8px] tracking-[0.18em] uppercase px-2 py-1 font-body">
            -{discount}%
          </span>
        )}
        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent pt-28 pb-6 px-5">
          <span className="block text-[7px] tracking-[0.32em] uppercase text-accent-light mb-2 font-body">
            Featured
          </span>
          <h3 className="font-heading text-xl text-cream font-light leading-tight mb-2">
            {title}
          </h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-sm text-cream font-body">
              {formatPrice(price.amount, price.currencyCode)}
            </span>
            {isOnSale && compareAtPrice && (
              <span className="text-[10px] text-muted line-through font-body">
                {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-2 text-[8px] tracking-[0.28em] uppercase text-cream/60 font-body">
            Shop Now
            <span className="block w-4 h-px bg-current" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Mobile staggered card (2-col grid) ────────────────────────────────── */

function MobileCard({
  product,
  priority,
}: {
  product: Product;
  priority: boolean;
}) {
  const { featuredImage, title, handle } = product;
  const { price, compareAtPrice, isOnSale, discount } = getSaleInfo(product);

  return (
    <Link href={`/products/${handle}`} className="group block">
      <div className="relative aspect-[3/4] bg-bg-card overflow-hidden">
        {featuredImage && (
          <Image
            src={featuredImage.url}
            alt={featuredImage.altText || title}
            fill
            className="object-cover transition-transform duration-[1200ms] ease-out group-active:scale-[1.02]"
            sizes="50vw"
            priority={priority}
          />
        )}
        {isOnSale && (
          <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-accent flex items-center justify-center text-[6px] uppercase text-white font-body">
            -{discount}%
          </span>
        )}
      </div>
      <div className="pt-2">
        <h3 className="text-[10px] text-cream/65 line-clamp-1 font-body tracking-wide">
          {title}
        </h3>
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span className="text-xs text-cream font-body">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          {isOnSale && compareAtPrice && (
            <span className="text-[9px] text-muted line-through font-body">
              {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export function FeaturedProducts({
  title,
  subtitle,
  products,
  collectionHref = "/collections",
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const desktopLayoutRef = useRef<HTMLDivElement>(null);
  const mobileFeaturedRef = useRef<HTMLDivElement>(null);
  const mobileLeftRef = useRef<HTMLDivElement>(null);
  const mobileRightRef = useRef<HTMLDivElement>(null);

  const [heroProduct, ...restProducts] = products.slice(0, 8);
  const gridProducts = restProducts.slice(0, 6);

  // Mobile staggered columns (from restProducts)
  const mobileLeft = restProducts.filter((_, i) => i % 2 === 0);  // indices 0,2,4 of rest
  const mobileRight = restProducts.filter((_, i) => i % 2 !== 0); // indices 1,3,5 of rest

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const triggerBase = {
        trigger: sectionRef.current,
        start: "top 82%",
        once: true,
      };

      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: triggerBase,
      });

      gsap.from(headerRef.current, {
        y: 28,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: triggerBase,
      });

      // Desktop layout
      if (desktopLayoutRef.current) {
        const cards = desktopLayoutRef.current.querySelectorAll("[data-card]");
        gsap.from(Array.from(cards), {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: desktopLayoutRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // Mobile featured
      if (mobileFeaturedRef.current) {
        gsap.from(mobileFeaturedRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mobileFeaturedRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }

      // Mobile staggered columns
      if (mobileLeftRef.current) {
        gsap.from(Array.from(mobileLeftRef.current.children), {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: mobileLeftRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }
      if (mobileRightRef.current) {
        gsap.from(Array.from(mobileRightRef.current.children), {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.08,
          scrollTrigger: {
            trigger: mobileRightRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!products.length) return null;

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 lg:py-36 bg-bg overflow-hidden">

      {/* Decorative background numeral */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -top-6 right-4 md:right-10 font-heading text-[22vw] md:text-[14vw] leading-none text-cream/[0.02] font-light italic"
      >
        {String(products.slice(0, 8).length).padStart(2, "0")}
      </span>

      <div className="max-w-[1400px] mx-auto px-5 md:px-10">

        {/* Divider */}
        <div
          ref={lineRef}
          className="h-px bg-gradient-to-r from-accent/50 via-cream/8 to-transparent mb-10 md:mb-16"
        />

        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10 md:mb-16"
        >
          <div>
            {subtitle && (
              <p className="text-[9px] md:text-[10px] tracking-[0.38em] uppercase text-accent-light mb-3 font-body">
                {subtitle}
              </p>
            )}
            <h2 className="text-[2.4rem] md:text-5xl lg:text-[3.5rem] font-heading font-light text-cream leading-[1] italic">
              {title}
            </h2>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-6 h-px bg-accent/40" />
              <span className="text-[8px] tracking-[0.32em] uppercase text-cream/20 font-body">
                Curated for you
              </span>
            </div>
          </div>
          <Link
            href={collectionHref}
            className="group inline-flex items-center gap-3 text-[9px] md:text-[10px] tracking-[0.28em] uppercase text-cream/40 hover:text-cream/80 transition-colors duration-500 shrink-0 self-start md:self-auto font-body"
          >
            View All
            <span className="block w-5 h-px bg-current transition-all duration-500 group-hover:w-9" />
          </Link>
        </div>

        {/* ── Desktop layout ──────────────────────────────────────────────── */}
        <div ref={desktopLayoutRef} className="hidden md:grid md:grid-cols-2 gap-4 lg:gap-5">
          {/* Left — large hero */}
          <div data-card>
            <HeroCard product={heroProduct} />
          </div>

          {/* Right — 3×2 grid */}
          <div className="grid grid-cols-3 gap-4 lg:gap-5">
            {gridProducts.map((product, i) => (
              <div key={product.handle} data-card>
                <GridCard product={product} priority={i < 3} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile layout ───────────────────────────────────────────────── */}
        <div className="md:hidden space-y-3">
          {/* Featured first card */}
          {heroProduct && (
            <div ref={mobileFeaturedRef}>
              <MobileFeaturedCard product={heroProduct} />
            </div>
          )}

          {/* Staggered 2-col grid for remaining products */}
          {restProducts.length > 0 && (
            <div className="flex gap-3 pt-1">
              {/* Left column — normal position */}
              <div ref={mobileLeftRef} className="flex-1 flex flex-col gap-3">
                {mobileLeft.map((product, i) => (
                  <MobileCard key={product.handle} product={product} priority={i === 0} />
                ))}
              </div>

              {/* Right column — offset down for stagger effect */}
              <div ref={mobileRightRef} className="flex-1 flex flex-col gap-3 mt-10">
                {mobileRight.map((product) => (
                  <MobileCard key={product.handle} product={product} priority={false} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-12 md:mt-16 flex items-center gap-5">
          <div className="flex-1 h-px bg-cream/6" />
          <Link
            href={collectionHref}
            className="group inline-flex items-center gap-3 text-[9px] tracking-[0.3em] uppercase text-cream/35 hover:text-cream/70 transition-colors duration-500 font-body"
          >
            View Full Collection
            <span className="block w-5 h-px bg-current transition-all duration-500 group-hover:w-8" />
          </Link>
          <div className="flex-1 h-px bg-cream/6" />
        </div>

      </div>
    </section>
  );
}
