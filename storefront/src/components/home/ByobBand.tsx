"use client";

import Image from "next/image";
import Link from "next/link";
import { useSoftReveal } from "@/components/motion/useSoftReveal";
import { withBasePath } from "@/lib/paths";

export function ByobBand() {
  const ref = useSoftReveal<HTMLElement>();

  return (
    <section
      id="build"
      ref={ref}
      className="border-b border-[var(--line)] bg-linen"
    >
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[22rem] overflow-hidden bg-cream-deep/40 lg:min-h-[32rem]">
          <Image
            src={withBasePath("/reference/byob-banner-full.webp")}
            alt="Build Your Own Chocolate Bar — Choccor banner"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
            data-reveal
          />
        </div>
        <div className="flex flex-col justify-center px-5 py-14 sm:px-10 lg:px-14 lg:py-20">
          <p className="eyebrow" data-reveal>
            Build Your Own Bar
          </p>
          <h2 className="display-lg mt-4" data-reveal>
            Choose your chocolate style
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted" data-reveal>
            Build a box with nine bars in each. Pick from Courtney&apos;s handmade
            chocolates — milk, half &amp; half, and named pieces from the kitchen.
            Retail details are still being confirmed.
          </p>
          <ul className="mt-8 space-y-3" data-reveal>
            <li className="spec-line flex justify-between gap-4 border-b border-[var(--line-soft)] pb-3">
              <span>Bars per box</span>
              <span className="text-charcoal/80">9</span>
            </li>
            <li className="spec-line flex justify-between gap-4 border-b border-[var(--line-soft)] pb-3">
              <span>Retail price</span>
              <span className="text-charcoal/80">TBC</span>
            </li>
            <li className="spec-line flex justify-between gap-4 pb-1">
              <span>Handmade by</span>
              <span className="text-charcoal/80">Courtney Foreman</span>
            </li>
          </ul>
          <Link href="/build-a-box/" className="btn-primary mt-10 w-full max-w-xs" data-reveal>
            Build a box
            <span className="text-gold" aria-hidden>
              ❦
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
