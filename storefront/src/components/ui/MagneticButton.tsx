"use client";

import Link from "next/link";
import { useRef } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost" | "cream" | "dark";
  className?: string;
};

export function MagneticButton({
  href,
  children,
  variant = "solid",
  className = "",
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  }

  const styles =
    variant === "solid"
      ? "bg-cocoa text-cream hover:bg-cocoa-mid"
      : variant === "cream"
        ? "bg-cream text-cocoa hover:bg-cream-soft"
        : variant === "dark"
          ? "bg-cocoa text-cream ring-1 ring-cream/20 hover:bg-cocoa-mid"
          : "border border-current bg-transparent";

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-flex items-center justify-center rounded-sm px-7 py-3.5 text-sm font-medium tracking-wide transition-transform duration-200 will-change-transform ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}
