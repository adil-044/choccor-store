import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/shop/",
    "/juices/",
    "/build-a-box/",
    "/apparel/",
    "/our-story/",
    "/contact/",
    "/faq/",
    "/shipping/",
    "/returns/",
    "/privacy/",
  ];

  const productRoutes = PRODUCTS.map((p) => `/products/${p.handle}/`);

  return [...staticRoutes, ...productRoutes].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path.startsWith("/products/") ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/products/") ? 0.7 : 0.8,
  }));
}
