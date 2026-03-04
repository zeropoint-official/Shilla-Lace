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

function ProductCard({ product }: { product: PromoProduct }) {
  const inner = (
    <>
      <div className="relative aspect-[3/4] bg-bg-card overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
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
      <Link href={product.href} className="group block">
        {inner}
      </Link>
    );
  }

  return (
    <div className="group block cursor-pointer">
      {inner}
    </div>
  );
}

export function PromotionalGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const bannerContentRef = useRef<HTMLDivElement>(null);
  const gridHeaderRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      gsap.from(gridHeaderRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridHeaderRef.current,
          start: "top 88%",
          once: true,
        },
      });

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.from(Array.from(cards), {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: gridRef.current,
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

      {/* ── PART 2: Product Grid ── */}
      <div className="relative py-14 md:py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div
            ref={gridHeaderRef}
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
            <Link
              href="/collections/lingerie-new"
              className="group inline-flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-cream/40 hover:text-cream transition-colors duration-500"
            >
              View All
              <span className="block w-5 h-px bg-current transition-all duration-400 group-hover:w-8" />
            </Link>
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5"
          >
            {curatedProducts.map((product) => (
              <ProductCard key={product.key} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
