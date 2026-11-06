"use client";

import React, { useEffect, useState } from "react";
import {
  Briefcase,
  Code2,
  Compass,
  Home,
  Mail,
  User,
} from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { PERSONAL_INFO, UI_TEXT } from "@/data/portfolio";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { MobileBottomNav } from "./MobileBottomNav";

const NAV_ITEMS = [
  { id: "home", href: "#home", label: UI_TEXT.nav.home, icon: Home },
  { id: "about", href: "#about", label: UI_TEXT.nav.about, icon: User },
  { id: "skills", href: "#skills", label: UI_TEXT.nav.skills, icon: Code2 },
  {
    id: "projects",
    href: "#projects",
    label: UI_TEXT.nav.projects,
    icon: Briefcase,
  },
  { id: "journey", href: "#journey", label: UI_TEXT.nav.journey, icon: Compass },
  { id: "contact", href: "#contact", label: UI_TEXT.nav.contact, icon: Mail },
] as const;

const DESKTOP_NAV_ITEMS = NAV_ITEMS.filter((item) => item.id !== "contact");

export function Navigation() {
  const { t } = usePreferences();
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(NAV_ITEMS[i].id);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
      setActiveSection(id);
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <>
      {/* Top Bar with Glassmorphism Effect & Exact Grid Alignment */}
      <header className="fixed top-0 right-0 left-0 z-40 border-b border-[var(--border)]/60 bg-[var(--bg)]/80 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-200">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* Left: Brand Identity (Md. Fahim Hossain) */}
          <div className="flex flex-1 items-center justify-start min-w-0">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "home")}
              className="group inline-flex items-center gap-1.5 cursor-pointer max-w-full"
            >
              <span className="truncate font-mono text-xs sm:text-sm font-semibold tracking-tight text-[var(--heading)] group-hover:text-[var(--accent)] transition-colors">
                {t(PERSONAL_INFO.fullName)}
              </span>
            </a>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav
            aria-label="Primary desktop navigation"
            className="hidden items-center justify-center gap-1 md:flex"
          >
            {DESKTOP_NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3.5 py-1.5 text-sm transition-colors rounded-lg ${
                    isActive
                      ? "text-[var(--heading)] font-medium"
                      : "text-[var(--muted)] hover:text-[var(--heading)] hover:bg-white/5"
                  }`}
                >
                  {t(item.label)}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute right-3.5 bottom-0 left-3.5 h-[2px] rounded-full bg-[var(--accent)]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Controls (Language Toggle, Theme Toggle, Primary Hire Me / Contact CTA) */}
          <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-2.5 shrink-0">
            <LanguageToggle />
            <ThemeToggle />

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "contact")}
              className="inline-flex h-8 sm:h-9 shrink-0 items-center rounded-[10px] sm:rounded-[12px] bg-[var(--accent)] px-2.5 sm:px-4 text-[11px] sm:text-xs font-medium text-[var(--on-accent)] transition-all hover:bg-[var(--accent-hover)] cursor-pointer whitespace-nowrap"
            >
              {t(UI_TEXT.nav.contactCta)}
            </a>
          </div>
        </div>
      </header>

      {/* Floating Glassmorphic Mobile Bottom Navigation with Specular Shimmer Ring */}
      <MobileBottomNav
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
    </>
  );
}
