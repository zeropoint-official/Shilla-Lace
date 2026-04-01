"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap/config";

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-5 h-5">
        <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
    label: "Premium Lace",
    desc: "Imported stretch lace that softly contours every curve without restriction.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-5 h-5">
        <path d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
      </svg>
    ),
    label: "Adjustable Fit",
    desc: "Fully adjustable straps and multi-hook closure for a perfectly tailored silhouette.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-5 h-5">
        <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
    label: "Body-Kind Construction",
    desc: "Smooth, no-scratch edges with soft-touch elastics — comfort you'll feel all day.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-5 h-5">
        <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    label: "Complete Set",
    desc: "Arrives as a fully coordinated set — every piece designed to work together perfectly.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-5 h-5">
        <path d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
      </svg>
    ),
    label: "Luxury Packaging",
    desc: "Gift-ready presentation in signature Shilla Lace packaging — perfect to give or keep.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-5 h-5">
        <path d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
        <path d="M6 6h.008v.008H6V6Z" />
      </svg>
    ),
    label: "Quality Assured",
    desc: "Every piece passes individual inspection before leaving our atelier.",
  },
];

export function ProductFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: "top 82%", once: true };

      gsap.from(lineRef.current,  { scaleX: 0, transformOrigin: "left center", duration: 1.4, ease: "power3.out", scrollTrigger: trigger });
      gsap.from(headerRef.current, { y: 28, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: trigger });

      if (gridRef.current) {
        gsap.from(Array.from(gridRef.current.children), {
          y: 40, opacity: 0, duration: 0.85, ease: "power3.out", stagger: 0.08,
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-bg overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">

        <div ref={lineRef} className="h-px bg-gradient-to-r from-accent/50 via-cream/8 to-transparent mb-10 md:mb-16" />

        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
          <div>
            <p className="text-[9px] tracking-[0.38em] uppercase text-accent-light mb-3 font-body">
              Craftsmanship
            </p>
            <h2 className="text-[2.2rem] md:text-5xl font-heading font-light text-cream leading-[1] italic">
              The Details
            </h2>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-6 h-px bg-accent/40" />
              <span className="text-[8px] tracking-[0.32em] uppercase text-cream/20 font-body">
                Made with intention
              </span>
            </div>
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/5">
          {features.map((f) => (
            <div
              key={f.label}
              className="group bg-bg p-7 md:p-8 flex flex-col gap-4 hover:bg-bg-elevated transition-colors duration-500"
            >
              <div className="w-10 h-10 border border-cream/8 flex items-center justify-center text-accent-light group-hover:border-accent/30 transition-colors duration-500">
                {f.icon}
              </div>
              <div>
                <h3 className="text-[11px] md:text-xs tracking-[0.22em] uppercase text-cream/80 mb-2 font-body">
                  {f.label}
                </h3>
                <p className="text-[12px] md:text-[13px] text-cream/40 leading-relaxed font-body">
                  {f.desc}
                </p>
              </div>
              {/* Subtle bottom accent on hover */}
              <div className="mt-auto pt-4 w-0 h-px bg-accent/50 group-hover:w-8 transition-all duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
