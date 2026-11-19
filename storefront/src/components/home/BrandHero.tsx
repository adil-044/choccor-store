"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/catalog";
import { withBasePath } from "@/lib/paths";
import { SITE } from "@/lib/site";

let registered = false;

/**
 * Clean split hero — cream editorial panel + one real tray photograph.
 * Do not use /hero-products.webp here: that asset is a pre-composited mock
 * with translucent overlays that read as ghosts behind the headline.
 */
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
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.04,
        }
      );
      const photo = el.querySelector("[data-parallax-hero]");
      if (photo) {
        gsap.fromTo(
          photo,
          { scale: 1.06 },
          { scale: 1, duration: 1.4, ease: "power2.out" }
        );
        gsap.to(photo, {
          yPercent: 6,
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
      className="border-b border-[var(--line)] bg-cream"
    >
      <div className="grid lg:grid-cols-2 lg:min-h-[min(88vh,46rem)]">
        {/* Text — solid cream, no photo bleed underneath */}
        <div className="relative z-[1] flex flex-col justify-center bg-cream px-5 py-16 sm:px-10 sm:py-20 lg:px-14 xl:px-20">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <p data-hero className="eyebrow">
              {SITE.fullName}
            </p>
            <h1
              data-hero
              className="mt-5 font-display text-[clamp(2.6rem,6.5vw,4.75rem)] leading-[0.98] tracking-[-0.025em] text-charcoal"
            >
              {SITE.tagline}
            </h1>
            <p
              data-hero
              className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg"
            >
              Handmade chocolates and natural juices by {BRAND.owner} — creating
              sweet and blissful treats to remind you it&apos;s never too late to
              live life to the fullest … one sweet moment at a time.
            </p>
            <div
              data-hero
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link href="/shop/" className="btn-primary w-full sm:w-auto">
                Shop chocolates
                <span className="text-gold" aria-hidden>
                  ❦
                </span>
              </Link>
              <Link
                href="/build-a-box/"
                className="btn-secondary w-full sm:w-auto"
              >
                Build a box
              </Link>
            </div>
          </div>
        </div>

        {/* Photo — full-bleed to the right edge; single clean tray shot */}
        <div className="relative min-h-[22rem] overflow-hidden bg-cream-deep sm:min-h-[28rem] lg:min-h-full">
          <div className="absolute inset-0" data-parallax-hero>
            <Image
              src={withBasePath("/products/chocolate-tray.webp")}
              alt="Choccor chocolate tray — handmade assortment for parties and gifting"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
