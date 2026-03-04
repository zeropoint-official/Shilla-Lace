import { Suspense } from "react";
import { getCollectionProducts } from "@/lib/shopify";
import { HeroSection } from "@/components/home/hero-section";
import { TrustBar } from "@/components/home/trust-bar";
import { FeaturedProducts } from "@/components/home/featured-products";
import { PromotionalGrid } from "@/components/home/promotional-grid";
import { BrandStory } from "@/components/home/brand-story";
import { Testimonials } from "@/components/home/testimonials";
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
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Trust / Promo Bar */}
      <TrustBar />

      {/* 3. Bestsellers Collection (Shopify) */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <BestsellersLoader />
      </Suspense>

      {/* 4. Promotional Grid — Banner + Curated Scroll + Editorial */}
      <PromotionalGrid />

      {/* 5. Brand Story */}
      <BrandStory />

      {/* 9. Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <NewsletterSection />
    </>
  );
}
