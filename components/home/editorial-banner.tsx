"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

export function EditorialBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <Image
        src="/Upscaled/upscalemedia-transformed.png"
        alt="Shilla Lace collection"
        fill
        className={`object-cover transition-all duration-[1.2s] ease-out ${
          visible ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
        }`}
        sizes="100vw"
        quality={80}
      />

      <div className="absolute inset-0 bg-black/35" />

      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div
          className={`max-w-lg px-5 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/50 mb-4">
            Explore the Collection
          </p>
          <h2 className="font-heading text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-white font-light mb-6">
            Designed to Make
            <br />
            You Feel Beautiful
          </h2>
          <Link
            href="/collections/lingerie"
            className="inline-block bg-accent text-white px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-accent-light transition-colors"
          >
            Shop Lingerie
          </Link>
        </div>
      </div>
    </section>
  );
}
