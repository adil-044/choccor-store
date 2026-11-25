"use client";

import Image from "next/image";
import Link from "next/link";
import { useSoftReveal } from "@/components/motion/useSoftReveal";
import { withBasePath } from "@/lib/paths";

const SHOTS = [
  {
    src: "/apparel/tee-black.webp",
    alt: "Black Choccor t-shirt with gold logo",
  },
  {
    src: "/apparel/poster.webp",
    alt: "Choccor apparel poster — Modern. Strong. Different.",
  },
] as const;

export function ApparelBand() {
  const ref = useSoftReveal<HTMLElement>();

  return (
    <section
      id="apparel"
      ref={ref}
      className="section-pad border-b border-[var(--line)] bg-charcoal text-cream"
    >
      <div className="container-choc grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5" data-reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            Coming soon
          </p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.05] tracking-tight text-cream">
            Choccor Apparel
          </h2>
          <p className="mt-3 font-display text-xl italic text-gold/90 sm:text-2xl">
            Modern. Strong. Different.
          </p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/70">
            Branded pieces from the Choccor studio — a quiet preview for now.
            Not available to order yet.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/apparel/"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-cream/35 bg-transparent px-6 py-3.5 text-center text-[12px] font-medium uppercase tracking-[0.22em] text-cream transition hover:bg-cream/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              View preview
            </Link>
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center rounded-md px-5 py-3.5 text-[12px] font-medium uppercase tracking-[0.2em] text-gold transition hover:text-cream focus-ring"
            >
              Notify me
            </Link>
          </div>
        </div>

        <div
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7"
          data-reveal
        >
          {SHOTS.map((shot) => (
            <div
              key={shot.src}
              className="relative aspect-[3/4] overflow-hidden bg-charcoal/40"
            >
              <Image
                src={withBasePath(shot.src)}
                alt={shot.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 28vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
