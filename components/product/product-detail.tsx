"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product, ProductVariant } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/utils";
import { addItem } from "@/lib/shopify/actions";
import { useCart } from "@/providers/cart-provider";
import { gsap } from "@/lib/gsap/config";
import { ChevronRightIcon } from "@/components/ui/icons";
import { SizeGuideModal } from "./size-guide-modal";
import { StickyAddToCart } from "./sticky-add-to-cart";

type Props = {
  product: Product;
};

export function ProductDetail({ product }: Props) {
  const { addCartItem } = useCart();
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(() => {
    const defaults: Record<string, string> = {};
    product.options.forEach((option) => {
      defaults[option.name] = option.values[0] || "";
    });
    return defaults;
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [imageZoom, setImageZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const infoRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (infoRef.current) {
        gsap.from(infoRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          delay: 0.2,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const selectedVariant = useMemo(() => {
    return product.variants.find((variant) =>
      variant.selectedOptions.every(
        (option) => selectedOptions[option.name] === option.value
      )
    );
  }, [product.variants, selectedOptions]);

  const isOnSale = useMemo(() => {
    if (!selectedVariant?.compareAtPrice) return false;
    return (
      parseFloat(selectedVariant.compareAtPrice.amount) >
      parseFloat(selectedVariant.price.amount)
    );
  }, [selectedVariant]);

  const discount = useMemo(() => {
    if (!isOnSale || !selectedVariant?.compareAtPrice) return 0;
    return Math.round(
      ((parseFloat(selectedVariant.compareAtPrice.amount) -
        parseFloat(selectedVariant.price.amount)) /
        parseFloat(selectedVariant.compareAtPrice.amount)) *
        100
    );
  }, [isOnSale, selectedVariant]);

  function handleOptionChange(optionName: string, value: string) {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
  }

  function isVariantAvailable(optionName: string, value: string) {
    const testOptions = { ...selectedOptions, [optionName]: value };
    return product.variants.some(
      (variant) =>
        variant.availableForSale &&
        variant.selectedOptions.every(
          (option) => testOptions[option.name] === option.value
        )
    );
  }

  async function handleAddToCart() {
    if (!selectedVariant || !selectedVariant.availableForSale) return;

    setIsAdding(true);

    addCartItem({
      id: "optimistic-" + Date.now(),
      quantity: 1,
      cost: { totalAmount: selectedVariant.price },
      merchandise: {
        id: selectedVariant.id,
        title: selectedVariant.title,
        selectedOptions: selectedVariant.selectedOptions,
        product,
      },
    });

    await addItem(selectedVariant.id);
    setIsAdding(false);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  }

  function handleImageMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  }

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStart === null) return;
      const diff = touchStart - e.changedTouches[0].clientX;
      const threshold = 50;
      if (Math.abs(diff) > threshold) {
        if (diff > 0 && selectedImageIndex < product.images.length - 1) {
          setSelectedImageIndex((p) => p + 1);
        } else if (diff < 0 && selectedImageIndex > 0) {
          setSelectedImageIndex((p) => p - 1);
        }
      }
      setTouchStart(null);
    },
    [touchStart, selectedImageIndex, product.images.length]
  );

  return (
    <>
      <div className="pt-24 md:pt-28 pb-0">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-[10px] text-cream/30 mb-5 md:mb-8">
            <Link href="/" className="hover:text-cream transition-colors">
              Home
            </Link>
            <ChevronRightIcon className="w-2.5 h-2.5" />
            <Link
              href="/collections/lingerie-new"
              className="hover:text-cream transition-colors"
            >
              Shop
            </Link>
            <ChevronRightIcon className="w-2.5 h-2.5" />
            <span className="text-cream/60 truncate max-w-[160px]">
              {product.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            {/* Image Gallery */}
            <div ref={galleryRef} className="lg:col-span-7">
              {/* Main image -- swipeable on mobile */}
              <div
                className={`relative aspect-[3/4] bg-bg-card overflow-hidden ${isTouchDevice ? "cursor-pointer" : "cursor-zoom-in"}`}
                onMouseEnter={() => { if (!isTouchDevice) setImageZoom(true); }}
                onMouseLeave={() => { if (!isTouchDevice) setImageZoom(false); }}
                onMouseMove={(e) => { if (!isTouchDevice) handleImageMouseMove(e); }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onClick={() => { if (isTouchDevice) setLightboxOpen(true); }}
              >
                {product.images[selectedImageIndex] && (
                  <Image
                    src={product.images[selectedImageIndex].url}
                    alt={
                      product.images[selectedImageIndex].altText ||
                      product.title
                    }
                    fill
                    className="object-cover transition-transform duration-300"
                    style={
                      imageZoom && !isTouchDevice
                        ? {
                            transform: "scale(2)",
                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          }
                        : undefined
                    }
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    priority
                  />
                )}
                {isOnSale && (
                  <span className="absolute top-3 left-3 md:top-4 md:left-4 bg-accent text-cream text-[9px] md:text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 z-10">
                    -{discount}%
                  </span>
                )}

                {/* Mobile image dots */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 lg:hidden">
                    {product.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImageIndex(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          i === selectedImageIndex
                            ? "bg-cream w-4"
                            : "bg-cream/30"
                        }`}
                        aria-label={`View image ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop thumbnail strip */}
              {product.images.length > 1 && (
                <div className="hidden lg:grid grid-cols-6 gap-2 mt-2">
                  {product.images.map((image, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      className={`relative aspect-square bg-bg-card overflow-hidden border transition-colors ${
                        i === selectedImageIndex
                          ? "border-accent"
                          : "border-transparent hover:border-cream/15"
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.altText || `${product.title} ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info -- sticky on desktop */}
            <div
              ref={infoRef}
              className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
            >
              {product.vendor && (
                <p className="text-[10px] tracking-[0.25em] uppercase text-accent-light mb-2">
                  {product.vendor}
                </p>
              )}

              <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl text-cream font-light mb-3">
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 mb-4">
                {selectedVariant && (
                  <>
                    <span className="text-lg md:text-xl text-cream">
                      {formatPrice(
                        selectedVariant.price.amount,
                        selectedVariant.price.currencyCode
                      )}
                    </span>
                    {isOnSale && selectedVariant.compareAtPrice && (
                      <span className="text-sm text-cream/30 line-through">
                        {formatPrice(
                          selectedVariant.compareAtPrice.amount,
                          selectedVariant.compareAtPrice.currencyCode
                        )}
                      </span>
                    )}
                    {isOnSale && (
                      <span className="text-[10px] tracking-[0.1em] uppercase text-accent-glow">
                        Save {discount}%
                      </span>
                    )}
                  </>
                )}
              </div>

              <p className="text-[10px] text-cream/25 tracking-wide mb-4">
                Tax included. Free shipping worldwide.
              </p>

              {/* Variant Selectors */}
              <div className="space-y-4 mb-4">
                {product.options.map((option) => (
                  <div key={option.id}>
                    <div className="flex items-baseline gap-2 mb-2">
                      <label className="text-[10px] tracking-[0.2em] uppercase text-cream/60">
                        {option.name}:{" "}
                        <span className="text-cream">
                          {selectedOptions[option.name]}
                        </span>
                      </label>
                      {option.name.toLowerCase() === "size" && (
                        <>
                          <span className="text-cream/10">|</span>
                          <button
                            onClick={() => setShowSizeGuide(true)}
                            className="text-[10px] text-accent-light/70 hover:text-accent-light transition-colors"
                          >
                            Size Guide
                          </button>
                        </>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {option.values.map((value) => {
                        const isSelected =
                          selectedOptions[option.name] === value;
                        const isAvailable = isVariantAvailable(
                          option.name,
                          value
                        );

                        return (
                          <button
                            key={value}
                            onClick={() =>
                              handleOptionChange(option.name, value)
                            }
                            disabled={!isAvailable}
                            className={`min-w-[44px] px-3.5 py-2 text-[10px] md:text-xs border transition-all ${
                              isSelected
                                ? "bg-cream text-bg border-cream"
                                : isAvailable
                                  ? "border-cream/15 text-cream/70 hover:border-cream/40"
                                  : "border-cream/5 text-cream/15 cursor-not-allowed line-through"
                            }`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo badge */}
              <div className="flex items-center gap-2 bg-accent/8 border border-accent/15 px-3 py-2 mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="w-3.5 h-3.5 text-accent-light shrink-0"
                >
                  <path d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                  <path d="M6 6h.008v.008H6V6Z" />
                </svg>
                <span className="text-[10px] text-cream/60 tracking-wide">
                  Buy 2, Get 1 Free — auto-applied at checkout
                </span>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale || isAdding}
                className={`w-full py-3.5 text-[11px] tracking-[0.25em] uppercase transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed ${
                  addedToCart
                    ? "bg-green-800 text-cream"
                    : "bg-accent text-cream hover:bg-accent-light"
                }`}
              >
                {!selectedVariant?.availableForSale
                  ? "Sold Out"
                  : addedToCart
                    ? "Added to Bag"
                    : isAdding
                      ? "Adding..."
                      : "Add to Bag"}
              </button>

              {/* Buy Now */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
                className="w-full mt-2 py-3.5 text-[11px] tracking-[0.25em] uppercase border border-cream/15 text-cream/60 hover:border-cream/30 hover:text-cream transition-all duration-400 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Buy It Now
              </button>

              {/* Trust badges — inline row */}
              <div className="flex items-center justify-center gap-5 mt-5 pt-4 border-t border-cream/5">
                <div className="flex items-center gap-1.5 text-cream/30">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-3.5 h-3.5">
                    <path d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                  <span className="text-[9px] tracking-wide">Free Shipping</span>
                </div>
                <div className="flex items-center gap-1.5 text-cream/30">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-3.5 h-3.5">
                    <path d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                  <span className="text-[9px] tracking-wide">Secure Checkout</span>
                </div>
                <div className="flex items-center gap-1.5 text-cream/30">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-3.5 h-3.5">
                    <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                  <span className="text-[9px] tracking-wide">Premium Quality</span>
                </div>
              </div>

              {/* Accordion details */}
              <div className="mt-6 space-y-0 border-t border-cream/5">
                <details className="group border-b border-cream/5" open>
                  <summary className="flex items-center justify-between py-3.5 cursor-pointer text-[10px] tracking-[0.2em] uppercase text-cream/60 hover:text-cream transition-colors">
                    Description
                    <ChevronRightIcon className="w-3 h-3 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="pb-4 text-xs text-cream/40 leading-relaxed">
                    {product.descriptionHtml ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product.descriptionHtml,
                        }}
                        className="prose prose-invert prose-xs prose-p:text-cream/40 prose-p:text-xs prose-p:leading-relaxed max-w-none"
                      />
                    ) : (
                      product.description
                    )}
                  </div>
                </details>
                <details className="group border-b border-cream/5">
                  <summary className="flex items-center justify-between py-3.5 cursor-pointer text-[10px] tracking-[0.2em] uppercase text-cream/60 hover:text-cream transition-colors">
                    Shipping & Returns
                    <ChevronRightIcon className="w-3 h-3 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="pb-4 text-xs text-cream/40 leading-relaxed space-y-2">
                    <p>Free worldwide shipping on all orders.</p>
                    <p>
                      Most orders arrive within 3-6 business days. You will
                      receive a tracking number once your order is processed.
                    </p>
                    <p>
                      Not the right fit? We accept returns within 14 days of
                      delivery for unworn items with original tags attached.
                    </p>
                  </div>
                </details>
                <details className="group border-b border-cream/5">
                  <summary className="flex items-center justify-between py-3.5 cursor-pointer text-[10px] tracking-[0.2em] uppercase text-cream/60 hover:text-cream transition-colors">
                    Care Instructions
                    <ChevronRightIcon className="w-3 h-3 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="pb-4 text-xs text-cream/40 leading-relaxed space-y-2">
                    <p>Hand wash in cold water with gentle detergent.</p>
                    <p>Do not bleach, tumble dry, or iron directly on lace.</p>
                    <p>Lay flat or hang to dry. Store folded, not hung.</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SizeGuideModal
        open={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />

      <StickyAddToCart product={product} selectedVariant={selectedVariant} />

      {/* Mobile fullscreen lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 p-2 text-cream/50 hover:text-cream"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
              <path d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          {product.images[selectedImageIndex] && (
            <Image
              src={product.images[selectedImageIndex].url}
              alt={product.images[selectedImageIndex].altText || product.title}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          )}
          {product.images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImageIndex(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === selectedImageIndex
                      ? "bg-cream w-5"
                      : "bg-cream/30"
                  }`}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
