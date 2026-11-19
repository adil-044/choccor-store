import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F4EDE4",
          soft: "#FAF6F0",
          deep: "#EBE2D6",
        },
        linen: "#F7F1E8",
        cocoa: {
          DEFAULT: "#2A160E",
          mid: "#4A2C1A",
          soft: "#8B5E3C",
        },
        accent: "#3D2317",
        gold: "#B08A4F",
        terracotta: "#A66B4A",
        caramel: "#C4894A",
        charcoal: "#2C241E",
        ink: "#1C1410",
        muted: "#6B5A4C",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        body: ["var(--font-body)", "ui-sans-serif", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
