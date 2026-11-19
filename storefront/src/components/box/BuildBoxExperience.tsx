"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart, type BoxPick } from "@/lib/cart";
import { BOX_SIZE } from "@/lib/site";
import type { StorefrontProduct } from "@/lib/medusa";

export function BuildBoxExperience({
  products,
}: {
  products: StorefrontProduct[];
}) {
  const { addBox } = useCart();
  const [picks, setPicks] = useState<BoxPick[]>([]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of picks) map.set(p.handle, (map.get(p.handle) || 0) + 1);
    return map;
  }, [picks]);

  const remaining = BOX_SIZE - picks.length;
  const full = picks.length >= BOX_SIZE;

  function add(product: StorefrontProduct) {
    if (full) return;
    setPicks((prev) => [
      ...prev,
      { handle: product.handle, title: product.title, image: product.image },
    ]);
  }

  function removeOne(handle: string) {
    setPicks((prev) => {
      const idx = prev.findIndex((p) => p.handle === handle);
      if (idx < 0) return prev;
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
  }

  function clear() {
    setPicks([]);
  }

  function addToCart() {
    if (picks.length !== BOX_SIZE) return;
    addBox(picks);
    setPicks([]);
  }

  return (
    <div className="border-b border-[var(--line)]">
      <div className="container-choc section-pad !pb-12">
        <p className="eyebrow">Signature</p>
        <h1 className="display-lg mt-3">Build a box</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          Choose {BOX_SIZE} bars for your box. Retail price remains TBC. Bar
          options below are confirmed Choccor chocolates from the catalog.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5">
              {products.map((product) => {
                const count = counts.get(product.handle) || 0;
                return (
                  <div
                    key={product.id}
                    className="flex flex-col border border-[var(--line)] bg-cream-soft/40 p-3"
                  >
                    <div className="relative aspect-square overflow-hidden bg-cream-deep/40">
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        fill
                        sizes="200px"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-3 font-display text-lg leading-tight text-charcoal">
                      {product.title}
                    </p>
                    <p className="price-tbc mt-1 text-xs">{product.priceLabel}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        className="btn-secondary !px-3 !py-2 disabled:opacity-40"
                        disabled={full}
                        onClick={() => add(product)}
                      >
                        Add
                      </button>
                      {count > 0 && (
                        <button
                          type="button"
                          className="btn-ghost !px-2"
                          onClick={() => removeOne(product.handle)}
                        >
                          − {count}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 border border-[var(--line)] bg-cream-soft/70 p-5 sm:p-6">
              <p className="label-caps text-gold">Your box</p>
              <p className="mt-3 font-display text-4xl text-charcoal">
                {picks.length}
                <span className="text-muted">/{BOX_SIZE}</span>
              </p>
              <p className="mt-2 text-sm text-muted">
                {full
                  ? "Box complete — ready to add."
                  : `${remaining} more bar${remaining === 1 ? "" : "s"} to go.`}
              </p>

              <ul className="mt-6 max-h-64 space-y-2 overflow-y-auto">
                {picks.length === 0 && (
                  <li className="text-sm text-muted">No bars selected yet.</li>
                )}
                {Array.from(counts.entries()).map(([handle, count]) => {
                  const product = products.find((p) => p.handle === handle);
                  if (!product) return null;
                  return (
                    <li
                      key={handle}
                      className="flex items-center justify-between gap-2 text-sm text-charcoal"
                    >
                      <span>
                        {product.title} × {count}
                      </span>
                      <button
                        type="button"
                        className="text-[11px] uppercase tracking-[0.14em] text-muted hover:text-charcoal"
                        onClick={() => removeOne(handle)}
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 hairline pt-5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Box price</span>
                  <span className="price-tbc">TBC</span>
                </div>
              </div>

              <button
                type="button"
                className="btn-primary mt-5 w-full disabled:opacity-40"
                disabled={!full}
                onClick={addToCart}
              >
                Add box to cart
                <span className="text-gold" aria-hidden>
                  ❦
                </span>
              </button>
              <button
                type="button"
                className="btn-ghost mt-2 w-full"
                onClick={clear}
                disabled={picks.length === 0}
              >
                Clear
              </button>
              <Link
                href="/shop/?filter=chocolates"
                className="mt-4 block text-center text-[11px] uppercase tracking-[0.16em] text-muted underline-offset-4 hover:underline"
              >
                Browse chocolates
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
