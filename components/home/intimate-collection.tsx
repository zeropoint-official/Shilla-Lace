"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap/config";
import { sourcingProducts } from "@/lib/sourcing-products";

type IntimateProduct = {
  key: string;
  title: string;
  price: string;
  compareAt?: string;
  image: string;
  href?: string;
  tag: string;
  unoptimized?: boolean;
};

const intimateProducts: IntimateProduct[] = [
  {
    key: "pa5",
    title: "Isabella's Lingerie Set",
    price: "$33.99",
    compareAt: "$49.99",
    image: "/PA5.avif",
    href: "/products/isabellas-lingerie-set",
    tag: "Lingerie Set",
  },
  {
    key: "s9",
    title: sourcingProducts[8].title,
    price: sourcingProducts[8].price.sale,
    compareAt: sourcingProducts[8].price.original,
    image: sourcingProducts[8].images[0],
    tag: sourcingProducts[8].tag,
    unoptimized: true,
  },
  {
    key: "pd2",
    title: "Delilah's Lingerie Set",
    price: "$44.99",
    image: "/PD2.avif",
    href: "/products/delilahs-lingerie-set",
    tag: "Lingerie Set",
  },
  {
    key: "s11",
    title: sourcingProducts[10].title,
    price: sourcingProducts[10].price.sale,
    compareAt: sourcingProducts[10].price.original,
    image: sourcingProducts[10].images[0],
    tag: sourcingProducts[10].tag,
    unoptimized: true,
  },
  {
    key: "s8",
    title: sourcingProducts[7].title,
    price: sourcingProducts[7].price.sale,
    compareAt: sourcingProducts[7].price.original,
    image: sourcingProducts[7].images[0],
    tag: sourcingProducts[7].tag,
    unoptimized: true,
  },
  {
    key: "pc2",
    title: "Celine's Lingerie Set",
    price: "$44.99",
    image: "/PC2.avif",
    href: "/products/celines-lingerie-set",
    tag: "Lingerie Set",
  },
  {
    key: "s10",
    title: sourcingProducts[9].title,
    price: sourcingProducts[9].price.sale,
    compareAt: sourcingProducts[9].price.original,
    image: sourcingProducts[9].images[0],
    tag: sourcingProducts[9].tag,
    unoptimized: true,
  },
  {
    key: "pe5",
    title: "Ariana's Lingerie Set",
    price: "$39.99",
    image: "/PE5.avif",
    href: "/products/arianas-lingerie-set",
    tag: "Lingerie Set",
  },
];

/* ─── Card ─────────────────────────────────────────────────────────────────── */

function IntimateProductCard({
  product,
  priority,
  index,
}: {
  product: IntimateProduct;
  priority: boolean;
  index: number;
}) {
  const cardInner = (
    <>
      {/* Image container */}
      <div className="relative aspect-[3/4] bg-bg-card overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 20vw"
          priority={priority}
          unoptimized={product.unoptimized}
        />

        {/* Subtle top gradient to ensure badges are readable */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />

        {/* Tag badge */}
        <span className="absolute top-3 left-3 text-[7px] md:text-[8px] tracking-[0.18em] uppercase text-cream/60 font-body">
          {product.tag}
        </span>

        {/* Sale badge */}
        {product.compareAt && (
          <span className="absolute top-3 right-3 w-6 h-6 md:w-7 md:h-7 rounded-full bg-accent flex items-center justify-center text-[7px] tracking-wide uppercase text-white font-body">
            Sale
          </span>
        )}

        {/* Hover overlay — desktop only */}
        <div className="hidden md:flex absolute inset-x-0 bottom-0 h-16 items-end pb-4 px-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-[9px] tracking-[0.22em] uppercase text-cream/90 font-body">
            {product.href ? "Shop Now" : "Coming Soon"}
          </span>
          <span className="ml-auto block w-5 h-px bg-cream/60" />
        </div>

        {/* Shimmer on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:animate-[shimmer_1.2s_ease-in-out] pointer-events-none" />
      </div>

      {/* Text below image */}
      <div className="pt-2.5 md:pt-3.5">
        {/* Index number — editorial accent */}
        <span className="block text-[8px] tracking-[0.25em] text-cream/20 font-body mb-1 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="text-[11px] md:text-xs text-cream/75 group-hover:text-cream transition-colors duration-400 leading-snug line-clamp-1 font-body tracking-wide">
          {product.title}
        </h3>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-xs md:text-sm text-cream font-body">{product.price}</span>
          {product.compareAt && (
            <span className="text-[10px] text-muted line-through font-body">
              {product.compareAt}
            </span>
          )}
        </div>
      </div>
    </>
  );

  const className = "group block";

  if (product.href) {
    return (
      <Link href={product.href} className={className}>
        {cardInner}
      </Link>
    );
  }

  return <div className={className + " cursor-pointer"}>{cardInner}</div>;
}

/* ─── Section ───────────────────────────────────────────────────────────────── */

export function IntimateCollection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const desktopGridRef = useRef<HTMLDivElement>(null);

  // Split products into left / right columns for the mobile staggered layout
  const leftProducts = intimateProducts.filter((_, i) => i % 2 === 0);  // 0,2,4,6
  const rightProducts = intimateProducts.filter((_, i) => i % 2 !== 0); // 1,3,5,7

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const triggerOpts = {
        trigger: sectionRef.current,
        start: "top 82%",
        once: true,
      };

      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: triggerOpts,
      });

      gsap.from(headerRef.current, {
        y: 28,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: triggerOpts,
      });

      // Mobile staggered columns
      if (leftColRef.current) {
        gsap.from(Array.from(leftColRef.current.children), {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: leftColRef.current,
            start: "top 88%",
            once: true,
          },
        });
      }

      if (rightColRef.current) {
        gsap.from(Array.from(rightColRef.current.children), {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.1,
          scrollTrigger: {
            trigger: rightColRef.current,
            start: "top 88%",
            once: true,
          },
        });
      }

      // Desktop grid
      if (desktopGridRef.current) {
        gsap.from(Array.from(desktopGridRef.current.children), {
          y: 50,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: {
            trigger: desktopGridRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-36 bg-bg-elevated overflow-hidden"
    >
      {/* Large decorative background numeral */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -top-4 right-4 md:right-10 font-heading text-[22vw] md:text-[14vw] leading-none text-cream/[0.025] font-light italic"
      >
        08
      </span>

      <div className="max-w-[1400px] mx-auto px-5 md:px-10">

        {/* Divider line */}
        <div
          ref={lineRef}
          className="h-px bg-gradient-to-r from-accent/50 via-cream/8 to-transparent mb-10 md:mb-16"
        />

        {/* Section header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-16"
        >
          <div>
            <p className="text-[9px] md:text-[10px] tracking-[0.38em] uppercase text-accent-light mb-3 md:mb-4 font-body">
              Where Elegance Meets Edge
            </p>
            <h2 className="text-[2.4rem] md:text-5xl lg:text-[3.5rem] font-heading font-light text-cream leading-[1] italic">
              The Intimate Edit
            </h2>
            <div className="flex items-center gap-3 mt-3 md:mt-4">
              <div className="w-6 h-px bg-accent/40" />
              <span className="text-[8px] md:text-[9px] tracking-[0.32em] uppercase text-cream/20 font-body">
                Leather &middot; Lace &middot; Desire
              </span>
            </div>
          </div>

          <Link
            href="/collections/harness"
            className="group inline-flex items-center gap-3 text-[9px] md:text-[10px] tracking-[0.28em] uppercase text-cream/40 hover:text-cream/80 transition-colors duration-500 shrink-0 self-start md:self-auto"
          >
            Explore All
            <span className="block w-5 h-px bg-current transition-all duration-500 group-hover:w-9" />
          </Link>
        </div>

        {/* ── Mobile: staggered 2-column ──────────────────────────────────── */}
        <div className="flex gap-3 md:hidden">
          {/* Left column — starts at normal position */}
          <div ref={leftColRef} className="flex-1 flex flex-col gap-3">
            {leftProducts.map((product) => (
              <IntimateProductCard
                key={product.key}
                product={product}
                priority={product.key === "pa5" || product.key === "pd2"}
                index={intimateProducts.indexOf(product)}
              />
            ))}
          </div>

          {/* Right column — offset downward for stagger effect */}
          <div ref={rightColRef} className="flex-1 flex flex-col gap-3 mt-10">
            {rightProducts.map((product) => (
              <IntimateProductCard
                key={product.key}
                product={product}
                priority={false}
                index={intimateProducts.indexOf(product)}
              />
            ))}
          </div>
        </div>

        {/* ── Desktop: 4-column grid ──────────────────────────────────────── */}
        <div
          ref={desktopGridRef}
          className="hidden md:grid grid-cols-4 gap-5 lg:gap-6"
        >
          {intimateProducts.map((product, i) => (
            <IntimateProductCard
              key={product.key}
              product={product}
              priority={i < 4}
              index={i}
            />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-12 md:mt-16 flex items-center gap-5">
          <div className="flex-1 h-px bg-cream/6" />
          <Link
            href="/collections/lingerie-new"
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
