import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCollection, getCollectionProducts } from "@/lib/shopify";
import { CollectionContent } from "@/components/collection/collection-content";
import { CollectionJsonLd } from "@/components/seo/collection-jsonld";

export const revalidate = 300;

type Props = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollection(handle);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `Shop ${collection.title} at Shilla Lace`,
  };
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { handle } = await params;
  const resolvedSearchParams = await searchParams;

  const collection = await getCollection(handle);
  if (!collection) notFound();

  const sortKey = (resolvedSearchParams.sort as string) || "BEST_SELLING";
  const reverse = resolvedSearchParams.order === "desc";

  const products = await getCollectionProducts({
    collection: handle,
    sortKey,
    reverse,
  });

  return (
    <>
      <CollectionJsonLd collection={collection} products={products} />
      <CollectionContent
        collection={collection}
        products={products}
        currentSort={sortKey}
      />
    </>
  );
}
