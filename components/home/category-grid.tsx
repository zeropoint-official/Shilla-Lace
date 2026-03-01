"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";

type CategoryItem = {
  title: string;
  href: string;
  image: string;
};

const categories: CategoryItem[] = [
  {
    title: "Lingerie",
    href: "/collections/lingerie",
    image: "/images/hf_20260226_004747_6db1d6b2-7c1f-4f78-91ce-fd3a175908b7.png",
  },
  {
    title: "Bodysuits",
    href: "/collections/bodysuits",
    image: "/images/hf_20260225_215639_adc584a5-26db-4bc0-bb3b-29678b0318ce.png",
  },
  {
    title: "Stockings",
    href: "/collections/cro-stockings",
    image: "/images/hf_20260226_004824_25082f57-8124-4376-b20c-d92f1f8ecb0c.png",
  },
  {
    title: "Harness",
    href: "/collections/harness",
    image: "/images/hf_20260226_004832_32d64824-03b2-408b-aef3-42434e5fbeef.png",
  },
];

export function CategoryGrid() {
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

      const items = gridRef.current?.children;
      if (items) {
        gsap.from(Array.from(items), {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
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

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32 bg-bg-elevated">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div ref={headerRef} className="text-center mb-10 md:mb-14">
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent-light mb-2 md:mb-3">
            Collections
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-cream">
            Shop by Category
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3.5"
        >
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative overflow-hidden aspect-[3/4]"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 transition-all duration-500" />
              <div className="absolute inset-0 border border-cream/0 group-hover:border-cream/10 transition-colors duration-500" />
              <div className="absolute bottom-0 inset-x-0 p-4 md:p-5">
                <h3 className="font-heading text-lg md:text-xl lg:text-2xl text-cream font-light mb-0.5">
                  {cat.title}
                </h3>
                <div className="flex items-center gap-2 text-cream/40 group-hover:text-cream/70 transition-colors duration-500">
                  <span className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase">
                    Explore
                  </span>
                  <svg
                    className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform duration-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
