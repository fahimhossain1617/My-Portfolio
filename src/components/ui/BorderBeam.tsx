"use client";

import React, { useEffect, useRef, useState } from "react";

interface BorderBeamProps {
  className?: string;
  active?: boolean;
}

/**
 * Smooth medium-thickness (1.75px) theme-aware Border Beam.
 * Scoped strictly to its immediate parent element so nested cards/inputs never conflict:
 * - Desktop/Laptop: Activates smoothly on cursor hover (`mouseenter`/`mouseleave`) or focus (`focusin`/`focusout`).
 * - Mobile/Phone: Activates when touched/tapped while scrolling (`touchstart` / `click`) on its parent card.
 */
export function BorderBeam({ className = "", active = false }: BorderBeamProps) {
  const beamRef = useRef<HTMLSpanElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(false);

  useEffect(() => {
    const el = beamRef.current?.parentElement;
    if (!el) return;

    let touchTimer: ReturnType<typeof setTimeout> | null = null;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleFocusIn = () => setIsFocused(true);
    const handleFocusOut = (e: FocusEvent) => {
      if (!el.contains(e.relatedTarget as Node | null)) {
        setIsFocused(false);
      }
    };
    const handleTouchOrClick = () => {
      setIsTouchActive(true);
      if (touchTimer) clearTimeout(touchTimer);
      touchTimer = setTimeout(() => {
        setIsTouchActive(false);
      }, 3200);
    };

    el.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    el.addEventListener("focusin", handleFocusIn, { passive: true });
    el.addEventListener("focusout", handleFocusOut, { passive: true });
    el.addEventListener("touchstart", handleTouchOrClick, { passive: true });
    el.addEventListener("click", handleTouchOrClick, { passive: true });

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("focusin", handleFocusIn);
      el.removeEventListener("focusout", handleFocusOut);
      el.removeEventListener("touchstart", handleTouchOrClick);
      el.removeEventListener("click", handleTouchOrClick);
      if (touchTimer) clearTimeout(touchTimer);
    };
  }, []);

  const isVisible = active || isHovered || isFocused || isTouchActive;

  return (
    <span
      ref={beamRef}
      aria-hidden="true"
      className={`border-beam-ring ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  );
}
