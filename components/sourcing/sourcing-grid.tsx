"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap/config";
import { sourcingProducts, existingHarnessProducts, type SourcingProduct, type ExistingHarnessProduct } from "@/lib/sourcing-products";

export function SourcingGrid() {
  const [active, setActive] = useState<SourcingProduct | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string>("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const openLightbox = useCallback((product: SourcingProduct) => {
    setLightboxImg(product.images[0]);
    setActive(product);
  }, []);

  const closeLightbox = useCallback(() => setActive(null), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeLightbox]);

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.children) as HTMLElement[];
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <>
      <div ref={sectionRef}>
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px"
        >
          {sourcingProducts.map((product, i) => (
            <SourcingCard
              key={product.id}
              product={product}
              priority={i < 4}
              onOpen={openLightbox}
            />
          ))}
        </div>
      </div>

      {active && (
        <Lightbox
          product={active}
          currentImg={lightboxImg}
          onImgChange={setLightboxImg}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}

/* ── Card ── */
type CardProps = {
  product: SourcingProduct;
  priority: boolean;
  onOpen: (p: SourcingProduct) => void;
};

function SourcingCard({ product, priority, onOpen }: CardProps) {
  const [hoverImg, setHoverImg] = useState(product.images[0]);

  return (
    <article
      className="group bg-bg-card hover:bg-bg-elevated transition-colors duration-300 cursor-pointer"
      onClick={() => onOpen(product)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-surface">
        <Image
          src={hoverImg}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority={priority}
          unoptimized
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Thumbnail strip */}
        <div className="absolute inset-x-0 bottom-0 flex gap-px p-px bg-bg/60 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
          {product.images.slice(1).map((img, ti) => (
            <button
              key={ti}
              className="flex-1 aspect-square overflow-hidden opacity-60 hover:opacity-100 transition-opacity duration-200"
              onMouseEnter={() => setHoverImg(img)}
              onMouseLeave={() => setHoverImg(product.images[0])}
              onClick={(e) => { e.stopPropagation(); setHoverImg(img); onOpen({ ...product, images: [img, ...product.images.filter(x => x !== img)] }); }}
              aria-label={`View image ${ti + 2}`}
            >
              <Image
                src={img}
                alt=""
                width={80}
                height={80}
                className="w-full h-full object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>

        {/* Quick view pill */}
        <div className="absolute inset-x-0 bottom-10 flex justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 pointer-events-none">
          <span className="bg-cream/95 text-bg text-[9px] tracking-[0.22em] uppercase px-4 py-2 font-medium">
            Quick View
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-3.5 py-3 border-t border-cream/5">
        <p className="text-[9px] tracking-[0.2em] uppercase text-muted mb-1">
          No. {String(product.id).padStart(2, "0")} — {product.tag}
        </p>
        <h3 className="font-heading font-light text-sm text-cream/80 group-hover:text-cream transition-colors duration-300 line-clamp-2 leading-snug mb-2">
          {product.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted line-through">{product.price.original}</span>
          <span className="text-[10px] text-accent-glow">{product.price.sale}</span>
        </div>
      </div>
    </article>
  );
}

/* ── Lightbox ── */
type LightboxProps = {
  product: SourcingProduct;
  currentImg: string;
  onImgChange: (src: string) => void;
  onClose: () => void;
};

/* ── Existing Harness Section ── */
export function ExistingHarnessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeLightbox, setActiveLightbox] = useState<ExistingHarnessProduct | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string>("");

  const openLightbox = useCallback((product: ExistingHarnessProduct) => {
    setLightboxImg(product.images[0]);
    setActiveLightbox(product);
  }, []);

  const closeLightbox = useCallback(() => setActiveLightbox(null), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeLightbox]);

  useEffect(() => {
    if (activeLightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeLightbox]);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.children) as HTMLElement[];
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <>
      <div ref={sectionRef} className="mt-20 md:mt-28">
        {/* Section divider */}
        <div className="h-px bg-gradient-to-r from-cream/10 via-accent/30 to-transparent mb-10 md:mb-14" />

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-accent-light mb-2 md:mb-3">
              Existing Inventory — Harness, Wings & More
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-light text-cream leading-[1.1]">
              Products We Already Have
            </h2>
          </div>
          <p className="text-xs text-muted max-w-sm leading-relaxed">
            These pieces are currently live on our Shopify store — harness sets, facemasks, wings, and select lingerie. We plan to reshoot them with professional photography, refresh the listings, and elevate the overall presentation to match our brand direction.
          </p>
        </div>

        {/* Intent note */}
        <div className="mb-10 border border-accent/20 bg-accent/5 px-5 py-4 flex gap-4 items-start">
          <span className="text-accent-glow text-base mt-0.5 shrink-0">↻</span>
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-accent-glow mb-1.5">Action Plan</p>
            <p className="text-xs text-cream/60 leading-relaxed">
              These products are already part of our catalogue but need attention. The goal is to take new editorial-quality photos, rewrite product descriptions, and optimise sizing and variant information — bringing them up to the same standard as our new arrivals. Priority items (Aria's Lingerie Set & Aubrey's Bodysuit) are listed first.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px"
        >
          {existingHarnessProducts.map((product, i) => (
            <HarnessCard
              key={product.id}
              product={product}
              priority={i < 2}
              onOpen={openLightbox}
            />
          ))}
        </div>
      </div>

      {activeLightbox && (
        <HarnessLightbox
          product={activeLightbox}
          currentImg={lightboxImg}
          onImgChange={setLightboxImg}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}

/* ── Harness Card ── */
type HarnessCardProps = {
  product: ExistingHarnessProduct;
  priority: boolean;
  onOpen: (p: ExistingHarnessProduct) => void;
};

function HarnessCard({ product, priority, onOpen }: HarnessCardProps) {
  const [hoverImg, setHoverImg] = useState(product.images[0]);

  return (
    <article
      className="group bg-bg-card hover:bg-bg-elevated transition-colors duration-300 cursor-pointer relative"
      onClick={() => onOpen(product)}
    >
      {/* Existing badge */}
      <div className="absolute top-2.5 left-2.5 z-10">
        <span className="bg-cream/10 backdrop-blur-sm text-cream/70 text-[8px] tracking-[0.18em] uppercase px-2.5 py-1 border border-cream/15">
          In Store
        </span>
      </div>

      {/* Sale badge */}
      {product.onSale && (
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="bg-accent/80 text-bg text-[8px] tracking-[0.18em] uppercase px-2.5 py-1">
            Sale
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-surface">
        <Image
          src={hoverImg}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
          priority={priority}
          unoptimized
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Thumbnail strip */}
        {product.images.length > 1 && (
          <div className="absolute inset-x-0 bottom-0 flex gap-px p-px bg-bg/60 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out">
            {product.images.slice(1).map((img, ti) => (
              <button
                key={ti}
                className="flex-1 aspect-square overflow-hidden opacity-60 hover:opacity-100 transition-opacity duration-200"
                onMouseEnter={() => setHoverImg(img)}
                onMouseLeave={() => setHoverImg(product.images[0])}
                onClick={(e) => { e.stopPropagation(); setHoverImg(img); onOpen({ ...product, images: [img, ...product.images.filter(x => x !== img)] }); }}
                aria-label={`View image ${ti + 2}`}
              >
                <Image
                  src={img}
                  alt=""
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </button>
            ))}
          </div>
        )}

        {/* Quick view pill */}
        <div className="absolute inset-x-0 bottom-10 flex justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 pointer-events-none">
          <span className="bg-cream/95 text-bg text-[9px] tracking-[0.22em] uppercase px-4 py-2 font-medium">
            Quick View
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-3.5 py-3 border-t border-cream/5">
        <p className="text-[9px] tracking-[0.2em] uppercase text-muted mb-1">
          {product.tag} — Needs Reshooting
        </p>
        <h3 className="font-heading font-light text-sm text-cream/70 group-hover:text-cream transition-colors duration-300 line-clamp-2 leading-snug mb-2">
          {product.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-cream/50">{product.price}</span>
        </div>
      </div>
    </article>
  );
}

/* ── Harness Lightbox ── */
type HarnessLightboxProps = {
  product: ExistingHarnessProduct;
  currentImg: string;
  onImgChange: (src: string) => void;
  onClose: () => void;
};

function HarnessLightbox({ product, currentImg, onImgChange, onClose }: HarnessLightboxProps) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-bg/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <button
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center border border-cream/10 text-cream/50 hover:text-cream hover:border-cream/30 transition-colors duration-200 text-sm"
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>

      <div
        className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-6 md:gap-10 max-w-4xl w-full max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main image */}
        <div className="relative aspect-[3/4] bg-surface overflow-hidden">
          <Image
            src={currentImg}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 55vw"
            unoptimized
            priority
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center gap-5 overflow-y-auto">
          <div>
            <p className="text-[9px] tracking-[0.28em] uppercase text-accent-glow mb-1">
              {product.tag} — Currently Live
            </p>
            <h2 className="font-heading font-light text-2xl md:text-3xl text-cream leading-snug">
              {product.title}
            </h2>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-lg text-cream/70">{product.price}</span>
            {product.onSale && (
              <span className="text-[9px] tracking-[0.15em] uppercase text-accent-glow border border-accent/30 px-2 py-1">
                On Sale
              </span>
            )}
          </div>

          {/* Thumbnail row */}
          <div className="flex gap-1.5 flex-wrap">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => onImgChange(img)}
                className={`w-14 h-14 overflow-hidden border transition-all duration-200 ${
                  currentImg === img
                    ? "border-accent opacity-100"
                    : "border-cream/10 opacity-50 hover:opacity-80"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <Image
                  src={img}
                  alt=""
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </button>
            ))}
          </div>

          <div className="border-l-2 border-accent/50 pl-3 space-y-2">
            <p className="text-[11px] text-muted leading-relaxed">
              This product is already live on the Shilla Lace store. The plan is to take new professional editorial photos, rewrite the product description, and improve the overall listing quality.
            </p>
          </div>

          <a
            href={`https://919c07.myshopify.com/products/${product.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase text-cream/60 hover:text-cream border border-cream/10 hover:border-cream/30 px-5 py-3 transition-colors duration-300 w-fit"
          >
            View on Shopify
            <span className="text-xs">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Original Lightbox ── */
function Lightbox({ product, currentImg, onImgChange, onClose }: LightboxProps) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-bg/95 backdrop-blur-xl"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center border border-cream/10 text-cream/50 hover:text-cream hover:border-cream/30 transition-colors duration-200 text-sm"
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>

      <div
        className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-6 md:gap-10 max-w-4xl w-full max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main image */}
        <div className="relative aspect-[3/4] bg-surface overflow-hidden">
          <Image
            src={currentImg}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 55vw"
            unoptimized
            priority
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center gap-5 overflow-y-auto">
          <div>
            <p className="text-[9px] tracking-[0.28em] uppercase text-accent-glow mb-3">
              No. {String(product.id).padStart(2, "0")} — {product.tag}
            </p>
            <h2 className="font-heading font-light text-2xl md:text-3xl text-cream leading-snug">
              {product.title}
            </h2>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-sm text-muted line-through">{product.price.original}</span>
            <span className="text-lg text-accent-glow">{product.price.sale}</span>
          </div>

          {/* Thumbnail row */}
          <div className="flex gap-1.5 flex-wrap">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => onImgChange(img)}
                className={`w-14 h-14 overflow-hidden border transition-all duration-200 ${
                  currentImg === img
                    ? "border-accent opacity-100"
                    : "border-cream/10 opacity-50 hover:opacity-80"
                }`}
                aria-label={`View image ${i + 1}`}
              >
                <Image
                  src={img}
                  alt=""
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </button>
            ))}
          </div>

          <p className="text-[11px] text-muted leading-relaxed border-l-2 border-accent/50 pl-3">
            Prices shown are approximate AliExpress retail rates in EUR.
            Actual wholesale pricing may differ.
          </p>

          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase text-cream/60 hover:text-cream border border-cream/10 hover:border-cream/30 px-5 py-3 transition-colors duration-300 w-fit"
          >
            View on AliExpress
            <span className="text-xs">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
