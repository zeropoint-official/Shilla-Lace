export function OrganizationJsonLd() {
  const baseUrl = process.env.SITE_URL || "https://shillalace.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Shilla Lace",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "Redefining intimacy with luxurious lingerie. Celebrating confidence and embracing individuality since 2021.",
    foundingDate: "2021",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Βασίλη Μιχαηλίδη, 15",
      addressLocality: "Nicosia",
      addressRegion: "Engomi",
      postalCode: "2406",
      addressCountry: "CY",
    },
    sameAs: [
      "https://www.instagram.com/shillalace/",
      "https://www.facebook.com/profile.php?id=100094514659530",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
