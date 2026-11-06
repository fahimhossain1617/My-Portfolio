"use client";

import React from "react";
import { Languages } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePreferences } from "@/context/PreferencesContext";
import { UI_TEXT } from "@/data/portfolio";

export function LanguageToggle() {
  const { lang, toggleLanguage, t } = usePreferences();

  return (
    <motion.button
      type="button"
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      aria-label={t(UI_TEXT.nav.langToggle)}
      title={t(UI_TEXT.nav.langToggle)}
      className="inline-flex h-9 items-center gap-1.5 rounded-[12px] border border-transparent bg-transparent px-2.5 text-xs font-medium text-[var(--text)] transition-colors hover:text-[var(--accent)] hover:bg-[var(--surface)] hover:border-[var(--border)] cursor-pointer overflow-hidden"
    >
      <motion.div
        animate={{ rotate: lang === "bn" ? 180 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="flex items-center shrink-0"
      >
        <Languages className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
      </motion.div>
      <div className="relative min-w-[34px] text-center overflow-hidden h-4 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={lang}
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="inline-block whitespace-nowrap"
          >
            {lang === "en" ? "বাংলা" : "EN"}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
