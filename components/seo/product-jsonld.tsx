import type { Product } from "@/lib/shopify/types";

type Props = {
  product: Product;
};

export function ProductJsonLd({ product }: Props) {
  const variant = product.variants[0];
  if (!variant) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.map((img) => img.url),
    brand: {
      "@type": "Brand",
      name: product.vendor || "Shilla Lace",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      lowPrice: product.priceRange.minVariantPrice.amount,
      highPrice: product.priceRange.maxVariantPrice.amount,
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      offerCount: product.variants.length,
      url: `${process.env.SITE_URL || "https://shillalace.com"}/products/${product.handle}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
