"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { NAV_PRIMARY, SITE } from "@/lib/site";

const TICKER = [
  "Handmade gourmet chocolates",
  "Build a box — 9 bars in each",
  "More than just chocolate",
];

function IconCart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 7h15l-1.5 9H8L6 7z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M6 7L5 4H2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="9" cy="20" r="1.2" fill="currentColor" />
      <circle cx="17" cy="20" r="1.2" fill="currentColor" />
    </svg>
  );
}

function Flourish() {
  return (
    <span className="mx-3 inline-block text-gold/80" aria-hidden>
      ❦
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { itemCount, openDrawer } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-cream">
      <div className="bg-accent text-cream">
        <div className="relative h-9 overflow-hidden text-[10px] uppercase tracking-[0.22em] sm:text-[11px]">
          <div className="container-choc hidden h-full items-center justify-center md:flex">
            <div className="flex whitespace-nowrap">
              {TICKER.map((item, i) => (
                <span key={item} className="flex items-center">
                  {i > 0 && <Flourish />}
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="flex h-full items-center md:hidden" aria-hidden>
            <div className="ticker-track flex whitespace-nowrap">
              {[0, 1].map((copy) => (
                <span key={copy} className="flex items-center px-2">
                  {TICKER.map((item, i) => (
                    <span key={`${copy}-${item}`} className="flex items-center">
                      {(copy > 0 || i > 0) && <Flourish />}
                      <span>{item}</span>
                    </span>
                  ))}
                  <Flourish />
                </span>
              ))}
            </div>
          </div>
          <span className="sr-only">{TICKER.join(". ")}</span>
        </div>
      </div>

      <div className="border-b border-[var(--line)]">
        <div className="container-choc flex h-[4.25rem] items-center justify-between sm:h-[4.75rem]">
          <Link href="/" className="flex flex-col leading-none focus-ring rounded-sm">
            <span className="font-display text-[1.65rem] tracking-[0.06em] text-charcoal sm:text-[1.85rem]">
              {SITE.name}
            </span>
            <span className="mt-0.5 text-[9px] uppercase tracking-[0.28em] text-muted">
              Gourmet Chocolates
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_PRIMARY.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-sm text-[12px] tracking-[0.14em] text-charcoal/80 transition hover:text-charcoal"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact/"
              className="focus-ring rounded-sm text-[12px] tracking-[0.14em] text-charcoal/80 transition hover:text-charcoal"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={openDrawer}
              className="relative inline-flex h-10 w-10 items-center justify-center text-charcoal/80 transition hover:text-charcoal focus-ring rounded-sm"
              aria-label={`Open cart${itemCount ? `, ${itemCount} items` : ""}`}
            >
              <IconCart />
              <span className="absolute right-1.5 top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-accent px-0.5 text-[9px] text-cream">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            </button>
            <button
              type="button"
              className="ml-1 inline-flex h-10 w-10 items-center justify-center border border-[var(--line)] text-charcoal focus-ring lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <div className="flex w-4 flex-col gap-1">
                <span
                  className={`h-px bg-charcoal transition ${open ? "translate-y-[5px] rotate-45" : ""}`}
                />
                <span className={`h-px bg-charcoal transition ${open ? "opacity-0" : ""}`} />
                <span
                  className={`h-px bg-charcoal transition ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-b border-[var(--line)] bg-cream-soft lg:hidden"
        >
          <nav className="container-choc flex flex-col gap-1 py-4" aria-label="Mobile">
            {[...NAV_PRIMARY, { href: "/contact/", label: "Contact" }, { href: "/faq/", label: "FAQ" }].map(
              (item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="focus-ring rounded-sm px-2 py-3 text-base text-charcoal"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <button
              type="button"
              className="mt-2 rounded-sm px-2 py-3 text-left text-base text-charcoal focus-ring"
              onClick={() => {
                setOpen(false);
                openDrawer();
              }}
            >
              Cart ({itemCount})
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
