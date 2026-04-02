import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shilla Lace",
    short_name: "Shilla Lace",
    description:
      "Luxurious lingerie celebrating confidence and individuality.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/Favicon.png",
        sizes: "500x500",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
