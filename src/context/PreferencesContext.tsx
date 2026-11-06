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
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
      } else {
        const prefersLight =
          typeof window !== "undefined" &&
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: light)").matches;
        const initialTheme: Theme = prefersLight ? "light" : "dark";
        setThemeState(initialTheme);
        document.documentElement.setAttribute("data-theme", initialTheme);
        document.documentElement.classList.toggle("dark", initialTheme === "dark");
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

  const executeWithTransition = (updateFn: () => void) => {
    if (
      typeof document !== "undefined" &&
      "startViewTransition" in document &&
      typeof (document as unknown as { startViewTransition?: (cb: () => void) => void }).startViewTransition === "function"
    ) {
      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(updateFn);
    } else {
      updateFn();
    }
  };

  const setTheme = useCallback((nextTheme: Theme) => {
    executeWithTransition(() => {
      setThemeState(nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
      document.documentElement.classList.toggle("dark", nextTheme === "dark");
      try {
        window.localStorage.setItem(STORAGE_THEME_KEY, nextTheme);
      } catch {
        // Ignore storage errors
      }
    });
  }, []);

  const toggleTheme = useCallback(() => {
    executeWithTransition(() => {
      setThemeState((prev) => {
        const next = prev === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        document.documentElement.classList.toggle("dark", next === "dark");
        try {
          window.localStorage.setItem(STORAGE_THEME_KEY, next);
        } catch {
          // Ignore
        }
        return next;
      });
    });
  }, []);

  const setLang = useCallback((nextLang: Language) => {
    executeWithTransition(() => {
      setLangState(nextLang);
      document.documentElement.lang = nextLang;
      try {
        window.localStorage.setItem(STORAGE_LANG_KEY, nextLang);
      } catch {
        // Ignore
      }
    });
  }, []);

  const toggleLanguage = useCallback(() => {
    executeWithTransition(() => {
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
    });
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
