"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/providers/cart-provider";
import { formatPrice } from "@/lib/utils";
import { removeItem, updateItemQuantity } from "@/lib/shopify/actions";
import { XIcon, MinusIcon, PlusIcon, TrashIcon } from "@/components/ui/icons";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: Props) {
  const { cart, updateCartItem } = useCart();

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

  async function handleUpdateQuantity(
    lineId: string,
    variantId: string,
    currentQuantity: number,
    action: "plus" | "minus"
  ) {
    const newQuantity =
      action === "plus" ? currentQuantity + 1 : currentQuantity - 1;
    updateCartItem(lineId, action);

    if (newQuantity === 0) {
      await removeItem(lineId);
    } else {
      await updateItemQuantity({
        lineId,
        variantId,
        quantity: newQuantity,
      });
    }
  }

  async function handleRemove(lineId: string) {
    updateCartItem(lineId, "delete");
    await removeItem(lineId);
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-[400px] bg-bg-elevated z-50 transition-transform duration-500 ease-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-cream/5">
          <span className="font-heading text-lg tracking-[0.1em] text-cream font-light">
            Bag ({cart?.totalQuantity || 0})
          </span>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-cream/40 hover:text-cream transition-colors"
            aria-label="Close cart"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {!cart || cart.lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <p className="text-cream/30 text-xs tracking-wide mb-6">
              Your bag is empty
            </p>
            <Link
              href="/collections/lingerie-new"
              onClick={onClose}
              className="bg-accent text-cream px-8 py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-accent-light transition-colors"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {cart.lines.map((item) => (
                <div key={item.id} className="flex gap-3">
                  {item.merchandise.product.featuredImage && (
                    <Link
                      href={`/products/${item.merchandise.product.handle}`}
                      onClick={onClose}
                      className="relative w-20 h-24 flex-shrink-0 bg-bg-card overflow-hidden"
                    >
                      <Image
                        src={item.merchandise.product.featuredImage.url}
                        alt={
                          item.merchandise.product.featuredImage.altText ||
                          item.merchandise.product.title
                        }
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </Link>
                  )}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.merchandise.product.handle}`}
                      onClick={onClose}
                      className="text-xs text-cream/80 hover:text-cream transition-colors line-clamp-1"
                    >
                      {item.merchandise.product.title}
                    </Link>
                    <p className="text-[10px] text-cream/30 mt-0.5">
                      {item.merchandise.selectedOptions
                        .map((o) => o.value)
                        .join(" / ")}
                    </p>
                    <p className="text-xs text-cream mt-1">
                      {formatPrice(
                        item.cost.totalAmount.amount,
                        item.cost.totalAmount.currencyCode
                      )}
                    </p>
                    <div className="flex items-center gap-2.5 mt-2.5">
                      <div className="flex items-center border border-cream/10">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.id,
                              item.merchandise.id,
                              item.quantity,
                              "minus"
                            )
                          }
                          className="p-1.5 text-cream/40 hover:text-cream transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <MinusIcon />
                        </button>
                        <span className="px-2.5 text-[10px] text-cream min-w-[28px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.id,
                              item.merchandise.id,
                              item.quantity,
                              "plus"
                            )
                          }
                          className="p-1.5 text-cream/40 hover:text-cream transition-colors"
                          aria-label="Increase quantity"
                        >
                          <PlusIcon />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-1 text-cream/20 hover:text-accent-light transition-colors"
                        aria-label="Remove item"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-cream/5 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-wide text-cream/60">
                  Subtotal
                </span>
                <span className="text-xs text-cream">
                  {formatPrice(
                    cart.cost.subtotalAmount.amount,
                    cart.cost.subtotalAmount.currencyCode
                  )}
                </span>
              </div>
              <p className="text-[10px] text-cream/25">
                Shipping & taxes calculated at checkout
              </p>
              <a
                href={cart.checkoutUrl}
                className="block w-full bg-accent text-cream text-center py-3.5 text-[10px] tracking-[0.2em] uppercase hover:bg-accent-light transition-colors"
              >
                Checkout
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
}
