import Link from "next/link";
import { BRAND } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-cream-deep/50">
      <div className="container-choc grid gap-10 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-3xl tracking-[0.04em] text-charcoal">Choccor</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
            {BRAND.tagline}. Handmade chocolates and natural juices by {BRAND.owner}.
          </p>
        </div>
        <div>
          <p className="label-caps">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-charcoal/80">
            <li>
              <Link href="/#chocolates" className="transition hover:text-charcoal">
                Chocolates
              </Link>
            </li>
            <li>
              <Link href="/#build" className="transition hover:text-charcoal">
                Build a box
              </Link>
            </li>
            <li>
              <Link href="/#juices" className="transition hover:text-charcoal">
                Natural juices
              </Link>
            </li>
            <li>
              <Link href="/#story" className="transition hover:text-charcoal">
                Our story
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="label-caps">Studio</p>
          <ul className="mt-4 space-y-2 text-sm text-charcoal/80">
            <li>Owner: {BRAND.owner}</li>
            <li>Agency partner: {BRAND.agency}</li>
            <li className="text-muted">
              Phone: <span className="price-tbc !text-muted">TBC</span>
            </li>
            <li className="text-muted">Email unconfirmed — omitted until published.</li>
          </ul>
        </div>
      </div>
      <div className="hairline">
        <div className="container-choc flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.
          </p>
          <p className="italic">One sweet moment at a time.</p>
        </div>
      </div>
    </footer>
  );
}
