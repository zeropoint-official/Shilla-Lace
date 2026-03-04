"use client";

import { useRef, useEffect, useState } from "react";
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
    key: "sp-1",
    title: sourcingProducts[0].title,
    price: sourcingProducts[0].price.sale,
    compareAt: sourcingProducts[0].price.original,
    image: sourcingProducts[0].images[0],
    tag: sourcingProducts[0].tag,
    unoptimized: true,
  },
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
  {
    key: "ex-3",
    title: existingHarnessProducts[2].title,
    price: existingHarnessProducts[2].price,
    image: existingHarnessProducts[2].images[0],
    href: `/products/${existingHarnessProducts[2].handle}`,
    tag: existingHarnessProducts[2].tag,
    unoptimized: true,
  },
  {
    key: "sp-4",
    title: sourcingProducts[3].title,
    price: sourcingProducts[3].price.sale,
    compareAt: sourcingProducts[3].price.original,
    image: sourcingProducts[3].images[0],
    tag: sourcingProducts[3].tag,
    unoptimized: true,
  },
  {
    key: "sp-7",
    title: sourcingProducts[6].title,
    price: sourcingProducts[6].price.sale,
    compareAt: sourcingProducts[6].price.original,
    image: sourcingProducts[6].images[0],
    tag: sourcingProducts[6].tag,
    unoptimized: true,
  },
];

function ScrollProductCard({ product }: { product: PromoProduct }) {
  const inner = (
    <>
      <div className="relative aspect-[3/4] bg-bg-card overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 55vw, (max-width: 1024px) 30vw, 20vw"
          unoptimized={product.unoptimized}
        />
        <span className="absolute top-2.5 left-2.5 bg-bg/60 backdrop-blur-sm text-cream/70 text-[8px] tracking-[0.15em] uppercase px-2 py-0.5 border border-cream/8">
          {product.tag}
        </span>
        {product.compareAt && (
          <span className="absolute top-2.5 right-2.5 bg-accent/90 text-cream text-[8px] tracking-[0.12em] uppercase px-2 py-0.5">
            Sale
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_ease-in-out] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <span className="block bg-cream/90 text-bg text-center py-2 text-[9px] tracking-[0.2em] uppercase font-medium">
            {product.href ? "Shop Now" : "Coming Soon"}
          </span>
        </div>
      </div>
      <div className="mt-2.5">
        <h4 className="text-[11px] md:text-xs text-cream/70 tracking-wide line-clamp-1 group-hover:text-cream transition-colors duration-300">
          {product.title}
        </h4>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[11px] text-cream">{product.price}</span>
          {product.compareAt && (
            <span className="text-[9px] text-muted line-through">
              {product.compareAt}
            </span>
          )}
        </div>
      </div>
    </>
  );

  if (product.href) {
    return (
      <Link
        href={product.href}
        className="group block flex-shrink-0 w-[52vw] sm:w-[38vw] md:w-[22vw] lg:w-[18vw] snap-start"
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className="group block flex-shrink-0 w-[52vw] sm:w-[38vw] md:w-[22vw] lg:w-[18vw] snap-start cursor-pointer">
      {inner}
    </div>
  );
}

export function PromotionalGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const bannerContentRef = useRef<HTMLDivElement>(null);
  const scrollHeaderRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollTrackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    if (progressRef.current) {
      const progress = el.scrollLeft / (el.scrollWidth - el.clientWidth);
      progressRef.current.style.width = `${Math.max(10, progress * 100)}%`;
    }
  };

  const scrollBy = (direction: "left" | "right") => {
    const el = scrollTrackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({
      left: direction === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = scrollTrackRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollState, { passive: true });
      updateScrollState();
      return () => el.removeEventListener("scroll", updateScrollState);
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(bannerRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "top -20%",
          scrub: true,
        },
      });

      const contentChildren = bannerContentRef.current?.children;
      if (contentChildren) {
        gsap.from(Array.from(contentChildren), {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: bannerContentRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      gsap.from(scrollHeaderRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: scrollHeaderRef.current,
          start: "top 88%",
          once: true,
        },
      });

      const cards = scrollTrackRef.current?.children;
      if (cards) {
        gsap.from(Array.from(cards), {
          x: 80,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: scrollTrackRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-bg">
      {/* ── PART 1: Full-Width Split Banner ── */}
      <div className="relative h-[75vh] md:h-[70vh] min-h-[500px] overflow-hidden">
        <div ref={bannerRef} className="absolute inset-0 scale-[1.35]">
          <Image
            src="/Upscaled/upscalemedia-transformed (3).png"
            alt="Curated collection editorial"
            fill
            className="object-cover"
            sizes="100vw"
            quality={80}
            priority
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
        <div className="grain-overlay absolute inset-0 pointer-events-none" />

        <div className="relative h-full flex items-center">
          <div
            ref={bannerContentRef}
            className="max-w-[1400px] mx-auto px-5 md:px-10 w-full"
          >
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-px bg-accent" />
                <span className="text-[9px] tracking-[0.4em] uppercase text-accent-light font-body">
                  New Season
                </span>
              </div>

              <h2 className="font-heading text-[clamp(2.2rem,6vw,4.5rem)] text-cream font-light leading-[1.05] mb-5">
                Unveil Your
                <br />
                <span className="italic text-cream/70">Dark Side</span>
              </h2>

              <p className="text-xs md:text-sm text-cream/35 leading-relaxed max-w-sm mb-8">
                Explore our newest arrivals — where bold leather meets delicate
                lace in an unapologetic celebration of desire.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/collections/lingerie-new"
                  className="group relative inline-flex items-center justify-center h-12 px-10 bg-accent text-cream text-[10px] tracking-[0.25em] uppercase overflow-hidden transition-all duration-500 hover:bg-accent-light"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_0.8s_ease-in-out]" />
                  <span className="relative z-10">Shop New In</span>
                </Link>
                <Link
                  href="/collections/harness"
                  className="group inline-flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-cream/40 hover:text-cream transition-colors duration-500"
                >
                  View Harness
                  <span className="block w-5 h-px bg-current transition-all duration-400 group-hover:w-8" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PART 2: Horizontal Product Scroll ── */}
      <div className="relative py-14 md:py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div
            ref={scrollHeaderRef}
            className="flex items-end justify-between mb-8 md:mb-10"
          >
            <div>
              <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent-light mb-2">
                Handpicked
              </p>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-light text-cream">
                Curated Picks
              </h3>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => scrollBy("left")}
                disabled={!canScrollLeft}
                className="w-10 h-10 border border-cream/10 flex items-center justify-center text-cream/30 hover:text-cream hover:border-cream/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
                aria-label="Scroll left"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>
              </button>
              <button
                onClick={() => scrollBy("right")}
                disabled={!canScrollRight}
                className="w-10 h-10 border border-cream/10 flex items-center justify-center text-cream/30 hover:text-cream hover:border-cream/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300"
                aria-label="Scroll right"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollTrackRef}
          className="flex gap-3 md:gap-4 overflow-x-auto hide-scrollbar pb-4 snap-x snap-mandatory pl-5 md:pl-[max(1.25rem,calc((100vw-1400px)/2+2.5rem))]"
          onScroll={updateScrollState}
        >
          {curatedProducts.map((product) => (
            <ScrollProductCard key={product.key} product={product} />
          ))}
          <Link
            href="/collections/lingerie-new"
            className="flex-shrink-0 w-[52vw] sm:w-[38vw] md:w-[22vw] lg:w-[18vw] snap-start flex items-center justify-center aspect-[3/4] bg-bg-card border border-cream/5 hover:border-accent/20 transition-all duration-500 group"
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full border border-cream/10 flex items-center justify-center group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-500">
                <svg
                  className="w-5 h-5 text-cream/30 group-hover:text-cream transition-colors duration-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </div>
              <span className="text-[10px] tracking-[0.25em] uppercase text-cream/30 group-hover:text-cream/60 transition-colors duration-500">
                View All
              </span>
            </div>
          </Link>
          <div className="flex-shrink-0 w-5 md:w-10" aria-hidden />
        </div>

        {/* Progress bar */}
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 mt-6">
          <div className="h-px bg-cream/8 relative overflow-hidden">
            <div
              ref={progressRef}
              className="absolute inset-y-0 left-0 bg-accent/50 transition-[width] duration-200"
              style={{ width: "10%" }}
            />
          </div>
        </div>
      </div>

    </section>
  );
}
