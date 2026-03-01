import Link from "next/link";
import Image from "next/image";
import { getCollections } from "@/lib/shopify";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse all Shilla Lace lingerie collections.",
};

export const dynamic = "force-dynamic";
export const revalidate = 300;

const fallbackImages: Record<string, string> = {
  lingerie:
    "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=800&q=80",
  bodysuits:
    "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=800&q=80",
  "cro-stockings":
    "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
  "best-sellers":
    "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=800&q=80",
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  const displayCollections = collections.filter(
    (c) => c.handle && !c.handle.startsWith("hidden")
  );

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-4">
            Collections
          </h1>
          <p className="text-muted text-sm tracking-wide">
            Explore our curated collections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCollections.map((collection) => (
            <Link
              key={collection.handle}
              href={collection.path}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src={
                  collection.image?.url ||
                  fallbackImages[collection.handle] ||
                  fallbackImages.lingerie
                }
                alt={collection.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="font-serif text-2xl md:text-3xl text-cream mb-2">
                  {collection.title}
                </h2>
                {collection.description && (
                  <p className="text-cream/60 text-sm line-clamp-2">
                    {collection.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
