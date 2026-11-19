"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatCartSubtotal, formatProductPrice } from "@/lib/pricing";
import { withBasePath } from "@/lib/paths";

export function CartPage() {
  const { lines, itemCount, setQuantity, removeLine, ready } = useCart();

  function img(src: string) {
    if (src.startsWith("http") || src.includes("/choccor-store/")) return src;
    return withBasePath(src);
  }

  return (
    <div className="border-b border-[var(--line)]">
      <div className="container-choc section-pad">
        <p className="eyebrow">Bag</p>
        <h1 className="display-lg mt-3">Cart</h1>
        <p className="mt-3 text-sm text-muted">
          Review your selection before checkout.
        </p>

        {!ready ? (
          <p className="mt-10 text-sm text-muted">Loading cart…</p>
        ) : lines.length === 0 ? (
          <div className="mt-12 max-w-md">
            <p className="font-display text-3xl text-charcoal">Your cart is empty</p>
            <Link href="/shop/" className="btn-primary mt-6 inline-flex w-auto">
              Shop chocolates
              <span className="text-gold" aria-hidden>
                ❦
              </span>
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <ul className="space-y-6 lg:col-span-8">
              {lines.map((line) => (
                <li
                  key={line.id}
                  className="flex gap-4 border-b border-[var(--line)] pb-6"
                >
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden bg-cream-deep/50">
                    <Image
                      src={img(line.image)}
                      alt=""
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-2xl text-charcoal">{line.title}</p>
                    {line.kind === "box" && line.boxItems && (
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {line.boxItems.map((b) => b.title).join(" · ")}
                      </p>
                    )}
                    <p className="mt-3 text-sm tracking-wide text-muted">
                      {formatProductPrice()}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-4">
                      <input
                        type="number"
                        min={1}
                        max={99}
                        value={line.quantity}
                        aria-label={`Quantity for ${line.title}`}
                        onChange={(e) =>
                          setQuantity(line.id, Math.max(1, Number(e.target.value) || 1))
                        }
                        className="field-input w-20 text-center"
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

            <aside className="lg:col-span-4">
              <div className="border border-[var(--line)] bg-cream-soft/70 p-6">
                <p className="label-caps text-gold">Summary</p>
                <p className="mt-3 text-sm text-muted">
                  {itemCount} item{itemCount === 1 ? "" : "s"}
                </p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="text-sm text-muted">Subtotal</span>
                  <span className="text-sm text-muted">{formatCartSubtotal()}</span>
                </div>
                <Link href="/checkout/" className="btn-primary mt-6 w-full">
                  Checkout
                  <span className="text-gold" aria-hidden>
                    ❦
                  </span>
                </Link>
                <Link
                  href="/shop/"
                  className="btn-ghost mt-2 w-full"
                >
                  Continue shopping
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
