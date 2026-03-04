"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";

export function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const elements = contentRef.current?.children;
      if (elements) {
        gsap.from(Array.from(elements), {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/klaviyo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/new-images/hf_20260301_160802_34dfab70-6246-4dda-ad30-c1a4d2ca1ffc.png"
          alt=""
          fill
          className="object-cover object-top opacity-25"
          sizes="100vw"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/90 to-bg/80" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 max-w-xl mx-auto px-5 text-center"
      >
        <div className="flex items-center justify-center gap-4 mb-5">
          <div className="w-10 h-px bg-accent/40" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-accent-light font-body">
            Exclusive Access
          </span>
          <div className="w-10 h-px bg-accent/40" />
        </div>

        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream font-light mb-3">
          Get 10% Off
        </h2>

        <p className="text-xs md:text-sm text-cream/40 tracking-wide mb-6 max-w-md mx-auto">
          Join our inner circle for early access to new collections,
          members-only offers, and style inspiration.
        </p>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8 text-[10px] md:text-[11px] text-cream/30 tracking-wide">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-accent-light/50" />
            Early access to drops
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-accent-light/50" />
            Exclusive deals
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-accent-light/50" />
            Style guides
          </span>
        </div>

        {status === "success" ? (
          <div className="py-4">
            <div className="w-8 h-8 mx-auto mb-3 rounded-full border border-accent-light/50 flex items-center justify-center">
              <svg className="w-4 h-4 text-accent-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="text-accent-light text-xs tracking-wide">
              Welcome to the club! Check your email for your discount code.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-transparent border border-cream/10 px-5 py-3.5 text-xs text-cream placeholder:text-cream/20 focus:outline-none focus:border-accent/50 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="group relative bg-accent text-cream px-8 py-3.5 text-[10px] tracking-[0.2em] uppercase overflow-hidden hover:bg-accent-light transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_0.8s_ease-in-out]" />
              <span className="relative z-10">
                {status === "loading" ? "..." : "Subscribe"}
              </span>
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-accent-glow text-[10px] mt-3">
            Something went wrong. Please try again.
          </p>
        )}

        <p className="text-[9px] text-cream/15 mt-5 tracking-wide">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
