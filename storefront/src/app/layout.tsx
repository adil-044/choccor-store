import type { Metadata } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/outfit/300.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Choccor Gourmet Chocolates",
    template: "%s · Choccor",
  },
  description:
    "MORE THAN JUST CHOCOLATE — handmade chocolates and natural juices by Courtney Foreman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        style={{
          ["--font-display" as string]:
            '"Cormorant Garamond", ui-serif, Georgia, serif',
          ["--font-body" as string]: '"Outfit", ui-sans-serif, sans-serif',
          ["--font-mono" as string]:
            '"IBM Plex Mono", ui-monospace, monospace',
        }}
      >
        <SmoothScroll>
          <div className="paper-grain min-h-screen bg-cream">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
