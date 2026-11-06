"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { usePreferences } from "@/context/PreferencesContext";
import { UI_TEXT } from "@/data/portfolio";

export function ThemeToggle() {
  const { theme, toggleTheme, t } = usePreferences();
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      aria-label={
        isDark
          ? t(UI_TEXT.nav.themeToggleLight)
          : t(UI_TEXT.nav.themeToggleDark)
      }
      title={
        isDark
          ? t(UI_TEXT.nav.themeToggleLight)
          : t(UI_TEXT.nav.themeToggleDark)
      }
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-[12px] border border-transparent bg-transparent text-[var(--text)] transition-colors hover:text-[var(--accent)] hover:bg-[var(--surface)] hover:border-[var(--border)] cursor-pointer overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="dark-sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <Sun className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
          </motion.div>
        ) : (
          <motion.div
            key="light-moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <Moon className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
