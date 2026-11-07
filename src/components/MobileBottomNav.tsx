"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderGit2,
  Home,
  Plus,
  Send,
  User,
  X,
} from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { PERSONAL_INFO, UI_TEXT } from "@/data/portfolio";
import {
  JourneyStairsIcon,
  SkillsBulbGearIcon,
  WhatsAppIcon,
} from "./BrandIcons";

interface MobileBottomNavProps {
  activeSection: string;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export function MobileBottomNav({
  activeSection,
  onNavigate,
}: MobileBottomNavProps) {
  const { lang, t, theme } = usePreferences();
  const isLight = theme === "light";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bouncingItemId, setBouncingItemId] = useState<string | null>(null);

  // 4 Primary Navigation Items for the Bottom Pill Bar
  const PRIMARY_TABS = [
    { id: "home", href: "#home", label: UI_TEXT.nav.home, icon: Home },
    { id: "about", href: "#about", label: UI_TEXT.nav.about, icon: User },
    { id: "projects", href: "#projects", label: UI_TEXT.nav.projects, icon: FolderGit2 },
    { id: "contact", href: "#contact", label: UI_TEXT.nav.contact, icon: Send },
  ] as const;

  const handleTabClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    setBouncingItemId(id);
    setTimeout(() => {
      setBouncingItemId((prev) => (prev === id ? null : prev));
    }, 360);

    setIsMenuOpen(false);
    onNavigate(e, id);
  };

  const handleMenuNavigate = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    setIsMenuOpen(false);
    onNavigate(e, id);
  };

  return (
    <div className="fixed bottom-5 left-0 right-0 z-40 mx-auto flex items-center justify-center gap-2.5 px-3 pointer-events-none md:hidden pb-[env(safe-area-inset-bottom)]">
      {/* 1. Main Left Navigation Capsule (Theme-matched Light & Dark high-visibility glassmorphism) */}
      <nav
        aria-label="Mobile Navigation"
        className={`pointer-events-auto relative flex items-center gap-1 sm:gap-1.5 rounded-full border px-2 py-1.5 backdrop-blur-2xl transition-colors duration-200 ${
          isLight
            ? "border-[#5B5DE0]/28 bg-[#FFFFFF]/95 shadow-[0_12px_32px_rgba(91,93,224,0.16),_0_2px_8px_rgba(15,23,42,0.08),_0_0_0_1px_rgba(255,255,255,0.9)_inset]"
            : "border-white/18 bg-[#151528]/95 shadow-[0_14px_45px_rgba(0,0,0,0.7),_0_0_0_1px_rgba(255,255,255,0.08)_inset]"
        }`}
      >
        {PRIMARY_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          const isBouncing = bouncingItemId === tab.id;

          return (
            <a
              key={tab.id}
              href={tab.href}
              onClick={(e) => handleTabClick(e, tab.id)}
              aria-current={isActive ? "page" : undefined}
              aria-label={t(tab.label)}
              className="relative flex h-11 w-12 items-center justify-center rounded-full transition-colors duration-150 select-none"
            >
              {/* Active Pill Shifting Indicator (GPU-accelerated snappy glide with zero lag) */}
              {isActive && (
                <motion.div
                  layoutId="mobileActivePillIndicator"
                  transition={{
                    type: "spring",
                    stiffness: 520,
                    damping: 38,
                    mass: 0.65,
                  }}
                  className={`absolute inset-0 rounded-full will-change-transform ${
                    isLight
                      ? "bg-[#5B5DE0]/16 border border-[#5B5DE0]/45 shadow-[0_2px_8px_rgba(91,93,224,0.14)]"
                      : "bg-[var(--accent)]/28 border border-[var(--accent)]/60 shadow-sm"
                  }`}
                />
              )}

              {/* Smooth Micro-Motion on Click */}
              <motion.div
                animate={
                  isBouncing
                    ? {
                        scale: [1, 1.2, 0.96, 1],
                        y: [0, -3, 0],
                      }
                    : { scale: 1, y: 0 }
                }
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="relative z-10 flex items-center justify-center will-change-transform"
              >
                <Icon
                  className={`h-5 w-5 transition-colors duration-150 ${
                    isActive
                      ? "text-[var(--accent)] stroke-[2.3]"
                      : isLight
                      ? "text-[#2A2B4A]/85 hover:text-[#0B0B1A] stroke-[1.9]"
                      : "text-white/75 hover:text-white stroke-[1.8]"
                  }`}
                  aria-hidden="true"
                />
              </motion.div>
            </a>
          );
        })}
      </nav>

      {/* 2. Right Circular Action Button with Clearly Visible Specular Shimmer Ring in Both Modes */}
      <div className="pointer-events-auto relative">
        <div
          className={`relative h-12 w-12 rounded-full p-[2px] overflow-hidden transition-shadow duration-200 ${
            isLight
              ? "bg-[#E2E4FC] shadow-[0_10px_28px_rgba(91,93,224,0.22),_0_2px_6px_rgba(15,23,42,0.08)]"
              : "bg-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
          }`}
        >
          {/* Continuously Rotating Specular Reflection Sheen (Distinct & Crisp in Light Mode & Dark Mode) */}
          <div
            aria-hidden="true"
            className="animate-specular-ring absolute -inset-[100%]"
            style={{
              background: isLight
                ? "conic-gradient(from 0deg, rgba(91,93,224,0.18) 0%, #5B5DE0 20%, #8B5CF6 36%, rgba(91,93,224,0.18) 50%, #4338CA 72%, #5B5DE0 88%, rgba(91,93,224,0.18) 100%)"
                : "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.85) 18%, transparent 35%, var(--accent) 68%, rgba(255,255,255,0.95) 82%, transparent 100%)",
            }}
          />

          {/* Inner Glass Button Body */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open quick actions menu"}
            className={`relative h-full w-full rounded-full backdrop-blur-2xl flex items-center justify-center transition-colors duration-150 cursor-pointer select-none ${
              isLight
                ? "bg-[#FFFFFF]/96 text-[#2A2B4A] hover:text-[#5B5DE0]"
                : "bg-[#151528]/98 text-white hover:text-[var(--accent)]"
            }`}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.24, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-[var(--accent)] stroke-[2.3]" />
              ) : (
                <Plus
                  className={`h-5 w-5 stroke-[2.2] ${
                    isLight ? "text-[#2A2B4A]" : "text-white"
                  }`}
                />
              )}
            </motion.div>
          </button>
        </div>

        {/* 3. Vertical Icon-Only Pop-Up Bar with Custom Skills & Journey Reference Icons */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <div
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 z-30 bg-transparent md:hidden pointer-events-auto"
                aria-hidden="true"
              />

              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.92 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`pointer-events-auto absolute bottom-[calc(100%+12px)] right-0 z-40 w-12 sm:w-13 rounded-full border py-3 px-1 backdrop-blur-2xl flex flex-col items-center gap-2.5 transition-colors select-none ${
                  isLight
                    ? "border-[#5B5DE0]/28 bg-[#FFFFFF]/96 shadow-[0_14px_36px_rgba(91,93,224,0.18),_0_2px_8px_rgba(15,23,42,0.08)]"
                    : "border-white/18 bg-[#151528]/98 shadow-[0_16px_50px_rgba(0,0,0,0.7),_0_0_0_1px_rgba(255,255,255,0.08)_inset]"
                }`}
              >
                {/* 1. Skills Custom Icon Button (Reference Image 1: Lightbulb + Gear) */}
                <a
                  href="#skills"
                  onClick={(e) => handleMenuNavigate(e, "skills")}
                  aria-label={lang === "bn" ? "দক্ষতা ও প্রযুক্তি" : "Skills & Technologies"}
                  title={lang === "bn" ? "দক্ষতা" : "Skills"}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-150 hover:scale-110 active:scale-95 ${
                    activeSection === "skills"
                      ? isLight
                        ? "bg-[#5B5DE0]/18 text-[#5B5DE0] shadow-sm"
                        : "bg-[var(--accent)]/25 text-[var(--accent)] shadow-sm"
                      : isLight
                      ? "text-[#2A2B4A]/90 hover:bg-[#5B5DE0]/10 hover:text-[#5B5DE0]"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <SkillsBulbGearIcon size={22} />
                </a>

                {/* 2. Developer Journey Custom Icon Button (Reference Image 2: Person Climbing Stairs) */}
                <a
                  href="#journey"
                  onClick={(e) => handleMenuNavigate(e, "journey")}
                  aria-label={lang === "bn" ? "লার্নিং ও ক্যারিয়ার জার্নি" : "Developer Journey"}
                  title={lang === "bn" ? "জার্নি" : "Journey"}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-150 hover:scale-110 active:scale-95 ${
                    activeSection === "journey"
                      ? isLight
                        ? "bg-[#5B5DE0]/18 text-[#5B5DE0] shadow-sm"
                        : "bg-[var(--accent)]/25 text-[var(--accent)] shadow-sm"
                      : isLight
                      ? "text-[#2A2B4A]/90 hover:bg-[#5B5DE0]/10 hover:text-[#5B5DE0]"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <JourneyStairsIcon size={21} />
                </a>

                {/* 3. Official WhatsApp Icon Button */}
                {PERSONAL_INFO.contact.whatsappUrl && (
                  <a
                    href={PERSONAL_INFO.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp Chat"
                    title="WhatsApp"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[#25D366] hover:bg-[#25D366]/15 hover:scale-110 active:scale-95 transition-all duration-150"
                  >
                    <WhatsAppIcon size={21} />
                  </a>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
