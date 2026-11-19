"use client";

import Link from "next/link";
import { useSoftReveal } from "@/components/motion/useSoftReveal";
import { ProductTile } from "@/components/ui/ProductTile";
import type { StorefrontProduct } from "@/lib/medusa";

export function Bestsellers({ products }: { products: StorefrontProduct[] }) {
  const ref = useSoftReveal<HTMLElement>();
  const list = products.slice(0, 4);

  return (
    <section
      id="chocolates"
      ref={ref}
      className="section-pad border-b border-[var(--line)] bg-linen/40"
    >
      <div className="container-choc">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div data-reveal>
            <p className="eyebrow">Bestsellers</p>
            <h2 className="display-lg mt-3">Featured from the kitchen</h2>
          </div>
          <Link
            href="/shop/"
            data-reveal
            className="btn-ghost self-start sm:self-auto"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 items-stretch gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {list.map((product, i) => (
            <ProductTile
              key={product.id}
              product={product}
              priority={i < 2}
              showQuickAdd
              compactMeta
            />
          ))}
        </div>
      </div>
    </section>
  );
}
