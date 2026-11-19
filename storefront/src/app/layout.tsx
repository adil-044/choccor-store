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
import { AppProviders } from "@/components/providers/AppProviders";
import { absoluteUrl, SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: SITE.fullName,
    template: `%s · ${SITE.name}`,
  },
  description:
    "More than just chocolate — handmade chocolates and natural juices by Courtney Foreman.",
  openGraph: {
    type: "website",
    siteName: SITE.fullName,
    locale: "en_CA",
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
  },
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
        <AppProviders>
          <SmoothScroll>
            <div className="paper-grain min-h-screen bg-cream">
              <SiteHeader />
              <main id="main">{children}</main>
              <SiteFooter />
            </div>
          </SmoothScroll>
        </AppProviders>
      </body>
    </html>
  );
}
