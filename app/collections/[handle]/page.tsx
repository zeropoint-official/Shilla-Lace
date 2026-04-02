import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCollection, getCollectionProducts, getCollections } from "@/lib/shopify";
import { CollectionContent } from "@/components/collection/collection-content";
import { CollectionGrid } from "@/components/home/collection-duo";
import { CollectionJsonLd } from "@/components/seo/collection-jsonld";

export const revalidate = 300;

export async function generateStaticParams() {
  const collections = await getCollections();
  return collections
    .filter((c) => c.handle)
    .map((collection) => ({ handle: collection.handle }));
}

type Props = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollection(handle);

  if (!collection) return notFound();

  const title = collection.seo?.title || collection.title;
  const description =
    collection.seo?.description ||
    collection.description ||
    `Shop ${collection.title} at Shilla Lace`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/collections/${handle}`,
      ...(collection.image && {
        images: [
          {
            url: collection.image.url,
            width: collection.image.width,
            height: collection.image.height,
            alt: collection.image.altText || collection.title,
          },
        ],
      }),
    },
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
      <CollectionGrid />
    </>
  );
}
