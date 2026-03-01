import Link from "next/link";

const shopLinks = [
  { title: "Lingerie", href: "/collections/lingerie" },
  { title: "Bodysuits", href: "/collections/bodysuits" },
  { title: "Stockings", href: "/collections/cro-stockings" },
  { title: "Best Sellers", href: "/collections/best-sellers" },
  { title: "New Arrivals", href: "/collections/lingerie-new" },
];

const infoLinks = [
  { title: "About Us", href: "/pages/about-shilla-lace" },
  { title: "Shipping Policy", href: "/pages/shipping" },
  { title: "Refund Policy", href: "/pages/refund-policy" },
  { title: "Terms of Service", href: "/pages/terms-of-service" },
  { title: "Privacy Policy", href: "/pages/privacy-policy" },
];

export function Footer() {
  return (
    <footer className="bg-bg border-t border-cream/5">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 py-16 md:py-20">
          <div className="lg:col-span-1">
            <h2 className="font-heading text-xl tracking-[0.15em] text-cream mb-4 font-light">
              SHILLA LACE
            </h2>
            <p className="text-xs text-cream/40 leading-relaxed max-w-xs">
              Redefining intimacy with luxurious lingerie. Celebrating
              confidence and embracing individuality since 2021.
            </p>
            <div className="flex gap-5 mt-5">
              <a
                href="https://www.instagram.com/shillalace/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.2em] uppercase text-cream/30 hover:text-accent-light transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100094514659530"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.2em] uppercase text-cream/30 hover:text-accent-light transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] tracking-[0.25em] uppercase mb-5 text-cream/50">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-cream/35 hover:text-cream transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] tracking-[0.25em] uppercase mb-5 text-cream/50">
              Information
            </h3>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-cream/35 hover:text-cream transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] tracking-[0.25em] uppercase mb-5 text-cream/50">
              Newsletter
            </h3>
            <p className="text-xs text-cream/35 mb-4">
              Get 10% off your first order and exclusive updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent border border-cream/10 px-4 py-2.5 text-xs text-cream placeholder:text-cream/20 focus:outline-none focus:border-accent/50 transition-colors"
              />
              <button
                type="submit"
                className="bg-accent text-cream px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase hover:bg-accent-light transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-cream/5 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-cream/25">
            &copy; {new Date().getFullYear()} Shilla Lace. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[10px] text-cream/20">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
