"use client";

import React, { useEffect } from "react";
import { ExternalLink, X, ArrowUpRight } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { ProjectRecord, UI_TEXT } from "@/data/portfolio";
import { GitHubIcon } from "./BrandIcons";

interface CaseStudyProps {
  project: ProjectRecord;
  onClose: () => void;
}

export function CaseStudy({ project, onClose }: CaseStudyProps) {
  const { lang, t } = usePreferences();

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const scrollToContact = () => {
    onClose();
    setTimeout(() => {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const top =
          contactEl.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      } else {
        window.location.href = "/#contact";
      }
    }, 60);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${t(project.title)} — Case Study`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-3 sm:p-6 backdrop-blur-md"
    >
      {/* Case Study Container (Clean, unboxed, elevated) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-9 shadow-2xl backdrop-blur-2xl"
      >
        {/* Sticky Header: Lifted slightly higher, Cross icon at right, action buttons below */}
        <div className="sticky -top-6 sm:-top-9 z-20 -mx-6 sm:-mx-9 -mt-2 mb-6 border-b border-[var(--border)] bg-[var(--surface)]/98 px-6 sm:px-9 pt-4 pb-4 backdrop-blur-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-mono text-[11px] font-semibold tracking-wider text-[var(--accent)] uppercase">
                {project.category} • CASE STUDY
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-light tracking-tight text-[var(--heading)]">
                {t(project.title)}
              </h2>
            </div>

            {/* Simple Clean Cross Icon Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-full border border-[var(--border)] bg-[var(--bg)]/80 p-2 text-[var(--muted)] hover:text-[var(--heading)] hover:border-[var(--accent)] transition-colors cursor-pointer shrink-0"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Action Buttons Row */}
          <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-2.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-[var(--on-accent)] transition-colors hover:bg-[var(--accent-hover)] cursor-pointer"
              >
                <span>{t(UI_TEXT.projects.liveDemo)}</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-[10px] border border-[var(--accent)] bg-transparent px-3 py-1.5 text-xs font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/10 cursor-pointer"
              >
                <GitHubIcon size={13} />
                <span>GitHub</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={`${project.githubUrl}#readme`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-[10px] border border-[var(--border)] bg-[var(--bg)]/80 px-3 py-1.5 text-xs font-medium text-[var(--heading)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer"
              >
                <GitHubIcon size={13} />
                <span>README</span>
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            )}

            {/* Discuss Project With Me Button */}
            <button
              type="button"
              onClick={scrollToContact}
              className="inline-flex items-center gap-1.5 rounded-[10px] border border-[var(--border)] bg-[var(--bg)]/80 px-3 py-1.5 text-xs font-medium text-[var(--accent)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 cursor-pointer"
            >
              <span>
                {lang === "bn"
                  ? "প্রজেক্ট নিয়ে আলোচনা করুন"
                  : "Discuss Project With Me"}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Case Study Content (Clean Editorial Layout with Distinct Highlighted Headings) */}
        <div className="space-y-6 pt-1">
          {/* 1. Project Overview & Target Audience */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)]/12 dark:bg-[var(--accent)]/20 border-l-[3.5px] border-[var(--accent)] px-3.5 py-1.5 mb-2.5">
              <h3 className="text-sm sm:text-base font-bold tracking-tight text-[#4338CA] dark:text-[#A5B4FC]">
                {lang === "bn"
                  ? "প্রজেক্টের বিবরণ ও লক্ষ্য (Project Overview & Purpose)"
                  : "Project Overview & Target Audience"}
              </h3>
            </div>
            <p className="mt-1 text-sm sm:text-base leading-relaxed text-[var(--text)]">
              {t(project.caseStudy.overview)}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              {t(project.caseStudy.purposeAndAudience)}
            </p>
          </div>

          <hr className="border-t border-[var(--border)]/70" />

          {/* 2. Key Features */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)]/12 dark:bg-[var(--accent)]/20 border-l-[3.5px] border-[var(--accent)] px-3.5 py-1.5 mb-2.5">
              <h3 className="text-sm sm:text-base font-bold tracking-tight text-[#4338CA] dark:text-[#A5B4FC]">
                {lang === "bn"
                  ? "মূল ফিচারসমূহ (Key Features)"
                  : "Key Features & Capabilities"}
              </h3>
            </div>
            <ul className="mt-2 space-y-2">
              {project.caseStudy.keyFeatures[lang].map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--text)]"
                >
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <hr className="border-t border-[var(--border)]/70" />

          {/* 3. Verified Technology Stack */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)]/12 dark:bg-[var(--accent)]/20 border-l-[3.5px] border-[var(--accent)] px-3.5 py-1.5 mb-2.5">
              <h3 className="text-sm sm:text-base font-bold tracking-tight text-[#4338CA] dark:text-[#A5B4FC]">
                {lang === "bn"
                  ? "ব্যবহৃত টেকনোলজি স্ট্যাক (Verified Technology Stack)"
                  : "Verified Technology Stack"}
              </h3>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {project.caseStudy.verifiedTechStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--bg)]/80 px-3 py-1 text-xs font-medium text-[var(--text)]"
                >
                  <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>

          <hr className="border-t border-[var(--border)]/70" />

          {/* 4. Problem, Challenges & Implemented Solutions */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)]/12 dark:bg-[var(--accent)]/20 border-l-[3.5px] border-[var(--accent)] px-3.5 py-1.5 mb-3">
              <h3 className="text-sm sm:text-base font-bold tracking-tight text-[#4338CA] dark:text-[#A5B4FC]">
                {lang === "bn"
                  ? "চ্যালেঞ্জ ও বাস্তবায়ন সমাধান (Challenges & Implemented Solutions)"
                  : "Challenges & Implemented Solutions"}
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-[var(--heading)] uppercase tracking-wider">
                  {lang === "bn"
                    ? "চিহ্নিত সমস্যা ও চ্যালেঞ্জ"
                    : "Problem & Challenges Encountered"}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">
                  {t(project.caseStudy.problem)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {t(project.caseStudy.challenges)}
                </p>
              </div>

              <div>
                <h4 className="text-xs sm:text-sm font-semibold text-[var(--heading)] uppercase tracking-wider">
                  {lang === "bn"
                    ? "বাস্তবায়িত সমাধান ও কৌশল"
                    : "Implemented Solution & Architecture"}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">
                  {t(project.caseStudy.solution)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {t(project.caseStudy.challengeSolutions)}
                </p>
              </div>
            </div>
          </div>

          <hr className="border-t border-[var(--border)]/70" />

          {/* 5. Lessons Learned */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)]/12 dark:bg-[var(--accent)]/20 border-l-[3.5px] border-[var(--accent)] px-3.5 py-1.5 mb-2.5">
              <h3 className="text-sm sm:text-base font-bold tracking-tight text-[#4338CA] dark:text-[#A5B4FC]">
                {lang === "bn"
                  ? "অর্জিত শিক্ষা ও অভিজ্ঞতা (Lessons Learned)"
                  : "Lessons Learned"}
              </h3>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text)]">
              {t(project.caseStudy.lessonsLearned)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
