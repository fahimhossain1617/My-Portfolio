"use client";

import React from "react";
import Image from "next/image";
import {
  ExternalLink,
  Image as ImageIcon,
  ArrowUpRight,
  Layers,
} from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { ProjectRecord, UI_TEXT } from "@/data/portfolio";
import { GitHubIcon } from "./BrandIcons";

interface ProjectCardProps {
  project: ProjectRecord;
  gradientMode?: "gradient" | "gradient-flip";
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function ProjectCard({
  project,
  isExpanded,
  onToggleExpand,
}: ProjectCardProps) {
  const { t } = usePreferences();

  const isRadiation = project.id === "radiation-coaching";

  return (
    <article
      onClick={onToggleExpand}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md p-3.5 sm:p-5 transition-colors duration-200 hover:border-[var(--accent)] cursor-pointer select-none"
    >
      <div>
        {/* Top Header Bar: Category Tag & Action Buttons */}
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg)]/60 px-2.5 py-1 font-mono text-[10px] sm:text-[11px] font-medium tracking-wider text-[var(--accent)] uppercase backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            {project.category}
          </span>

          <div
            className="flex shrink-0 items-center gap-1.5 sm:gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 rounded-[9px] border border-[var(--border)] bg-[var(--bg)]/60 px-2.5 py-1 text-[11px] sm:text-xs font-medium text-[var(--heading)] transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--on-accent)] cursor-pointer"
              >
                <span>{t(UI_TEXT.projects.liveDemo)}</span>
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 rounded-[9px] border border-[var(--border)] bg-[var(--bg)]/60 px-2.5 py-1 text-[11px] sm:text-xs font-medium text-[var(--heading)] transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer"
              >
                <GitHubIcon size={12} />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>

        {/* Compact Device Showcase (No zoom scale, steady and uncropped) */}
        <div className="relative mx-auto w-full pt-0.5 pb-1.5">
          {/* Compact Laptop Display Lid */}
          <div className="relative mx-auto w-full max-w-[250px] xs:max-w-[300px] sm:max-w-[360px] rounded-t-[12px] sm:rounded-t-[14px] border-t-2 border-x-2 border-[#333344] bg-[#0c0c14] p-1.5 sm:p-2 pb-0 shadow-lg ring-1 ring-white/10">
            {/* Laptop Camera & Sensor Bar */}
            <div className="absolute top-0.5 left-1/2 -translate-x-1/2 flex items-center gap-1">
              <div className="h-1 w-1 rounded-full bg-[#1e1e2d] ring-1 ring-white/20" />
              <div className="h-1 w-1 rounded-full bg-emerald-500/80 animate-pulse" />
            </div>

            {/* Screen Inner Bezel & Live Screenshot */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-[6px] sm:rounded-t-[8px] bg-[#0a0d18]">
              {project.thumbnailSrc ? (
                <>
                  <Image
                    src={project.thumbnailSrc}
                    alt={t(project.title)}
                    fill
                    sizes="(max-width: 640px) 300px, 360px"
                    className={`transition-none ${
                      isRadiation
                        ? "object-contain bg-[#080d1a]"
                        : "object-cover object-top"
                    }`}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-40"
                  />
                </>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center bg-[#0d0e1a]">
                  <ImageIcon className="h-6 w-6 text-[var(--accent)] mb-1.5" />
                  <p className="text-xs text-[var(--muted)]">
                    {t(project.title)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Laptop Base / Keyboard Deck */}
          <div className="relative mx-auto -mt-[1px] h-2.5 sm:h-3 w-full max-w-[268px] xs:max-w-[320px] sm:max-w-[385px] rounded-b-[8px] sm:rounded-b-[11px] border-b border-x border-[#2c2d3d] bg-gradient-to-b from-[#222230] via-[#171722] to-[#0f0f18] shadow-md">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-10 sm:w-12 rounded-b-[3px] bg-[#111119] border-x border-b border-white/10" />
          </div>
        </div>

        {/* Project Meta Information */}
        <div className="mt-2 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-medium tracking-tight text-[var(--heading)] sm:text-xl group-hover:text-[var(--accent)] transition-colors">
              {t(project.title)}
            </h3>
            <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[var(--text)] line-clamp-2">
              {t(project.summary)}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            {project.verifiedTechTags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--bg)]/60 px-2 py-0.5 text-[10px] sm:text-[11px] font-medium text-[var(--text)]/90 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
            {project.verifiedTechTags.length > 5 && (
              <span className="text-[10px] text-[var(--muted)] px-1">
                +{project.verifiedTechTags.length - 5}
              </span>
            )}
          </div>

          {/* Open Full Case Study Trigger */}
          <div className="mt-3 flex items-center justify-between border-t border-[var(--border)]/60 pt-2.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]">
              <Layers className="h-3.5 w-3.5" />
              <span>{t(UI_TEXT.projects.viewCaseStudy)}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
