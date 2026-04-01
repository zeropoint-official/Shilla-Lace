import { Suspense } from "react";
import { getCollectionProducts } from "@/lib/shopify";
import { HeroSection } from "@/components/home/hero-section";
import { TrustBar } from "@/components/home/trust-bar";
import { CollectionRow } from "@/components/home/collection-row";
import { CollectionGrid } from "@/components/home/collection-duo";

import { ParallaxCTA } from "@/components/home/parallax-cta";
import { BrandStory } from "@/components/home/brand-story";
import { BrandEssence } from "@/components/home/brand-essence";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { ProductGridSkeleton } from "@/components/ui/skeletons";

export const revalidate = 60;

async function BestsellersRow() {
  try {
    const products = await getCollectionProducts({
      collection: "lingerie-new",
      sortKey: "BEST_SELLING",
    });
    if (!products.length) return null;
    return (
      <CollectionRow
        products={products.slice(0, 8)}
        title="Bestsellers"
        subtitle="Most Loved"
        href="/collections/lingerie-new"
      />
    );
  } catch {
    return null;
  }
}

async function LingerieRow() {
  try {
    const products = await getCollectionProducts({
      collection: "lingerie",
      sortKey: "BEST_SELLING",
    });
    if (!products.length) return null;
    return (
      <CollectionRow
        products={products.slice(0, 8)}
        title="Lingerie"
        subtitle="The Collection"
        href="/collections/lingerie"
      />
    );
  } catch {
    return null;
  }
}

async function BodysuitsRow() {
  try {
    const products = await getCollectionProducts({
      collection: "bodysuits",
      sortKey: "BEST_SELLING",
    });
    if (!products.length) return null;
    return (
      <CollectionRow
        products={products.slice(0, 8)}
        title="Bodysuits"
        subtitle="Bold & Sculpted"
        href="/collections/bodysuits"
      />
    );
  } catch {
    return null;
  }
}

async function DaringRow() {
  try {
    const products = await getCollectionProducts({
      collection: "daring",
    });
    if (!products.length) return null;
    return (
      <CollectionRow
        products={products.slice(0, 8)}
        title="Daring"
        subtitle="The Collection"
        href="/collections/daring"
      />
    );
  } catch {
    return null;
  }
}

async function NewInRow() {
  try {
    const products = await getCollectionProducts({
      collection: "new-in",
    });
    if (!products.length) return null;
    return (
      <CollectionRow
        products={products.slice(0, 8)}
        title="New In"
        subtitle="Just Arrived"
        href="/collections/new-in"
      />
    );
  } catch {
    return null;
  }
}

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />

      {/* 1. Collection cards */}
      <CollectionGrid />

      {/* 2. Bestsellers */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <BestsellersRow />
      </Suspense>

      {/* 3. Daring collection row */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <DaringRow />
      </Suspense>

      {/* 4. New In collection row */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <NewInRow />
      </Suspense>

      {/* 5. Lingerie collection row */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <LingerieRow />
      </Suspense>

      {/* 6. Bodysuits collection row */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <BodysuitsRow />
      </Suspense>

      {/* Branding sections */}
      <ParallaxCTA />
      <BrandStory />
      <BrandEssence />
      <NewsletterSection />
    </>
  );
}
