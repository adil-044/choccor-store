"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSoftReveal } from "@/components/motion/useSoftReveal";
import type { StorefrontProduct } from "@/lib/medusa";

export function BuildBox({ examples }: { examples: StorefrontProduct[] }) {
  const ref = useSoftReveal<HTMLDivElement>();
  const [style, setStyle] = useState(0);
  const active = examples[style] ?? examples[0];

  return (
    <section id="build" className="border-y border-[var(--line)] bg-linen py-16 sm:py-20">
      <div ref={ref} className="container-choc">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6" data-reveal>
            <div className="relative aspect-[5/4] overflow-hidden bg-cream-deep/40">
              {active && (
                <Image
                  key={active.id}
                  src={active.image}
                  alt={active.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              )}
            </div>
            {examples.length > 1 && (
              <div className="mt-3 flex gap-2">
                {examples.map((ex, i) => (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => setStyle(i)}
                    className={`relative h-16 w-16 overflow-hidden border ${
                      i === style ? "border-accent" : "border-transparent opacity-75"
                    }`}
                  >
                    <Image src={ex.image} alt="" fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 lg:col-start-8" data-reveal>
            <p className="label-caps text-gold">Build your own</p>
            <h2 className="display-lg mt-3">Build a box — 9 bars in each</h2>
            <p className="mt-4 font-display text-xl italic text-muted">
              Choose your chocolate style. Boxes are built with nine bars in each.
            </p>

            <div className="mt-8 space-y-3">
              {examples.map((ex, i) => (
                <button
                  key={ex.id}
                  type="button"
                  data-active={style === i}
                  className="option-card w-full"
                  onClick={() => setStyle(i)}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        style === i ? "border-accent bg-accent" : "border-[var(--line)]"
                      }`}
                    >
                      {style === i && (
                        <span className="h-1.5 w-1.5 rounded-full bg-cream" />
                      )}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-charcoal">
                        {ex.title}
                      </p>
                      <p className="mt-0.5 text-sm text-muted">Price TBC</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 hairline pt-5">
              <p className="spec-line text-charcoal/70">
                Box size ————— 9 bars
              </p>
              <p className="spec-line mt-2 text-charcoal/70">
                Retail price ————— TBC
              </p>
            </div>

            <Link href="/products/" className="btn-primary mt-8">
              Shop the collection
              <span className="text-gold" aria-hidden>
                ❦
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
