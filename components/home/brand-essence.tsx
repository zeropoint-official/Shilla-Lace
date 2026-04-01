"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

export function BrandEssence() {
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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-surface">
      <div className="max-w-[700px] mx-auto px-5 md:px-10 text-center">
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="w-10 h-px bg-accent mx-auto mb-8" />
          <h2 className="font-heading text-[clamp(1.6rem,3.5vw,2.5rem)] leading-[1.2] text-cream font-light italic mb-6">
            &ldquo;Every piece is an invitation to feel extraordinary in your own skin.&rdquo;
          </h2>
          <p className="text-sm text-cream/50 leading-relaxed mb-8 max-w-md mx-auto">
            Shilla Lace is built on the belief that luxury lingerie should celebrate every body. Our designs blend European craftsmanship with contemporary elegance.
          </p>
          <Link
            href="/pages/about-shilla-lace"
            className="text-[10px] tracking-[0.2em] uppercase text-accent/70 hover:text-accent transition-colors border-b border-accent/25 hover:border-accent/40 pb-0.5"
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
