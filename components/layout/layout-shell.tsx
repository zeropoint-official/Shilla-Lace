"use client";

import { useState, useCallback, type ReactNode } from "react";
import { AnnouncementBar } from "./announcement-bar";
import { Header } from "./header";
import { CartDrawer } from "@/components/cart/cart-drawer";

type CartOpenContextValue = {
  openCart: () => void;
};

import { createContext, useContext } from "react";

const CartOpenContext = createContext<CartOpenContextValue>({ openCart: () => {} });

export function useCartDrawer() {
  return useContext(CartOpenContext);
}

export function LayoutShell({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);

  const openCart = useCallback(() => setCartOpen(true), []);

  return (
    <CartOpenContext.Provider value={{ openCart }}>
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <Header openCart={openCart} />
      </div>
      <main className="min-h-screen">{children}</main>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </CartOpenContext.Provider>
  );
}
