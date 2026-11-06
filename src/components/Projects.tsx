"use client";

import React, { useState } from "react";
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

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

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
        {/* Header (Left-aligned as requested) */}
        <AgentBuildWrapper
          agentName="UI_Agent"
          color="#8B8CF7"
          delay={0.05}
          badgeText="Section • Header"
          dimensionText="420 × 60"
          agentCount={2}
          className="w-fit"
        >
          <div>
            <h2
              id="projects-heading"
              className="text-3xl font-light tracking-tight text-[var(--heading)] sm:text-4xl"
            >
              {lang === "bn"
                ? "প্রজেক্ট ও কাজ (Featured Projects)"
                : "Featured Projects & Works"}
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-[var(--accent)]" />
            <p className="mt-3 text-sm text-[var(--muted)] max-w-xl">
              {lang === "bn"
                ? "বাস্তব সমস্যার সমাধানে তৈরি করা নির্বাচিত ওয়েব অ্যাপ্লিকেশন ও প্রজেক্ট।"
                : "A showcase of full-stack web applications, business platforms, and interactive digital solutions."}
            </p>
          </div>
        </AgentBuildWrapper>

        {/* Category Filters Centered in the Middle (Fits cleanly on mobile without scrolling) */}
        <AgentBuildWrapper
          agentName="Layout_Bot"
          color="#38BDF8"
          delay={0.12}
          badgeText="Navigation • FilterGroup"
          dimensionText="480 × 44"
          agentCount={2}
          className="mt-6 flex justify-center"
        >
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
                  className={`rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-medium transition-all duration-200 cursor-pointer ${
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

        {/* Compact Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="mt-6 py-8 text-center">
            <p className="text-sm text-[var(--muted)]">
              {t(UI_TEXT.projects.emptyCategory)}
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
            {filteredProjects.map((project, idx) => {
              const projectAgents = [
                { name: "Card_Assembler", color: "#8B8CF7", badge: "Project • FullStack" },
                { name: "Builder_01", color: "#38BDF8", badge: "Project • WebApp" },
                { name: "Style_Architect", color: "#10B981", badge: "Project • UI" },
                { name: "UI_Agent", color: "#A3A4FA", badge: "Project • Solution" },
                { name: "Layout_Bot", color: "#F59E0B", badge: "Project • Platform" },
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
