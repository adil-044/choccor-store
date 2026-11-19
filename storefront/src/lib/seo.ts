import type { Metadata } from "next";
import { absoluteUrl, SITE } from "./site";
import { withBasePath } from "./paths";

const DEFAULT_OG = "/products/chocolate-tray.webp";

export function pageMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http")
    ? image
    : `${SITE.origin}${withBasePath(image.startsWith("/") ? image : `/${image}`)}`;

  const isHome = path === "/" || path === "";

  return {
    title: isHome ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · ${SITE.name}`,
      description,
      url,
      siteName: SITE.fullName,
      locale: "en_CA",
      type: "website",
      images: [{ url: imageUrl, alt: `${SITE.name} — ${title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${SITE.name}`,
      description,
      images: [imageUrl],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}
