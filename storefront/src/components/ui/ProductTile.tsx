"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import type { StorefrontProduct } from "@/lib/medusa";
import { collectionLabel } from "@/lib/catalog";
import { formatProductPrice } from "@/lib/pricing";

export function ProductTile({
  product,
  priority = false,
  showQuickAdd = true,
  /** Hide subtitle so equal-height rows stay aligned (bestsellers). */
  compactMeta = false,
}: {
  product: StorefrontProduct;
  priority?: boolean;
  showQuickAdd?: boolean;
  compactMeta?: boolean;
}) {
  const { addProduct } = useCart();

  return (
    <article data-reveal className="group flex h-full flex-col">
      <Link
        href={`/products/${product.handle}/`}
        className="relative aspect-square w-full overflow-hidden bg-cream-deep/40 focus-ring"
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          priority={priority}
        />
      </Link>
      <div className="mt-4 flex min-h-0 flex-1 flex-col">
        <p className="label-caps text-[10px]">{collectionLabel(product)}</p>
        <Link
          href={`/products/${product.handle}/`}
          className={`mt-1 font-display leading-tight text-charcoal transition hover:text-cocoa focus-ring rounded-sm sm:text-2xl ${
            compactMeta
              ? "line-clamp-2 min-h-[2.6em] text-xl sm:min-h-[2.5em]"
              : "text-xl"
          }`}
        >
          {product.title}
        </Link>
        {!compactMeta && product.subtitle && (
          <p className="mt-1 text-sm italic text-muted">{product.subtitle}</p>
        )}
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <p className="text-sm tracking-wide text-muted">
            {formatProductPrice()}
          </p>
          {showQuickAdd && !product.exampleOnly && (
            <button
              type="button"
              className="text-[11px] uppercase tracking-[0.16em] text-accent underline-offset-4 transition hover:underline focus-ring rounded-sm"
              onClick={() =>
                addProduct({
                  handle: product.handle,
                  title: product.title,
                  image: product.image,
                })
              }
            >
              Add
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
