"use client";

import React from "react";
import { ArrowUp, Mail, MapPin } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { PERSONAL_INFO } from "@/data/portfolio";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "./BrandIcons";

export function Footer() {
  const { lang, t } = usePreferences();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-[1] border-t border-[var(--border)] bg-[var(--bg)] pt-14 pb-24 md:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* Column 1 — Identity, Education, Location & Availability (7 cols) */}
          <div className="md:col-span-7">
            <h3 className="text-xl font-normal tracking-tight text-[var(--heading)] sm:text-2xl">
              {t(PERSONAL_INFO.fullName)}
            </h3>

            <p className="mt-1.5 text-sm font-normal text-[var(--accent)]">
              {t(PERSONAL_INFO.headline)}
            </p>

            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--text)]">
              {lang === "bn"
                ? "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিংয়ের শিক্ষার্থী ও ফুল-স্ট্যাক ওয়েব ডেভেলপার। আধুনিক ওয়েব অ্যাপ্লিকেশন এবং এআই অটোমেশন নিয়ে কাজ করছি।"
                : "Computer Science & Engineering undergraduate focused on engineering clean, scalable full-stack web applications and AI-augmented workflows."}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[var(--muted)]">
              <span>{t(PERSONAL_INFO.education.degree)}</span>
              <span>•</span>
              <span>{t(PERSONAL_INFO.education.institution)}</span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text)]">
                <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
                <span>Dhaka, Bangladesh</span>
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[11px] font-normal text-[var(--text)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span>{lang === "bn" ? "নতুন প্রজেক্টের জন্য প্রস্তুত" : "Available for projects"}</span>
              </span>
            </div>
          </div>

          {/* Column 2 — Contact & Social Channels (5 cols) */}
          <div className="md:col-span-5">
            <h4 className="font-mono text-xs font-medium tracking-wider text-[var(--heading)] uppercase">
              {lang === "bn" ? "যোগাযোগ ও সোশ্যাল প্রোফাইল" : "Connect & Reach Out"}
            </h4>

            <ul className="mt-4 space-y-3.5 text-sm">
              {/* Email */}
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.contact.email}`}
                  className="group inline-flex items-center gap-3 text-[var(--text)] transition-colors hover:text-[var(--accent)] hover:underline"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                  <span className="truncate">{PERSONAL_INFO.contact.email}</span>
                </a>
              </li>

              {/* WhatsApp */}
              <li>
                <a
                  href={PERSONAL_INFO.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-[var(--text)] transition-colors hover:text-[var(--accent)] hover:underline"
                >
                  <WhatsAppIcon size={18} className="shrink-0 text-[var(--accent)]" />
                  <span>WhatsApp</span>
                </a>
              </li>

              {/* LinkedIn */}
              <li>
                <a
                  href={PERSONAL_INFO.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-[var(--text)] transition-colors hover:text-[var(--accent)] hover:underline"
                >
                  <LinkedInIcon size={18} className="shrink-0 text-[var(--accent)]" />
                  <span>linkedin.com/in/md-fahim-hossain-cse</span>
                </a>
              </li>

              {/* GitHub */}
              {PERSONAL_INFO.contact.githubUrl && (
                <li>
                  <a
                    href={PERSONAL_INFO.contact.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-[var(--text)] transition-colors hover:text-[var(--accent)] hover:underline"
                  >
                    <GitHubIcon size={18} className="shrink-0 text-[var(--heading)]" />
                    <span>github.com/fahimhosen1617</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--border)] pt-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center">
          <p>
            © {currentYear} {t(PERSONAL_INFO.fullName)}. {lang === "bn" ? "সর্বস্বত্ব সংরক্ষিত।" : "All rights reserved."}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 font-mono text-xs text-[var(--muted)] transition-colors hover:text-[var(--accent)] hover:underline cursor-pointer"
            aria-label={lang === "bn" ? "উপরে যান" : "Back to top"}
          >
            <span>{lang === "bn" ? "উপরে যান" : "Back to top"}</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
