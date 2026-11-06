"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  FolderGit2,
  Home,
  Milestone,
  Plus,
  Send,
  User,
  X,
} from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { PERSONAL_INFO, UI_TEXT } from "@/data/portfolio";
import { WhatsAppIcon } from "./BrandIcons";

interface MobileBottomNavProps {
  activeSection: string;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

export function MobileBottomNav({
  activeSection,
  onNavigate,
}: MobileBottomNavProps) {
  const { lang, t } = usePreferences();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bouncingItemId, setBouncingItemId] = useState<string | null>(null);

  // 4 Primary Navigation Items for the Bottom Pill Bar (Intuitive & Professional Dev Icons)
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
    // Play the cute playful micro-motion on click
    setBouncingItemId(id);
    setTimeout(() => {
      setBouncingItemId(null);
    }, 450);

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
      {/* 1. Main Left Navigation Capsule (High-contrast glassmorphism with smooth active pill glide) */}
      <nav
        aria-label="Mobile Navigation"
        className="pointer-events-auto relative flex items-center gap-1 sm:gap-1.5 rounded-full border border-white/20 dark:border-white/18 bg-[#16162a]/92 dark:bg-[#151528]/95 px-2 py-1.5 backdrop-blur-2xl shadow-[0_14px_45px_rgba(0,0,0,0.7),_0_0_0_1px_rgba(255,255,255,0.08)_inset] light:bg-white/95 light:border-black/12 light:shadow-[0_12px_36px_rgba(0,0,0,0.15)] transition-colors duration-200"
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
              className="relative flex h-11 w-12 items-center justify-center rounded-full transition-colors select-none"
            >
              {/* Active Pill Shifting Indicator (Snappy liquid morph between tabs) */}
              {isActive && (
                <motion.div
                  layoutId="mobileActivePillIndicator"
                  transition={{ type: "spring", stiffness: 480, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/50 dark:bg-[var(--accent)]/28 dark:border-[var(--accent)]/60 shadow-sm"
                />
              )}

              {/* Cute Micro-Motion on Click: Playful hop and gentle tilt, returning smoothly */}
              <motion.div
                animate={
                  isBouncing
                    ? {
                        scale: [1, 1.28, 0.92, 1],
                        y: [0, -5, 1, 0],
                        rotate: [0, -10, 5, 0],
                      }
                    : { scale: 1, y: 0, rotate: 0 }
                }
                transition={{ duration: 0.38, ease: "easeOut" }}
                className="relative z-10 flex items-center justify-center"
              >
                <Icon
                  className={`h-5 w-5 transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--accent)] stroke-[2.3]"
                      : "text-white/70 dark:text-white/75 hover:text-white stroke-[1.8]"
                  }`}
                  aria-hidden="true"
                />
              </motion.div>
            </a>
          );
        })}
      </nav>

      {/* 2. Right Circular Action Button with Continuous Specular Shimmer Ring */}
      <div className="pointer-events-auto relative">
        {/* Specular Shimmer Rotating Glass Ring Container */}
        <div className="relative h-12 w-12 rounded-full p-[1.5px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.65)]">
          {/* Continuously Rotating Specular Reflection Sheen */}
          <div
            aria-hidden="true"
            className="animate-specular-ring absolute -inset-[100%] opacity-90 transition-opacity"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.85) 18%, transparent 35%, var(--accent) 68%, rgba(255,255,255,0.95) 82%, transparent 100%)",
            }}
          />

          {/* Inner Glass Button Body */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open quick actions menu"}
            className="relative h-full w-full rounded-full bg-[#16162a]/95 dark:bg-[#151528]/98 backdrop-blur-2xl flex items-center justify-center text-white hover:text-[var(--accent)] transition-colors cursor-pointer select-none"
          >
            {/* Plus Icon that rotates 180 degrees */}
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-[var(--accent)] stroke-[2.2]" />
              ) : (
                <Plus className="h-5 w-5 text-white stroke-[2.2]" />
              )}
            </motion.div>
          </button>
        </div>

        {/* 3. Vertical Icon-Only Pop-Up Bar (Matches User's Reference Image 4 Exactly) */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Invisible transparent click-catcher to dismiss without any dark/black background or blur */}
              <div
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 z-30 bg-transparent md:hidden pointer-events-auto"
                aria-hidden="true"
              />

              {/* Vertical Pill Bar with Pure Centered Icons (No Text, No Dark Overlay) */}
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.9 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto absolute bottom-[calc(100%+12px)] right-0 z-40 w-12 sm:w-13 rounded-full border border-white/20 dark:border-white/18 bg-[#16162a]/95 dark:bg-[#151528]/98 py-3 px-1 backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.7),_0_0_0_1px_rgba(255,255,255,0.08)_inset] flex flex-col items-center gap-2.5 transition-colors select-none"
              >
                {/* 1. Skills Icon Button */}
                <a
                  href="#skills"
                  onClick={(e) => handleMenuNavigate(e, "skills")}
                  aria-label={lang === "bn" ? "দক্ষতা ও প্রযুক্তি" : "Skills & Technologies"}
                  title={lang === "bn" ? "দক্ষতা" : "Skills"}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${
                    activeSection === "skills"
                      ? "bg-[var(--accent)]/25 text-[var(--accent)] shadow-sm"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Code2 className="h-5 w-5 stroke-[2]" />
                </a>

                {/* 2. Developer Journey Icon Button */}
                <a
                  href="#journey"
                  onClick={(e) => handleMenuNavigate(e, "journey")}
                  aria-label={lang === "bn" ? "লার্নিং ও ক্যারিয়ার জার্নি" : "Developer Journey"}
                  title={lang === "bn" ? "জার্নি" : "Journey"}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${
                    activeSection === "journey"
                      ? "bg-[var(--accent)]/25 text-[var(--accent)] shadow-sm"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Milestone className="h-5 w-5 stroke-[2]" />
                </a>

                {/* 3. Official WhatsApp Icon Button */}
                {PERSONAL_INFO.contact.whatsappUrl && (
                  <a
                    href={PERSONAL_INFO.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp Chat"
                    title="WhatsApp"
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[#25D366] hover:bg-[#25D366]/15 hover:scale-110 active:scale-95 transition-all duration-200"
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
