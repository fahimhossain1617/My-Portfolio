"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { PERSONAL_INFO, UI_TEXT } from "@/data/portfolio";

export function NotFound() {
  const { t } = usePreferences();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--bg)] px-4 text-center text-[var(--text)]">
      <div className="max-w-md rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10">
        <p className="font-mono text-xs font-medium tracking-widest text-[var(--accent)] uppercase">
          {t(PERSONAL_INFO.fullName)}
        </p>
        <h1 className="mt-3 font-mono text-5xl font-light text-[var(--heading)] sm:text-6xl">
          {UI_TEXT.notFound.code}
        </h1>
        <h2 className="mt-3 text-xl font-normal text-[var(--heading)]">
          {t(UI_TEXT.notFound.heading)}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text)]">
          {t(UI_TEXT.notFound.description)}
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-[12px] bg-[var(--accent)] px-5 py-3 text-xs font-medium text-[var(--on-accent)] transition-colors hover:bg-[var(--accent-hover)]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{t(UI_TEXT.notFound.backHome)}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
