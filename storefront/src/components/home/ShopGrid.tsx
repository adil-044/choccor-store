"use client";

import Image from "next/image";
import Link from "next/link";
import { useSoftReveal } from "@/components/motion/useSoftReveal";
import type { StorefrontProduct } from "@/lib/medusa";

export function ShopGrid({ products }: { products: StorefrontProduct[] }) {
  const ref = useSoftReveal<HTMLDivElement>();

  return (
    <section id="chocolates" className="bg-cream py-16 sm:py-20">
      <div ref={ref} className="container-choc">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <p className="label-caps text-gold">The collection</p>
          <h2 className="display-lg mt-3">Shop chocolates</h2>
          <p className="mt-3 text-muted">
            Named pieces from Courtney&apos;s kitchen. Retail prices marked as
            placeholders until confirmed.
          </p>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} data-reveal className="group">
              <Link href={`/products/${product.handle}/`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep/50">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl text-charcoal">
                      {product.title}
                    </h3>
                    {product.subtitle && (
                      <p className="mt-1 text-sm italic text-muted">
                        {product.subtitle}
                      </p>
                    )}
                  </div>
                  <p className="shrink-0 pt-1 text-sm text-muted">Price TBC</p>
                </div>
                {product.ingredients && product.ingredients.length > 0 && (
                  <p className="spec-line mt-2 text-muted/80">
                    {product.ingredients.join(" · ")}
                  </p>
                )}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
