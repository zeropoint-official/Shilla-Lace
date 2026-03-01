import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { getCart } from "@/lib/shopify";
import { CartProvider } from "@/providers/cart-provider";
import { GSAPProvider } from "@/providers/gsap-provider";
import { LayoutShell } from "@/components/layout/layout-shell";
import { Footer } from "@/components/layout/footer";
import { OrganizationJsonLd } from "@/components/seo/organization-jsonld";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Shilla Lace | Luxurious Lingerie",
    template: "%s | Shilla Lace",
  },
  description:
    "Redefining intimacy with luxurious lingerie. Celebrating confidence and embracing individuality.",
  metadataBase: new URL(process.env.SITE_URL || "https://shillalace.com"),
  openGraph: {
    type: "website",
    siteName: "Shilla Lace",
    locale: "en_US",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let cart;
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("shopify_cart_id")?.value;
    cart = cartId ? await getCart(cartId) : undefined;
  } catch {
    // Cart fetch failed (API not configured or network error)
  }

  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <OrganizationJsonLd />
        <CartProvider cart={cart}>
          <GSAPProvider>
            <LayoutShell>{children}</LayoutShell>
            <Footer />
          </GSAPProvider>
        </CartProvider>
      </body>
    </html>
  );
}
