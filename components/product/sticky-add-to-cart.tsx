"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { Product, ProductVariant } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/utils";
import { addItem } from "@/lib/shopify/actions";
import { useCart } from "@/providers/cart-provider";

type Props = {
  product: Product;
  selectedVariant: ProductVariant | undefined;
};

export function StickyAddToCart({ product, selectedVariant }: Props) {
  const { addCartItem } = useCart();
  const [visible, setVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleAdd() {
    if (!selectedVariant || !selectedVariant.availableForSale) return;

    setIsAdding(true);
    addCartItem({
      id: "optimistic-sticky-" + Date.now(),
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
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-bg-elevated/95 backdrop-blur-xl border-t border-cream/5 py-3 px-4 md:px-6 lg:hidden">
      <div className="flex items-center gap-3">
        {product.featuredImage && (
          <div className="relative w-11 h-11 bg-bg-card overflow-hidden shrink-0">
            <Image
              src={product.featuredImage.url}
              alt={product.title}
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-cream/70 truncate">{product.title}</p>
          {selectedVariant && (
            <p className="text-xs text-cream">
              {formatPrice(
                selectedVariant.price.amount,
                selectedVariant.price.currencyCode
              )}
            </p>
          )}
        </div>
        <button
          onClick={handleAdd}
          disabled={!selectedVariant?.availableForSale || isAdding}
          className="bg-accent text-cream px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase hover:bg-accent-light transition-colors disabled:opacity-40 shrink-0"
        >
          {isAdding ? "..." : "Add"}
        </button>
      </div>
    </div>
  );
}
