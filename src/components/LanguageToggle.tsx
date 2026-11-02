"use client";

import React from "react";
import { Languages } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { UI_TEXT } from "@/data/portfolio";

export function LanguageToggle() {
  const { lang, toggleLanguage, t } = usePreferences();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t(UI_TEXT.nav.langToggle)}
      title={t(UI_TEXT.nav.langToggle)}
      className="inline-flex h-9 items-center gap-1.5 rounded-[12px] border-0 bg-transparent px-2.5 text-xs font-medium text-[var(--text)] transition-colors hover:text-[var(--accent)] cursor-pointer"
    >
      <Languages className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
      <span>{lang === "en" ? "বাংলা" : "EN"}</span>
    </button>
  );
}
