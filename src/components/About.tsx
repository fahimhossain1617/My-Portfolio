"use client";

import React from "react";
import { usePreferences } from "@/context/PreferencesContext";
import { PERSONAL_INFO } from "@/data/portfolio";
import { GraduationCap, Layers, Cpu } from "lucide-react";

export function About() {
  const { lang, t } = usePreferences();

  const highlights = [
    {
      icon: GraduationCap,
      label: lang === "bn" ? "একাডেমিক প্রোফাইল" : "Academic Profile",
      value: t(PERSONAL_INFO.education.degree),
      sub: t(PERSONAL_INFO.education.institution),
    },
    {
      icon: Layers,
      label: lang === "bn" ? "কোর টেকনোলজি" : "Core Tech Stack",
      value: "React, Next.js, TypeScript, MERN & Supabase",
      sub:
        lang === "bn"
          ? "রেসপনসিভ, দ্রুত ও আধুনিক ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্ট"
          : "Building fast, responsive, and scalable web applications",
    },
    {
      icon: Cpu,
      label: lang === "bn" ? "ফুল-স্ট্যাক ও এআই" : "Full-Stack & AI Automation",
      value:
        lang === "bn"
          ? "আধুনিক ওয়েব ও স্মার্ট অটোমেশন"
          : "Modern Web Engineering & Smart Workflows",
      sub:
        lang === "bn"
          ? "বাস্তব জীবনের জটিল কাজের সহজ ডিজিটাল সমাধান"
          : "Solving real-world problems with clean code and AI tools",
    },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-7 sm:py-9 lg:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div data-reveal="fade-up">
          <h2
            id="about-heading"
            className="text-3xl font-light tracking-tight text-[var(--heading)] sm:text-4xl"
          >
            {lang === "bn" ? "আমার সম্পর্কে" : "About Me"}
          </h2>
          <div className="mt-2 h-1 w-12 rounded-full bg-[var(--accent)]" />
        </div>

        {/* Full-Width Easy-to-Read Narrative Bio */}
        <div
          data-reveal="fade-up"
          className="mt-6 w-full space-y-3.5 text-base leading-relaxed text-[var(--text)]"
        >
          <p className="text-lg font-normal text-[var(--heading)] sm:text-xl leading-snug">
            {lang === "bn"
              ? "আমি মোঃ ফাহিম হোসেন — ইউনিভার্সিটি অব ইনফরমেশন টেকনোলজি অ্যান্ড সায়েন্স (UITS)-এর কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (CSE) বিভাগের একজন শিক্ষার্থী এবং ফুল-স্ট্যাক ওয়েব ডেভেলপার।"
              : "I am Md. Fahim Hossain, a Full-Stack Web Developer and Computer Science & Engineering (CSE) student at the University of Information Technology and Sciences (UITS)."}
          </p>

          <p>
            {lang === "bn"
              ? "আমি দ্রুত, আধুনিক এবং ব্যবহারবান্ধব ওয়েব অ্যাপ্লিকেশন তৈরি করতে ভালোবাসি। আমার প্রতিদিনের কাজের মূল প্রযুক্তিগুলোর মধ্যে রয়েছে JavaScript, TypeScript, React, Next.js, Node.js, MongoDB, Tailwind CSS এবং Supabase। প্রতিটি প্রজেক্টেই আমি পরিচ্ছন্ন কোড এবং দারুণ ইউজার এক্সপেরিয়েন্স নিশ্চিত করার চেষ্টা করি।"
              : "I enjoy building fast, clean, and easy-to-use websites and web applications. Every day, I work with modern tools like JavaScript, TypeScript, React, Next.js, Node.js, MongoDB, Tailwind CSS, and Supabase to turn practical ideas into reliable digital products."}
          </p>

          <p>
            {lang === "bn"
              ? "ওয়েব ডেভেলপমেন্টের পাশাপাশি আমি এআই অটোমেশন নিয়ে কাজ করতে অত্যন্ত আগ্রহী। স্মার্ট টুলস এবং অটোমেটেড ওয়ার্কফ্লো ব্যবহার করে মানুষের সময় বাঁচানো ও বাস্তব সমস্যার সহজ সমাধান তৈরি করাই আমার লক্ষ্য।"
              : "Alongside full-stack development, I am deeply interested in AI automation—using smart workflows and modern tools to save time, simplify everyday tasks, and solve real-world problems."}
          </p>
        </div>

        {/* Vertical/Portrait Stacked Highlights List (One below another in portrait orientation) */}
        <div className="mt-7 flex flex-col gap-3.5">
          {highlights.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                data-reveal="fade-right"
                style={{ transitionDelay: `${index * 120}ms` }}
                className="flex items-center gap-4 rounded-[18px] border border-[var(--border)] bg-[var(--surface)]/70 px-5 py-3.5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-[var(--accent)]/60 hover:translate-x-1"
              >
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
