"use client";

import React, { useState } from "react";
import { Mail, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { usePreferences } from "@/context/PreferencesContext";
import { PERSONAL_INFO } from "@/data/portfolio";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "./BrandIcons";
import { AgentBuildWrapper } from "./ui/AgentBuildWrapper";

export function Footer({
  disableAgentAnimation = false,
}: {
  disableAgentAnimation?: boolean;
}) {
  const { lang, t, theme } = usePreferences();
  const currentYear = new Date().getFullYear();
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const isLight = theme === "light";

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsCtaHovered(true);
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) {
        const headerOffset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        window.history.replaceState(null, "", "#contact");
      } else {
        window.location.href = "/#contact";
      }
      setTimeout(() => setIsCtaHovered(false), 900);
    }, 240);
  };

  return (
    <footer className="relative z-[1] overflow-hidden bg-[var(--bg)] pt-20 pb-28 sm:pb-20 md:pb-16">
      {/* 1. Smoky Top Transition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/90 to-transparent z-10"
      />

      {/* 2. Panoramic Hands & Core Visual (Softly dissolved and smoky blended in both Light & Dark modes) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-12 sm:top-16 h-[340px] sm:h-[400px] overflow-hidden select-none"
      >
        <img
          src="/images/hands-together-wide.jpg"
          alt=""
          className={`h-full w-full object-cover object-center transition-all duration-700 ${
            isLight
              ? "opacity-30 contrast-125 brightness-95 saturate-[160%] hue-rotate-[205deg] mix-blend-multiply"
              : "opacity-16 contrast-100 brightness-100 invert-0 sepia saturate-[240%] hue-rotate-[205deg]"
          }`}
          style={{
            maskImage:
              "radial-gradient(ellipse 65% 42% at 50% 46%, black 0%, rgba(0, 0, 0, 0.8) 25%, rgba(0, 0, 0, 0.35) 50%, rgba(0, 0, 0, 0.06) 68%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 65% 42% at 50% 46%, black 0%, rgba(0, 0, 0, 0.8) 25%, rgba(0, 0, 0, 0.35) 50%, rgba(0, 0, 0, 0.06) 68%, transparent 75%)",
          }}
        />
        {/* Soft Radial Ambient Glow */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            isLight ? "opacity-12" : "opacity-15"
          }`}
          style={{
            background:
              "radial-gradient(circle at 50% 46%, var(--accent) 0%, transparent 60%)",
          }}
        />
        {/* Smoky Bottom Dissolve - completely dissolves any edge into background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/85 to-transparent z-10"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Top Centered Section: Let's Build Products Together */}
        <AgentBuildWrapper
          agentName="CTA_Architect"
          color="#8B8CF7"
          delay={0.02}
          badgeText="Footer • Collaboration"
          dimensionText="880 × 160"
          agentCount={2}
          disabled={disableAgentAnimation}
          className="w-full mb-12 sm:mb-14"
        >
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-[var(--heading)]">
              {lang === "bn"
                ? "একত্রে কাজ করি, নতুন কিছু গড়ি"
                : "Let's Build Something Together"}
            </h2>

            <p className="mt-4 max-w-xl text-xs sm:text-sm leading-relaxed text-[var(--text)] font-normal sm:font-medium relative z-20">
              {lang === "bn"
                ? "আপনার কি কোনো আইডিয়া, প্রজেক্ট বা টিমে একজন ফুল-স্ট্যাক ডেভেলপার ও ডিজাইনার প্রয়োজন? আমি আপনার সাথে আলোচনা করতে আগ্রহী। মেসেজ পাঠান, চলুন কথা বলি।"
                : "Have an idea, a project, or a team that needs a full-stack developer and designer? I'd love to hear about it. Send me a message and let's talk."}
            </p>

            {/* Smooth Liquid Water Wave Fill Button */}
            <div className="mt-8 flex items-center justify-center">
              <a
                href="#contact"
                onClick={handleCtaClick}
                onMouseEnter={() => setIsCtaHovered(true)}
                onMouseLeave={() => setIsCtaHovered(false)}
                onTouchStart={() => setIsCtaHovered(true)}
                onTouchEnd={() => {
                  setTimeout(() => setIsCtaHovered(false), 900);
                }}
                onTouchCancel={() => setIsCtaHovered(false)}
                onPointerDown={() => setIsCtaHovered(true)}
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface)] px-10 sm:px-12 py-3.5 sm:py-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_0_28px_rgba(139,140,247,0.22)] active:border-[var(--accent)] cursor-pointer select-none active:scale-[0.98]"
              >
                <motion.div
                  initial={false}
                  animate={{
                    y: isCtaHovered ? "0%" : "105%",
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-full"
                >
                  <motion.div
                    animate={{
                      x: [0, -300],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 3.2,
                      ease: "linear",
                    }}
                    className="absolute -top-7 left-0 flex w-[600px] pointer-events-none"
                  >
                    <svg
                      className="h-8 w-[300px] shrink-0 fill-[var(--accent)] opacity-40"
                      viewBox="0 0 300 32"
                      preserveAspectRatio="none"
                    >
                      <path d="M 0 16 Q 75 0, 150 16 T 300 16 L 300 32 L 0 32 Z" />
                    </svg>
                    <svg
                      className="h-8 w-[300px] shrink-0 fill-[var(--accent)] opacity-40"
                      viewBox="0 0 300 32"
                      preserveAspectRatio="none"
                    >
                      <path d="M 0 16 Q 75 0, 150 16 T 300 16 L 300 32 L 0 32 Z" />
                    </svg>
                  </motion.div>

                  <motion.div
                    animate={{
                      x: [-300, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 2.2,
                      ease: "linear",
                    }}
                    className="absolute -top-6 left-0 flex w-[600px] pointer-events-none"
                  >
                    <svg
                      className="h-7 w-[300px] shrink-0 fill-[var(--accent)]"
                      viewBox="0 0 300 28"
                      preserveAspectRatio="none"
                    >
                      <path d="M 0 14 Q 75 28, 150 14 T 300 14 L 300 28 L 0 28 Z" />
                    </svg>
                    <svg
                      className="h-7 w-[300px] shrink-0 fill-[var(--accent)]"
                      viewBox="0 0 300 28"
                      preserveAspectRatio="none"
                    >
                      <path d="M 0 14 Q 75 28, 150 14 T 300 14 L 300 28 L 0 28 Z" />
                    </svg>
                  </motion.div>

                  <div className="absolute inset-0 bg-[var(--accent)]" />
                </motion.div>

                <span
                  className={`relative z-10 text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isCtaHovered ? "text-[var(--on-accent)]" : "text-[var(--heading)]"
                  }`}
                >
                  {lang === "bn" ? "একত্রে কাজ শুরু করুন" : "Let's Build Together"}
                </span>

                <ArrowUpRight
                  className={`relative z-10 h-4 w-4 transition-all duration-300 ${
                    isCtaHovered
                      ? "translate-x-1 -translate-y-1 text-[var(--on-accent)]"
                      : "text-[var(--accent)]"
                  }`}
                />
              </a>
            </div>
          </div>
        </AgentBuildWrapper>

        {/* 3. Social Channels: Centered */}
        <AgentBuildWrapper
          agentName="Channel_Bar"
          color="#38BDF8"
          delay={0.08}
          badgeText="Footer • Channels"
          dimensionText="100% × 45"
          agentCount={2}
          disabled={disableAgentAnimation}
          className="w-full mb-10"
        >
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3.5 text-xs sm:text-sm text-center">
            {/* Email */}
            <li>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSONAL_INFO.contact.email)}&su=${encodeURIComponent("Project Inquiry / Collaboration")}`}
                target="_blank"
                rel="noopener noreferrer"
                title={lang === "bn" ? "সরাসরি জিমেইলে লিখুন" : "Compose in Gmail"}
                className="group inline-flex items-center gap-2 text-[var(--text)] transition-colors hover:text-[var(--accent)] hover:underline"
              >
                <Mail className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                <span className="truncate">{PERSONAL_INFO.contact.email}</span>
              </a>
            </li>

            {/* WhatsApp */}
            <li>
              <a
                href={PERSONAL_INFO.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[var(--text)] transition-colors hover:text-[#25D366] hover:underline"
              >
                <WhatsAppIcon size={16} className="shrink-0 text-[var(--accent)] group-hover:text-[#25D366] transition-colors" />
                <span>{PERSONAL_INFO.contact.whatsappName}</span>
              </a>
            </li>

            {/* LinkedIn */}
            <li>
              <a
                href={PERSONAL_INFO.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[var(--text)] transition-colors hover:text-[var(--accent)] hover:underline"
              >
                <LinkedInIcon size={16} className="shrink-0 text-[var(--accent)]" />
                <span>{PERSONAL_INFO.contact.linkedinUsername}</span>
              </a>
            </li>

            {/* GitHub */}
            {PERSONAL_INFO.contact.githubUrl && (
              <li>
                <a
                  href={PERSONAL_INFO.contact.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-[var(--text)] transition-colors hover:text-[var(--heading)] hover:underline"
                >
                  <GitHubIcon size={16} className="shrink-0 text-[var(--heading)]" />
                  <span>{PERSONAL_INFO.contact.githubUsername}</span>
                </a>
              </li>
            )}
          </ul>
        </AgentBuildWrapper>

        {/* 4. "Available for projects" */}
        <div className="flex items-center justify-center mb-5">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--text)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-emerald-500 dark:text-emerald-400">
              {lang === "bn" ? "নতুন প্রজেক্টের জন্য প্রস্তুত" : "Available for projects"}
            </span>
          </div>
        </div>

        {/* 5. Copyright Bar */}
        <AgentBuildWrapper
          agentName="System_Engine"
          color="#10B981"
          delay={0.14}
          amount={0.05}
          badgeText="Footer • Copyright"
          dimensionText="100% × 30"
          agentCount={2}
          disabled={disableAgentAnimation}
          className="w-full"
        >
          <div className="flex items-center justify-center text-center text-xs text-[var(--muted)]">
            <p>
              © {currentYear} {t(PERSONAL_INFO.fullName)}. {lang === "bn" ? "সর্বস্বত্ব সংরক্ষিত।" : "All rights reserved."}
            </p>
          </div>
        </AgentBuildWrapper>
      </div>
    </footer>
  );
}
