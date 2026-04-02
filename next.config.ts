import type { NextConfig } from "next";

const shopifyDomain = process.env.SHOPIFY_STORE_DOMAIN || "919c07.myshopify.com";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ae01.alicdn.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/checkouts/:path*",
        destination: `https://${shopifyDomain}/checkouts/:path*`,
        permanent: false,
      },
      {
        source: "/cart/:path*",
        destination: `https://${shopifyDomain}/cart/:path*`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
