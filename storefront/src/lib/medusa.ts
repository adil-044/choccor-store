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

function asStorefront(list: ChoccorProduct[]): StorefrontProduct[] {
  return list.map((p) => withAssetPaths({ ...p, source: "fallback" as const }));
}

async function fetchMedusaMapped(): Promise<StorefrontProduct[] | null> {
  try {
    const res = await Promise.race([
      medusa.store.product.list({ limit: 50 }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Medusa timeout")), 2500)
      ),
    ]);

    const mapped = (
      (res.products || []) as Array<Parameters<typeof mapMedusaProduct>[0]>
    )
      .map((p) => mapMedusaProduct(p))
      .filter(Boolean) as StorefrontProduct[];

    return mapped.length ? mapped : null;
  } catch {
    return null;
  }
}

function pickFromMap(
  list: ChoccorProduct[],
  byHandle: Map<string, StorefrontProduct>
): StorefrontProduct[] {
  return list.map(
    (p) =>
      byHandle.get(p.handle) ||
      withAssetPaths({ ...p, source: "fallback" as const })
  );
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
    featured: asStorefront(featuredProducts()),
    juices: asStorefront(productsBySection("juices")),
    tray: asStorefront(productsBySection("tray")),
    byob: asStorefront(productsBySection("byob")),
    source: "fallback" as const,
  };

  const mapped = await fetchMedusaMapped();
  if (!mapped) return fallback;

  const byHandle = new Map(mapped.map((p) => [p.handle, p]));
  return {
    featured: pickFromMap(featuredProducts(), byHandle),
    juices: pickFromMap(productsBySection("juices"), byHandle),
    tray: pickFromMap(productsBySection("tray"), byHandle),
    byob: pickFromMap(productsBySection("byob"), byHandle),
    source: "medusa",
  };
}

export async function getCatalogProducts(): Promise<{
  products: StorefrontProduct[];
  source: "medusa" | "fallback";
}> {
  const local = PRODUCTS.filter((p) => !p.exampleOnly);
  const mapped = await fetchMedusaMapped();
  if (!mapped) {
    return { products: asStorefront(local), source: "fallback" };
  }
  const byHandle = new Map(mapped.map((p) => [p.handle, p]));
  return {
    products: pickFromMap(local, byHandle),
    source: "medusa",
  };
}

export async function getStorefrontProduct(
  handle: string
): Promise<StorefrontProduct | null> {
  const local = PRODUCTS.find((p) => p.handle === handle);
  if (!local) return null;

  const mapped = await fetchMedusaMapped();
  if (!mapped) return withAssetPaths({ ...local, source: "fallback" as const });
  const hit = mapped.find((p) => p.handle === handle);
  return hit || withAssetPaths({ ...local, source: "fallback" as const });
}

export function withLocalAssetPaths(
  product: ChoccorProduct
): StorefrontProduct {
  return withAssetPaths({ ...product, source: "fallback" as const });
}
