"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import {
  PROJECT_CATEGORIES,
  PROJECTS,
  ProjectCategory,
  UI_TEXT,
} from "@/data/portfolio";
import { ProjectCard } from "./ProjectCard";
import { CaseStudy } from "./CaseStudy";
import { AgentBuildWrapper } from "./ui/AgentBuildWrapper";

export function Projects() {
  const { lang, t } = usePreferences();
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>("All");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(
    null
  );

  // Home page shows the top 2 featured projects (Focentia and E-commerce)
  const homeProjects = PROJECTS.slice(0, 2);

  const filteredProjects =
    selectedCategory === "All"
      ? homeProjects
      : homeProjects.filter((p) => p.category === selectedCategory);

  const activeCaseStudyProject = PROJECTS.find(
    (p) => p.id === expandedProjectId
  );

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-7 sm:py-9 lg:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Header with Title and "View All" button on the same line */}
        <div>
          <div className="flex flex-row items-center justify-between gap-2 sm:gap-4">
            <AgentBuildWrapper
              agentName="UI_Agent"
              color="#8B8CF7"
              delay={0.05}
              badgeText="Section • Header"
              dimensionText="420 × 44"
              agentCount={2}
              className="w-fit min-w-0"
            >
              <h2
                id="projects-heading"
                className="text-[20px] leading-tight whitespace-nowrap font-light tracking-tight text-[var(--heading)] sm:text-4xl"
              >
                {lang === "bn" ? (
                  <>
                    প্রজেক্ট ও কাজ
                    <span className="hidden sm:inline"> (Featured Projects)</span>
                  </>
                ) : (
                  "Featured Projects & Works"
                )}
              </h2>
            </AgentBuildWrapper>

            {/* View All Button aligned strictly on the same single line with the title */}
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-[var(--accent)] bg-[var(--accent)]/10 hover:bg-[var(--accent)] hover:text-[var(--on-accent)] px-2.5 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-sm font-medium text-[var(--accent)] transition-all duration-200 cursor-pointer shadow-sm w-fit shrink-0 whitespace-nowrap"
            >
              <span>{t(UI_TEXT.projects.viewAllCta)}</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </div>
          <div className="mt-2 h-1 w-12 rounded-full bg-[var(--accent)]" />
          <p className="mt-3 text-sm text-[var(--muted)] max-w-xl">
            {lang === "bn"
              ? "বাস্তব সমস্যার সমাধানে তৈরি করা নির্বাচিত ওয়েব অ্যাপ্লিকেশন ও প্রজেক্ট।"
              : "A showcase of full-stack web applications, business platforms, and interactive digital solutions."}
          </p>
        </div>

        {/* Category Filters Centered in a Single Clean Line */}
        <AgentBuildWrapper
          agentName="Layout_Bot"
          color="#38BDF8"
          delay={0.12}
          badgeText="Navigation • FilterGroup"
          dimensionText="480 × 44"
          agentCount={2}
          className="mt-6 flex justify-center w-full"
        >
          <div
            role="group"
            aria-label={t(UI_TEXT.projects.filterLabel)}
            className="flex items-center justify-center gap-1.5 sm:gap-2 w-full max-w-full"
          >
            {PROJECT_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  aria-pressed={isSelected}
                  className={`rounded-full px-2.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-medium whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer ${
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
        </AgentBuildWrapper>

        {/* 2 Featured Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/50 p-8 text-center">
            <p className="text-sm text-[var(--muted)]">
              {t(UI_TEXT.projects.emptyCategory)}
            </p>
            <div className="mt-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] hover:underline"
              >
                <span>
                  {lang === "bn"
                    ? "সকল প্রজেক্ট পেজে সবগুলো ক্যাটাগরি দেখতে ক্লিক করুন"
                    : "View all categories on the full Projects page"}
                </span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
            {filteredProjects.map((project, idx) => {
              const projectAgents = [
                {
                  name: "Card_Assembler",
                  color: "#8B8CF7",
                  badge: "Project • FullStack",
                },
                {
                  name: "Builder_01",
                  color: "#38BDF8",
                  badge: "Project • WebApp",
                },
              ];
              const agent = projectAgents[idx % projectAgents.length];

              return (
                <AgentBuildWrapper
                  key={project.id}
                  agentName={agent.name}
                  color={agent.color}
                  delay={0.1 + (idx % 2) * 0.12}
                  badgeText={`${agent.badge} #${idx + 1}`}
                  dimensionText="580 × 340"
                  agentCount={3}
                  className="h-full w-full"
                >
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
                </AgentBuildWrapper>
              );
            })}
          </div>
        )}

        {/* Bottom Callout & Link to Full Dedicated Interface */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] px-5 py-2.5 text-xs sm:text-sm font-medium text-[var(--on-accent)] transition-all duration-200 cursor-pointer shadow-md"
          >
            <span>{t(UI_TEXT.projects.exploreAllCta)}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Separate Full-Interface Case Study Modal Overlay */}
      {activeCaseStudyProject && (
        <CaseStudy
          project={activeCaseStudyProject}
          onClose={() => setExpandedProjectId(null)}
        />
      )}
    </section>
  );
}
