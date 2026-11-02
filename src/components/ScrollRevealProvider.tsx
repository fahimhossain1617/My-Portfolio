"use client";

import { useEffect } from "react";

/**
 * Premium scroll-based reveal observer.
 * Automatically animates elements with `data-reveal` attribute as they scroll into view.
 * Supports:
 * - data-reveal="fade-up"
 * - data-reveal="fade-right"
 * - data-reveal="fade-left"
 * - data-reveal="zoom-in"
 */
export function ScrollRevealProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (prefersReducedMotion) {
      elements.forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            // Once revealed, unobserve to maintain high performance
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -40px 0px", // triggers slightly before full center
        threshold: 0.12,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}

