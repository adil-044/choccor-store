import type { NextConfig } from "next";

/**
 * GitHub Pages project sites serve under /<repo>/ (e.g. /choccor-store).
 * Set NEXT_PUBLIC_BASE_PATH=/choccor-store for Pages builds; leave unset for local root.
 */
const rawBase = process.env.NEXT_PUBLIC_BASE_PATH || "";
const basePath = rawBase.replace(/\/$/, "");

const nextConfig: NextConfig = {
  // Static export for shareable zip / GitHub Pages (no Node backend)
  output: "export",
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ["gsap"],
  },
};

export default nextConfig;
