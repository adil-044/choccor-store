"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

function ensurePlugin() {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Scroll-reveal for a section. Respects prefers-reduced-motion.
 */
export function useGsapReveal<T extends HTMLElement>(options?: {
  y?: number;
  stagger?: number;
  childSelector?: string;
}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.style.opacity = "1";
      return;
    }

    ensurePlugin();
    const targets = options?.childSelector
      ? el.querySelectorAll(options.childSelector)
      : [el];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: options?.y ?? 42, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.05,
          ease: "power3.out",
          stagger: options?.stagger ?? 0.12,
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Subtle parallax on product shots inside this section
      el.querySelectorAll("[data-parallax-shot]").forEach((shot) => {
        gsap.fromTo(
          shot,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: shot.closest("article, figure, div") || shot,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, [options?.childSelector, options?.stagger, options?.y]);

  return ref;
}

/**
 * Hero entrance timeline + soft parallax on the full-bleed image.
 */
export function useHeroTimeline<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.querySelectorAll("[data-hero]").forEach((node) => {
        (node as HTMLElement).style.opacity = "1";
        (node as HTMLElement).style.transform = "none";
      });
      return;
    }

    ensurePlugin();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        el.querySelectorAll('[data-hero="visual"]'),
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1.4 },
        0
      )
        .fromTo(
          el.querySelectorAll('[data-hero="brand"]'),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.08 },
          0.25
        )
        .fromTo(
          el.querySelectorAll('[data-hero="headline"]'),
          { opacity: 0, y: 44 },
          { opacity: 1, y: 0, duration: 1.05 },
          "-=0.45"
        )
        .fromTo(
          el.querySelectorAll('[data-hero="copy"]'),
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.75 },
          "-=0.55"
        )
        .fromTo(
          el.querySelectorAll('[data-hero="cta"]'),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.1 },
          "-=0.4"
        );

      const heroShot = el.querySelector("[data-parallax-hero]");
      if (heroShot) {
        gsap.to(heroShot, {
          yPercent: 12,
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

  return ref;
}
