"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";
import { sourcingProducts } from "@/lib/sourcing-products";

type IntimateProduct = {
  key: string;
  title: string;
  price: string;
  compareAt?: string;
  image: string;
  href?: string;
  tag: string;
  unoptimized?: boolean;
};

const intimateProducts: IntimateProduct[] = [
  {
    key: "pa5",
    title: "Isabella's Lingerie Set",
    price: "$33.99",
    compareAt: "$49.99",
    image: "/PA5.avif",
    href: "/products/isabellas-lingerie-set",
    tag: "Lingerie Set",
  },
  {
    key: "s9",
    title: sourcingProducts[8].title,
    price: sourcingProducts[8].price.sale,
    compareAt: sourcingProducts[8].price.original,
    image: sourcingProducts[8].images[0],
    tag: sourcingProducts[8].tag,
    unoptimized: true,
  },
  {
    key: "pd2",
    title: "Delilah's Lingerie Set",
    price: "$44.99",
    image: "/PD2.avif",
    href: "/products/delilahs-lingerie-set",
    tag: "Lingerie Set",
  },
  {
    key: "s11",
    title: sourcingProducts[10].title,
    price: sourcingProducts[10].price.sale,
    compareAt: sourcingProducts[10].price.original,
    image: sourcingProducts[10].images[0],
    tag: sourcingProducts[10].tag,
    unoptimized: true,
  },
  {
    key: "s8",
    title: sourcingProducts[7].title,
    price: sourcingProducts[7].price.sale,
    compareAt: sourcingProducts[7].price.original,
    image: sourcingProducts[7].images[0],
    tag: sourcingProducts[7].tag,
    unoptimized: true,
  },
  {
    key: "pc2",
    title: "Celine's Lingerie Set",
    price: "$44.99",
    image: "/PC2.avif",
    href: "/products/celines-lingerie-set",
    tag: "Lingerie Set",
  },
  {
    key: "s10",
    title: sourcingProducts[9].title,
    price: sourcingProducts[9].price.sale,
    compareAt: sourcingProducts[9].price.original,
    image: sourcingProducts[9].images[0],
    tag: sourcingProducts[9].tag,
    unoptimized: true,
  },
  {
    key: "pe5",
    title: "Ariana's Lingerie Set",
    price: "$39.99",
    image: "/PE5.avif",
    href: "/products/arianas-lingerie-set",
    tag: "Lingerie Set",
  },
];

function IntimateProductCard({
  product,
  priority,
}: {
  product: IntimateProduct;
  priority: boolean;
}) {
  const inner = (
    <>
      <div className="relative aspect-[3/4] bg-bg-card overflow-hidden mb-3 md:mb-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          unoptimized={product.unoptimized}
        />
        <span className="absolute top-2.5 left-2.5 md:top-3 md:left-3 bg-bg/70 backdrop-blur-sm text-cream/70 text-[8px] md:text-[9px] tracking-[0.15em] uppercase px-2 py-1 border border-cream/10">
          {product.tag}
        </span>
        {product.compareAt && (
          <span className="absolute top-2.5 right-2.5 md:top-3 md:right-3 bg-accent text-cream text-[9px] md:text-[10px] tracking-[0.12em] uppercase px-2 py-1">
            Sale
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_ease-in-out] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <span className="block bg-cream/95 text-bg text-center py-2.5 text-[10px] tracking-[0.2em] uppercase font-medium backdrop-blur-sm">
            {product.href ? "Shop Now" : "Coming Soon"}
          </span>
        </div>
      </div>
      <h3 className="text-xs md:text-sm text-cream/80 tracking-wide group-hover:text-cream transition-colors duration-300 line-clamp-1">
        {product.title}
      </h3>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs md:text-sm text-cream">{product.price}</span>
        {product.compareAt && (
          <span className="text-[10px] md:text-xs text-muted line-through">
            {product.compareAt}
          </span>
        )}
      </div>
    </>
  );

  if (product.href) {
    return (
      <Link href={product.href} className="group block">
        {inner}
      </Link>
    );
  }

  return <div className="group block cursor-pointer">{inner}</div>;
}

export function IntimateCollection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.from(Array.from(cards), {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32 bg-bg-elevated">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div
          ref={lineRef}
          className="h-px bg-gradient-to-r from-accent/60 via-cream/10 to-transparent mb-10 md:mb-14"
        />

        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14"
        >
          <div>
            <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent-light mb-2 md:mb-3">
              Where Elegance Meets Edge
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-cream leading-[1.1] italic">
              The Intimate Edit
            </h2>
            <div className="flex items-center gap-3 mt-3">
              <div className="w-8 h-px bg-accent/50" />
              <span className="text-[9px] tracking-[0.3em] uppercase text-cream/25">
                Leather &middot; Lace &middot; Desire
              </span>
            </div>
          </div>
          <Link
            href="/collections/harness"
            className="group inline-flex items-center gap-3 text-[10px] md:text-xs tracking-[0.25em] uppercase text-cream/50 hover:text-cream transition-colors duration-400 shrink-0"
          >
            Explore All
            <span className="block w-6 h-px bg-current transition-all duration-400 group-hover:w-10" />
          </Link>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 lg:gap-6"
        >
          {intimateProducts.map((product, i) => (
            <IntimateProductCard
              key={product.key}
              product={product}
              priority={i < 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
