"use client";

import type { Product } from "@/lib/shopify/types";
import { ProductDetail } from "./product-detail";
import { useCartDrawer } from "@/components/layout/layout-shell";

type Props = {
  product: Product;
  completeTheLook: Product[];
};

export function ProductPageClient({ product, completeTheLook }: Props) {
  const { openCart } = useCartDrawer();

  return (
    <ProductDetail
      product={product}
      completeTheLook={completeTheLook}
      onCartAdd={openCart}
    />
  );
}
