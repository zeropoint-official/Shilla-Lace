"use client";

import Link from "next/link";
import { useEffect } from "react";
import { XIcon } from "@/components/ui/icons";

type Props = {
  open: boolean;
  onClose: () => void;
  navigation: { title: string; href: string }[];
};

export function MobileMenu({ open, onClose, navigation }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 left-0 bottom-0 w-[300px] bg-bg-elevated z-50 transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-cream/5">
          <span className="font-heading text-lg tracking-[0.1em] text-cream font-light">
            Menu
          </span>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-cream/40 hover:text-cream transition-colors"
            aria-label="Close menu"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
        <nav className="p-5">
          <ul className="space-y-0">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-3.5 text-[11px] tracking-[0.25em] uppercase text-cream/60 hover:text-cream transition-colors border-b border-cream/5"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-cream/5">
          <div className="flex gap-6">
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
      </div>
    </>
  );
}
