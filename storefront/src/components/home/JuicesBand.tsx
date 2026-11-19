"use client";

import Image from "next/image";
import Link from "next/link";
import { useSoftReveal } from "@/components/motion/useSoftReveal";
import { formatProductPrice } from "@/lib/pricing";
import type { StorefrontProduct } from "@/lib/medusa";

export function JuicesBand({ products }: { products: StorefrontProduct[] }) {
  const ref = useSoftReveal<HTMLElement>();
  const hero = products[0];

  return (
    <section
      id="juices"
      ref={ref}
      className="section-pad border-b border-[var(--line)] bg-cream"
    >
      <div className="container-choc grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow">Natural juices</p>
          <h2 className="display-lg mt-3">Fresh from the lineup</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            Berry Rush, Avocado Boost, and Peanut Punch.
          </p>
          <ul className="mt-8 space-y-1">
            {products.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/products/${p.handle}/`}
                  className="group flex items-center justify-between border-b border-[var(--line-soft)] py-3.5 focus-ring rounded-sm"
                >
                  <span className="font-display text-2xl text-charcoal transition group-hover:text-cocoa">
                    {p.title}
                  </span>
                  <span className="text-xs tracking-wide text-muted">
                    {formatProductPrice()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/juices/" className="btn-secondary mt-8 inline-flex">
            View juices
          </Link>
        </div>

        <div className="lg:col-span-7" data-reveal>
          {hero && (
            <>
              <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep/40 sm:aspect-[5/4]">
                <Image
                  src={hero.image}
                  alt={hero.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {products.slice(0, 3).map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.handle}/`}
                    className="relative aspect-square overflow-hidden bg-cream-deep/40 focus-ring"
                  >
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="20vw"
                      className="object-cover"
                    />
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
