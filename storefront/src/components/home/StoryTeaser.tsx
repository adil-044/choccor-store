"use client";

import Image from "next/image";
import Link from "next/link";
import { useSoftReveal } from "@/components/motion/useSoftReveal";
import { BRAND } from "@/lib/catalog";
import { withBasePath } from "@/lib/paths";

export function StoryTeaser() {
  const ref = useSoftReveal<HTMLElement>();
  // First-person bio — keep Courtney's words; do not paraphrase pronouns.
  const excerpt = BRAND.about.slice(0, 280).trimEnd() + "…";

  return (
    <section
      id="story"
      ref={ref}
      className="section-pad border-b border-[var(--line)] bg-linen/50"
    >
      <div className="container-choc grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="relative aspect-[4/5] overflow-hidden bg-cream-deep/40 lg:col-span-5" data-reveal>
          <Image
            src={withBasePath("/showcase/pistachio-poster.jpg")}
            alt="Choccor pistachio chocolate photography"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
        <div className="lg:col-span-7" data-reveal>
          <p className="eyebrow">Our story</p>
          <h2 className="display-lg mt-3">Meet Courtney</h2>
          <p className="mt-2 text-sm text-muted">
            Owner &amp; founder — {BRAND.owner} (he/him)
          </p>
          <blockquote className="mt-8 font-display text-xl leading-relaxed text-charcoal sm:text-2xl">
            “{excerpt}”
          </blockquote>
          <Link href="/our-story/" className="btn-secondary mt-10 inline-flex">
            Read our story
          </Link>
        </div>
      </div>
    </section>
  );
}
