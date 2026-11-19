"use client";

import { FormEvent, useState } from "react";
import { useSoftReveal } from "@/components/motion/useSoftReveal";

export function NewsletterBand() {
  const ref = useSoftReveal<HTMLElement>();
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      ref={ref}
      className="section-pad border-b border-[var(--line)] bg-accent text-cream"
    >
      <div className="container-choc grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6" data-reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">
            Newsletter
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] tracking-tight text-cream">
            Sweet moments, occasionally
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/75">
            Be first to hear about new chocolates and seasonal boxes.
          </p>
        </div>
        <div className="lg:col-span-6" data-reveal>
          {submitted ? (
            <p className="rounded-md border border-cream/20 bg-cream/5 px-5 py-4 text-sm text-cream/90">
              Thanks — we&apos;ll be in touch when signup goes live.
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Email address"
                className="w-full rounded-md border border-cream/25 bg-cream/10 px-4 py-3.5 text-sm text-cream placeholder:text-cream/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center rounded-md bg-cream px-6 py-3.5 text-[12px] font-medium uppercase tracking-[0.22em] text-accent transition hover:bg-cream-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
