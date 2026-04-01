"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap/config";

const reviews = [
  {
    name: "Sophia R.",
    location: "New York, US",
    rating: 5,
    date: "March 2025",
    text: "Absolutely stunning. The lace quality is unlike anything I've ordered online — it feels like something from a luxury boutique. The fit was perfect and it arrived beautifully packaged. I've already ordered two more sets.",
    tag: "Verified Purchase",
    highlight: true,
  },
  {
    name: "Isabelle M.",
    location: "Paris, FR",
    rating: 5,
    date: "February 2025",
    text: "I was sceptical at first but the photos don't do it justice. The material is incredibly soft, the straps are fully adjustable and it holds everything in place perfectly. I feel like a completely different woman wearing this.",
    tag: "Verified Purchase",
    highlight: false,
  },
  {
    name: "Camila V.",
    location: "London, UK",
    rating: 5,
    date: "January 2025",
    text: "Gifted this to myself and it was the best decision. Arrived fast, packaged beautifully, and the quality is genuinely premium. The lace details are so delicate and the sizing was spot on.",
    tag: "Verified Purchase",
    highlight: false,
  },
];

function Stars({ count, size = "sm" }: { count: number; size?: "sm" | "lg" }) {
  const dim = size === "lg" ? "w-4 h-4" : "w-3 h-3";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < count ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.2}
          className={`${dim} ${i < count ? "text-accent-light" : "text-cream/15"}`}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
        </svg>
      ))}
    </div>
  );
}

export function ProductReviews() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: "top 82%", once: true };

      gsap.from(headerRef.current,  { y: 28, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: trigger });
      gsap.from(statsRef.current,   { y: 20, opacity: 0, duration: 0.9, delay: 0.15, ease: "power3.out", scrollTrigger: trigger });

      if (cardsRef.current) {
        gsap.from(Array.from(cardsRef.current.children), {
          y: 45, opacity: 0, duration: 0.85, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: cardsRef.current, start: "top 86%", once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-bg-elevated overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">

        {/* Header + aggregate stats */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 md:mb-16">

          <div ref={headerRef}>
            <p className="text-[9px] tracking-[0.38em] uppercase text-accent-light mb-3 font-body">
              Social Proof
            </p>
            <h2 className="text-[2.2rem] md:text-5xl font-heading font-light text-cream leading-[1] italic">
              Women Love It
            </h2>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-6 h-px bg-accent/40" />
              <span className="text-[8px] tracking-[0.32em] uppercase text-cream/20 font-body">
                15,000+ verified reviews
              </span>
            </div>
          </div>

          {/* Aggregate stat */}
          <div ref={statsRef} className="flex items-center gap-6 md:gap-10 shrink-0">
            <div className="text-center">
              <p className="font-heading text-[3rem] md:text-[4rem] text-cream font-light leading-none mb-1">4.8</p>
              <Stars count={5} size="sm" />
              <p className="text-[8px] tracking-[0.25em] uppercase text-cream/25 mt-1.5 font-body">Out of 5</p>
            </div>
            <div className="w-px h-16 bg-cream/8" />
            <div className="space-y-1.5">
              {[
                { stars: 5, pct: 86 },
                { stars: 4, pct: 10 },
                { stars: 3, pct: 3  },
                { stars: 2, pct: 1  },
              ].map(({ stars, pct }) => (
                <div key={stars} className="flex items-center gap-2.5">
                  <span className="text-[8px] text-cream/25 font-body w-3 text-right">{stars}</span>
                  <div className="w-20 md:w-28 h-px bg-cream/10 relative">
                    <div
                      className="absolute inset-y-0 left-0 bg-accent/60"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[8px] text-cream/25 font-body">{pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
        >
          {reviews.map((review) => (
            <div
              key={review.name}
              className={`relative p-6 md:p-7 flex flex-col gap-5 border transition-colors duration-500
                ${review.highlight
                  ? "border-accent/25 bg-accent/5"
                  : "border-cream/6 bg-bg hover:border-cream/12"}`}
            >
              {/* Quote mark */}
              <span aria-hidden className="font-heading text-[3rem] text-cream/6 leading-none absolute top-4 right-5 select-none pointer-events-none">
                "
              </span>

              {/* Stars + date */}
              <div className="flex items-center justify-between">
                <Stars count={review.rating} />
                <span className="text-[8px] tracking-[0.2em] text-cream/20 font-body">{review.date}</span>
              </div>

              {/* Review text */}
              <p className="text-[12px] md:text-[13px] text-cream/55 leading-relaxed font-body flex-1">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Reviewer info */}
              <div className="flex items-center justify-between pt-4 border-t border-cream/6">
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-cream/70 font-body">{review.name}</p>
                  <p className="text-[9px] text-cream/25 font-body mt-0.5">{review.location}</p>
                </div>
                <span className="text-[7px] tracking-[0.18em] uppercase text-accent-light border border-accent/20 px-2 py-0.5 font-body">
                  {review.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-10 md:mt-12 flex items-center gap-5">
          <div className="flex-1 h-px bg-cream/6" />
          <div className="flex items-center gap-2 text-[8px] tracking-[0.28em] uppercase text-cream/25 font-body">
            <Stars count={5} />
            <span>15,247 verified reviews worldwide</span>
          </div>
          <div className="flex-1 h-px bg-cream/6" />
        </div>

      </div>
    </section>
  );
}
