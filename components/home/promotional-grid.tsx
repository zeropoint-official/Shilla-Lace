"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";
import {
  sourcingProducts,
  existingHarnessProducts,
} from "@/lib/sourcing-products";

type PromoProduct = {
  key: string;
  title: string;
  price: string;
  compareAt?: string;
  image: string;
  href?: string;
  tag: string;
  unoptimized?: boolean;
};

const curatedProducts: PromoProduct[] = [
  {
    key: "ex-1",
    title: existingHarnessProducts[0].title,
    price: existingHarnessProducts[0].price,
    image: existingHarnessProducts[0].images[0],
    href: `/products/${existingHarnessProducts[0].handle}`,
    tag: existingHarnessProducts[0].tag,
    unoptimized: true,
  },
  {
    key: "sp-2",
    title: sourcingProducts[1].title,
    price: sourcingProducts[1].price.sale,
    compareAt: sourcingProducts[1].price.original,
    image: sourcingProducts[1].images[0],
    tag: sourcingProducts[1].tag,
    unoptimized: true,
  },
  {
    key: "sp-5",
    title: sourcingProducts[4].title,
    price: sourcingProducts[4].price.sale,
    compareAt: sourcingProducts[4].price.original,
    image: sourcingProducts[4].images[0],
    tag: sourcingProducts[4].tag,
    unoptimized: true,
  },
  {
    key: "ex-2",
    title: existingHarnessProducts[1].title,
    price: existingHarnessProducts[1].price,
    image: existingHarnessProducts[1].images[0],
    href: `/products/${existingHarnessProducts[1].handle}`,
    tag: existingHarnessProducts[1].tag,
    unoptimized: true,
  },
  {
    key: "sp-3",
    title: sourcingProducts[2].title,
    price: sourcingProducts[2].price.sale,
    compareAt: sourcingProducts[2].price.original,
    image: sourcingProducts[2].images[0],
    tag: sourcingProducts[2].tag,
    unoptimized: true,
  },
  {
    key: "sp-6",
    title: sourcingProducts[5].title,
    price: sourcingProducts[5].price.sale,
    compareAt: sourcingProducts[5].price.original,
    image: sourcingProducts[5].images[0],
    tag: sourcingProducts[5].tag,
    unoptimized: true,
  },
];

/* ─── Curated product card ───────────────────────────────────────────────── */

function CuratedCard({ product }: { product: PromoProduct }) {
  const inner = (
    <>
      <div className="relative aspect-[3/4] bg-bg-card overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.05]"
          sizes="(max-width: 640px) 50vw, 33vw"
          unoptimized={product.unoptimized}
        />
        {/* Tag */}
        <span className="absolute top-3 left-3 text-[7px] tracking-[0.18em] uppercase text-cream/55 font-body">
          {product.tag}
        </span>
        {/* Sale dot */}
        {product.compareAt && (
          <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-accent flex items-center justify-center text-[6px] uppercase text-white font-body tracking-wide">
            Sale
          </span>
        )}
        {/* Hover reveal */}
        <div className="absolute inset-x-0 bottom-0 h-14 flex items-end pb-3.5 px-3.5 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-[8px] tracking-[0.22em] uppercase text-cream/80 font-body">
            {product.href ? "Shop Now" : "Coming Soon"}
          </span>
          <span className="ml-auto block w-4 h-px bg-cream/50" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:animate-[shimmer_1.2s_ease-in-out] pointer-events-none" />
      </div>
      <div className="pt-2.5">
        <h4 className="text-[10px] md:text-xs text-cream/65 tracking-wide line-clamp-1 group-hover:text-cream/90 transition-colors duration-400 font-body">
          {product.title}
        </h4>
        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-xs md:text-sm text-cream font-body">{product.price}</span>
          {product.compareAt && (
            <span className="text-[9px] text-muted line-through font-body">
              {product.compareAt}
            </span>
          )}
        </div>
      </div>
    </>
  );

  if (product.href) {
    return <Link href={product.href} className="group block">{inner}</Link>;
  }
  return <div className="group block cursor-pointer">{inner}</div>;
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export function PromotionalGrid() {
  const sectionRef    = useRef<HTMLElement>(null);
  const bannerRef     = useRef<HTMLDivElement>(null);  // image parallax layer
  const taglineRef    = useRef<HTMLParagraphElement>(null);
  const heading1Ref   = useRef<HTMLSpanElement>(null);
  const heading2Ref   = useRef<HTMLSpanElement>(null);
  const ctaRef        = useRef<HTMLDivElement>(null);
  const gridHeaderRef = useRef<HTMLDivElement>(null);
  const gridLeftRef   = useRef<HTMLDivElement>(null);
  const gridRightRef  = useRef<HTMLDivElement>(null);
  const desktopGridRef = useRef<HTMLDivElement>(null);

  // Mobile staggered columns
  const mobileLeft  = curatedProducts.filter((_, i) => i % 2 === 0);
  const mobileRight = curatedProducts.filter((_, i) => i % 2 !== 0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      /* Parallax on the image layer */
      gsap.to(bannerRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      /* Banner text entrance */
      const bannerTrigger = {
        trigger: taglineRef.current,
        start: "top 85%",
        once: true,
      };

      gsap.from(taglineRef.current, {
        y: 20, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: bannerTrigger,
      });
      gsap.from(heading1Ref.current, {
        y: 60, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.1,
        scrollTrigger: bannerTrigger,
      });
      gsap.from(heading2Ref.current, {
        y: 60, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.22,
        scrollTrigger: bannerTrigger,
      });
      gsap.from(ctaRef.current, {
        y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 0.38,
        scrollTrigger: bannerTrigger,
      });

      /* Curated grid header */
      gsap.from(gridHeaderRef.current, {
        y: 28, opacity: 0, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: gridHeaderRef.current,
          start: "top 88%",
          once: true,
        },
      });

      /* Desktop grid cards */
      if (desktopGridRef.current) {
        gsap.from(Array.from(desktopGridRef.current.children), {
          y: 45, opacity: 0, duration: 0.85, ease: "power3.out", stagger: 0.09,
          scrollTrigger: {
            trigger: desktopGridRef.current,
            start: "top 88%",
            once: true,
          },
        });
      }

      /* Mobile staggered cols */
      if (gridLeftRef.current) {
        gsap.from(Array.from(gridLeftRef.current.children), {
          y: 40, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: gridLeftRef.current, start: "top 92%", once: true },
        });
      }
      if (gridRightRef.current) {
        gsap.from(Array.from(gridRightRef.current.children), {
          y: 40, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.1, delay: 0.08,
          scrollTrigger: { trigger: gridRightRef.current, start: "top 92%", once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-bg">

      {/* ════════════════════════════════════════════════════════════════════
          PART 1 — Cinematic Banner
      ════════════════════════════════════════════════════════════════════ */}
      <div className="relative h-[85svh] md:h-[90svh] min-h-[560px] overflow-hidden">

        {/* Parallax image layer — oversized to allow travel */}
        <div
          ref={bannerRef}
          className="absolute inset-0 -top-[12%] -bottom-[12%] will-change-transform"
        >
          <Image
            src="/Upscaled/upscalemedia-transformed.png"
            alt="Shilla Lace — dark lace editorial in rain"
            fill
            className="object-cover object-center"
            sizes="100vw"
            quality={85}
            priority
          />
        </div>

        {/* Grain */}
        <div className="grain-overlay absolute inset-0 z-[3] pointer-events-none opacity-50" />

        {/* Overlays — very light, the image is already cinematic */}
        {/* Bottom fade into bg */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent z-[2]" />
        {/* Subtle top darkening */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent z-[2]" />
        {/* Left vignette on desktop — text readability */}
        <div
          className="absolute inset-0 z-[2] hidden md:block"
          style={{ background: "linear-gradient(to right, rgba(8,6,6,0.60) 0%, rgba(8,6,6,0.20) 40%, transparent 65%)" }}
        />
        {/* Mobile — bottom-heavy darkening */}
        <div
          className="absolute inset-0 z-[2] md:hidden"
          style={{ background: "linear-gradient(to top, rgba(8,6,6,0.85) 0%, rgba(8,6,6,0.30) 45%, transparent 70%)" }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex items-end md:items-center">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full pb-14 md:pb-0">

            {/* Mobile: centered bottom | Desktop: left-aligned mid */}
            <div className="text-center md:text-left max-w-none md:max-w-lg">

              <p
                ref={taglineRef}
                className="inline-flex items-center gap-3 text-[8px] md:text-[9px] tracking-[0.42em] uppercase text-cream/45 mb-5 md:mb-7 font-body"
              >
                <span className="block w-5 h-px bg-accent/60 hidden md:block" />
                New Season · 2025
              </p>

              <h2 className="font-heading font-light leading-[0.88] mb-0">
                <span
                  ref={heading1Ref}
                  className="block text-[clamp(3rem,8.5vw,7rem)] text-cream"
                >
                  Unveil Your
                </span>
                <span
                  ref={heading2Ref}
                  className="block text-[clamp(3rem,8.5vw,7rem)] italic text-cream/65 md:pl-[0.06em]"
                >
                  Dark Side
                </span>
              </h2>

              {/* Thin divider */}
              <div className="w-8 h-px bg-gradient-to-r from-accent/70 to-transparent mx-auto md:mx-0 my-6 md:my-8" />

              <div
                ref={ctaRef}
                className="flex flex-col sm:flex-row items-center md:items-start gap-3 justify-center md:justify-start"
              >
                <Link
                  href="/collections/lingerie-new"
                  className="group relative inline-flex items-center justify-center h-11 px-9 bg-accent text-white text-[9px] tracking-[0.25em] uppercase overflow-hidden transition-all duration-700 hover:bg-accent-light w-full sm:w-auto max-w-[220px] sm:max-w-none"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:animate-[shimmer_0.9s_ease-in-out]" />
                  <span className="relative z-10">Shop New In</span>
                </Link>
                <Link
                  href="/collections/harness"
                  className="group inline-flex items-center gap-2.5 text-[9px] tracking-[0.25em] uppercase text-cream/40 hover:text-cream/80 transition-colors duration-500 font-body"
                >
                  View Harness
                  <span className="block w-5 h-px bg-current transition-all duration-500 group-hover:w-8" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative vertical text — right edge, desktop only */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-4">
          <span className="text-[7px] tracking-[0.35em] uppercase text-cream/20 font-body [writing-mode:vertical-rl]">
            Shilla Lace · 2025
          </span>
          <div className="w-px h-16 bg-cream/10" />
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          PART 2 — Curated Picks Grid
      ════════════════════════════════════════════════════════════════════ */}
      <div className="relative py-20 md:py-28 lg:py-32 bg-bg-elevated overflow-hidden">

        {/* Decorative background numeral */}
        <span
          aria-hidden
          className="pointer-events-none select-none absolute -top-4 right-4 md:right-10 font-heading text-[22vw] md:text-[14vw] leading-none text-cream/[0.025] font-light italic"
        >
          06
        </span>

        <div className="max-w-[1400px] mx-auto px-5 md:px-10">

          {/* Header */}
          <div
            ref={gridHeaderRef}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10 md:mb-16"
          >
            <div>
              <p className="text-[9px] md:text-[10px] tracking-[0.38em] uppercase text-accent-light mb-3 font-body">
                Handpicked
              </p>
              <h3 className="text-[2.4rem] md:text-5xl lg:text-[3.5rem] font-heading font-light text-cream leading-[1] italic">
                Curated Picks
              </h3>
              <div className="flex items-center gap-3 mt-3">
                <div className="w-6 h-px bg-accent/40" />
                <span className="text-[8px] tracking-[0.32em] uppercase text-cream/20 font-body">
                  Selected for you
                </span>
              </div>
            </div>
            <Link
              href="/collections/lingerie-new"
              className="group inline-flex items-center gap-3 text-[9px] md:text-[10px] tracking-[0.28em] uppercase text-cream/40 hover:text-cream/80 transition-colors duration-500 shrink-0 self-start md:self-auto font-body"
            >
              View All
              <span className="block w-5 h-px bg-current transition-all duration-500 group-hover:w-9" />
            </Link>
          </div>

          {/* Desktop: 3-column grid */}
          <div
            ref={desktopGridRef}
            className="hidden md:grid grid-cols-3 gap-5 lg:gap-6"
          >
            {curatedProducts.map((product) => (
              <CuratedCard key={product.key} product={product} />
            ))}
          </div>

          {/* Mobile: staggered 2-column */}
          <div className="flex gap-3 md:hidden">
            <div ref={gridLeftRef} className="flex-1 flex flex-col gap-3">
              {mobileLeft.map((product) => (
                <CuratedCard key={product.key} product={product} />
              ))}
            </div>
            <div ref={gridRightRef} className="flex-1 flex flex-col gap-3 mt-10">
              {mobileRight.map((product) => (
                <CuratedCard key={product.key} product={product} />
              ))}
            </div>
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
      </div>
    </section>
  );
}
