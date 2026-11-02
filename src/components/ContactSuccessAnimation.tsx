"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle2, MailCheck, RotateCcw } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { PERSONAL_INFO, UI_TEXT } from "@/data/portfolio";
import { buildWhatsAppInquiryUrl } from "@/lib/validation";
import { WhatsAppIcon } from "./BrandIcons";

interface ContactSuccessAnimationProps {
  submittedData: {
    name: string;
    email: string;
    phone: string;
    description: string;
  };
  onReset: () => void;
}

export function ContactSuccessAnimation({
  submittedData,
  onReset,
}: ContactSuccessAnimationProps) {
  const { t } = usePreferences();
  const [avatarStage, setAvatarStage] = useState<
    "entering" | "delivering" | "exiting"
  >("entering");

  useEffect(() => {
    const t1 = setTimeout(() => setAvatarStage("delivering"), 900);
    const t2 = setTimeout(() => setAvatarStage("exiting"), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const whatsappPrefilledUrl = buildWhatsAppInquiryUrl(submittedData);

  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
    >
      {/* Compact Portrait Avatar Delivery Stage */}
      <div className="relative mb-6 overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--bg)] px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Animated Portrait Carrier Holding Envelope */}
          <div
            className={`flex items-center gap-3 transition-all duration-700 ease-out ${
              avatarStage === "entering"
                ? "translate-x-0 opacity-100"
                : avatarStage === "delivering"
                ? "translate-x-2 opacity-100"
                : "translate-x-6 opacity-45"
            }`}
          >
            {/* Original Portrait Source */}
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-[var(--accent)] bg-[var(--surface)]">
              <Image
                src={PERSONAL_INFO.portraitSrc}
                alt={t(PERSONAL_INFO.portraitAlt)}
                fill
                sizes="56px"
                className="object-contain object-bottom grayscale"
              />
            </div>

            {/* Letter / Envelope Held & Delivered */}
            <div className="flex items-center gap-2 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
              <MailCheck
                className="h-4 w-4 text-[var(--accent)]"
                aria-hidden="true"
              />
              <span className="font-mono text-xs font-medium text-[var(--heading)]">
                {avatarStage === "entering"
                  ? "Delivering inquiry..."
                  : "Inquiry Delivered"}
              </span>
            </div>
          </div>

          <span className="hidden rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 font-mono text-[10px] font-medium text-[var(--accent)] sm:inline-block">
            200 OK • VERIFIED
          </span>
        </div>
      </div>

      {/* Immediate Success Message */}
      <div className="flex items-start gap-3">
        <CheckCircle2
          className="mt-0.5 h-6 w-6 shrink-0 text-[var(--accent)]"
          aria-hidden="true"
        />
        <div>
          <h4 className="text-lg font-normal text-[var(--heading)] sm:text-xl">
            {t(UI_TEXT.contact.form.successHeading)}
          </h4>
          <p className="mt-1 text-sm leading-relaxed text-[var(--text)]">
            {t(UI_TEXT.contact.form.successSubtext)}
          </p>
        </div>
      </div>

      {/* Optional WhatsApp Handoff & Reset Controls */}
      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-5">
        {whatsappPrefilledUrl && (
          <a
            href={whatsappPrefilledUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-[12px] border border-[var(--accent)] bg-transparent px-4 py-2.5 text-xs font-medium text-[var(--accent)] transition-colors hover:bg-[var(--surface)]"
          >
            <WhatsAppIcon size={16} />
            <span>{t(UI_TEXT.contact.form.alsoSendViaWhatsapp)}</span>
          </a>
        )}

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-[12px] border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-xs font-medium text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{t(UI_TEXT.contact.form.sendAnotherMessage)}</span>
        </button>
      </div>
    </div>
  );
}
