import type { Collection, Product } from "@/lib/shopify/types";

type Props = {
  collection: Collection;
  products: Product[];
};

export function CollectionJsonLd({ collection, products }: Props) {
  const baseUrl = process.env.SITE_URL || "https://shillalace.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.title,
    description: collection.description,
    url: `${baseUrl}/collections/${collection.handle}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.slice(0, 20).map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.title,
          url: `${baseUrl}/products/${product.handle}`,
          image: product.featuredImage?.url,
          offers: {
            "@type": "Offer",
            priceCurrency: product.priceRange.minVariantPrice.currencyCode,
            price: product.priceRange.minVariantPrice.amount,
            availability: product.availableForSale
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
