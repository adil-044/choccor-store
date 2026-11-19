"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
function ensure() {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}
function reduced() {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Split children text nodes into word spans for reveal animations. */
export function splitWords(el: HTMLElement) {
  const text = el.textContent || "";
  el.setAttribute("aria-label", text);
  el.innerHTML = text
    .split(/(\s+)/)
    .map((part) =>
      /^\s+$/.test(part)
        ? part
        : `<span class="split-word inline-block overflow-hidden align-bottom"><span class="split-word-inner inline-block will-change-transform">${part}</span></span>`
    )
    .join("");
}

export function useHeroMotion<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      el.querySelectorAll("[data-hero]").forEach((n) => {
        (n as HTMLElement).style.opacity = "1";
        (n as HTMLElement).style.transform = "none";
      });
      return;
    }
    ensure();
    const ctx = gsap.context(() => {
      el.querySelectorAll("[data-split]").forEach((node) =>
        splitWords(node as HTMLElement)
      );

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        el.querySelectorAll('[data-hero="visual"]'),
        { scale: 1.12, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6 },
        0
      )
        .fromTo(
          el.querySelectorAll(".split-word-inner"),
          { yPercent: 120 },
          { yPercent: 0, duration: 1.05, stagger: 0.035 },
          0.2
        )
        .fromTo(
          el.querySelectorAll('[data-hero="copy"]'),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.45"
        )
        .fromTo(
          el.querySelectorAll('[data-hero="cta"]'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          "-=0.35"
        );

      const shot = el.querySelector("[data-parallax-hero]");
      if (shot) {
        gsap.to(shot, {
          yPercent: 14,
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

/** Horizontal product runway pinned to the viewport. */
export function useHorizontalRail<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) return;
    ensure();
    const track = el.querySelector("[data-rail-track]") as HTMLElement | null;
    if (!track) return;

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 80);
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.35}`,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return ref;
}

/** Pinned chapter with staggered copy + parallax image. */
export function usePinnedChapter<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      el.querySelectorAll("[data-chapter]").forEach((n) => {
        (n as HTMLElement).style.opacity = "1";
      });
      return;
    }
    ensure();
    const ctx = gsap.context(() => {
      el.querySelectorAll("[data-split]").forEach((node) =>
        splitWords(node as HTMLElement)
      );

      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: true,
        anticipatePin: 1,
      });

      gsap.fromTo(
        el.querySelectorAll(".split-word-inner"),
        { yPercent: 110 },
        {
          yPercent: 0,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "top 20%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        el.querySelectorAll("[data-chapter]"),
        { opacity: 0.15, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            end: "top 10%",
            scrub: true,
          },
        }
      );

      const img = el.querySelector("[data-parallax-shot]");
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.12, yPercent: -6 },
          {
            scale: 1,
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, el);
    return () => ctx.revert();
  }, []);
  return ref;
}

export function useRevealGrid<T extends HTMLElement>(stagger = 0.1) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) return;
    ensure();
    const items = el.querySelectorAll("[data-reveal-item]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 56, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.05,
          ease: "power3.out",
          stagger,
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            once: true,
          },
        }
      );
      items.forEach((item) => {
        const shot = item.querySelector("[data-parallax-shot]");
        if (!shot) return;
        gsap.fromTo(
          shot,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.7,
            },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, [stagger]);
  return ref;
}
