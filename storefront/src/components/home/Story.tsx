"use client";

import { useSoftReveal } from "@/components/motion/useSoftReveal";
import { BRAND, REVIEWS } from "@/lib/catalog";

export function Story() {
  const ref = useSoftReveal<HTMLDivElement>(0.1);

  return (
    <section id="story" className="border-t border-[var(--line)] bg-linen py-16 sm:py-24">
      <div ref={ref} className="container-choc">
        <div className="grid gap-12 lg:grid-cols-12" data-reveal>
          <div className="lg:col-span-4">
            <p className="label-caps text-gold">Our story</p>
            <h2 className="display-lg mt-3">
              Savouring life&apos;s sweet moments
            </h2>
            <p className="mt-4 text-sm text-muted">
              {BRAND.owner} · Owner &amp; Founder
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="font-display text-2xl leading-relaxed text-charcoal sm:text-3xl">
              {BRAND.about}
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-[var(--line)] pt-12 lg:grid-cols-2">
          {REVIEWS.map((review) => (
            <blockquote key={review.author} data-reveal className="pr-4">
              <p className="font-display text-2xl leading-snug text-charcoal sm:text-[1.75rem]">
                &ldquo;{review.quote}&rdquo;
              </p>
              <footer className="mt-5 spec-line text-muted">
                — {review.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
