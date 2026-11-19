"use client";

import Image from "next/image";
import Link from "next/link";
import { useSoftReveal } from "@/components/motion/useSoftReveal";
import type { StorefrontProduct } from "@/lib/medusa";

export function Juices({ products }: { products: StorefrontProduct[] }) {
  const ref = useSoftReveal<HTMLDivElement>();
  const hero = products[0];

  return (
    <section id="juices" className="bg-cream py-16 sm:py-20">
      <div ref={ref} className="container-choc">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5" data-reveal>
            <p className="label-caps text-gold">Natural juices</p>
            <h2 className="display-lg mt-3">Pressed for sweet moments</h2>
            <p className="mt-4 text-muted leading-relaxed">
              Choccor&apos;s natural juice lineup — Berry Rush, Avocado Boost,
              and Peanut Punch.
            </p>

            <div className="mt-8 space-y-0">
              {products.map((juice) => (
                <Link
                  key={juice.id}
                  href={`/products/${juice.handle}/`}
                  className="flex items-center justify-between gap-4 border-t border-[var(--line)] py-4 transition hover:bg-cream-soft/80"
                >
                  <div>
                    <p className="font-display text-2xl text-charcoal">
                      {juice.title}
                    </p>
                    <p className="spec-line mt-1">Natural juice</p>
                  </div>
                  <p className="text-sm text-muted">Price TBC</p>
                </Link>
              ))}
              <div className="hairline" />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7" data-reveal>
            {hero && (
              <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep/40">
                <Image
                  src={hero.image}
                  alt={hero.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="mt-3 flex gap-2">
              {products.map((juice) => (
                <div
                  key={juice.id}
                  className="relative aspect-square flex-1 overflow-hidden bg-cream-deep/40"
                >
                  <Image
                    src={juice.image}
                    alt={juice.imageAlt}
                    fill
                    sizes="150px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
