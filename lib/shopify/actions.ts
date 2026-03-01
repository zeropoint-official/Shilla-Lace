"use server";

import { cookies } from "next/headers";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "@/lib/shopify";
import { revalidateTag } from "next/cache";

const CART_COOKIE = "shopify_cart_id";

export async function getCartId(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(CART_COOKIE)?.value;
}

async function setCartId(cartId: string) {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE, cartId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
}

export async function addItem(
  selectedVariantId: string | undefined
) {
  if (!selectedVariantId) {
    return "Missing variant ID";
  }

  let cartId = await getCartId();
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.id;
    await setCartId(cartId);
  }

  try {
    await addToCart(cartId, [
      { merchandiseId: selectedVariantId, quantity: 1 },
    ]);
    revalidateTag("cart", "max");
  } catch (e) {
    return "Error adding item to cart";
  }
}

export async function removeItem(lineId: string) {
  const cartId = await getCartId();

  if (!cartId) {
    return "Missing cart ID";
  }

  try {
    await removeFromCart(cartId, [lineId]);
    revalidateTag("cart", "max");
  } catch (e) {
    return "Error removing item from cart";
  }
}

export async function updateItemQuantity(payload: {
  lineId: string;
  variantId: string;
  quantity: number;
}) {
  const cartId = await getCartId();

  if (!cartId) {
    return "Missing cart ID";
  }

  const { lineId, variantId, quantity } = payload;

  try {
    if (quantity === 0) {
      await removeFromCart(cartId, [lineId]);
    } else {
      await updateCart(cartId, [
        { id: lineId, merchandiseId: variantId, quantity },
      ]);
    }
    revalidateTag("cart", "max");
  } catch (e) {
    return "Error updating item quantity";
  }
}
