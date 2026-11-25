/** Site-wide constants — only confirmed public facts. */

export const SITE = {
  name: "Choccor",
  fullName: "Choccor Gourmet Chocolates",
  tagline: "More than just chocolate",
  owner: "Courtney Foreman",
  agency: "Uptisement",
  /** Public Facebook share link provided by the client. */
  facebookUrl: "https://www.facebook.com/share/g/1AGZq8sVwy/",
  /** Live Pages origin (used for absolute SEO / OG URLs). */
  origin: "https://adil-044.github.io",
  basePath: "/choccor-store",
  phone: "TBC",
  email: "TBC",
  address: "TBC",
} as const;

export const BOX_SIZE = 9;

export const NAV_PRIMARY = [
  { href: "/shop/", label: "Shop" },
  { href: "/build-a-box/", label: "Build a Box" },
  { href: "/juices/", label: "Juices" },
  { href: "/our-story/", label: "Our Story" },
] as const;

export const NAV_FOOTER = [
  { href: "/shop/", label: "Shop chocolates" },
  { href: "/build-a-box/", label: "Build a box" },
  { href: "/juices/", label: "Natural juices" },
  { href: "/our-story/", label: "Our story" },
  { href: "/faq/", label: "FAQ" },
  { href: "/contact/", label: "Contact" },
] as const;

export const NAV_POLICIES = [
  { href: "/shipping/", label: "Shipping" },
  { href: "/returns/", label: "Returns" },
  { href: "/privacy/", label: "Privacy" },
] as const;

export function absoluteUrl(path = "/"): string {
  const base = `${SITE.origin}${SITE.basePath}`.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}
