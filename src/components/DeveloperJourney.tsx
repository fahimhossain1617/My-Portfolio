"use client";

import React from "react";
import { CheckCircle2, Calendar, MapPin } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { JOURNEY_STAGES } from "@/data/portfolio";
import { AgentBuildWrapper } from "./ui/AgentBuildWrapper";

export function DeveloperJourney() {
  const { lang, t } = usePreferences();

  return (
    <section
      id="journey"
      aria-labelledby="journey-heading"
      className="py-7 sm:py-9 lg:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <AgentBuildWrapper
          agentName="Layout_Bot"
          color="#8B8CF7"
          delay={0.05}
          badgeText="Section • Header"
          dimensionText="390 × 58"
          agentCount={2}
          className="w-fit"
        >
          <div>
            <h2
              id="journey-heading"
              className="text-3xl font-light tracking-tight text-[var(--heading)] sm:text-4xl"
            >
              {lang === "bn" ? "লার্নিং ও ক্যারিয়ার জার্নি" : "Developer Journey"}
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-[var(--accent)]" />
            <p className="mt-3 text-sm text-[var(--muted)] max-w-xl">
              {lang === "bn"
                ? "কম্পিউটার সায়েন্স শিক্ষা থেকে শুরু করে বাস্তব প্রজেক্ট তৈরির ধারাবাহিক অভিজ্ঞতা।"
                : "My academic path, practical engineering milestones, and continuous learning progression."}
            </p>
          </div>
        </AgentBuildWrapper>

        {/* Clean Timeline directly on the main interface (No outer enclosing box) */}
        <div className="relative mt-8">
          <ol className="relative ml-2.5 sm:ml-4 space-y-7 border-l-2 border-[var(--accent)]/40 pl-4 sm:pl-8">
            {JOURNEY_STAGES.map((stage, idx) => {
              const stageAgents = [
                { name: "Timeline_Bot", color: "#8B8CF7", badge: "Milestone • CS_Foundation", dim: "640 × 170" },
                { name: "Builder_01", color: "#38BDF8", badge: "Milestone • FullStack_Dev", dim: "640 × 170" },
                { name: "Component_Master", color: "#10B981", badge: "Milestone • Enterprise_Apps", dim: "640 × 170" },
                { name: "Style_Architect", color: "#A3A4FA", badge: "Milestone • AI_Automation", dim: "640 × 170" },
              ];
              const agent = stageAgents[idx % stageAgents.length];

              return (
                <li
                  key={stage.id}
                  className="relative group"
                >
                  {/* Timeline Node Marker */}
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[25px] sm:-left-[41px] top-6 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-transform duration-200 group-hover:scale-125 z-10 ${
                      stage.isCurrent
                        ? "border-[var(--accent)] bg-[var(--accent)] shadow-[0_0_12px_rgba(139,140,247,0.6)]"
                        : "border-[var(--accent)] bg-[var(--bg)]"
                    }`}
                  >
                    {stage.isCurrent && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--on-accent)]" />
                    )}
                  </span>

                  {/* The SINGLE clean stage card wrapped in AgentBuildWrapper */}
                  <AgentBuildWrapper
                    agentName={agent.name}
                    color={agent.color}
                    delay={0.1 + idx * 0.12}
                    badgeText={agent.badge}
                    dimensionText={agent.dim}
                    agentCount={2}
                    className="w-full"
                  >
                    <div className="rounded-[20px] border border-[var(--border)] bg-[var(--surface)]/80 p-5 sm:p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-[var(--accent)]/60">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg)]/70 px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-[var(--accent)] uppercase">
                          <Calendar className="h-3 w-3" />
                          {t(stage.stageLabel)}
                        </span>

                        {stage.isCurrent && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-500">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {lang === "bn" ? "বর্তমান অবস্থা" : "Active Stage"}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 text-lg font-medium tracking-tight text-[var(--heading)] sm:text-xl">
                        {t(stage.title)}
                      </h3>

                      <p className="mt-1 text-xs sm:text-sm font-normal text-[var(--muted)] flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
                        <span>{t(stage.organizationOrContext)}</span>
                      </p>

                      <p className="mt-2.5 text-sm leading-relaxed text-[var(--text)]">
                        {t(stage.description)}
                      </p>

                      {/* Clean point-by-point items separated with horizontal divider line (Zero nested boxes!) */}
                      <div className="mt-4 border-t border-[var(--border)]/70 pt-3.5">
                        <ul className="space-y-2">
                          {stage.highlights[lang].map((item, hIdx) => (
                            <li
                              key={hIdx}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text)]"
                            >
                              <CheckCircle2
                                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]"
                                aria-hidden="true"
                              />
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </AgentBuildWrapper>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
