"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProductTile } from "@/components/ui/ProductTile";
import { collectionLabel } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import type { StorefrontProduct } from "@/lib/medusa";

export function ProductDetail({
  product,
  related,
  gallery,
}: {
  product: StorefrontProduct;
  related: StorefrontProduct[];
  gallery: { src: string; alt: string }[];
}) {
  const { addProduct } = useCart();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [openAcc, setOpenAcc] = useState<string | null>("ingredients");
  const shot = gallery[active] ?? gallery[0];

  return (
    <div className="border-b border-[var(--line)]">
      <div className="container-choc py-10 lg:py-14">
        <p className="mb-6 text-[11px] tracking-[0.08em] text-muted">
          <Link href="/" className="hover:text-charcoal focus-ring rounded-sm">
            Home
          </Link>
          <span className="mx-1.5 text-muted/50">/</span>
          <Link href="/shop/" className="hover:text-charcoal focus-ring rounded-sm">
            Shop
          </Link>
          <span className="mx-1.5 text-muted/50">/</span>
          {product.title}
        </p>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep/40 sm:aspect-[5/6]">
              {shot && (
                <Image
                  key={shot.src}
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              )}
              <div className="absolute bottom-4 right-4 rounded-sm bg-cream/90 px-2.5 py-1 text-[11px] tracking-wide text-charcoal">
                {active + 1} / {gallery.length}
              </div>
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {gallery.map((item, i) => (
                  <button
                    key={`${item.src}-${i}`}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden border transition focus-ring sm:h-24 sm:w-24 ${
                      i === active
                        ? "border-accent"
                        : "border-transparent opacity-80 hover:opacity-100"
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image src={item.src} alt="" fill sizes="96px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col lg:col-span-5 lg:pt-2">
            <p className="label-caps text-gold">{collectionLabel(product)}</p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.05] tracking-[-0.02em] text-charcoal">
              {product.title}
            </h1>
            <p className="mt-3 font-display text-lg italic text-muted sm:text-xl">
              {product.subtitle ?? product.description}
            </p>

            {product.ingredients && product.ingredients.length > 0 && (
              <div className="mt-8 hairline pt-5">
                <p className="spec-line mb-3">Ingredients</p>
                <ul className="space-y-2">
                  {product.ingredients.map((ing) => (
                    <li
                      key={ing}
                      className="spec-line flex justify-between gap-4 text-charcoal/75"
                    >
                      <span>{ing}</span>
                      <span className="text-muted/40">————</span>
                      <span className="text-muted">Listed</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.openQuestions && product.openQuestions.length > 0 && (
              <p className="mt-6 text-sm text-muted">
                Note: {product.openQuestions[0]}
              </p>
            )}

            <div className="mt-8 hairline pt-6">
              <p className="font-display text-3xl text-charcoal">Price TBC</p>
              <p className="price-tbc mt-1">Retail pricing</p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <label className="label-caps" htmlFor="pdp-qty">
                Qty
              </label>
              <input
                id="pdp-qty"
                type="number"
                min={1}
                max={99}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                className="field-input w-20 text-center"
              />
            </div>

            <button
              type="button"
              className="btn-primary mt-6 w-full"
              onClick={() =>
                addProduct({
                  handle: product.handle,
                  title: product.title,
                  image: product.image,
                  quantity: qty,
                })
              }
            >
              Add to cart
              <span className="text-gold" aria-hidden>
                ❦
              </span>
            </button>

            <div className="mt-10 space-y-0 border-t border-[var(--line)]">
              {[
                {
                  id: "ingredients",
                  title: "Ingredients & allergens",
                  body: product.ingredients?.length
                    ? `Listed ingredients: ${product.ingredients.join(", ")}. Allergen statements — confirm with Choccor before publishing claims.`
                    : "Ingredients for this product — confirm with Choccor. Allergen statements — confirm with Choccor.",
                },
                {
                  id: "storage",
                  title: "Storage",
                  body: "Storage guidance — confirm with Choccor. Keep handmade chocolates cool and dry until confirmed instructions are published.",
                },
              ].map((acc) => {
                const open = openAcc === acc.id;
                return (
                  <div key={acc.id} className="border-b border-[var(--line)]">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-4 text-left focus-ring rounded-sm"
                      aria-expanded={open}
                      onClick={() => setOpenAcc(open ? null : acc.id)}
                    >
                      <span className="text-sm font-medium tracking-wide text-charcoal">
                        {acc.title}
                      </span>
                      <span className="text-muted" aria-hidden>
                        {open ? "−" : "+"}
                      </span>
                    </button>
                    {open && (
                      <p className="pb-4 text-sm leading-relaxed text-muted">
                        {acc.body}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <p className="eyebrow">You may also like</p>
            <h2 className="display-lg mt-3">Related</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
              {related.map((p) => (
                <ProductTile key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
