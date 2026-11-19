"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSoftReveal } from "@/components/motion/useSoftReveal";
import { useCart } from "@/lib/cart";
import type { StorefrontProduct } from "@/lib/medusa";

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
  const [option, setOption] = useState<"single" | "box">("single");
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
                  <Image src={item.src} alt="" fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>
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
              <p className="font-display text-3xl text-charcoal">Price TBC</p>
              <p className="price-tbc mt-1">Retail pricing</p>
            </div>

            <div className="mt-8 space-y-3">
              <p className="label-caps">How would you like it?</p>
              <button
                type="button"
                data-active={option === "single"}
                className="option-card w-full"
                onClick={() => setOption("single")}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                      option === "single" ? "border-accent bg-accent" : "border-[var(--line)]"
                    }`}
                  >
                    {option === "single" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-cream" />
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-charcoal">Single tray</p>
                    <p className="mt-0.5 text-sm text-muted">One assortment — Price TBC</p>
                  </div>
                </div>
              </button>
              <button
                type="button"
                data-active={option === "box"}
                className="option-card w-full"
                onClick={() => setOption("box")}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                      option === "box" ? "border-accent bg-accent" : "border-[var(--line)]"
                    }`}
                  >
                    {option === "box" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-cream" />
                    )}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-charcoal">
                        Build a box of 9
                      </p>
                      <span className="rounded-sm bg-gold/15 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-gold">
                        Signature
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted">
                      Nine bars in each box — Price TBC
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {option === "single" ? (
              <button
                type="button"
                className="btn-primary mt-6 w-full"
                onClick={() =>
                  addProduct({
                    handle: product.handle,
                    title: product.title,
                    image: product.image,
                  })
                }
              >
                Add to cart
                <span className="text-gold" aria-hidden>
                  ❦
                </span>
              </button>
            ) : (
              <Link href="/build-a-box/" className="btn-primary mt-6 w-full">
                Start building a box
                <span className="text-gold" aria-hidden>
                  ❦
                </span>
              </Link>
            )}

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
