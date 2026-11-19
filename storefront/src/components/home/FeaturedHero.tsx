"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { StorefrontProduct } from "@/lib/medusa";

type GalleryItem = { src: string; alt: string };

export function FeaturedHero({
  product,
  gallery,
}: {
  product: StorefrontProduct;
  gallery: GalleryItem[];
}) {
  const [active, setActive] = useState(0);
  const [option, setOption] = useState<"single" | "box">("box");
  const shot = gallery[active] ?? gallery[0];

  const ingredients =
    product.ingredients && product.ingredients.length > 0
      ? product.ingredients
      : null;

  return (
    <section className="border-b border-[var(--line)] bg-cream">
      <div className="container-choc py-10 lg:py-14">
        <p className="mb-6 text-[11px] tracking-[0.08em] text-muted">
          Home <span className="mx-1.5 text-muted/50">/</span> Chocolates
          <span className="mx-1.5 text-muted/50">/</span> {product.title}
        </p>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep/40 sm:aspect-[5/6]">
              <Image
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition duration-500"
              />
              <div className="absolute bottom-4 right-4 rounded-sm bg-cream/90 px-2.5 py-1 text-[11px] tracking-wide text-charcoal">
                {active + 1} / {gallery.length}
              </div>
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {gallery.map((item, i) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden border transition sm:h-24 sm:w-24 ${
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
          </div>

          {/* Buy panel */}
          <div className="flex flex-col lg:col-span-5 lg:pt-2">
            <p className="label-caps text-gold">
              Handmade · Gourmet chocolates
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,4vw,3.6rem)] leading-[1.05] tracking-[-0.02em] text-charcoal">
              {product.title}
            </h1>
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
                      option === "single"
                        ? "border-accent bg-accent"
                        : "border-[var(--line)]"
                    }`}
                  >
                    {option === "single" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-cream" />
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-charcoal">
                      Single selection
                    </p>
                    <p className="mt-0.5 text-sm text-muted">
                      One bar or piece — Price TBC
                    </p>
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
                      option === "box"
                        ? "border-accent bg-accent"
                        : "border-[var(--line)]"
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

            <Link
              href={option === "box" ? "/#build" : "/#chocolates"}
              className="btn-primary mt-6"
            >
              {option === "box" ? "Start building a box" : "View chocolates"}
              <span className="text-gold" aria-hidden>
                ❦
              </span>
            </Link>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-6 text-center text-[11px] uppercase tracking-[0.16em] text-muted">
              <span>Handmade</span>
              <span className="text-gold/70" aria-hidden>
                ·
              </span>
              <span>Real ingredients</span>
              <span className="text-gold/70" aria-hidden>
                ·
              </span>
              <span>9 bars per box</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
