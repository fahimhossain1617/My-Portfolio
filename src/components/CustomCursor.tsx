"use client";

import React, { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [enabled, setEnabled] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!hasFinePointer || prefersReducedMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest("a, button, input, textarea, [role='button']")
      );
      setIsHoveringInteractive(interactive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        transform: `translate3d(${position.x - (isHoveringInteractive ? 18 : 12)}px, ${
          position.y - (isHoveringInteractive ? 18 : 12)
        }px, 0)`,
      }}
      className={`pointer-events-none fixed top-0 left-0 z-50 hidden rounded-full border transition-all duration-150 ease-out md:block ${
        isHoveringInteractive
          ? "h-9 w-9 border-[var(--accent)] bg-[var(--accent)]/10"
          : "h-6 w-6 border-[var(--border)]"
      }`}
    />
  );
}
