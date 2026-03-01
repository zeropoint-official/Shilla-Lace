import { Suspense } from "react";
import { getCollectionProducts } from "@/lib/shopify";
import { HeroSection } from "@/components/home/hero-section";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { BrandStory } from "@/components/home/brand-story";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { ProductGridSkeleton } from "@/components/ui/skeletons";

export const dynamic = "force-dynamic";

async function BestsellersLoader() {
  try {
    const products = await getCollectionProducts({
      collection: "lingerie-new",
      sortKey: "BEST_SELLING",
    });
    if (!products.length) return null;
    return (
      <FeaturedProducts
        products={products.slice(0, 8)}
        title="Bestsellers"
        subtitle="Most loved"
        collectionHref="/collections/lingerie-new"
      />
    );
  } catch (e) {
    console.error("Failed to load bestsellers:", e);
    return null;
  }
}

export default async function HomePage() {
  return (
    <>
      <HeroSection />

      <Suspense fallback={<ProductGridSkeleton />}>
        <BestsellersLoader />
      </Suspense>

      <CategoryGrid />

      <BrandStory />

      <NewsletterSection />
    </>
  );
}
