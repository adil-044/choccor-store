import Link from "next/link";
import { BRAND } from "@/lib/catalog";
import { NAV_FOOTER, NAV_POLICIES, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-cream-deep/50">
      <div className="container-choc grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <p className="font-display text-3xl tracking-[0.04em] text-charcoal">
            {SITE.name}
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
            {BRAND.tagline}. Handmade chocolates and natural juices by{" "}
            {BRAND.owner}.
          </p>
          <a
            href={SITE.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex text-sm text-charcoal/80 underline-offset-4 transition hover:text-charcoal hover:underline focus-ring rounded-sm"
          >
            Facebook
          </a>
        </div>

        <div>
          <p className="label-caps">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-charcoal/80">
            {NAV_FOOTER.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition hover:text-charcoal focus-ring rounded-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label-caps">Policies</p>
          <ul className="mt-4 space-y-2 text-sm text-charcoal/80">
            {NAV_POLICIES.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition hover:text-charcoal focus-ring rounded-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/cart/"
                className="transition hover:text-charcoal focus-ring rounded-sm"
              >
                Cart
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="label-caps">Studio</p>
          <ul className="mt-4 space-y-2 text-sm text-charcoal/80">
            <li>Owner: {BRAND.owner}</li>
            <li>
              <a
                href={SITE.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:underline focus-ring rounded-sm"
              >
                Message us on Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="hairline">
        <div className="container-choc flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.
          </p>
          <p className="sm:text-right">
            <span className="italic">One sweet moment at a time.</span>
            <span className="mx-2 text-muted/40" aria-hidden>
              ·
            </span>
            <span className="tracking-wide">Site by {BRAND.agency}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
