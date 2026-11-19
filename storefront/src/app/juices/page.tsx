import Image from "next/image";
import Link from "next/link";
import { productsBySection } from "@/lib/catalog";
import { withLocalAssetPaths } from "@/lib/medusa";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Natural Juices",
  description:
    "Choccor natural juices — Berry Rush, Avocado Boost, and Peanut Punch.",
  path: "/juices/",
  image: "/products/juice-berry-rush.webp",
});

export default function JuicesPage() {
  const juices = productsBySection("juices").map(withLocalAssetPaths);

  return (
    <div className="border-b border-[var(--line)]">
      <div className="container-choc section-pad">
        <p className="eyebrow">Collection</p>
        <h1 className="display-lg mt-3">Natural juices</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          Berry Rush, Avocado Boost, and Peanut Punch.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {juices.map((product) => (
            <article key={product.id} className="flex flex-col">
              <Link
                href={`/products/${product.handle}/`}
                className="relative aspect-[3/4] overflow-hidden bg-cream-deep/40 focus-ring"
              >
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </Link>
              <h2 className="mt-4 font-display text-3xl text-charcoal">
                <Link href={`/products/${product.handle}/`} className="focus-ring rounded-sm">
                  {product.title}
                </Link>
              </h2>
              <p className="mt-1 text-sm italic text-muted">{product.subtitle}</p>
              <p className="mt-3 text-sm tracking-wide text-muted">
                {product.priceLabel}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
