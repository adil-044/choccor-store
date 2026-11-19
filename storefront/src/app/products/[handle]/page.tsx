import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/catalog";
import { withBasePath } from "@/lib/paths";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = PRODUCTS.find((p) => p.handle === handle);
  if (!product) return { title: "Product" };
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = PRODUCTS.find((p) => p.handle === handle);
  if (!product) notFound();

  return (
    <div className="section-pad">
      <div className="container-choc grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-sm bg-cream-deep">
          <Image
            src={withBasePath(product.image)}
            alt={product.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <Link
            href="/products"
            className="text-sm tracking-wide text-muted hover:text-cocoa"
          >
            ← All products
          </Link>
          <h1 className="mt-4 font-display text-4xl text-cocoa sm:text-5xl">
            {product.title}
          </h1>
          {product.subtitle && (
            <p className="mt-2 text-muted">{product.subtitle}</p>
          )}
          <p className="mt-6 text-base leading-relaxed text-muted">
            {product.description}
          </p>
          {product.ingredients && (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-cocoa-soft">
                Ingredients
              </p>
              <p className="mt-2 text-sm text-cocoa">
                {product.ingredients.join(", ")}
              </p>
            </div>
          )}
          {product.exampleOnly && (
            <p className="mt-6 rounded-sm border border-[var(--line)] bg-cream-soft px-4 py-3 text-sm text-muted">
              This image is a Build Your Own Bar example only. The bar does not
              have a confirmed product name and is not listed as a named SKU.
            </p>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <p className="price-tbc text-base">{product.priceLabel}</p>
            <button type="button" className="btn-primary" disabled>
              Add to cart (coming soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
