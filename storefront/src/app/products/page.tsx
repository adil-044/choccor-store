import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/catalog";
import { withBasePath } from "@/lib/paths";

export const metadata = {
  title: "Shop",
  description: "Choccor product catalog — retail prices TBC.",
};

export default function ProductsPage() {
  const shoppable = PRODUCTS.filter((p) => !p.exampleOnly);

  return (
    <div className="section-pad">
      <div className="container-choc">
        <p className="eyebrow">Shop</p>
        <h1 className="mt-3 font-display text-4xl text-cocoa sm:text-5xl">
          Catalog foundation
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Product detail routes are stubbed for later milestones. Every price is
          a visible placeholder until Courtney confirms retail pricing.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {shoppable.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.handle}`}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-sm bg-cream-deep">
                <Image
                  src={withBasePath(product.image)}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <h2 className="mt-4 font-display text-2xl text-cocoa">
                {product.title}
              </h2>
              <p className="price-tbc mt-2">{product.priceLabel}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
