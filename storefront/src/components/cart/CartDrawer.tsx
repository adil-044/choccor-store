"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { withBasePath } from "@/lib/paths";

export function CartDrawer() {
  const {
    lines,
    itemCount,
    drawerOpen,
    closeDrawer,
    setQuantity,
    removeLine,
  } = useCart();

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen, closeDrawer]);

  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Cart">
      <button
        type="button"
        className="absolute inset-0 bg-cocoa/40"
        aria-label="Close cart"
        onClick={closeDrawer}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
          <div>
            <p className="label-caps text-gold">Your cart</p>
            <p className="mt-1 font-display text-2xl text-charcoal">
              {itemCount === 0 ? "Empty" : `${itemCount} item${itemCount === 1 ? "" : "s"}`}
            </p>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="btn-ghost"
            aria-label="Close cart"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-display text-2xl text-charcoal">Nothing here yet</p>
              <p className="mt-2 text-sm text-muted">
                Add chocolates from the shop, or build a box of nine.
              </p>
              <Link
                href="/shop/"
                onClick={closeDrawer}
                className="btn-primary mt-6 inline-flex w-auto px-8"
              >
                Shop chocolates
                <span className="text-gold" aria-hidden>
                  ❦
                </span>
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-3 border-b border-[var(--line-soft)] pb-5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-cream-deep/50">
                    <Image
                      src={
                        line.image.startsWith("http") || line.image.startsWith(withBasePath("/"))
                          ? line.image
                          : withBasePath(line.image)
                      }
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg leading-tight text-charcoal">
                      {line.title}
                    </p>
                    {line.kind === "box" && line.boxItems && (
                      <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted">
                        {line.boxItems.map((b) => b.title).join(" · ")}
                      </p>
                    )}
                    <p className="price-tbc mt-2 text-xs">Price TBC</p>
                    <div className="mt-3 flex items-center gap-3">
                      <label className="sr-only" htmlFor={`qty-${line.id}`}>
                        Quantity
                      </label>
                      <input
                        id={`qty-${line.id}`}
                        type="number"
                        min={1}
                        max={99}
                        value={line.quantity}
                        onChange={(e) =>
                          setQuantity(line.id, Math.max(1, Number(e.target.value) || 1))
                        }
                        className="field-input w-16 py-1.5 text-center"
                      />
                      <button
                        type="button"
                        className="text-[11px] uppercase tracking-[0.16em] text-muted hover:text-charcoal"
                        onClick={() => removeLine(line.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-[var(--line)] px-5 py-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Subtotal</span>
            <span className="price-tbc">TBC</span>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-muted">
            Retail pricing is unconfirmed — totals stay TBC until Choccor publishes prices.
          </p>
          <Link
            href="/cart/"
            onClick={closeDrawer}
            className="btn-secondary mt-4 w-full"
          >
            View cart
          </Link>
          <Link
            href="/checkout/"
            onClick={closeDrawer}
            className="btn-primary mt-3 w-full"
          >
            Checkout
            <span className="text-gold" aria-hidden>
              ❦
            </span>
          </Link>
        </div>
      </aside>
    </div>
  );
}
