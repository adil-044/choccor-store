"use client";

import { Bestsellers } from "@/components/home/Bestsellers";
import { BrandHero } from "@/components/home/BrandHero";
import { ByobBand } from "@/components/home/ByobBand";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { FeaturedSplit } from "@/components/home/FeaturedSplit";
import { JuicesBand } from "@/components/home/JuicesBand";
import { NewsletterBand } from "@/components/home/NewsletterBand";
import { ReviewsBand } from "@/components/home/ReviewsBand";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import type { StorefrontProduct } from "@/lib/medusa";

export function HomeExperience({
  featured,
  juices,
  tray,
  source,
}: {
  featured: StorefrontProduct[];
  juices: StorefrontProduct[];
  tray: StorefrontProduct[];
  byob: StorefrontProduct[];
  source: "medusa" | "fallback";
}) {
  const trayProduct = tray[0];
  const bestsellers = featured.filter(
    (p) =>
      !p.exampleOnly &&
      p.category !== "juice" &&
      p.category !== "tray"
  );

  const gallery = trayProduct
    ? buildGallery(trayProduct, featured)
    : [];

  return (
    <>
      {process.env.NODE_ENV === "development" && source === "fallback" && (
        <div className="border-b border-[var(--line)] bg-cream-deep/60">
          <p className="container-choc py-1.5 text-center text-[11px] tracking-wide text-muted/80">
            Preview mode — seeded catalog (Medusa offline)
          </p>
        </div>
      )}
      <BrandHero />
      <CategoryTiles />
      <Bestsellers products={bestsellers} />
      {trayProduct && <FeaturedSplit product={trayProduct} gallery={gallery} />}
      <ByobBand />
      <JuicesBand products={juices} />
      <StoryTeaser />
      <ReviewsBand />
      <NewsletterBand />
    </>
  );
}

function buildGallery(
  hero: StorefrontProduct,
  featured: StorefrontProduct[]
) {
  const items: { src: string; alt: string }[] = [
    { src: hero.image, alt: hero.imageAlt },
  ];
  const companions = featured.filter((p) =>
    ["baileys-dream", "mango-madness", "mint-chocolate", "pistachio-chocolate"].includes(
      p.handle
    )
  );
  for (const p of companions) {
    if (items.length >= 4) break;
    if (!items.some((i) => i.src === p.image)) {
      items.push({ src: p.image, alt: p.imageAlt });
    }
  }
  return items;
}
