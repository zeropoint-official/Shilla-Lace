"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/shopify/types";

type Props = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: Props) {
  const { featuredImage, title, handle, priceRange, compareAtPriceRange } =
    product;

  const price = priceRange.minVariantPrice;
  const compareAtPrice = compareAtPriceRange?.minVariantPrice;
  const isOnSale =
    compareAtPrice &&
    parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

  const discount = isOnSale
    ? Math.round(
        ((parseFloat(compareAtPrice.amount) - parseFloat(price.amount)) /
          parseFloat(compareAtPrice.amount)) *
          100
      )
    : 0;

  return (
    <Link href={`/products/${handle}`} className="group block">
      <div className="relative aspect-[3/4] bg-bg-card overflow-hidden mb-3 md:mb-4">
        {featuredImage && (
          <Image
            src={featuredImage.url}
            alt={featuredImage.altText || title}
            fill
            className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
          />
        )}
        {isOnSale && (
          <span className="absolute top-2.5 left-2.5 md:top-3 md:left-3 bg-accent text-cream text-[9px] md:text-[10px] tracking-[0.12em] uppercase px-2 py-1">
            -{discount}%
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
        {title}
      </h3>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs md:text-sm text-cream">
          {formatPrice(price.amount, price.currencyCode)}
        </span>
        {isOnSale && (
          <span className="text-[10px] md:text-xs text-muted line-through">
            {formatPrice(compareAtPrice.amount, compareAtPrice.currencyCode)}
          </span>
        )}
      </div>
    </Link>
  );
}
