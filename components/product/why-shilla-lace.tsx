"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";

const valueProps = [
  {
    title: "Premium Materials",
    desc: "Crafted from the finest imported lace and silk blends for a luxurious feel against your skin.",
  },
  {
    title: "Designed to Flatter",
    desc: "Every piece is designed to accentuate your natural curves and celebrate your body.",
  },
  {
    title: "Confidence Guaranteed",
    desc: "Thousands of happy customers worldwide. Because feeling beautiful starts from within.",
  },
];

export function WhyShillaLace() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const items = contentRef.current?.children;
      if (items) {
        gsap.from(Array.from(items), {
          x: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-bg-elevated">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/hf_20260226_004729_1bc4aa49-19f7-4f37-addc-febd7d0f887a.png"
              alt="Why choose Shilla Lace"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div ref={contentRef}>
            <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent-light mb-3">
              The Shilla Difference
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-cream font-light mb-8 md:mb-10 leading-[1.1]">
              Why Women Choose
              <br />
              <span className="italic text-cream/60">Shilla Lace</span>
            </h2>

            <div className="space-y-6 md:space-y-8">
              {valueProps.map((prop, i) => (
                <div key={prop.title} className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 flex items-center justify-center border border-accent/30 text-accent-light text-[10px]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm text-cream mb-1 tracking-wide">
                      {prop.title}
                    </h3>
                    <p className="text-[11px] md:text-xs text-cream/35 leading-relaxed">
                      {prop.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social proof numbers */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-cream/5">
              <div>
                <p className="font-heading text-2xl md:text-3xl text-cream font-light">
                  15k+
                </p>
                <p className="text-[9px] text-cream/30 tracking-wide mt-0.5">
                  Happy Customers
                </p>
              </div>
              <div>
                <p className="font-heading text-2xl md:text-3xl text-cream font-light">
                  4.8
                </p>
                <p className="text-[9px] text-cream/30 tracking-wide mt-0.5">
                  Average Rating
                </p>
              </div>
              <div>
                <p className="font-heading text-2xl md:text-3xl text-cream font-light">
                  50+
                </p>
                <p className="text-[9px] text-cream/30 tracking-wide mt-0.5">
                  Countries Shipped
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
