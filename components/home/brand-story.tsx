"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        y: isMobile ? 20 : 60,
        opacity: 0,
        duration: isMobile ? 0.5 : 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 98%" : "top 80%",
          once: true,
        },
      });

      const textElements = textRef.current?.children;
      if (textElements) {
        gsap.from(Array.from(textElements), {
          y: isMobile ? 15 : 40,
          opacity: 0,
          duration: isMobile ? 0.4 : 0.8,
          ease: "power3.out",
          stagger: isMobile ? 0.06 : 0.12,
          scrollTrigger: {
            trigger: textRef.current,
            start: isMobile ? "top 98%" : "top 85%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/Upscaled/upscalemedia-transformed (1).png"
              alt="Shilla Lace — candlelit red lace editorial"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={75}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/30 to-transparent" />
          </div>

          <div ref={textRef} className="lg:pl-6">
            <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent-light mb-4">
              Our Story
            </p>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream font-light leading-[1.1] mb-6 md:mb-8">
              Celebrating Confidence
              <br />
              <span className="italic text-cream/60">Since 2021</span>
            </h2>

            {/* Pull quote */}
            <blockquote className="relative pl-5 border-l-2 border-accent/40 mb-6 md:mb-8">
              <p className="font-heading text-lg md:text-xl lg:text-2xl italic text-cream/60 leading-relaxed">
                &ldquo;Every woman deserves to feel beautiful, powerful,
                and unapologetically herself.&rdquo;
              </p>
            </blockquote>

            <p className="text-xs md:text-sm text-cream/40 leading-relaxed mb-4 md:mb-5 max-w-lg">
              Founded in 2021, Shilla Lace is dedicated to celebrating
              confidence and embracing individuality. Each piece in our
              collection is thoughtfully designed to empower women to express
              their sensuality with elegance and style.
            </p>

            <p className="text-xs md:text-sm text-cream/40 leading-relaxed mb-8 md:mb-10 max-w-lg">
              From delicate lace to bold leather, every creation is crafted
              to make every moment an experience of beauty, passion, and
              unapologetic self-expression.
            </p>

            <Link
              href="/pages/about-shilla-lace"
              className="inline-flex items-center gap-3 text-[10px] md:text-xs tracking-[0.25em] uppercase text-cream/50 hover:text-cream transition-colors duration-400 group"
            >
              Learn More
              <span className="block w-6 h-px bg-current transition-all duration-400 group-hover:w-10" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
