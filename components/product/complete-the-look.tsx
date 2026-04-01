"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/utils";
import { addItem } from "@/lib/shopify/actions";
import { useCart } from "@/providers/cart-provider";

type Props = {
  products: Product[];
  onCartAdd?: () => void;
};

function QuickAddCard({
  product,
  onCartAdd,
}: {
  product: Product;
  onCartAdd?: () => void;
}) {
  const { addCartItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange.maxVariantPrice;
  const isOnSale = parseFloat(compareAt.amount) > parseFloat(price.amount);

  const defaultVariant = product.variants.find((v) => v.availableForSale);

  async function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!defaultVariant || isAdding) return;

    setIsAdding(true);

    addCartItem({
      id: "optimistic-ctl-" + Date.now(),
      quantity: 1,
      cost: { totalAmount: defaultVariant.price },
      merchandise: {
        id: defaultVariant.id,
        title: defaultVariant.title,
        selectedOptions: defaultVariant.selectedOptions,
        product,
      },
    });

    await addItem(defaultVariant.id);
    setIsAdding(false);
    setAdded(true);
    onCartAdd?.();
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="shrink-0 w-[140px] md:w-[calc(33.333%-8px)]">
      <Link href={`/products/${product.handle}`} className="group block">
        <div className="relative aspect-[3/4] bg-bg-card overflow-hidden mb-2">
          {product.featuredImage && (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 140px, 180px"
            />
          )}
        </div>

        <p className="text-[11px] text-cream/80 leading-snug line-clamp-2 mb-1 group-hover:text-cream transition-colors">
          {product.title}
        </p>

        <div className="flex items-baseline gap-1.5">
          <span className="text-[12px] text-cream/70">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          {isOnSale && (
            <span className="text-[10px] text-cream/35 line-through">
              {formatPrice(compareAt.amount, compareAt.currencyCode)}
            </span>
          )}
        </div>
      </Link>

      {defaultVariant && (
        <button
          onClick={handleQuickAdd}
          disabled={isAdding}
          className={`w-full mt-2 py-2 text-[10px] tracking-[0.2em] uppercase font-medium border transition-all duration-300 ${
            added
              ? "bg-[#5C4033] text-white border-[#5C4033]"
              : "border-cream/20 text-cream/70 hover:border-cream/50 hover:text-cream hover:bg-cream/5"
          }`}
        >
          {added ? "✓ Added" : isAdding ? "Adding..." : "Quick Add"}
        </button>
      )}
    </div>
  );
}

export function CompleteTheLook({ products, onCartAdd }: Props) {
  if (!products.length) return null;

  return (
    <div className="mt-6 pt-5 border-t border-cream/8">
      <h3 className="text-[11px] tracking-[0.25em] uppercase text-cream/70 mb-4">
        Complete the Look
      </h3>

      <div className="flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory -mx-1 px-1 pb-1">
        {products.map((product) => (
          <QuickAddCard
            key={product.id}
            product={product}
            onCartAdd={onCartAdd}
          />
        ))}
      </div>
    </div>
  );
}
