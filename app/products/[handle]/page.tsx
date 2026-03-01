import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, getProductRecommendations } from "@/lib/shopify";
import { ProductDetail } from "@/components/product/product-detail";
import { BenefitsBar } from "@/components/product/benefits-bar";
import { WhyShillaLace } from "@/components/product/why-shilla-lace";
import { RecommendedProducts } from "@/components/product/recommended-products";
import { ProductGridSkeleton } from "@/components/ui/skeletons";
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

async function Recommendations({ productId }: { productId: string }) {
  const products = await getProductRecommendations(productId);
  if (!products.length) return null;
  return <RecommendedProducts products={products.slice(0, 8)} />;
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) notFound();

  return (
    <>
      <ProductJsonLd product={product} />

      <ProductDetail product={product} />

      <BenefitsBar />

      <WhyShillaLace />

      <Suspense fallback={<ProductGridSkeleton count={4} />}>
        <Recommendations productId={product.id} />
      </Suspense>
    </>
  );
}
