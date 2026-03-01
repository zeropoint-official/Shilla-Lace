"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const headingLine1Ref = useRef<HTMLSpanElement>(null);
  const headingLine2Ref = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.2,
      });

      tl.from(imageRef.current, {
        scale: 1.3,
        duration: 2,
        ease: "power3.out",
      })
        .from(
          taglineRef.current,
          { y: 20, opacity: 0, duration: 0.8 },
          0.8
        )
        .from(
          headingLine1Ref.current,
          { y: 80, opacity: 0, duration: 1.1 },
          1.0
        )
        .from(
          headingLine2Ref.current,
          { y: 80, opacity: 0, duration: 1.1 },
          1.15
        )
        .from(ctaRef.current, { y: 30, opacity: 0, duration: 0.9 }, 1.6)
        .from(
          scrollIndicatorRef.current,
          { opacity: 0, duration: 1 },
          2.0
        );

      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(overlayRef.current, {
        opacity: 0.85,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[600px] flex items-end md:items-center justify-center overflow-hidden bg-black"
    >
      <div ref={imageRef} className="absolute inset-0 scale-[1.01]">
        <Image
          src="/images/hf_20260226_004730_c535cd70-7f6a-4442-9598-13d27df08a2d.png"
          alt="Shilla Lace Lingerie"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
            quality={75}
        />
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-10 pb-20 md:pb-0">
        <div className="max-w-xl">
          <p
            ref={taglineRef}
            className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-accent-light mb-4 md:mb-6 font-body font-medium"
          >
            Buy 2, Get 1 Free — Sitewide
          </p>

          <h1 className="font-heading font-light text-cream leading-[0.92] mb-6 md:mb-8">
            <span
              ref={headingLine1Ref}
              className="block text-[clamp(2.8rem,8vw,6.5rem)]"
            >
              Unleash
            </span>
            <span
              ref={headingLine2Ref}
              className="block text-[clamp(2.8rem,8vw,6.5rem)] italic text-cream/80"
            >
              Your Desire
            </span>
          </h1>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/collections/lingerie-new"
              className="group relative inline-flex items-center justify-center h-13 px-10 bg-accent text-cream text-[11px] tracking-[0.25em] uppercase overflow-hidden transition-all duration-500 hover:bg-accent-light"
            >
              <span className="relative z-10">Shop Now</span>
            </Link>
            <Link
              href="/collections/newin"
              className="inline-flex items-center justify-center h-13 px-10 border border-cream/20 text-cream text-[11px] tracking-[0.25em] uppercase transition-all duration-500 hover:border-cream/50 hover:bg-cream/5"
            >
              New Arrivals
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-cream/40 font-body">
          Scroll
        </span>
        <div className="w-px h-10 bg-cream/15 relative overflow-hidden origin-top" style={{ animation: "line-grow 1.5s ease-out forwards" }}>
          <div className="absolute top-0 w-full h-1/3 bg-accent animate-[scrollPulse_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
