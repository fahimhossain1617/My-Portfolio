"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { UI_TEXT } from "@/data/portfolio";

export function ThemeToggle() {
  const { theme, toggleTheme, t } = usePreferences();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] border-0 bg-transparent text-[var(--text)] transition-colors hover:text-[var(--accent)] cursor-pointer"
    >
      {isDark ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
