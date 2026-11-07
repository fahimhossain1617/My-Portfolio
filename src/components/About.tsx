"use client";

import React from "react";
import { usePreferences } from "@/context/PreferencesContext";
import { PERSONAL_INFO } from "@/data/portfolio";
import { GraduationCap, Layers, Cpu } from "lucide-react";
import { AgentBuildWrapper } from "./ui/AgentBuildWrapper";
import { BorderBeam } from "./ui/BorderBeam";

export function About() {
  const { lang, t } = usePreferences();

  const highlights = [
    {
      icon: GraduationCap,
      label: lang === "bn" ? "একাডেমিক প্রোফাইল" : "ACADEMIC PROFILE",
      value:
        lang === "bn"
          ? "বি.এসসি. ইন কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং"
          : "B.Sc. in Computer Science & Engineering",
      sub: lang === "bn" ? "ইউআইটিএস, তৃতীয় সেমিস্টার" : "UITS, Third Semester",
    },
    {
      icon: Layers,
      label: lang === "bn" ? "কোর টেকনোলজি" : "CORE TECH STACK",
      value: "React, Next.js, TypeScript, MERN & Supabase",
      sub:
        lang === "bn"
          ? "ওয়েব ও মোবাইলের জন্য দ্রুত ও পরিচ্ছন্ন অ্যাপ"
          : "Fast, clean apps for web and mobile",
    },
    {
      icon: Cpu,
      label: lang === "bn" ? "ডিজাইন ও এআই অটোমেশন" : "DESIGN & AI AUTOMATION",
      value:
        lang === "bn"
          ? "ইউআই/ইউএক্স ডিজাইন ও স্মার্ট ওয়ার্কফ্লো"
          : "UI/UX Design & Smart Workflows",
      sub:
        lang === "bn"
          ? "অ্যাপ ব্যবহার সহজ করা এবং কাজকে আরও সহজ করা"
          : "Making apps easy to use, and work easier to do",
    },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-7 sm:py-9 lg:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <AgentBuildWrapper
          agentName="Layout_Bot"
          color="#8B8CF7"
          delay={0.05}
          badgeText="Section • Header"
          dimensionText="380 × 58"
          agentCount={2}
          className="w-fit"
        >
          <div>
            <h2
              id="about-heading"
              className="text-[20px] leading-tight whitespace-nowrap font-light tracking-tight text-[var(--heading)] sm:text-4xl"
            >
              {lang === "bn" ? "আমার সম্পর্কে" : "About Me"}
            </h2>
            <div className="mt-2 h-1 w-12 rounded-full bg-[var(--accent)]" />
          </div>
        </AgentBuildWrapper>

        {/* Full-Width Easy-to-Read Narrative Bio */}
        <AgentBuildWrapper
          agentName="Content_Engine"
          color="#38BDF8"
          delay={0.12}
          badgeText="Text • NarrativeBio"
          dimensionText="720 × 140"
          agentCount={3}
          className="mt-6 w-full"
        >
          <div className="w-full space-y-3.5 text-base leading-relaxed text-[var(--text)]">
            <p className="text-lg font-normal text-[var(--heading)] sm:text-xl leading-snug">
              {lang === "bn"
                ? "আমি মোঃ ফাহিম হোসেন — একজন ফুল-স্ট্যাক ডেভেলপার, ইউআই/ইউএক্স ডিজাইনার এবং ইউনিভার্সিটি অব ইনফরমেশন টেকনোলজি অ্যান্ড সায়েন্সেস (UITS)-এর সিএসই শিক্ষার্থী।"
                : "I'm Md. Fahim Hossain, a full-stack developer, UI/UX designer, and CSE student at the University of Information Technology and Sciences (UITS)."}
            </p>

            <p>
              {lang === "bn"
                ? "আমি এমন অ্যাপ তৈরি করতে পছন্দ করি যা সহজে ব্যবহার করা যায় এবং সাধারণ মানুষের উপযোগী। আমি JavaScript, TypeScript, React, Next.js, Node.js, MongoDB, Tailwind CSS এবং Supabase নিয়ে কাজ করি এবং একটি অ্যাপ দেখতে কেমন এবং কীভাবে কাজ করে—দুটো বিষয়কেই সমান গুরুত্ব দিই।"
                : "I like building apps that feel simple to use and are ready for real people. I work with JavaScript, TypeScript, React, Next.js, Node.js, MongoDB, Tailwind CSS, and Supabase, and I care about both how an app looks and how it works."}
            </p>

            <p>
              {lang === "bn"
                ? "আমি দ্রুত কাজ করার জন্য এআই টুলস ব্যবহার করি এবং দৈনন্দিন কাজের সময় বাঁচাতে এআই অটোমেশন শিখছি। এর সাথে সাথে আমি এসইও শিখছি যেন আমার তৈরি কাজগুলো আরও বেশি মানুষের কাছে পৌঁছাতে পারে।"
                : "I also use AI tools to build faster, and I'm learning AI automation to save time on everyday tasks. Along the way, I'm learning SEO so the things I build can be found by more people."}
            </p>
          </div>
        </AgentBuildWrapper>

        {/* Vertical/Portrait Stacked Highlights List (One below another in portrait orientation) */}
        <div className="mt-7 flex flex-col gap-3.5">
          {highlights.map((item, index) => {
            const IconComponent = item.icon;
            const agents = [
              { name: "Builder_01", color: "#8B8CF7", badge: "Frame • Education", dim: "560 × 74" },
              { name: "Component_Master", color: "#38BDF8", badge: "Frame • TechStack", dim: "560 × 74" },
              { name: "Style_Architect", color: "#10B981", badge: "Frame • AIAutomation", dim: "560 × 74" },
            ];
            const currentAgent = agents[index % agents.length];

            return (
              <AgentBuildWrapper
                key={index}
                agentName={currentAgent.name}
                color={currentAgent.color}
                delay={0.1 + index * 0.12}
                badgeText={currentAgent.badge}
                dimensionText={currentAgent.dim}
                agentCount={2}
                className="w-full"
              >
                <div className="relative group overflow-hidden flex items-center gap-4 rounded-[18px] border border-[var(--border)] bg-[var(--surface)]/70 px-5 py-3.5 shadow-sm backdrop-blur-xl">
                  <BorderBeam />
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg)]/75 text-[var(--accent)]">
                    <IconComponent
                      className="h-4 w-4"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] font-semibold tracking-wider text-[var(--accent)] uppercase">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-[var(--heading)] sm:text-[15px] leading-snug">
                      {item.value}
                    </p>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      {item.sub}
                    </p>
                  </div>
                </div>
              </AgentBuildWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
