"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  ExternalLink,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { ProjectRecord, UI_TEXT } from "@/data/portfolio";
import { GitHubIcon } from "./BrandIcons";

interface CaseStudyProps {
  project: ProjectRecord;
  onClose: () => void;
}

export function CaseStudy({ project, onClose }: CaseStudyProps) {
  const { lang, t } = usePreferences();
  const labels = UI_TEXT.projects.caseStudyLabels;

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
      }
    }, 60);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${t(project.title)} — Case Study`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-3 sm:p-6 backdrop-blur-md"
    >
      {/* Dedicated Separate Case Study Interface Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[24px] border border-[var(--border)] bg-[var(--surface)]/95 p-5 sm:p-8 shadow-2xl backdrop-blur-xl"
      >
        {/* Sticky Top Interface Header Row */}
        <div className="sticky -top-5 sm:-top-8 z-20 -mx-5 sm:-mx-8 mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--surface)]/95 px-5 py-4 sm:px-8 backdrop-blur-xl">
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-wider text-[var(--accent)] uppercase">
              {project.category} • CASE STUDY
            </p>
            <h4 className="mt-0.5 text-xl font-medium text-[var(--heading)] sm:text-2xl">
              {t(project.title)}
            </h4>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-[12px] bg-[var(--accent)] px-3.5 py-2 text-xs font-medium text-[var(--on-accent)] transition-colors hover:bg-[var(--accent-hover)]"
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
                className="inline-flex items-center gap-1.5 rounded-[12px] border border-[var(--accent)] bg-transparent px-3.5 py-2 text-xs font-medium text-[var(--accent)] transition-colors hover:bg-[var(--bg)]"
              >
                <GitHubIcon size={14} />
                <span>{t(UI_TEXT.projects.githubRepo)}</span>
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-[12px] border border-[var(--border)] bg-[var(--bg)]/80 px-3.5 py-2 text-xs font-medium text-[var(--heading)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              <span>{t(UI_TEXT.projects.hideCaseStudy)}</span>
            </button>
          </div>
        </div>

        {/* Case Study Body Content */}
        <div className="space-y-6">
          {/* 1. Overview & Purpose */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-[18px] border border-[var(--border)] bg-[var(--bg)]/50 p-4 sm:p-5">
              <h5 className="font-mono text-xs font-semibold tracking-wider text-[var(--accent)] uppercase">
                {t(labels.overview)}
              </h5>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">
                {t(project.caseStudy.overview)}
              </p>
            </div>

            <div className="rounded-[18px] border border-[var(--border)] bg-[var(--bg)]/50 p-4 sm:p-5">
              <h5 className="font-mono text-xs font-semibold tracking-wider text-[var(--accent)] uppercase">
                {t(labels.purpose)}
              </h5>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">
                {t(project.caseStudy.purposeAndAudience)}
              </p>
            </div>
          </div>

          {/* 2. Problem & Solution */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-[18px] border border-[var(--border)] bg-[var(--bg)]/50 p-4 sm:p-5">
              <h5 className="font-mono text-xs font-semibold tracking-wider text-[var(--accent)] uppercase">
                {t(labels.problem)}
              </h5>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">
                {t(project.caseStudy.problem)}
              </p>
            </div>

            <div className="rounded-[18px] border border-[var(--border)] bg-[var(--bg)]/50 p-4 sm:p-5">
              <h5 className="font-mono text-xs font-semibold tracking-wider text-[var(--accent)] uppercase">
                {t(labels.solution)}
              </h5>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">
                {t(project.caseStudy.solution)}
              </p>
            </div>
          </div>

          {/* 3. Key Features & Verified Technology Stack */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="rounded-[18px] border border-[var(--border)] bg-[var(--bg)]/50 p-4 sm:p-5 md:col-span-7">
              <h5 className="font-mono text-xs font-semibold tracking-wider text-[var(--accent)] uppercase">
                {t(labels.keyFeatures)}
              </h5>
              <ul className="mt-3 space-y-2.5">
                {project.caseStudy.keyFeatures[lang].map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-[var(--text)]"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                      aria-hidden="true"
                    />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[18px] border border-[var(--border)] bg-[var(--bg)]/50 p-4 sm:p-5 md:col-span-5">
              <h5 className="font-mono text-xs font-semibold tracking-wider text-[var(--accent)] uppercase">
                {t(labels.techStack)}
              </h5>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {project.caseStudy.verifiedTechStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-[12px] text-[var(--text)]"
                  >
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Engineering Challenges, Solutions & Lessons Learned */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-[18px] border border-[var(--border)] bg-[var(--bg)]/50 p-4 sm:p-5">
              <h5 className="font-mono text-xs font-semibold tracking-wider text-[var(--accent)] uppercase">
                {t(labels.challenges)}
              </h5>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">
                {t(project.caseStudy.challenges)}
              </p>
            </div>

            <div className="rounded-[18px] border border-[var(--border)] bg-[var(--bg)]/50 p-4 sm:p-5">
              <h5 className="font-mono text-xs font-semibold tracking-wider text-[var(--accent)] uppercase">
                {t(labels.challengeSolutions)}
              </h5>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">
                {t(project.caseStudy.challengeSolutions)}
              </p>
            </div>

            <div className="rounded-[18px] border border-[var(--border)] bg-[var(--bg)]/50 p-4 sm:p-5">
              <h5 className="font-mono text-xs font-semibold tracking-wider text-[var(--accent)] uppercase">
                {t(labels.lessonsLearned)}
              </h5>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">
                {t(project.caseStudy.lessonsLearned)}
              </p>
            </div>
          </div>

          {/* 5. Interface Previews / Screenshots */}
          <div className="rounded-[18px] border border-[var(--border)] bg-[var(--bg)]/50 p-4 sm:p-5">
            <h5 className="font-mono text-xs font-semibold tracking-wider text-[var(--accent)] uppercase">
              {t(labels.screenshots)}
            </h5>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {project.caseStudy.screenshots.map((shot) => (
                <div key={shot.id} className="group">
                  {shot.src ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--surface)]">
                      <Image
                        src={shot.src}
                        alt={t(shot.caption)}
                        fill
                        sizes="(max-width: 768px) 100vw, 480px"
                        className="object-cover transition-transform duration-300 group-hover:scale-102"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center rounded-[14px] border border-[var(--border)] bg-[var(--surface)] p-4">
                      <ImageIcon
                        className="h-5 w-5 text-[var(--muted)]"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  <p className="mt-2 text-xs text-[var(--muted)]">
                    {t(shot.caption)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-5">
            <button
              type="button"
              onClick={scrollToContact}
              className="text-sm font-medium text-[var(--accent)] transition-colors hover:underline cursor-pointer"
            >
              {t(UI_TEXT.projects.inquireAboutSimilar)} →
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-[12px] border border-[var(--border)] bg-[var(--bg)]/80 px-4 py-2 text-xs font-medium text-[var(--heading)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t(UI_TEXT.projects.hideCaseStudy)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
