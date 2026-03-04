"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";

const slides = [
  {
    image: "/Upscaled/upscalemedia-transformed (1).png",
    label: "The Boudoir Edit",
    alt: "Red lace lingerie in a candlelit boudoir setting",
  },
  {
    image: "/Upscaled/upscalemedia-transformed (5).png",
    label: "After Hours",
    alt: "Red lace lingerie with dramatic side lighting",
  },
  {
    image: "/Upscaled/upscalemedia-transformed (6).png",
    label: "The Red Collection",
    alt: "Red lace lingerie with warm studio lighting",
  },
];

export function EditorialStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(labelRef.current, {
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

      const items = stripRef.current?.children;
      if (items) {
        gsap.from(Array.from(items), {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: stripRef.current,
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
        <div ref={labelRef} className="text-center mb-10 md:mb-14">
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent-light mb-2 md:mb-3">
            Lookbook
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-cream italic">
            Set the Mood
          </h2>
        </div>

        <div
          ref={stripRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-3"
        >
          {slides.map((slide) => (
            <div
              key={slide.label}
              className="group relative overflow-hidden aspect-[16/10] md:aspect-[4/5] cursor-pointer"
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={75}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-700" />

              {/* Hover label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-8 h-px bg-accent-light mb-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                <span className="text-cream text-sm md:text-base tracking-[0.25em] uppercase font-heading font-light">
                  {slide.label}
                </span>
                <div className="w-8 h-px bg-accent-light mt-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
