"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Language, LocalizedText, Theme } from "@/data/portfolio";

interface PreferencesContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  lang: Language;
  toggleLanguage: () => void;
  setLang: (lang: Language) => void;
  t: (item: LocalizedText) => string;
  isCommandOpen: boolean;
  setIsCommandOpen: (open: boolean) => void;
}

const PreferencesContext = createContext<PreferencesContextValue | undefined>(
  undefined
);

const STORAGE_THEME_KEY = "fahim_portfolio_theme";
const STORAGE_LANG_KEY = "fahim_portfolio_lang";

export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Default theme: Follow prefers-color-scheme, default dark (#000000)
  const [theme, setThemeState] = useState<Theme>("dark");
  // Default language: English
  const [lang, setLangState] = useState<Language>("en");
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem(
        STORAGE_THEME_KEY
      ) as Theme | null;
      if (savedTheme === "dark" || savedTheme === "light") {
        setThemeState(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
      } else {
        const prefersLight =
          typeof window !== "undefined" &&
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: light)").matches;
        const initialTheme: Theme = prefersLight ? "light" : "dark";
        setThemeState(initialTheme);
        document.documentElement.setAttribute("data-theme", initialTheme);
      }

      const savedLang = window.localStorage.getItem(
        STORAGE_LANG_KEY
      ) as Language | null;
      if (savedLang === "en" || savedLang === "bn") {
        setLangState(savedLang);
        document.documentElement.lang = savedLang;
      } else {
        document.documentElement.lang = "en";
      }
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    setThemeState(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    try {
      window.localStorage.setItem(STORAGE_THEME_KEY, nextTheme);
    } catch {
      // Ignore storage errors
    }
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: currentScrollY,
          behavior: "instant" as ScrollBehavior,
        });
      });
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        window.localStorage.setItem(STORAGE_THEME_KEY, next);
      } catch {
        // Ignore
      }
      return next;
    });
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: currentScrollY,
          behavior: "instant" as ScrollBehavior,
        });
      });
    }
  }, []);

  const setLang = useCallback((nextLang: Language) => {
    const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    setLangState(nextLang);
    document.documentElement.lang = nextLang;
    try {
      window.localStorage.setItem(STORAGE_LANG_KEY, nextLang);
    } catch {
      // Ignore
    }
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: currentScrollY,
          behavior: "instant" as ScrollBehavior,
        });
      });
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    const currentScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    setLangState((prev) => {
      const next = prev === "en" ? "bn" : "en";
      document.documentElement.lang = next;
      try {
        window.localStorage.setItem(STORAGE_LANG_KEY, next);
      } catch {
        // Ignore
      }
      return next;
    });
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: currentScrollY,
          behavior: "instant" as ScrollBehavior,
        });
      });
    }
  }, []);

  const t = useCallback(
    (item: LocalizedText) => {
      return item[lang] || item.en;
    },
    [lang]
  );

  // Global keyboard shortcut for Command Palette: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
      lang,
      toggleLanguage,
      setLang,
      t,
      isCommandOpen,
      setIsCommandOpen,
    }),
    [theme, toggleTheme, setTheme, lang, toggleLanguage, setLang, t, isCommandOpen]
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences(): PreferencesContextValue {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error("usePreferences must be used within PreferencesProvider");
  }
  return ctx;
}
