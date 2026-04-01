"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative h-svh w-full overflow-hidden">
      {/* Desktop */}
      <Image
        src="/Collection/bg-web.png"
        alt="Shilla Lace editorial"
        fill
        priority
        quality={85}
        className={`hidden md:block object-cover object-center transition-transform duration-[1.8s] ease-out ${
          loaded ? "scale-100" : "scale-105"
        }`}
        sizes="100vw"
      />
      {/* Mobile */}
      <Image
        src="/Collection/bg-mobile.webp"
        alt="Shilla Lace editorial"
        fill
        priority
        quality={85}
        className={`md:hidden object-cover object-center transition-transform duration-[1.8s] ease-out ${
          loaded ? "scale-100" : "scale-105"
        }`}
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />

      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="max-w-[1400px] w-full mx-auto px-5 md:px-10 pb-16 md:pb-20">
          <div className="max-w-xl">
            <div
              className={`flex items-center gap-3 mb-4 transition-all duration-700 delay-300 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="w-6 h-px bg-accent" />
              <p className="text-[11px] tracking-[0.35em] uppercase text-white/60">
                New Collection
              </p>
            </div>
            <h1
              className={`font-heading text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] text-white font-light mb-6 transition-all duration-700 delay-500 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Redefining
              <br />
              Intimacy
            </h1>
            <p
              className={`text-sm md:text-base text-white/70 leading-relaxed mb-8 max-w-sm transition-all duration-700 delay-700 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Luxurious lingerie crafted for confidence and individuality.
            </p>
            <div
              className={`flex items-center gap-4 transition-all duration-700 delay-[900ms] ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Link
                href="/collections/lingerie-new"
                className="bg-accent text-white px-8 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-accent-light transition-colors"
              >
                Shop Now
              </Link>
              <Link
                href="/collections/newin"
                className="text-[11px] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors border-b border-white/30 pb-0.5"
              >
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-[1100ms] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-px h-8 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white/60 animate-[scrollPulse_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
