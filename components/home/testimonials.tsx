"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";

const testimonials = [
  {
    id: 1,
    name: "Sophie M.",
    location: "London, UK",
    rating: 5,
    text: "The quality exceeded my expectations. The lace is so delicate yet feels luxurious against the skin. I've never felt more confident.",
    product: "Isabella's Lingerie Set",
    verified: true,
  },
  {
    id: 2,
    name: "Elena R.",
    location: "Milan, IT",
    rating: 5,
    text: "Shilla Lace has become my go-to. The attention to detail in every piece is remarkable — from stitching to packaging, everything is impeccable.",
    product: "Ariel's Harness Set",
    verified: true,
  },
  {
    id: 3,
    name: "Amara K.",
    location: "New York, US",
    rating: 5,
    text: "I ordered the bodysuit for a special occasion and it was absolutely stunning. The fit was perfect and the discreet packaging was a lovely touch.",
    product: "Aubrey's Bodysuit",
    verified: true,
  },
  {
    id: 4,
    name: "Chloé D.",
    location: "Paris, FR",
    rating: 5,
    text: "Finally found lingerie that makes me feel both elegant and daring. The leather and lace combination is to die for. Will be ordering more.",
    product: "Quinn's Harness Set",
    verified: true,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${i < rating ? "text-accent-light" : "text-cream/10"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: isMobile ? 15 : 30,
        opacity: 0,
        duration: isMobile ? 0.5 : 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 98%" : "top 85%",
          once: true,
        },
      });

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.from(Array.from(cards), {
          y: isMobile ? 20 : 50,
          opacity: 0,
          duration: isMobile ? 0.4 : 0.8,
          ease: "power3.out",
          stagger: isMobile ? 0.06 : 0.12,
          scrollTrigger: {
            trigger: gridRef.current,
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
        <div ref={headerRef} className="text-center mb-10 md:mb-14">
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent-light mb-2 md:mb-3">
            Customer Love
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-cream">
            What They Say
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="group relative bg-bg-card border border-cream/5 p-6 md:p-7 hover:border-cream/10 transition-colors duration-500"
            >
              {/* Quote mark */}
              <span className="absolute top-4 right-5 font-heading text-5xl text-accent/15 leading-none select-none">
                &ldquo;
              </span>

              <StarRating rating={t.rating} />

              <p className="text-xs md:text-sm text-cream/50 leading-relaxed mt-4 mb-5">
                {t.text}
              </p>

              <div className="h-px bg-cream/5 mb-4" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-cream/80 font-medium">
                    {t.name}
                  </p>
                  <p className="text-[10px] text-cream/30 mt-0.5">
                    {t.location}
                  </p>
                </div>
                {t.verified && (
                  <span className="inline-flex items-center gap-1 text-[9px] tracking-[0.15em] uppercase text-accent-light/70">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verified
                  </span>
                )}
              </div>

              <p className="text-[10px] text-cream/20 mt-3 italic">
                Purchased: {t.product}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
