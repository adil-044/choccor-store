"use client";

import { useSoftReveal } from "@/components/motion/useSoftReveal";
import { REVIEWS } from "@/lib/catalog";

export function ReviewsBand() {
  const ref = useSoftReveal<HTMLElement>();

  return (
    <section ref={ref} className="section-pad border-b border-[var(--line)] bg-cream">
      <div className="container-choc">
        <div className="mb-10 max-w-xl" data-reveal>
          <p className="eyebrow">From customers</p>
          <h2 className="display-lg mt-3">Kind words</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {REVIEWS.map((review) => (
            <figure
              key={review.author}
              data-reveal
              className="border border-[var(--line)] bg-cream-soft/70 px-6 py-8 sm:px-8"
            >
              <blockquote className="font-display text-2xl leading-snug text-charcoal sm:text-[1.65rem]">
                “{review.quote}”
              </blockquote>
              <figcaption className="mt-6 label-caps text-gold">
                — {review.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
