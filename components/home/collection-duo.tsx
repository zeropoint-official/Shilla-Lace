"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";

const collections = [
  {
    title: "Lingerie",
    subtitle: "Timeless Elegance",
    href: "/collections/lingerie",
    image: "/Collection/lingerie.png",
  },
  {
    title: "Bodysuits",
    subtitle: "Bold & Sculpted",
    href: "/collections/bodysuits",
    image: "/Collection/bodysuit.png",
  },
  {
    title: "Stockings",
    subtitle: "Sheer Elegance",
    href: "/collections/cro-stockings",
    image: "/Collection/stocking.png",
  },
  {
    title: "Harness",
    subtitle: "Daring & Refined",
    href: "/collections/harness",
    image: "/Collection/harness.png",
  },
];

export function CollectionGrid() {
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 md:py-24 bg-bg">
      <div className="max-w-[1400px] mx-auto">
        <div
          className={`text-center mb-8 md:mb-12 px-5 md:px-10 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-accent mb-2">
            Shop by Category
          </p>
          <h2 className="font-heading text-[clamp(1.8rem,3.5vw,3rem)] leading-[1] text-cream font-light">
            Our Collections
          </h2>
        </div>

        {/* Mobile: horizontal scroll / Desktop: 4-col grid */}
        <div
          className={`transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Mobile scroll */}
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 pb-4 hide-scrollbar md:hidden">
            {collections.map((collection) => (
              <Link
                key={collection.href}
                href={collection.href}
                className="group relative snap-start shrink-0 w-[72vw] max-w-[300px] block aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="72vw"
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/45 mb-1">
                    {collection.subtitle}
                  </p>
                  <h3 className="font-heading text-xl text-white font-light mb-3">
                    {collection.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-white/60 group-hover:text-white transition-colors">
                    <span className="w-4 h-px bg-accent group-hover:w-6 transition-all duration-300" />
                    Explore
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-4 gap-4 px-5 md:px-10">
            {collections.map((collection, i) => (
              <Link
                key={collection.href}
                href={collection.href}
                className={`group relative block aspect-[3/4] overflow-hidden transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: visible ? `${250 + i * 100}ms` : "0ms" }}
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="25vw"
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-white/45 mb-1">
                    {collection.subtitle}
                  </p>
                  <h3 className="font-heading text-2xl text-white font-light mb-3">
                    {collection.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-white/60 group-hover:text-white transition-colors">
                    <span className="w-4 h-px bg-accent group-hover:w-6 transition-all duration-300" />
                    Explore
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
