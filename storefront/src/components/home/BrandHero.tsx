"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { withBasePath } from "@/lib/paths";
import { SITE } from "@/lib/site";

let registered = false;

export function BrandHero() {
  const root = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-hero]"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.05,
        }
      );
      const parallax = el.querySelector("[data-parallax-hero]");
      if (parallax) {
        gsap.fromTo(
          parallax,
          { scale: 1.08, y: 18 },
          {
            scale: 1,
            y: 0,
            duration: 1.6,
            ease: "power2.out",
          }
        );
        gsap.to(parallax, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative min-h-[min(92vh,52rem)] overflow-hidden border-b border-[var(--line)] bg-cream"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 overflow-hidden" data-parallax-hero>
          <Image
            src={withBasePath("/hero-products.webp")}
            alt="Assorted Choccor handmade chocolates on a cream studio surface"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/88 to-cream/25 sm:via-cream/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-cream/30" />
      </div>

      <div className="container-choc relative flex min-h-[min(92vh,52rem)] flex-col justify-end pb-14 pt-28 sm:justify-center sm:pb-20 sm:pt-24">
        <div className="max-w-xl">
          <p data-hero className="eyebrow">
            {SITE.fullName}
          </p>
          <h1
            data-hero
            className="mt-5 font-display text-[clamp(2.8rem,8vw,5.5rem)] leading-[0.98] tracking-[-0.025em] text-charcoal"
          >
            {SITE.tagline}
          </h1>
          <p
            data-hero
            className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            Handmade gourmet chocolates and natural juices by Courtney Foreman —
            crafted to savour life&apos;s sweet moments, one piece at a time.
          </p>
          <div data-hero className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/shop/" className="btn-primary w-full sm:w-auto">
              Shop chocolates
              <span className="text-gold" aria-hidden>
                ❦
              </span>
            </Link>
            <Link href="/build-a-box/" className="btn-secondary w-full sm:w-auto">
              Build a box
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
