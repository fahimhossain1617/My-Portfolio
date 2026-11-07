"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePreferences } from "@/context/PreferencesContext";
import {
  PROJECT_CATEGORIES,
  PROJECTS,
  ProjectCategory,
  UI_TEXT,
} from "@/data/portfolio";
import { ProjectCard } from "@/components/ProjectCard";
import { CaseStudy } from "@/components/CaseStudy";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollRevealProvider } from "@/components/ScrollRevealProvider";
import { WaveBackground } from "@/components/WaveBackground";

export default function AllProjectsPage() {
  const { lang, t } = usePreferences();
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>("All");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(
    null
  );

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const activeCaseStudyProject = PROJECTS.find(
    (p) => p.id === expandedProjectId
  );

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-clip text-[var(--text)]">
      <WaveBackground />
      <ScrollRevealProvider />
      <CustomCursor />
      <Navigation />
      <CommandPalette />

      <main
        id="main-content"
        className="relative z-[1] w-full max-w-full overflow-x-clip pt-16 pb-12 sm:pt-20 sm:pb-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          {/* Breadcrumb & Return to Portfolio */}
          <div className="mb-3">
            <Link
              href="/"
              className="inline-flex items-center text-xs sm:text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
            >
              {lang === "bn" ? "← মূল পোর্টফোলিওতে ফিরে যান" : "← Back to Portfolio"}
            </Link>
          </div>

          {/* Page Header (No icons before text, clean typography, no horizontal divider) */}
          <div className="flex flex-col gap-2">
            <div>
              <p className="font-mono text-xs font-semibold tracking-wider text-[var(--accent)] uppercase">
                {lang === "bn" ? "সকল প্রজেক্ট ও ওয়ার্কস" : "All Projects & Works"}
              </p>
              <h1 className="mt-1 text-3xl font-light tracking-tight text-[var(--heading)] sm:text-4xl md:text-5xl">
                {lang === "bn"
                  ? "প্রজেক্ট ও কাজ (Featured Projects)"
                  : "Featured Projects & Works"}
              </h1>
              <div className="mt-2.5 h-1 w-12 rounded-full bg-[var(--accent)]" />
              <p className="mt-3 text-sm text-[var(--muted)] max-w-2xl leading-relaxed">
                {lang === "bn"
                  ? "বাস্তব সমস্যার সমাধানে তৈরি করা আমার সকল ৫টি পূর্ণাঙ্গ প্রজেক্ট—ফুল-স্ট্যাক অ্যাপ্লিকেশন, ক্লায়েন্ট প্ল্যাটফর্ম এবং লার্নিং টুলস।"
                  : "A showcase of all 5 full-stack applications, client business platforms, and interactive engineering tools."}
              </p>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-8 flex justify-center">
            <div
              role="group"
              aria-label={t(UI_TEXT.projects.filterLabel)}
              className="flex flex-wrap items-center justify-center gap-2"
            >
              {PROJECT_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    aria-pressed={isSelected}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[var(--accent)] text-[var(--on-accent)] shadow-sm"
                        : "border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--heading)]"
                    }`}
                  >
                    {t(cat.label)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects Grid: All 5 Projects with identical clean styling and no glowing box effects */}
          {filteredProjects.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50 p-12 text-center">
              <p className="text-sm text-[var(--muted)]">
                {t(UI_TEXT.projects.emptyCategory)}
              </p>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
              {filteredProjects.map((project, idx) => (
                <div key={project.id} className="h-full w-full">
                  <ProjectCard
                    project={project}
                    gradientMode={idx % 2 === 0 ? "gradient" : "gradient-flip"}
                    isExpanded={expandedProjectId === project.id}
                    onToggleExpand={() =>
                      setExpandedProjectId((prev) =>
                        prev === project.id ? null : project.id
                      )
                    }
                  />
                </div>
              ))}
            </div>
          )}

          {/* End of projects grid */}
        </div>
      </main>

      {/* Case Study Modal Overlay */}
      {activeCaseStudyProject && (
        <CaseStudy
          project={activeCaseStudyProject}
          onClose={() => setExpandedProjectId(null)}
        />
      )}

      <Footer />
    </div>
  );
}

