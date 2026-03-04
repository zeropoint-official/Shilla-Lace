import { Suspense } from "react";
import { getCollectionProducts } from "@/lib/shopify";
import { HeroSection } from "@/components/home/hero-section";
import { TrustBar } from "@/components/home/trust-bar";
import { FeaturedProducts } from "@/components/home/featured-products";
import { EditorialStrip } from "@/components/home/editorial-strip";
import { CategoryGrid } from "@/components/home/category-grid";
import { ParallaxCTA } from "@/components/home/parallax-cta";
import { IntimateCollection } from "@/components/home/intimate-collection";
import { BrandStory } from "@/components/home/brand-story";
import { Testimonials } from "@/components/home/testimonials";
import { ValueProps } from "@/components/home/value-props";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { SocialFeed } from "@/components/home/social-feed";
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

      {/* 4. Editorial Lookbook Strip */}
      <EditorialStrip />

      {/* 5. Shop by Category */}
      <CategoryGrid />

      {/* 6. Full-Width Parallax CTA */}
      <ParallaxCTA />

      {/* 7. The Intimate Edit Collection (Mock/Sourcing) */}
      <IntimateCollection />

      {/* 8. Brand Story */}
      <BrandStory />

      {/* 9. Testimonials */}
      <Testimonials />

      {/* 10. Why Shilla Lace */}
      <ValueProps />

      {/* 11. Newsletter */}
      <NewsletterSection />

      {/* 12. Social Feed */}
      <SocialFeed />
    </>
  );
}
