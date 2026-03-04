"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";

export function ParallaxCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      const children = contentRef.current?.children;
      if (children) {
        gsap.from(Array.from(children), {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
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
      className="relative h-[70vh] md:h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden"
    >
      <div ref={imageRef} className="absolute inset-0 scale-[1.3]">
        <Image
          src="/Upscaled/upscalemedia-transformed (2).png"
          alt="Candlelit lingerie editorial"
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={75}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
      <div className="grain-overlay absolute inset-0 pointer-events-none" />

      <div
        ref={contentRef}
        className="relative z-10 text-center px-5 md:px-10 max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-12 h-px bg-accent/50" />
          <span className="text-[10px] tracking-[0.35em] uppercase text-accent-light font-body">
            The Art of Desire
          </span>
          <div className="w-12 h-px bg-accent/50" />
        </div>

        <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] italic text-cream font-light leading-[1.1] mb-6 md:mb-8">
          Every Piece Tells
          <br />a Story
        </h2>

        <Link
          href="/collections/lingerie-new"
          className="group relative inline-flex items-center justify-center h-13 px-12 bg-accent text-cream text-[11px] tracking-[0.25em] uppercase overflow-hidden transition-all duration-500 hover:bg-accent-light"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_0.8s_ease-in-out]" />
          <span className="relative z-10">Shop the Collection</span>
        </Link>
      </div>
    </section>
  );
}
