"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function useSoftReveal<T extends HTMLElement>(stagger = 0.08) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }
    const items = el.querySelectorAll("[data-reveal]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: "power2.out",
          stagger,
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [stagger]);

  return ref;
}
