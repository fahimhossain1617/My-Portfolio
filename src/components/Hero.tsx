"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { PERSONAL_INFO, UI_TEXT } from "@/data/portfolio";
import { HeroParticlePortrait } from "./HeroParticlePortrait";

export function Hero() {
  const { lang, t } = usePreferences();

  // Subtle typing animation state for cycling focus phrases
  const phrases = PERSONAL_INFO.typingPhrases[lang];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(phrases[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Strings
  const fullGreeting = t(PERSONAL_INFO.heroGreeting);
  const headlineText = t(PERSONAL_INFO.headline);
  const introText = t(UI_TEXT.hero.introParagraph);

  // Entrance states: ONLY Greeting types out first, then everything cascades in
  const [typedGreeting, setTypedGreeting] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [isEntranceDone, setIsEntranceDone] = useState(false);

  // Reset cycling phrases when language changes
  useEffect(() => {
    setPhraseIndex(0);
    setDisplayedText(PERSONAL_INFO.typingPhrases[lang][0]);
    setIsDeleting(false);
  }, [lang]);

  // Synchronize full text immediately if language changes after entrance
  useEffect(() => {
    if (isEntranceDone) {
      setTypedGreeting(fullGreeting);
      setIsTyping(false);
      setRevealed(true);
    }
  }, [lang, fullGreeting, isEntranceDone]);

  // 1. Natural keyboard typing for ONLY the greeting ("Hey, I'm Md. Fahim Hossain")
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setTypedGreeting(fullGreeting);
      setIsTyping(false);
      setRevealed(true);
      setIsEntranceDone(true);
      return;
    }

    if (isEntranceDone) return;

    if (isTyping) {
      if (typedGreeting.length < fullGreeting.length) {
        // Natural, smooth keyboard typing cadence
        const delay = 22 + (typedGreeting.length % 3) * 4;
        const timer = setTimeout(() => {
          setTypedGreeting(fullGreeting.slice(0, typedGreeting.length + 1));
        }, delay);
        return () => clearTimeout(timer);
      } else {
        // Finished typing! Brief 120ms pause, then trigger cascade reveal for the rest
        const timer = setTimeout(() => {
          setIsTyping(false);
          setRevealed(true);
          setIsEntranceDone(true);
        }, 120);
        return () => clearTimeout(timer);
      }
    }
  }, [typedGreeting, fullGreeting, isTyping, isEntranceDone]);

  // Continuous cycling focus phrases (after entrance is revealed)
  useEffect(() => {
    if (!revealed) return;

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
  }, [displayedText, isDeleting, phraseIndex, phrases, revealed]);

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

  // Reusable curve matching site's [data-reveal] signature easing
  const easeStyle = (delayMs: number) => ({
    transitionProperty: "transform, opacity",
    transitionDuration: "0.65s",
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: `${delayMs}ms`,
  });

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
            {/* 1. Primary Greeting: ONLY this element types in like a real keyboard */}
            <h1
              id="hero-heading"
              aria-label={fullGreeting}
              className="text-3xl font-light tracking-tight text-[var(--heading)] sm:text-5xl lg:text-6xl min-h-[1.15em] break-words"
            >
              <span>{typedGreeting || "\u00A0"}</span>
              {isTyping && (
                <span
                  aria-hidden="true"
                  className="inline-block ml-1 font-mono text-[var(--accent)] animate-pulse"
                >
                  |
                </span>
              )}
            </h1>

            {/* 2. Role line: Cascades in right after typing with UI's smooth fade-up */}
            <p
              style={easeStyle(0)}
              className={`mt-3 text-base font-normal text-[var(--accent)] sm:text-lg transform ${
                revealed
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5 pointer-events-none"
              }`}
            >
              {headlineText}
            </p>

            {/* 3. Cycling Focus Indicator: Staggered smooth fade-up */}
            <div
              aria-live="polite"
              style={easeStyle(80)}
              className={`mt-3 flex h-7 items-center gap-2 font-mono text-xs text-[var(--muted)] sm:text-sm transform ${
                revealed
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5 pointer-events-none"
              }`}
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span>{displayedText}</span>
              <span
                aria-hidden="true"
                className="inline-block h-4 w-0.5 animate-pulse bg-[var(--accent)]"
              />
            </div>

            {/* 4. Introduction Paragraph: Staggered smooth fade-up */}
            <p
              style={easeStyle(160)}
              className={`mt-4 max-w-2xl text-base leading-relaxed text-[var(--text)] transform ${
                revealed
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5 pointer-events-none"
              }`}
            >
              {introText}
            </p>

            {/* 5. Two Action Buttons: Staggered smooth glide up with matching icons */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              {/* Button 1: Solid Accent with ArrowUpRight icon */}
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, "projects")}
                style={easeStyle(240)}
                className={`inline-flex items-center gap-2 rounded-[12px] bg-[var(--accent)] px-6 py-3.5 text-sm font-medium text-[var(--on-accent)] transition-colors hover:bg-[var(--accent-hover)] cursor-pointer transform ${
                  revealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6 pointer-events-none"
                }`}
              >
                <span>{t(UI_TEXT.hero.exploreWorkCta)}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              {/* Button 2: Border Accent with Mail icon */}
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "contact")}
                style={easeStyle(320)}
                className={`inline-flex items-center gap-2 rounded-[12px] border border-[var(--accent)] bg-transparent px-6 py-3.5 text-sm font-medium text-[var(--accent)] transition-colors hover:bg-[var(--surface)] cursor-pointer transform ${
                  revealed
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6 pointer-events-none"
                }`}
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>{t(UI_TEXT.hero.contactMeCta)}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Particle-to-Portrait Transition Animation */}
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
