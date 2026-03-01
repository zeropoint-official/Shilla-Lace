import type { MetadataRoute } from "next";
import { getCollections, getProducts, getPages } from "@/lib/shopify";

const baseUrl = process.env.SITE_URL || "https://shillalace.com";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  try {
    const [collections, products, pages] = await Promise.all([
      getCollections(),
      getProducts({}),
      getPages(),
    ]);

    const collectionRoutes = collections
      .filter((c) => c.handle)
      .map((collection) => ({
        url: `${baseUrl}/collections/${collection.handle}`,
        lastModified: collection.updatedAt,
        changeFrequency: "daily" as const,
        priority: 0.8,
      }));

    const productRoutes = products.map((product) => ({
      url: `${baseUrl}/products/${product.handle}`,
      lastModified: product.updatedAt,
      changeFrequency: "daily" as const,
      priority: 0.9,
    }));

    const pageRoutes = pages.map((page) => ({
      url: `${baseUrl}/pages/${page.handle}`,
      lastModified: page.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }));

    return [...staticRoutes, ...collectionRoutes, ...productRoutes, ...pageRoutes];
  } catch {
    return staticRoutes;
  }
}
