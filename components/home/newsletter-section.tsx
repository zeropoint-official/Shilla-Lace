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
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hf_20260226_004832_32d64824-03b2-408b-aef3-42434e5fbeef.png"
          alt=""
          fill
          className="object-cover object-top opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-bg/90" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 max-w-lg mx-auto px-5 text-center"
      >
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent-light mb-3">
          Stay Connected
        </p>

        <h2 className="font-heading text-3xl md:text-4xl text-cream font-light mb-3">
          Get 10% Off
        </h2>

        <p className="text-xs text-cream/35 tracking-wide mb-8">
          Subscribe for exclusive access to new arrivals, special offers, and
          Shilla Lace news.
        </p>

        {status === "success" ? (
          <p className="text-accent-light text-xs tracking-wide">
            Thank you for subscribing! Check your email for your discount code.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2.5 max-w-sm mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-transparent border border-cream/10 px-4 py-3 text-xs text-cream placeholder:text-cream/20 focus:outline-none focus:border-accent/50 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-accent text-cream px-6 py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-accent-light transition-colors disabled:opacity-50 whitespace-nowrap"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-accent-glow text-[10px] mt-3">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}
