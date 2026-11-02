"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { PERSONAL_INFO, UI_TEXT } from "@/data/portfolio";
import { HeroParticlePortrait } from "./HeroParticlePortrait";

export function Hero() {
  const { lang, t } = usePreferences();

  // Subtle typing animation state
  const phrases = PERSONAL_INFO.typingPhrases[lang];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(phrases[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset typing when language changes
  useEffect(() => {
    setPhraseIndex(0);
    setDisplayedText(PERSONAL_INFO.typingPhrases[lang][0]);
    setIsDeleting(false);
  }, [lang]);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex % phrases.length];
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayedText(currentPhrase);
      return;
    }

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayedText.length < currentPhrase.length) {
            setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 1600);
          }
        } else {
          if (displayedText.length > 0) {
            setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
          } else {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 35 : 65
    );

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, phraseIndex, phrases]);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden pt-20 pb-8 sm:pt-22 sm:pb-10 lg:pt-24 lg:pb-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Big Headline, Role, Typing Indicator & 2 Buttons */}
          <div className="lg:col-span-7 lg:pt-2">
            {/* Primary Greeting */}
            <h1
              id="hero-heading"
              className="text-4xl font-light tracking-tight text-[var(--heading)] sm:text-5xl lg:text-6xl"
            >
              {t(PERSONAL_INFO.heroGreeting)}
            </h1>

            {/* Role line */}
            <p className="mt-3 text-base font-normal text-[var(--accent)] sm:text-lg">
              {t(PERSONAL_INFO.headline)}
            </p>

            {/* Typing Focus Indicator */}
            <div
              aria-live="polite"
              className="mt-3 flex h-7 items-center gap-2 font-mono text-xs text-[var(--muted)] sm:text-sm"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span>{displayedText}</span>
              <span
                aria-hidden="true"
                className="inline-block h-4 w-0.5 animate-pulse bg-[var(--accent)]"
              />
            </div>

            {/* Introduction */}
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text)]">
              {t(UI_TEXT.hero.introParagraph)}
            </p>

            {/* Two Buttons: Primary (solid accent) + Secondary (1px border accent) */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, "projects")}
                className="inline-flex items-center gap-2 rounded-[12px] bg-[var(--accent)] px-6 py-3.5 text-sm font-medium text-[var(--on-accent)] transition-colors hover:bg-[var(--accent-hover)] cursor-pointer"
              >
                <span>{t(UI_TEXT.hero.exploreWorkCta)}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                className="inline-flex items-center gap-2 rounded-[12px] border border-[var(--accent)] bg-transparent px-6 py-3.5 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--surface)] cursor-pointer"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>{t(UI_TEXT.hero.contactMeCta)}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Particle-to-Portrait Transition Animation (Lowered with comfortable top margin from navbar) */}
          <div className="mt-2 flex justify-center sm:mt-3 lg:col-span-5 lg:mt-0 lg:justify-end">
            <HeroParticlePortrait
              src={PERSONAL_INFO.portraitSrc}
              alt={t(PERSONAL_INFO.portraitAlt)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
