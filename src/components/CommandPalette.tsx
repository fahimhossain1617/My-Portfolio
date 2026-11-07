"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Copy,
  Languages,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { PERSONAL_INFO, UI_TEXT } from "@/data/portfolio";
import { LinkedInIcon, WhatsAppIcon } from "./BrandIcons";

interface CommandItem {
  id: string;
  label: string;
  category: string;
  action: () => void;
}

export function CommandPalette() {
  const {
    isCommandOpen,
    setIsCommandOpen,
    theme,
    toggleTheme,
    lang,
    toggleLanguage,
    t,
  } = usePreferences();

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const closePalette = () => {
    setIsCommandOpen(false);
    setQuery("");
  };

  const jumpTo = (sectionId: string) => {
    closePalette();
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      window.history.replaceState(null, "", `#${sectionId}`);
    } else {
      window.location.href = sectionId === "home" ? "/" : `/#${sectionId}`;
    }
  };

  const commands: CommandItem[] = [
    {
      id: "nav-home",
      label: `${t(UI_TEXT.nav.home)}`,
      category: lang === "bn" ? "নেভিগেশন" : "Navigation",
      action: () => jumpTo("home"),
    },
    {
      id: "nav-about",
      label: `${t(UI_TEXT.nav.about)}`,
      category: lang === "bn" ? "নেভিগেশন" : "Navigation",
      action: () => jumpTo("about"),
    },
    {
      id: "nav-skills",
      label: `${t(UI_TEXT.nav.skills)}`,
      category: lang === "bn" ? "নেভিগেশন" : "Navigation",
      action: () => jumpTo("skills"),
    },
    {
      id: "nav-projects",
      label: `${t(UI_TEXT.nav.projects)}`,
      category: lang === "bn" ? "নেভিগেশন" : "Navigation",
      action: () => jumpTo("projects"),
    },
    {
      id: "nav-all-projects",
      label: lang === "bn" ? "সকল প্রজেক্ট দেখুন (All 5 Projects Page)" : "View All Projects (All 5 Projects Page)",
      category: lang === "bn" ? "প্রজেক্ট" : "Projects",
      action: () => {
        closePalette();
        window.location.href = "/projects";
      },
    },
    {
      id: "nav-journey",
      label: `${t(UI_TEXT.nav.journey)}`,
      category: lang === "bn" ? "নেভিগেশন" : "Navigation",
      action: () => jumpTo("journey"),
    },
    {
      id: "nav-contact",
      label: `${t(UI_TEXT.nav.contact)}`,
      category: lang === "bn" ? "নেভিগেশন" : "Navigation",
      action: () => jumpTo("contact"),
    },
    {
      id: "pref-theme",
      label:
        theme === "dark"
          ? t(UI_TEXT.nav.themeToggleLight)
          : t(UI_TEXT.nav.themeToggleDark),
      category: lang === "bn" ? "সেটিংস" : "Preferences",
      action: () => {
        toggleTheme();
        closePalette();
      },
    },
    {
      id: "pref-lang",
      label: t(UI_TEXT.nav.langToggle),
      category: lang === "bn" ? "সেটিংস" : "Preferences",
      action: () => {
        toggleLanguage();
        closePalette();
      },
    },
    {
      id: "contact-open-gmail",
      label: lang === "bn" ? "সরাসরি জিমেইলে লিখুন" : "Compose in Gmail",
      category: lang === "bn" ? "যোগাযোগ" : "Contact",
      action: () => {
        window.open(
          `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSONAL_INFO.contact.email)}&su=Portfolio%20Inquiry`,
          "_blank",
          "noopener,noreferrer"
        );
        closePalette();
      },
    },
    {
      id: "contact-copy-email",
      label: `${t(UI_TEXT.contact.copyEmail)} (${PERSONAL_INFO.contact.email})`,
      category: lang === "bn" ? "যোগাযোগ" : "Contact",
      action: () => {
        navigator.clipboard?.writeText(PERSONAL_INFO.contact.email);
        closePalette();
      },
    },
    {
      id: "contact-whatsapp",
      label: t(UI_TEXT.contact.whatsappAction),
      category: lang === "bn" ? "যোগাযোগ" : "Contact",
      action: () => {
        window.open(
          PERSONAL_INFO.contact.whatsappUrl,
          "_blank",
          "noopener,noreferrer"
        );
        closePalette();
      },
    },
    {
      id: "contact-linkedin",
      label: t(UI_TEXT.contact.linkedinAction),
      category: lang === "bn" ? "যোগাযোগ" : "Contact",
      action: () => {
        window.open(
          PERSONAL_INFO.contact.linkedinUrl,
          "_blank",
          "noopener,noreferrer"
        );
        closePalette();
      },
    },
    ...(PERSONAL_INFO.contact.githubUrl
      ? [
          {
            id: "contact-github",
            label: lang === "bn" ? "গিটহাব প্রোফাইল (@fahimhossain1617)" : "GitHub Profile (@fahimhossain1617)",
            category: lang === "bn" ? "যোগাযোগ" : "Contact",
            action: () => {
              window.open(
                PERSONAL_INFO.contact.githubUrl!,
                "_blank",
                "noopener,noreferrer"
              );
              closePalette();
            },
          },
        ]
      : []),
  ];

  const filteredCommands = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.trim().toLowerCase()) ||
      c.category.toLowerCase().includes(query.trim().toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (isCommandOpen) {
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [isCommandOpen]);

  useEffect(() => {
    if (!isCommandOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closePalette();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredCommands.length > 0 ? (prev + 1) % filteredCommands.length : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredCommands.length > 0
            ? (prev - 1 + filteredCommands.length) % filteredCommands.length
            : 0
        );
      } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandOpen, filteredCommands, selectedIndex]);

  if (!isCommandOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t(UI_TEXT.nav.commandPaletteHint)}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 px-4 pt-20 sm:pt-28"
      onClick={(e) => {
        if (e.target === e.currentTarget) closePalette();
      }}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--surface)]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3.5">
          <Search
            className="h-4 w-4 shrink-0 text-[var(--muted)]"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === "bn"
                ? "সেকশন বা অ্যাকশন খুঁজুন..."
                : "Type a command or search sections..."
            }
            className="w-full bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none"
          />
          <button
            type="button"
            onClick={closePalette}
            aria-label="Close command palette"
            className="rounded-[12px] p-1 text-[var(--muted)] hover:text-[var(--heading)] cursor-pointer"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Command Results */}
        <ul
          role="listbox"
          className="max-h-80 overflow-y-auto p-2"
        >
          {filteredCommands.length === 0 ? (
            <li className="px-4 py-6 text-center text-xs text-[var(--muted)]">
              {lang === "bn"
                ? "কোনো ফলাফল পাওয়া যায়নি।"
                : "No matching commands found."}
            </li>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <li key={cmd.id} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={cmd.action}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex w-full items-center justify-between rounded-[12px] px-3.5 py-2.5 text-left text-xs font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[var(--accent)] text-[var(--on-accent)]"
                        : "text-[var(--text)] hover:bg-[var(--bg)]"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      {cmd.id === "pref-theme" ? (
                        theme === "dark" ? (
                          <Sun className="h-3.5 w-3.5" />
                        ) : (
                          <Moon className="h-3.5 w-3.5" />
                        )
                      ) : cmd.id === "pref-lang" ? (
                        <Languages className="h-3.5 w-3.5" />
                      ) : cmd.id === "contact-copy-email" ? (
                        <Copy className="h-3.5 w-3.5" />
                      ) : cmd.id === "contact-whatsapp" ? (
                        <WhatsAppIcon size={14} />
                      ) : cmd.id === "contact-linkedin" ? (
                        <LinkedInIcon size={14} />
                      ) : (
                        <ArrowRight className="h-3.5 w-3.5" />
                      )}
                      <span>{cmd.label}</span>
                    </span>
                    <span
                      className={`font-mono text-[10px] uppercase ${
                        isSelected
                          ? "text-[var(--on-accent)] opacity-80"
                          : "text-[var(--muted)]"
                      }`}
                    >
                      {cmd.category}
                    </span>
                  </button>
                </li>
              );
            })
          )}
        </ul>

        {/* Footer Keyboard Help */}
        <div className="flex items-center justify-between border-t border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-mono text-[10px] text-[var(--muted)]">
          <span>↑↓ Navigate • Enter Select</span>
          <span>ESC Close</span>
        </div>
      </div>
    </div>
  );
}
