"use client";

import React from "react";
import { usePreferences } from "@/context/PreferencesContext";
import { SKILL_GROUPS } from "@/data/portfolio";

export function Skills() {
  const { lang, t } = usePreferences();

  // Flatten all skills with their group category label for the continuous marquee stream
  const allSkills = SKILL_GROUPS.flatMap((group) =>
    group.skills.map((skill) => ({
      name: skill.name,
      category: t(group.title),
      note: skill.contextNote ? t(skill.contextNote) : "",
    }))
  );

  const row1Skills = allSkills.slice(0, Math.ceil(allSkills.length / 2));
  const row2Skills = allSkills.slice(Math.ceil(allSkills.length / 2));

  // Duplicate twice so each half is rich and wide enough for any screen, then render 2 identical halves for a 100% seamless -50% loop
  const track1 = [...row1Skills, ...row1Skills];
  const track2 = [...row2Skills, ...row2Skills];

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="py-7 sm:py-9 lg:py-10 relative overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div data-reveal="fade-up">
          <h2
            id="skills-heading"
            className="text-3xl font-light tracking-tight text-[var(--heading)] sm:text-4xl"
          >
            {lang === "bn" ? "দক্ষতা ও প্রযুক্তি" : "Skills & Technologies"}
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-[var(--accent)]" />
          <p className="mt-3 text-sm text-[var(--muted)] max-w-xl">
            {lang === "bn"
              ? "আমি নিয়মিত যেসকল ফ্রন্টএন্ড, ব্যাকএন্ড ও আধুনিক টুলস ব্যবহার করে কাজ করি।"
              : "Core technologies, frameworks, and modern tools I use to build scalable products."}
          </p>
        </div>

        {/* Seamless Free-Flowing Marquee Stream without Any Boxy Shapes */}
        <div
          data-reveal="zoom-in"
          aria-label={
            lang === "bn"
              ? "দক্ষতা ও প্রযুক্তি তালিকা"
              : "Skills and technologies marquee"
          }
          className="marquee-container relative mt-7 overflow-hidden py-3"
        >
          {/* Left & Right Subtle Smoky Fade Masks Matched to Side Margins */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-6 sm:w-12 bg-gradient-to-r from-[var(--bg)] to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-6 sm:w-12 bg-gradient-to-l from-[var(--bg)] to-transparent"
          />

          {/* Row 1: Moving Left seamlessly (2 identical halves for exact -50% loop) */}
          <div className="animate-marquee-left flex items-center">
            {[0, 1].map((halfIdx) => (
              <div
                key={`row1-half-${halfIdx}`}
                aria-hidden={halfIdx === 1 ? "true" : undefined}
                className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
              >
                {track1.map((item, idx) => (
                  <div
                    key={`row1-${halfIdx}-${idx}-${item.name}`}
                    className="group inline-flex shrink-0 items-center gap-2.5 py-1.5 transition-transform duration-200 hover:-translate-y-1 hover:scale-105 cursor-default"
                  >
                    {/* Subtle Purple Indicator Dot */}
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-[var(--accent)] transition-transform duration-200 group-hover:scale-125"
                    />

                    {/* Skill Name with Theme-Aware Purple Gradient Typography */}
                    <span className="skill-gradient-text font-bold text-base sm:text-lg tracking-tight">
                      {item.name}
                    </span>

                    {/* Subtitle / Context note */}
                    <span className="text-xs sm:text-sm font-normal text-[var(--muted)] transition-colors duration-200 group-hover:text-[var(--text)]">
                      — {item.note || item.category}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="my-5" />

          {/* Row 2: Moving Right seamlessly (2 identical halves for exact -50% loop) */}
          <div className="animate-marquee-right flex items-center">
            {[0, 1].map((halfIdx) => (
              <div
                key={`row2-half-${halfIdx}`}
                aria-hidden={halfIdx === 1 ? "true" : undefined}
                className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
              >
                {track2.map((item, idx) => (
                  <div
                    key={`row2-${halfIdx}-${idx}-${item.name}`}
                    className="group inline-flex shrink-0 items-center gap-2.5 py-1.5 transition-transform duration-200 hover:-translate-y-1 hover:scale-105 cursor-default"
                  >
                    {/* Subtle Purple Indicator Dot */}
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-[var(--accent)] transition-transform duration-200 group-hover:scale-125"
                    />

                    {/* Skill Name with Theme-Aware Purple Gradient Typography */}
                    <span className="skill-gradient-text font-bold text-base sm:text-lg tracking-tight">
                      {item.name}
                    </span>

                    {/* Subtitle / Context note */}
                    <span className="text-xs sm:text-sm font-normal text-[var(--muted)] transition-colors duration-200 group-hover:text-[var(--text)]">
                      — {item.note || item.category}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
