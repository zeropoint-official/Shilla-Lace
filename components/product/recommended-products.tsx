"use client";

import { useRef, useEffect } from "react";
import type { Product } from "@/lib/shopify/types";
import { ProductCard } from "./product-card";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";

type Props = {
  products: Product[];
};

export function RecommendedProducts({ products }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.7,
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
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 88%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!products.length) return null;

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div ref={headerRef} className="mb-8 md:mb-12">
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent-light mb-2">
            You May Also Like
          </p>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl text-cream font-light">
            Complete the Look
          </h2>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div
          ref={gridRef}
          className="flex md:grid md:grid-cols-4 gap-3 md:gap-5 overflow-x-auto md:overflow-visible hide-scrollbar snap-x snap-mandatory md:snap-none -mx-5 px-5 md:mx-0 md:px-0"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="shrink-0 w-[60vw] md:w-auto snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
