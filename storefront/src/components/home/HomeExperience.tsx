"use client";

import { BuildBox } from "@/components/home/BuildBox";
import { FeaturedHero } from "@/components/home/FeaturedHero";
import { Juices } from "@/components/home/Juices";
import { ShopGrid } from "@/components/home/ShopGrid";
import { Story } from "@/components/home/Story";
import type { StorefrontProduct } from "@/lib/medusa";

export function HomeExperience({
  featured,
  juices,
  tray,
  byob,
  source,
}: {
  featured: StorefrontProduct[];
  juices: StorefrontProduct[];
  tray: StorefrontProduct[];
  byob: StorefrontProduct[];
  source: "medusa" | "fallback";
}) {
  // Featured buy panel: prefer tray (party assortment) with gallery of real pieces
  const heroProduct =
    tray[0] ??
    featured.find((p) => p.handle === "pistachio-almond-bar") ??
    featured[0];

  const gallery = buildGallery(heroProduct, featured, tray);

  // Shop grid: named chocolates/bars/bites only (no juices, tray, BYOB examples)
  const shopProducts = featured.filter(
    (p) => !p.exampleOnly && p.category !== "juice" && p.category !== "tray"
  );

  return (
    <>
      {process.env.NODE_ENV === "development" && source === "fallback" && (
        <div className="border-b border-[var(--line)] bg-cream-deep/60">
          <p className="container-choc py-1.5 text-center text-[11px] tracking-wide text-muted/80">
            Preview mode — seeded catalog (Medusa offline)
          </p>
        </div>
      )}
      {heroProduct && (
        <FeaturedHero product={heroProduct} gallery={gallery} />
      )}
      <ShopGrid products={shopProducts} />
      <BuildBox examples={byob} />
      <Juices products={juices} />
      <Story />
    </>
  );
}

function buildGallery(
  hero: StorefrontProduct,
  featured: StorefrontProduct[],
  tray: StorefrontProduct[]
) {
  const items: { src: string; alt: string }[] = [
    { src: hero.image, alt: hero.imageAlt },
  ];

  // Add real companion shots — tray pieces / signature chocolates
  const companions = [
    ...tray.filter((p) => p.id !== hero.id),
    ...featured.filter(
      (p) =>
        p.id !== hero.id &&
        ["baileys-dream", "mango-madness", "mint-chocolate", "pistachio-chocolate"].includes(
          p.handle
        )
    ),
  ];

  for (const p of companions) {
    if (items.length >= 4) break;
    if (!items.some((i) => i.src === p.image)) {
      items.push({ src: p.image, alt: p.imageAlt });
    }
  }

  // Pad with more featured if needed
  for (const p of featured) {
    if (items.length >= 4) break;
    if (!items.some((i) => i.src === p.image)) {
      items.push({ src: p.image, alt: p.imageAlt });
    }
  }

  return items;
}
