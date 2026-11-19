/**
 * Prefix absolute site paths with NEXT_PUBLIC_BASE_PATH for GitHub Pages.
 * Next.js Link/router honor basePath automatically; next/image with
 * `images.unoptimized` does not — call this for public/ asset URLs.
 */
export function getBasePath(): string {
  return (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
}

export function withBasePath(path: string): string {
  if (!path || path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const base = getBasePath();
  if (!base) return path;
  if (path.startsWith(base + "/") || path === base) return path;
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}
