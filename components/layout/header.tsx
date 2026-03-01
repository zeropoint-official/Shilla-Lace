"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/providers/cart-provider";
import { SearchIcon, ShoppingBagIcon, MenuIcon } from "@/components/ui/icons";
import { MobileMenu } from "./mobile-menu";
import { SearchModal } from "./search-modal";

const navigation = [
  { title: "New In", href: "/collections/newin" },
  { title: "Lingerie", href: "/collections/lingerie" },
  { title: "Bodysuits", href: "/collections/bodysuits" },
  { title: "Stockings", href: "/collections/cro-stockings" },
  { title: "Bestsellers", href: "/collections/lingerie-new" },
  { title: "Shop All", href: "/collections/shop-all" },
];

export function Header({ openCart }: { openCart: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "transition-all duration-500",
          scrolled
            ? "bg-bg/90 backdrop-blur-xl border-b border-cream/5"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-2"
              aria-label="Open menu"
            >
              <MenuIcon className="w-5 h-5 text-cream" />
            </button>

            <nav className="hidden lg:flex items-center gap-7">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[10px] tracking-[0.2em] uppercase text-cream/60 hover:text-cream transition-colors duration-300"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
            >
              <span className="font-heading text-xl md:text-2xl tracking-[0.15em] text-cream font-light">
                SHILLA LACE
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-cream/60 hover:text-cream transition-colors duration-300"
                aria-label="Search"
              >
                <SearchIcon className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={openCart}
                className="p-2 text-cream/60 hover:text-cream transition-colors duration-300 relative"
                aria-label="Open cart"
              >
                <ShoppingBagIcon className="w-4.5 h-4.5" />
                {cart && cart.totalQuantity > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-accent text-cream text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {cart.totalQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navigation={navigation}
      />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
