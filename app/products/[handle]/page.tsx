import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, getProductRecommendations } from "@/lib/shopify";
import { ProductPageClient } from "@/components/product/product-page-client";
import { BenefitsBar } from "@/components/product/benefits-bar";
import { RecommendedProducts } from "@/components/product/recommended-products";
import { ProductJsonLd } from "@/components/seo/product-jsonld";

export const revalidate = 60;

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) return notFound();

  const { url, width, height, altText } = product.featuredImage || {};

  return {
    title: product.seo?.title || product.title,
    description:
      product.seo?.description || product.description?.slice(0, 160),
    openGraph: url
      ? {
          images: [
            {
              url,
              width: width || 1200,
              height: height || 630,
              alt: altText || product.title,
            },
          ],
        }
      : undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) notFound();

  const recommendations = await getProductRecommendations(product.id);
  const completeTheLook = recommendations.slice(0, 3);
  const moreProducts = recommendations.slice(3, 11);

  return (
    <>
      <ProductJsonLd product={product} />

      <ProductPageClient product={product} completeTheLook={completeTheLook} />

      <BenefitsBar />

      {moreProducts.length > 0 && (
        <RecommendedProducts products={moreProducts} />
      )}
    </>
  );
}
