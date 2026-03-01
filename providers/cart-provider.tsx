"use client";

import {
  createContext,
  useContext,
  useOptimistic,
  useTransition,
  type ReactNode,
} from "react";
import type { Cart, CartItem } from "@/lib/shopify/types";

type UpdateType = "plus" | "minus" | "delete";

type CartAction =
  | { type: "UPDATE_ITEM"; payload: { lineId: string; updateType: UpdateType } }
  | { type: "ADD_ITEM"; payload: { variant: CartItem } }
  | { type: "SET_CART"; payload: { cart: Cart } };

type CartContextType = {
  cart: Cart | undefined;
  updateCartItem: (lineId: string, updateType: UpdateType) => void;
  addCartItem: (variant: CartItem) => void;
  isPending: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: Cart | undefined, action: CartAction): Cart | undefined {
  if (!state) return state;

  switch (action.type) {
    case "UPDATE_ITEM": {
      const { lineId, updateType } = action.payload;

      if (updateType === "delete") {
        return {
          ...state,
          lines: state.lines.filter((item) => item.id !== lineId),
          totalQuantity: state.lines.reduce((total, item) => {
            if (item.id === lineId) return total;
            return total + item.quantity;
          }, 0),
        };
      }

      return {
        ...state,
        lines: state.lines.map((item) => {
          if (item.id !== lineId) return item;
          const newQuantity =
            updateType === "plus" ? item.quantity + 1 : item.quantity - 1;
          if (newQuantity <= 0) return item;
          return { ...item, quantity: newQuantity };
        }),
        totalQuantity: state.lines.reduce((total, item) => {
          if (item.id !== lineId) return total + item.quantity;
          const newQuantity =
            updateType === "plus" ? item.quantity + 1 : item.quantity - 1;
          return total + Math.max(newQuantity, 0);
        }, 0),
      };
    }
    case "ADD_ITEM": {
      const existingItem = state.lines.find(
        (item) => item.merchandise.id === action.payload.variant.merchandise.id
      );

      if (existingItem) {
        return {
          ...state,
          lines: state.lines.map((item) =>
            item.merchandise.id === action.payload.variant.merchandise.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          totalQuantity: state.totalQuantity + 1,
        };
      }

      return {
        ...state,
        lines: [...state.lines, action.payload.variant],
        totalQuantity: state.totalQuantity + 1,
      };
    }
    case "SET_CART":
      return action.payload.cart;
    default:
      return state;
  }
}

export function CartProvider({
  children,
  cart: initialCart,
}: {
  children: ReactNode;
  cart: Cart | undefined;
}) {
  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    initialCart,
    cartReducer
  );
  const [isPending, startTransition] = useTransition();

  function updateCartItem(lineId: string, updateType: UpdateType) {
    startTransition(() => {
      updateOptimisticCart({
        type: "UPDATE_ITEM",
        payload: { lineId, updateType },
      });
    });
  }

  function addCartItem(variant: CartItem) {
    startTransition(() => {
      updateOptimisticCart({
        type: "ADD_ITEM",
        payload: { variant },
      });
    });
  }

  return (
    <CartContext.Provider
      value={{
        cart: optimisticCart,
        updateCartItem,
        addCartItem,
        isPending,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
