"use client";

import React from "react";
import { ExternalLink, Mail } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { PERSONAL_INFO } from "@/data/portfolio";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "./BrandIcons";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const { lang } = usePreferences();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-7 sm:py-9 lg:py-10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left 5 Columns: Direct Contact Channels */}
          <div data-reveal="fade-right" className="lg:col-span-5">
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

            {/* Direct Channels List (Surface cards) */}
            <div className="mt-8 space-y-3.5">
              {/* 1. Email Channel */}
              <a
                href={`mailto:${PERSONAL_INFO.contact.email}`}
                className="flex items-center justify-between rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-[var(--accent)]"
              >
                <div className="flex items-center gap-3.5">
                  <Mail className="h-5 w-5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-[var(--heading)]">
                      {PERSONAL_INFO.contact.email}
                    </p>
                    <p className="text-xs text-[var(--muted)]">
                      {lang === "bn" ? "সরাসরি ইমেইল পাঠান" : "Send direct email"}
                    </p>
                  </div>
                </div>
                <ExternalLink
                  className="h-4 w-4 text-[var(--muted)]"
                  aria-hidden="true"
                />
              </a>

              {/* 2. WhatsApp Click-to-Chat */}
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
                      {lang === "bn" ? "সরাসরি চ্যাট উইন্ডো খুলুন" : "Direct chat on WhatsApp"}
                    </p>
                  </div>
                </div>
                <ExternalLink
                  className="h-4 w-4 text-[var(--muted)]"
                  aria-hidden="true"
                />
              </a>

              {/* 3. LinkedIn Profile Link */}
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
                      linkedin.com/in/md-fahim-hossain-cse
                    </p>
                  </div>
                </div>
                <ExternalLink
                  className="h-4 w-4 text-[var(--muted)]"
                  aria-hidden="true"
                />
              </a>

              {/* 4. GitHub Profile */}
              {PERSONAL_INFO.contact.githubUrl ? (
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
                        github.com/fahimhosen1617
                      </p>
                    </div>
                  </div>
                  <ExternalLink
                    className="h-4 w-4 text-[var(--muted)]"
                    aria-hidden="true"
                  />
                </a>
              ) : null}
            </div>
          </div>

          {/* Right 7 Columns: Contact Form */}
          <div data-reveal="fade-left" className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
