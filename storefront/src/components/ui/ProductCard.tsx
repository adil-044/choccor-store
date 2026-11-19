import Image from "next/image";
import Link from "next/link";
import type { StorefrontProduct } from "@/lib/medusa";

export function ProductCard({
  product,
  priority = false,
  large = false,
}: {
  product: StorefrontProduct;
  priority?: boolean;
  large?: boolean;
}) {
  return (
    <article
      data-reveal-item
      className="group flex h-full flex-col"
    >
      <Link
        href={`/products/${product.handle}`}
        className={`relative overflow-hidden rounded-sm bg-cream-deep shadow-[0_18px_50px_-28px_rgba(60,36,21,0.55)] ring-1 ring-cocoa/5 transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_28px_60px_-24px_rgba(60,36,21,0.6)] ${
          large ? "aspect-[4/5] sm:aspect-square" : "aspect-square"
        }`}
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes={
            large
              ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          }
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
          priority={priority}
          data-parallax-shot
        />
        {product.exampleOnly && (
          <span className="absolute left-3 top-3 rounded-sm bg-cream/95 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-cocoa shadow-sm">
            Example
          </span>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cocoa/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
      </Link>
      <div className="mt-5 flex flex-1 flex-col px-0.5">
        <h3 className="font-display text-2xl leading-tight text-cocoa sm:text-[1.65rem]">
          {product.title}
        </h3>
        {product.subtitle && (
          <p className="mt-1.5 text-sm text-muted">{product.subtitle}</p>
        )}
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
          {product.description}
        </p>
        <div className="mt-auto pt-5">
          <p className="price-tbc">{product.priceLabel}</p>
        </div>
      </div>
    </article>
  );
}
