"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSoftReveal } from "@/components/motion/useSoftReveal";
import { useCart } from "@/lib/cart";
import { formatProductPrice } from "@/lib/pricing";
import type { StorefrontProduct } from "@/lib/medusa";

/**
 * Tray feature panel — qty + add to cart only (matches tray PDP).
 * Build-a-box is a separate path; don't offer options the PDP doesn't.
 */
export function FeaturedSplit({
  product,
  gallery,
}: {
  product: StorefrontProduct;
  gallery: { src: string; alt: string }[];
}) {
  const ref = useSoftReveal<HTMLElement>();
  const { addProduct } = useCart();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const shot = gallery[active] ?? gallery[0];
  const ingredients = product.ingredients?.length ? product.ingredients : null;

  return (
    <section ref={ref} className="border-b border-[var(--line)] bg-cream">
      <div className="container-choc py-14 lg:py-20">
        <div className="mb-8" data-reveal>
          <p className="eyebrow">Featured</p>
          <h2 className="display-lg mt-3">Party &amp; gifting</h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7" data-reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep/40 sm:aspect-[5/6]">
              {shot && (
                <Image
                  key={shot.src}
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
              )}
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {gallery.map((item, i) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden border transition focus-ring sm:h-24 sm:w-24 ${
                      i === active
                        ? "border-accent"
                        : "border-transparent opacity-80 hover:opacity-100"
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image
                      src={item.src}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col lg:col-span-5 lg:pt-2" data-reveal>
            <p className="label-caps text-gold">Handmade · Gourmet chocolates</p>
            <h3 className="mt-4 font-display text-[clamp(2.2rem,3.5vw,3.2rem)] leading-[1.05] tracking-[-0.02em] text-charcoal">
              {product.title}
            </h3>
            <p className="mt-3 font-display text-lg italic text-muted sm:text-xl">
              {product.subtitle ?? product.description}
            </p>

            {ingredients && (
              <div className="mt-8 hairline pt-5">
                <p className="spec-line mb-3">Ingredients</p>
                <ul className="space-y-2">
                  {ingredients.map((ing) => (
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

            <div className="mt-8 hairline pt-6">
              <p className="font-display text-3xl text-charcoal">
                {formatProductPrice()}
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <label className="label-caps" htmlFor="tray-qty">
                Qty
              </label>
              <input
                id="tray-qty"
                type="number"
                min={1}
                max={99}
                value={qty}
                onChange={(e) =>
                  setQty(Math.max(1, Number(e.target.value) || 1))
                }
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

            <Link
              href={`/products/${product.handle}/`}
              className="mt-4 text-center text-[12px] uppercase tracking-[0.16em] text-muted underline-offset-4 hover:text-charcoal hover:underline"
            >
              View product details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
