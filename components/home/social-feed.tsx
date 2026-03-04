"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";

const feedImages = [
  {
    src: "/Upscaled/upscalemedia-transformed (1).png",
    alt: "Boudoir editorial with candles",
  },
  {
    src: "/Upscaled/upscalemedia-transformed (4).png",
    alt: "Lingerie with neon ring",
  },
  {
    src: "/new-images/hf_20260301_160728_55f3801f-5acd-4c94-afe1-8855de5fa092.png",
    alt: "Cathedral harness editorial",
  },
  {
    src: "/Upscaled/upscalemedia-transformed (5).png",
    alt: "Red lace reclining",
  },
  {
    src: "/new-images/hf_20260301_160802_e01bf680-ad26-448c-8fae-73efed01ff39.png",
    alt: "Harness with city skyline",
  },
  {
    src: "/Upscaled/upscalemedia-transformed (6).png",
    alt: "Red lace studio shot",
  },
];

export function SocialFeed() {
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
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-28">
      <div ref={headerRef} className="text-center mb-8 md:mb-12 px-5">
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent-light mb-2 md:mb-3">
          Follow the Journey
        </p>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-light text-cream">
          @ShillaLace
        </h2>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-1.5"
      >
        {feedImages.map((img) => (
          <a
            key={img.src}
            href="https://instagram.com/shillalace"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 768px) 33vw, 16.6vw"
              quality={60}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-400 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-400 scale-75 group-hover:scale-100"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
