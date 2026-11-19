import Medusa from "@medusajs/js-sdk";
import {
  PRODUCTS,
  type ChoccorProduct,
  featuredProducts,
  productsBySection,
} from "./catalog";
import { withBasePath } from "./paths";

function withAssetPaths<T extends ChoccorProduct>(product: T): T {
  return {
    ...product,
    image: withBasePath(product.image),
  };
}

const MEDUSA_BACKEND_URL =
  process.env.MEDUSA_BACKEND_URL ||
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ||
  "http://localhost:9000";

const PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";

export const medusa = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  publishableKey: PUBLISHABLE_KEY || undefined,
  debug: process.env.NODE_ENV === "development",
});

export type StorefrontProduct = ChoccorProduct & {
  source: "medusa" | "fallback";
};

function mapMedusaProduct(raw: {
  id: string;
  handle?: string | null;
  title?: string | null;
  description?: string | null;
  thumbnail?: string | null;
  metadata?: Record<string, unknown> | null;
}): StorefrontProduct | null {
  const handle = raw.handle || "";
  const local = PRODUCTS.find((p) => p.handle === handle);
  if (!local) return null;

  const thumb = raw.thumbnail || local.image;
  const image =
    thumb.startsWith("http://") || thumb.startsWith("https://")
      ? thumb
      : thumb.startsWith("/")
        ? thumb
        : local.image;
  return withAssetPaths({
    ...local,
    id: raw.id || local.id,
    title: raw.title || local.title,
    description: raw.description || local.description,
    image,
    source: "medusa" as const,
  });
}

/**
 * Fetch products for the homepage. Falls back to seeded catalog
 * whenever Medusa is unreachable or returns nothing usable.
 */
export async function getHomepageProducts(): Promise<{
  featured: StorefrontProduct[];
  juices: StorefrontProduct[];
  tray: StorefrontProduct[];
  byob: StorefrontProduct[];
  source: "medusa" | "fallback";
}> {
  const fallback = {
    featured: featuredProducts().map((p) =>
      withAssetPaths({ ...p, source: "fallback" as const })
    ),
    juices: productsBySection("juices").map((p) =>
      withAssetPaths({ ...p, source: "fallback" as const })
    ),
    tray: productsBySection("tray").map((p) =>
      withAssetPaths({ ...p, source: "fallback" as const })
    ),
    byob: productsBySection("byob").map((p) =>
      withAssetPaths({ ...p, source: "fallback" as const })
    ),
    source: "fallback" as const,
  };

  try {
    const res = await Promise.race([
      medusa.store.product.list({ limit: 50 }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Medusa timeout")), 2500)
      ),
    ]);

    const mapped = ((res.products || []) as Array<Parameters<typeof mapMedusaProduct>[0]>)
      .map((p) => mapMedusaProduct(p))
      .filter(Boolean) as StorefrontProduct[];

    if (!mapped.length) return fallback;

    const byHandle = new Map(mapped.map((p) => [p.handle, p]));
    const pick = (list: ChoccorProduct[]) =>
      list.map(
        (p) =>
          byHandle.get(p.handle) ||
          withAssetPaths({ ...p, source: "fallback" as const })
      );

    return {
      featured: pick(featuredProducts()),
      juices: pick(productsBySection("juices")),
      tray: pick(productsBySection("tray")),
      byob: pick(productsBySection("byob")),
      source: "medusa",
    };
  } catch {
    return fallback;
  }
}
