"use client";

import { useState, type ReactNode } from "react";
import { AnnouncementBar } from "./announcement-bar";
import { Header } from "./header";
import { CartDrawer } from "@/components/cart/cart-drawer";

export function LayoutShell({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <Header openCart={() => setCartOpen(true)} />
      </div>
      <main className="min-h-screen">{children}</main>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
