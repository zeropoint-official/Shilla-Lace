"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product/product-card";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";
import type { Product } from "@/lib/shopify/types";

type Props = {
  title: string;
  subtitle?: string;
  products: Product[];
  collectionHref?: string;
};

export function FeaturedProducts({
  title,
  subtitle,
  products,
  collectionHref = "/collections",
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.from(Array.from(cards), {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!products.length) return null;

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
          </div>
          <Link
            href={collectionHref}
            className="group inline-flex items-center gap-3 text-[10px] md:text-xs tracking-[0.25em] uppercase text-cream/50 hover:text-cream transition-colors duration-400 shrink-0"
          >
            View All
            <span className="block w-6 h-px bg-current transition-all duration-400 group-hover:w-10" />
          </Link>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 lg:gap-6"
        >
          {products.slice(0, 8).map((product, i) => (
            <ProductCard
              key={product.handle}
              product={product}
              priority={i < 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
