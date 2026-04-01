"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useCart } from "@/providers/cart-provider";
import { SearchIcon, ShoppingBagIcon, MenuIcon } from "@/components/ui/icons";
import { MobileMenu } from "./mobile-menu";
import { SearchModal } from "./search-modal";

const navigation = [
  { title: "New In",      href: "/collections/new-in"        },
  { title: "Lingerie",    href: "/collections/lingerie"     },
  { title: "Bodysuits",   href: "/collections/bodysuits"    },
  { title: "Stockings",   href: "/collections/cro-stockings"},
  { title: "Bestsellers", href: "/collections/lingerie-new" },
  { title: "Shop All",    href: "/collections/shop-all"     },
];

const infoLinks = [
  { title: "About Us",          href: "/pages/about-shilla-lace" },
  { title: "Returns & Refunds", href: "/pages/returns-refunds"   },
  { title: "Shipping Policy",   href: "/pages/shipping"          },
  { title: "Terms of Service",  href: "/pages/terms-of-service"  },
  { title: "Privacy Policy",    href: "/pages/privacy-policy"    },
];

const Icons = ({
  openCart,
  openSearch,
  cartCount,
  scrolled,
}: {
  openCart: () => void;
  openSearch: () => void;
  cartCount: number;
  scrolled: boolean;
}) => (
  <div className="flex items-center gap-1 sm:gap-2">
    <button
      onClick={openSearch}
      className={cn(
        "p-2 transition-colors duration-300",
        scrolled ? "text-cream/75 hover:text-cream" : "text-white/60 hover:text-white"
      )}
      aria-label="Search"
    >
      <SearchIcon className="w-4.5 h-4.5" />
    </button>
    <button
      onClick={openCart}
      className={cn(
        "p-2 transition-colors duration-300 relative",
        scrolled ? "text-cream/75 hover:text-cream" : "text-white/60 hover:text-white"
      )}
      aria-label="Open cart"
    >
      <ShoppingBagIcon className="w-4.5 h-4.5" />
      {cartCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
          {cartCount}
        </span>
      )}
    </button>
  </div>
);

function InfoDropdown({ isOpaque }: { isOpaque: boolean }) {
  const [open, setOpen] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const enter = () => { clearTimeout(timeout.current); setOpen(true); };
  const leave = () => { timeout.current = setTimeout(() => setOpen(false), 150); };

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        className={cn(
          "text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 whitespace-nowrap",
          isOpaque ? "text-cream/75 hover:text-cream" : "text-white/55 hover:text-white"
        )}
      >
        Info
      </button>
      <div
        className={cn(
          "absolute top-full left-0 pt-3 transition-all duration-200",
          open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
        )}
      >
        <div className="bg-white border border-black/[0.06] shadow-lg py-3 min-w-[200px]">
          {infoLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-5 py-2 text-[10px] tracking-[0.15em] uppercase text-cream/60 hover:text-cream hover:bg-surface transition-colors"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header({ openCart }: { openCart: () => void }) {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const { cart } = useCart();
  const cartCount = cart?.totalQuantity ?? 0;
  const pathname = usePathname();
  const isHome = pathname === "/";

  // On non-homepage, always show the opaque/scrolled header style
  const isOpaque = !isHome || scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "transition-all duration-500",
          isOpaque
            ? "bg-white/95 backdrop-blur-xl border-b border-black/[0.04]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">

          {/* ── Mobile row ───────────── */}
          <div className="flex lg:hidden items-center h-16 md:h-20">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 -ml-2 shrink-0"
              aria-label="Open menu"
            >
              <MenuIcon className={cn("w-5 h-5 transition-colors duration-300", isOpaque ? "text-cream" : "text-white")} />
            </button>

            <Link href="/" className="flex-1 flex justify-center">
              <Image
                src="/logo.avif"
                alt="Shilla Lace"
                width={140}
                height={40}
                className={cn(
                  "h-10 sm:h-12 w-auto transition-all duration-300"
                )}
                priority
              />
            </Link>

            <Icons openCart={openCart} openSearch={() => setSearchOpen(true)} cartCount={cartCount} scrolled={isOpaque} />
          </div>

          {/* ── Desktop row ──────── */}
          <div className="hidden lg:grid grid-cols-2 items-center h-20">

            <nav className="flex items-center gap-7">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 whitespace-nowrap",
                    isOpaque ? "text-cream/75 hover:text-cream" : "text-white/55 hover:text-white"
                  )}
                >
                  {item.title}
                </Link>
              ))}
              <InfoDropdown isOpaque={isOpaque} />
            </nav>

            <div className="flex items-center">
              <Link href="/" className="flex-1 flex justify-center">
                <Image
                  src="/logo.avif"
                  alt="Shilla Lace"
                  width={180}
                  height={50}
                  className={cn(
                    "h-14 w-auto transition-all duration-300"
                  )}
                  priority
                />
              </Link>
              <Icons openCart={openCart} openSearch={() => setSearchOpen(true)} cartCount={cartCount} scrolled={isOpaque} />
            </div>

          </div>

        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navigation={navigation}
        infoLinks={infoLinks}
      />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
