"use client";

import React from "react";
import { RotateCcw } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { buildWhatsAppInquiryUrl } from "@/lib/validation";
import { WhatsAppIcon } from "../BrandIcons";

interface SuccessCheckmarkProps {
  onReset: () => void;
  submittedData?: {
    name: string;
    email: string;
    phone: string;
    description: string;
  };
  className?: string;
}

/**
 * SuccessCheckmark
 * Elegant circular checkmark confirmation with a smooth rotating border beam.
 * Features:
 * - Clean circular checkmark badge with orbiting emerald border beam.
 * - Exact text: "Message sent successfully!" & "Thanks for reaching out!".
 * - Clean, non-intrusive container adhering to theme tokens.
 * - Reset option to send another message & direct WhatsApp fallback.
 */
export function SuccessCheckmark({
  onReset,
  submittedData,
  className = "",
}: SuccessCheckmarkProps) {
  const { lang } = usePreferences();
  const whatsappPrefilledUrl = submittedData
    ? buildWhatsAppInquiryUrl(submittedData)
    : "";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`relative overflow-hidden rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 text-center transition-all ${className}`}
    >
      <style>{`
        @keyframes strokeCheck {
          0% {
            stroke-dashoffset: 48;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @keyframes borderBeamSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .anim-beam-spin {
          transform-origin: 40px 40px;
          animation: borderBeamSpin 2.6s linear infinite;
        }
        .anim-check-stroke {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: strokeCheck 0.5s 0.25s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .anim-beam-spin,
          .anim-check-stroke {
            animation: none !important;
            stroke-dashoffset: 0 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="flex flex-col items-center justify-center py-4">
        {/* =============================================================== */}
        {/* CIRCULAR CHECKMARK BADGE WITH ROTATING BORDER BEAM              */}
        {/* =============================================================== */}
        <div className="relative mb-5 flex items-center justify-center">
          <svg
            className="relative h-20 w-20 sm:h-22 sm:w-22"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Rotating Border Beam Linear Gradient */}
              <linearGradient id="checkmarkBorderBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                <stop offset="45%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="75%" stopColor="#10b981" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Static Subtle Track Ring */}
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="currentColor"
              className="text-emerald-500/20 dark:text-emerald-400/25"
              strokeWidth="2"
            />

            {/* Rotating Border Beam orbiting smoothly in a circle */}
            <g className="anim-beam-spin">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="url(#checkmarkBorderBeam)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="56 170"
              />
            </g>

            {/* Main Clean Filled Badge */}
            <circle
              cx="40"
              cy="40"
              r="30"
              className="fill-emerald-500/10 dark:fill-emerald-500/20 stroke-emerald-500/30 dark:stroke-emerald-400/30"
              strokeWidth="1.5"
            />

            {/* Checkmark Path */}
            <path
              d="M 28 41 L 36 49 L 52 33"
              stroke="currentColor"
              className="text-emerald-500 dark:text-emerald-400 anim-check-stroke"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* =============================================================== */}
        {/* HEADINGS & SUPPORTING TEXT                                      */}
        {/* =============================================================== */}
        <h3 className="text-xl sm:text-2xl font-light tracking-tight text-[var(--heading)]">
          {lang === "bn" ? "বার্তাটি সফলভাবে পাঠানো হয়েছে!" : "Message sent successfully!"}
        </h3>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {lang === "bn" ? "যোগাযোগ করার জন্য ধন্যবাদ!" : "Thanks for reaching out!"}
        </p>

        {/* Action Buttons: Reset & WhatsApp */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-[12px] bg-[var(--accent)] px-4 py-2.5 text-xs font-medium text-[var(--on-accent)] transition-colors hover:bg-[var(--accent-hover)] cursor-pointer shadow-sm"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{lang === "bn" ? "আরেকটি বার্তা পাঠান" : "Send another message"}</span>
          </button>

          {whatsappPrefilledUrl && (
            <a
              href={whatsappPrefilledUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs font-medium text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <WhatsAppIcon size={14} />
              <span>{lang === "bn" ? "হোয়াটসঅ্যাপেও পাঠান" : "Also send on WhatsApp"}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

