"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap/config";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const headingLine1Ref = useRef<HTMLSpanElement>(null);
  const headingLine2Ref = useRef<HTMLSpanElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
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

      tl.from(taglineRef.current, { y: 20, opacity: 0, duration: 0.8 }, 0.3)
        .from(
          headingLine1Ref.current,
          { y: 80, opacity: 0, duration: 1.1 },
          0.5
        )
        .from(
          headingLine2Ref.current,
          { y: 80, opacity: 0, duration: 1.1 },
          0.65
        )
        .from(
          dividerRef.current,
          { scaleX: 0, duration: 1, ease: "power3.out" },
          0.8
        )
        .from(ctaRef.current, { y: 30, opacity: 0, duration: 0.9 }, 1.0)
        .from(scrollIndicatorRef.current, { opacity: 0, duration: 1 }, 1.5);

      const scrollTriggerBase = {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };

      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: scrollTriggerBase,
      });

      gsap.to(overlayRef.current, {
        opacity: 0.92,
        ease: "none",
        scrollTrigger: scrollTriggerBase,
      });

      gsap.to(contentRef.current, {
        yPercent: -40,
        opacity: 0,
        ease: "none",
        scrollTrigger: scrollTriggerBase,
      });

      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        yPercent: 80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "20% top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[70svh] sm:h-[85svh] lg:h-[100svh] min-h-[480px] max-h-[720px] sm:max-h-none flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background image layer — negative inset gives room for yPercent parallax */}
      <div ref={imageRef} className="absolute inset-0 -top-[8%] -bottom-[8%] will-change-transform">
        <Image
          src="/SL-Hero-BG.png"
          alt="Shilla Lace — lingerie editorial in rain with red light"
          fill
          className="object-cover object-[48%_30%] sm:object-[center_20%] lg:object-top"
          priority
          sizes="100vw"
          quality={80}
        />
      </div>

      {/* Grain texture overlay */}
      <div className="grain-overlay absolute inset-0 z-[3] pointer-events-none" />

      {/* Gradient overlay layer */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15"
      />

      {/* Content layer */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 text-center will-change-transform mt-[10vh] sm:mt-0"
      >
        <p
          ref={taglineRef}
          className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white mb-4 sm:mb-5 md:mb-7 font-body font-medium"
        >
          Buy 2, Get 1 Free — Sitewide
        </p>

        <h1 className="font-heading font-light text-cream leading-[0.9] mb-0">
          <span
            ref={headingLine1Ref}
            className="block text-[clamp(2.6rem,8vw,7.5rem)]"
          >
            Unleash
          </span>
          <span
            ref={headingLine2Ref}
            className="block text-[clamp(2.6rem,8vw,7.5rem)] italic text-cream/80"
          >
            Your Desire
          </span>
        </h1>

        <div
          ref={dividerRef}
          className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-accent-light to-transparent mx-auto my-5 sm:my-6 md:my-8 origin-center"
        />

        <div ref={ctaRef} className="flex flex-col items-center sm:flex-row gap-3 justify-center">
          <Link
            href="/collections/lingerie-new"
            className="group relative inline-flex items-center justify-center h-12 sm:h-13 w-full max-w-[260px] sm:w-auto sm:max-w-none sm:px-12 bg-accent text-cream text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase overflow-hidden transition-all duration-500 hover:bg-accent-light"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_0.8s_ease-in-out]" />
            <span className="relative z-10">Shop Now</span>
          </Link>
          <Link
            href="/collections/newin"
            className="group relative inline-flex items-center justify-center h-12 sm:h-13 w-full max-w-[260px] sm:w-auto sm:max-w-none sm:px-12 border border-cream/20 text-cream text-[10px] sm:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase overflow-hidden transition-all duration-500 hover:border-cream/50 hover:bg-cream/5"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_0.8s_ease-in-out]" />
            <span className="relative z-10">New Arrivals</span>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 sm:gap-3 will-change-transform"
      >
        <span className="text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-cream/40 font-body">
          Scroll
        </span>
        <div
          className="w-px h-7 sm:h-10 bg-cream/15 relative overflow-hidden origin-top"
          style={{ animation: "line-grow 1.5s ease-out forwards" }}
        >
          <div className="absolute top-0 w-full h-1/3 bg-accent animate-[scrollPulse_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
