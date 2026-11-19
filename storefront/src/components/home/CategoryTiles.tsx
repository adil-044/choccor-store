"use client";

import Image from "next/image";
import Link from "next/link";
import { useSoftReveal } from "@/components/motion/useSoftReveal";
import { withBasePath } from "@/lib/paths";

const TILES = [
  {
    href: "/shop/?filter=chocolates",
    label: "Chocolates",
    copy: "Named pieces from Courtney's kitchen",
    image: "/products/pistachio-chocolate.webp",
    alt: "Pistachio chocolate on cream studio background",
  },
  {
    href: "/build-a-box/",
    label: "Build a Box",
    copy: "Nine bars in each — your selection",
    image: "/hero-byob.webp",
    alt: "Build Your Own Chocolate Bar display",
  },
  {
    href: "/juices/",
    label: "Juices",
    copy: "Berry Rush, Avocado Boost, Peanut Punch",
    image: "/products/juice-berry-rush.webp",
    alt: "Berry Rush natural juice",
  },
] as const;

export function CategoryTiles() {
  const ref = useSoftReveal<HTMLElement>();

  return (
    <section ref={ref} className="section-pad border-b border-[var(--line)]">
      <div className="container-choc">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div data-reveal>
            <p className="eyebrow">Explore</p>
            <h2 className="display-lg mt-3">Find your sweet moment</h2>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {TILES.map((tile) => (
            <Link
              key={tile.href}
              href={tile.href}
              data-reveal
              className="group relative aspect-[4/5] overflow-hidden bg-cream-deep/40 focus-ring"
            >
              <Image
                src={withBasePath(tile.image)}
                alt={tile.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/70 via-cocoa/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-cream sm:p-6">
                <p className="font-display text-3xl tracking-tight">{tile.label}</p>
                <p className="mt-1 text-sm text-cream/80">{tile.copy}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
