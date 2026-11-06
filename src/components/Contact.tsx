"use client";

import React, { useState } from "react";
import { Check, Copy, ExternalLink, Mail } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { PERSONAL_INFO } from "@/data/portfolio";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "./BrandIcons";
import { ContactForm } from "./ContactForm";
import {
  DeliveryFlightStatus,
  DeliveryMascotStage,
} from "./delivery/DeliveryMascotStage";
import { AgentBuildWrapper } from "./ui/AgentBuildWrapper";

export function Contact() {
  const { lang } = usePreferences();
  const [flightStatus, setFlightStatus] = useState<DeliveryFlightStatus>("idle");
  const [isEmailCopied, setIsEmailCopied] = useState(false);

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    PERSONAL_INFO.contact.email
  )}&su=${encodeURIComponent(
    lang === "bn" ? "প্রজেক্ট সম্পর্কিত আলোচনা" : "Project Inquiry / Collaboration"
  )}&body=${encodeURIComponent(
    lang === "bn"
      ? "হ্যালো ফাহিম,\n\nআমি আপনার সাথে একটি নতুন প্রজেক্ট নিয়ে আলোচনা করতে আগ্রহী...\n\nধন্যবাদ"
      : "Hi Fahim,\n\nI would like to discuss a project / work opportunity with you...\n\nBest regards"
  )}`;

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(PERSONAL_INFO.contact.email);
    setIsEmailCopied(true);
    setTimeout(() => setIsEmailCopied(false), 2400);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-x-clip py-7 sm:py-9 lg:py-10"
    >
      {/* 
        3D Delivery Flight Layer:
        Elevated at section-level with z-[100] so it flies completely IN FRONT of
        the contact cards, contact form, and all other elements.
      */}
      <div className="pointer-events-none absolute inset-0 z-[100] overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-full relative">
          <div className="absolute top-24 sm:top-28 lg:top-20 left-4 sm:left-6 lg:left-8 overflow-visible">
            <DeliveryMascotStage
              flightStatus={flightStatus}
              variant="desktop"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left 5 Columns: Direct Contact Channels (Launch Origin for 3D Origami Glider) */}
          <div className="relative lg:col-span-5">
            <AgentBuildWrapper
              agentName="Contact_Bridge"
              color="#8B8CF7"
              delay={0.05}
              badgeText="Section • Header"
              dimensionText="360 × 60"
              agentCount={2}
              className="w-fit"
            >
              <div>
                <h2
                  id="contact-heading"
                  className="text-3xl font-light tracking-tight text-[var(--heading)] sm:text-4xl"
                >
                  {lang === "bn" ? "যোগাযোগ করুন" : "Contact With Me"}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {lang === "bn"
                    ? "যেকোনো প্রজেক্ট, আইডিয়া বা সহযোগিতার জন্য সরাসরি বার্তা পাঠাতে পারেন।"
                    : "Feel free to reach out for new projects, ideas, or collaboration."}
                </p>
              </div>
            </AgentBuildWrapper>

            {/* Direct Channels List (Surface cards) */}
            <div className="relative mt-8 space-y-3.5">
              {/* 1. Direct Gmail Compose Channel */}
              <AgentBuildWrapper
                agentName="UI_Agent"
                color="#8B8CF7"
                delay={0.12}
                badgeText="Channel • Gmail Direct"
                dimensionText="340 × 58"
                agentCount={2}
                className="w-full"
              >
                <a
                  href={gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    lang === "bn"
                      ? "জিমেইলে সরাসরি মেসেজ লিখুন"
                      : "Open Gmail to compose message directly"
                  }
                  className="group flex items-center justify-between rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-4 transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_4px_20px_rgba(139,140,247,0.12)] cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] group-hover:scale-105 transition-transform duration-300">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[var(--heading)] group-hover:text-[var(--accent)] transition-colors truncate">
                        {PERSONAL_INFO.contact.email}
                      </p>
                      <p className="text-xs text-[var(--muted)] truncate">
                        {lang === "bn"
                          ? "ক্লিক করে সরাসরি জিমেইলে লিখুন"
                          : "Click to compose directly in Gmail"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {/* Quick Copy Button */}
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      title={lang === "bn" ? "ইমেইল কপি করুন" : "Copy email address"}
                      aria-label={lang === "bn" ? "ইমেইল কপি করুন" : "Copy email address"}
                      className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-[var(--muted)] hover:text-[var(--heading)] hover:bg-[var(--accent)]/15 active:scale-95 transition-all"
                    >
                      {isEmailCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-500 stroke-[2.5]" />
                          <span className="text-[11px] font-semibold text-emerald-500">
                            {lang === "bn" ? "কপি হয়েছে!" : "Copied!"}
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span className="text-[11px]">{lang === "bn" ? "কপি" : "Copy"}</span>
                        </>
                      )}
                    </button>

                    <ExternalLink
                      className="h-4 w-4 text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                </a>
              </AgentBuildWrapper>

              {/* 2. WhatsApp Click-to-Chat */}
              <AgentBuildWrapper
                agentName="Layout_Bot"
                color="#38BDF8"
                delay={0.18}
                badgeText="Channel • WhatsApp"
                dimensionText="340 × 58"
                agentCount={2}
                className="w-full"
              >
                <a
                  href={PERSONAL_INFO.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--accent)]"
                >
                  <div className="flex items-center gap-3.5">
                    <WhatsAppIcon size={20} className="shrink-0 text-[var(--accent)]" />
                    <div>
                      <p className="text-sm font-medium text-[var(--heading)]">
                        WhatsApp
                      </p>
                      <p className="text-xs text-[var(--muted)]">
                        {lang === "bn" ? "ফাহিম হোসেন" : "Fahim Hossain"}
                      </p>
                    </div>
                  </div>
                  <ExternalLink
                    className="h-4 w-4 text-[var(--muted)]"
                    aria-hidden="true"
                  />
                </a>
              </AgentBuildWrapper>

              {/* 3. LinkedIn Profile Link */}
              <AgentBuildWrapper
                agentName="Builder_01"
                color="#10B981"
                delay={0.24}
                badgeText="Channel • LinkedIn"
                dimensionText="340 × 58"
                agentCount={2}
                className="w-full"
              >
                <a
                  href={PERSONAL_INFO.contact.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--accent)]"
                >
                  <div className="flex items-center gap-3.5">
                    <LinkedInIcon size={20} className="shrink-0 text-[var(--accent)]" />
                    <div>
                      <p className="text-sm font-medium text-[var(--heading)]">
                        LinkedIn
                      </p>
                      <p className="text-xs text-[var(--muted)]">
                        {lang === "bn" ? "ফাহিম হোসেন" : "Fahim Hossain"}
                      </p>
                    </div>
                  </div>
                  <ExternalLink
                    className="h-4 w-4 text-[var(--muted)]"
                    aria-hidden="true"
                  />
                </a>
              </AgentBuildWrapper>

              {/* 4. GitHub Profile */}
              {PERSONAL_INFO.contact.githubUrl ? (
                <AgentBuildWrapper
                  agentName="Style_Architect"
                  color="#A3A4FA"
                  delay={0.3}
                  badgeText="Channel • GitHub"
                  dimensionText="340 × 58"
                  agentCount={2}
                  className="w-full"
                >
                  <a
                    href={PERSONAL_INFO.contact.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--accent)]"
                  >
                    <div className="flex items-center gap-3.5">
                      <GitHubIcon size={20} className="shrink-0 text-[var(--heading)]" />
                      <div>
                        <p className="text-sm font-medium text-[var(--heading)]">
                          GitHub
                        </p>
                        <p className="text-xs text-[var(--muted)]">
                          fahimhossain1617
                        </p>
                      </div>
                    </div>
                    <ExternalLink
                      className="h-4 w-4 text-[var(--muted)]"
                      aria-hidden="true"
                    />
                  </a>
                </AgentBuildWrapper>
              ) : null}
            </div>
          </div>

          {/* Right 7 Columns: Contact Form */}
          <div className="lg:col-span-7">
            <AgentBuildWrapper
              agentName="Component_Master"
              color="#8B8CF7"
              delay={0.15}
              badgeText="Frame • InteractiveForm"
              dimensionText="580 × 420"
              agentCount={3}
              className="w-full"
            >
              <ContactForm
                flightStatus={flightStatus}
                onFlightStatusChange={setFlightStatus}
              />
            </AgentBuildWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
