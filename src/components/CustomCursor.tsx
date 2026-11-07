"use client";

import React, { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

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

    let isHovering = false;
    let isPressed = false;

    const applyRingState = () => {
      const ring = ringRef.current;
      if (!ring) return;

      const scale = isPressed ? 0.88 : isHovering ? 1.45 : 1;
      ring.style.transform = `translate3d(-50%, -50%, 0) scale(${scale})`;

      if (isHovering || isPressed) {
        ring.style.borderColor = "var(--accent)";
        ring.style.backgroundColor =
          "color-mix(in srgb, var(--accent) 12%, transparent)";
      } else {
        ring.style.borderColor = "var(--border)";
        ring.style.backgroundColor = "transparent";
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const outer = outerRef.current;
      if (outer) {
        outer.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      const nextHover = Boolean(
        target?.closest("a, button, input, textarea, select, [role='button']")
      );
      if (nextHover !== isHovering) {
        isHovering = nextHover;
        applyRingState();
      }
    };

    const handleMouseDown = () => {
      isPressed = true;
      applyRingState();
    };

    const handleMouseUp = () => {
      isPressed = false;
      applyRingState();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={outerRef}
      aria-hidden="true"
      style={{
        transform: "translate3d(-100px, -100px, 0)",
        willChange: "transform",
      }}
      className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block"
    >
      <div
        ref={ringRef}
        style={{
          transform: "translate3d(-50%, -50%, 0) scale(1)",
          borderColor: "var(--border)",
          transition:
            "transform 120ms cubic-bezier(0.22, 1, 0.36, 1), border-color 120ms ease, background-color 120ms ease",
          willChange: "transform",
        }}
        className="h-6 w-6 rounded-full border"
      />
    </div>
  );
}
