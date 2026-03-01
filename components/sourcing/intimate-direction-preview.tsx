"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap/config";
import { sourcingProducts } from "@/lib/sourcing-products";

const IMG = {
  cathedral: "/new-images/hf_20260301_160728_55f3801f-5acd-4c94-afe1-8855de5fa092.png",
  mirror: "/new-images/hf_20260301_160752_3835e060-b6c9-4c73-8348-0f3b9b10bd26.png",
  penthouse: "/new-images/hf_20260301_160802_34dfab70-6246-4dda-ad30-c1a4d2ca1ffc.png",
  harnessCity: "/new-images/hf_20260301_160802_e01bf680-ad26-448c-8fae-73efed01ff39.png",
  neonSmoke: "/new-images/hf_20260301_160406_da1b0293-f84a-4aa6-b2f1-361172c94da0.png",
};

const categories = [
  {
    title: "Lingerie",
    href: "/collections/lingerie",
    image: IMG.neonSmoke,
  },
  {
    title: "Bodysuits",
    href: "/collections/bodysuits",
    image: "/images/hf_20260225_215639_adc584a5-26db-4bc0-bb3b-29678b0318ce.png",
  },
  {
    title: "Harness",
    href: "/collections/harness",
    image: IMG.harnessCity,
  },
  {
    title: "Accessories",
    href: "/collections/harness",
    image: "/images/hf_20260226_004824_25082f57-8124-4376-b20c-d92f1f8ecb0c.png",
  },
];

type MixedProduct = {
  key: string;
  title: string;
  price: string;
  compareAt?: string;
  image: string;
  href?: string;
  unoptimized?: boolean;
};

const mixedProducts: MixedProduct[] = [
  {
    key: "pa5",
    title: "Isabella's Lingerie Set",
    price: "$33.99",
    compareAt: "$49.99",
    image: "/PA5.avif",
    href: "/products/isabellas-lingerie-set",
  },
  {
    key: "s9",
    title: sourcingProducts[8].title,
    price: sourcingProducts[8].price.sale,
    compareAt: sourcingProducts[8].price.original,
    image: sourcingProducts[8].images[0],
    unoptimized: true,
  },
  {
    key: "pd2",
    title: "Delilah's Lingerie Set",
    price: "$44.99",
    image: "/PD2.avif",
    href: "/products/delilahs-lingerie-set",
  },
  {
    key: "s11",
    title: sourcingProducts[10].title,
    price: sourcingProducts[10].price.sale,
    compareAt: sourcingProducts[10].price.original,
    image: sourcingProducts[10].images[0],
    unoptimized: true,
  },
  {
    key: "s8",
    title: sourcingProducts[7].title,
    price: sourcingProducts[7].price.sale,
    compareAt: sourcingProducts[7].price.original,
    image: sourcingProducts[7].images[0],
    unoptimized: true,
  },
  {
    key: "pc2",
    title: "Celine's Lingerie Set",
    price: "$44.99",
    image: "/PC2.avif",
    href: "/products/celines-lingerie-set",
  },
  {
    key: "s10",
    title: sourcingProducts[9].title,
    price: sourcingProducts[9].price.sale,
    compareAt: sourcingProducts[9].price.original,
    image: sourcingProducts[9].images[0],
    unoptimized: true,
  },
  {
    key: "pe5",
    title: "Ariana's Lingerie Set",
    price: "$39.99",
    image: "/PE5.avif",
    href: "/products/arianas-lingerie-set",
  },
];

export function IntimateDirectionPreview() {
  return (
    <div className="mt-20 md:mt-28">
      <HeroSection />
      <CollectionGrid />
      <EditorialSplit />
      <FeaturedProductsSection />
      <BrandStatement />
    </div>
  );
}

/* ─── 1. Hero ─── */
function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const h1aRef = useRef<HTMLSpanElement>(null);
  const h1bRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.15 });

      tl.from(imageRef.current, { scale: 1.25, duration: 2, ease: "power3.out" })
        .from(taglineRef.current, { y: 20, opacity: 0, duration: 0.8 }, 0.6)
        .from(h1aRef.current, { y: 80, opacity: 0, duration: 1.1 }, 0.8)
        .from(h1bRef.current, { y: 80, opacity: 0, duration: 1.1 }, 0.95)
        .from(ctaRef.current, { y: 30, opacity: 0, duration: 0.9 }, 1.4)
        .from(scrollRef.current, { opacity: 0, duration: 1 }, 1.8);

      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(overlayRef.current, {
        opacity: 0.85,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[600px] -mx-5 md:-mx-10 flex items-end md:items-center overflow-hidden bg-black"
    >
      <div ref={imageRef} className="absolute inset-0 scale-[1.01]">
        <Image
          src={IMG.cathedral}
          alt="Shilla Lace intimate collection"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={75}
        />
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-10 pb-20 md:pb-0">
        <div className="max-w-xl">
          <p
            ref={taglineRef}
            className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-accent-light mb-4 md:mb-6 font-body font-medium"
          >
            The Intimate Collection
          </p>

          <h2 className="font-heading font-light text-cream leading-[0.92] mb-6 md:mb-8">
            <span ref={h1aRef} className="block text-[clamp(2.8rem,8vw,6.5rem)]">
              Dare to
            </span>
            <span ref={h1bRef} className="block text-[clamp(2.8rem,8vw,6.5rem)] italic text-cream/80">
              Be Desired
            </span>
          </h2>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/collections/harness"
              className="group relative inline-flex items-center justify-center h-13 px-10 bg-accent text-cream text-[11px] tracking-[0.25em] uppercase overflow-hidden transition-all duration-500 hover:bg-accent-light"
            >
              <span className="relative z-10">Shop the Collection</span>
            </Link>
            <Link
              href="/collections/lingerie-new"
              className="inline-flex items-center justify-center h-13 px-10 border border-cream/20 text-cream text-[11px] tracking-[0.25em] uppercase transition-all duration-500 hover:border-cream/50 hover:bg-cream/5"
            >
              Explore All
            </Link>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-cream/40 font-body">
          Scroll
        </span>
        <div
          className="w-px h-10 bg-cream/15 relative overflow-hidden origin-top"
          style={{ animation: "line-grow 1.5s ease-out forwards" }}
        >
          <div className="absolute top-0 w-full h-1/3 bg-accent animate-[scrollPulse_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}

/* ─── 2. Shop by Category ─── */
function CollectionGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
      });

      const items = gridRef.current?.children;
      if (items) {
        gsap.from(Array.from(items), {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 -mx-5 md:-mx-10 bg-bg-elevated">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div ref={headerRef} className="text-center mb-10 md:mb-14">
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent-light mb-2 md:mb-3">
            Collections
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-cream">
            Shop by Category
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3.5">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group relative overflow-hidden aspect-[3/4]"
            >
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent group-hover:from-black/80 transition-all duration-500" />
              <div className="absolute inset-0 border border-cream/0 group-hover:border-cream/10 transition-colors duration-500" />
              <div className="absolute bottom-0 inset-x-0 p-4 md:p-5">
                <h3 className="font-heading text-lg md:text-xl lg:text-2xl text-cream font-light mb-0.5">
                  {cat.title}
                </h3>
                <div className="flex items-center gap-2 text-cream/40 group-hover:text-cream/70 transition-colors duration-500">
                  <span className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase">
                    Shop Now
                  </span>
                  <svg
                    className="w-3 h-3 translate-x-0 group-hover:translate-x-1 transition-transform duration-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Editorial Split ─── */
function EditorialSplit() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });

      const children = textRef.current?.children;
      if (children) {
        gsap.from(Array.from(children), {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: textRef.current, start: "top 85%", once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <div ref={imageRef} className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={IMG.mirror}
            alt="Shilla Lace intimate editorial"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div ref={textRef} className="lg:pl-6">
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent-light mb-4">
            The Intimate Edit
          </p>

          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream font-light leading-[1.1] mb-6 md:mb-8">
            Where Elegance
            <br />
            <span className="italic text-cream/60">Meets Edge</span>
          </h2>

          <p className="text-xs md:text-sm text-cream/40 leading-relaxed mb-4 md:mb-5 max-w-lg">
            Leather meets lace. Harnesses paired with silk. Designed for the
            woman who wants to feel powerful, not just beautiful — lingerie
            that commands a room.
          </p>

          <p className="text-xs md:text-sm text-cream/40 leading-relaxed mb-8 md:mb-10 max-w-lg">
            Every piece is crafted with the same premium attention to detail
            you expect from Shilla Lace, now channelled through a bolder,
            more intimate lens.
          </p>

          <Link
            href="/collections/harness"
            className="inline-flex items-center gap-3 text-[10px] md:text-xs tracking-[0.25em] uppercase text-cream/50 hover:text-cream transition-colors duration-400 group"
          >
            Shop Intimate
            <span className="block w-6 h-px bg-current transition-all duration-400 group-hover:w-10" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── 4. Featured Products (mix of bestsellers + new) ─── */
function FeaturedProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
      });

      gsap.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
      });

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.from(Array.from(cards), {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32">
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
            Most Loved
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light text-cream leading-[1.1]">
            Bestsellers
          </h2>
        </div>
        <Link
          href="/collections/lingerie-new"
          className="group inline-flex items-center gap-3 text-[10px] md:text-xs tracking-[0.25em] uppercase text-cream/50 hover:text-cream transition-colors duration-400 shrink-0"
        >
          View All
          <span className="block w-6 h-px bg-current transition-all duration-400 group-hover:w-10" />
        </Link>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 lg:gap-6"
      >
        {mixedProducts.map((product, i) => (
          <ProductCard key={product.key} product={product} priority={i < 4} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  priority,
}: {
  product: MixedProduct;
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
        {product.compareAt && (
          <span className="absolute top-2.5 left-2.5 md:top-3 md:left-3 bg-accent text-cream text-[9px] md:text-[10px] tracking-[0.12em] uppercase px-2 py-1">
            Sale
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <span className="block bg-cream/95 text-bg text-center py-2.5 text-[10px] tracking-[0.2em] uppercase font-medium backdrop-blur-sm">
            Quick View
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

  return <div className="group block">{inner}</div>;
}

/* ─── 5. Brand Statement with CTA ─── */
function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      const children = contentRef.current?.children;
      if (children) {
        gsap.from(Array.from(children), {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: { trigger: contentRef.current, start: "top 80%", once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative -mx-5 md:-mx-10 h-[80vh] md:h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden"
    >
      <div ref={imageRef} className="absolute inset-0 scale-110">
        <Image
          src={IMG.penthouse}
          alt="Shilla Lace brand"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40" />

      <div
        ref={contentRef}
        className="relative z-10 text-center px-5 md:px-10 max-w-2xl mx-auto"
      >
        <p className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-accent-light mb-4 md:mb-6 font-body font-medium">
          Shilla Lace
        </p>
        <h2 className="font-heading text-[clamp(2rem,5vw,4.5rem)] italic text-cream font-light leading-[1.1] mb-6 md:mb-8">
          Confidence Is Worn,
          <br />
          Not Just Felt
        </h2>
        <p className="text-xs md:text-sm text-cream/40 leading-relaxed max-w-lg mx-auto mb-8 md:mb-10">
          From lace to leather, every Shilla Lace piece is designed to make you
          feel undeniably powerful. Explore the full collection and find the set
          that speaks to you.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/collections/lingerie-new"
            className="inline-flex items-center justify-center h-13 px-10 bg-accent text-cream text-[11px] tracking-[0.25em] uppercase transition-all duration-500 hover:bg-accent-light"
          >
            Shop All Lingerie
          </Link>
          <Link
            href="/collections/harness"
            className="inline-flex items-center justify-center h-13 px-10 border border-cream/20 text-cream text-[11px] tracking-[0.25em] uppercase transition-all duration-500 hover:border-cream/50 hover:bg-cream/5"
          >
            Shop Harness
          </Link>
        </div>
      </div>
    </section>
  );
}
