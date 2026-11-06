"use client";

import React, { useState } from "react";
import { AlertCircle, Loader2, RefreshCw, Send } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";
import { UI_TEXT } from "@/data/portfolio";
import {
  buildWhatsAppInquiryUrl,
  ContactFormInput,
  validateContactInput,
} from "@/lib/validation";
import { WhatsAppIcon } from "./BrandIcons";
import { DeliveryFlightStatus } from "./delivery/DeliveryMascotStage";
import { SuccessCheckmark } from "./delivery/SuccessCheckmark";

type FieldErrorKey =
  | "nameRequired"
  | "emailRequired"
  | "phoneRequired"
  | "descriptionRequired";

export interface ContactFormProps {
  flightStatus?: DeliveryFlightStatus;
  onFlightStatusChange?: (status: DeliveryFlightStatus) => void;
}

export function ContactForm({
  flightStatus = "idle",
  onFlightStatusChange,
}: ContactFormProps) {
  const { lang, t } = usePreferences();

  const [values, setValues] = useState<ContactFormInput>({
    name: "",
    email: "",
    phone: "",
    description: "",
    honeypot: "",
  });

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactFormInput, FieldErrorKey>>
  >({});

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");
  const [confirmedPayload, setConfirmedPayload] = useState<{
    name: string;
    email: string;
    phone: string;
    description: string;
  } | null>(null);

  const handleChange = (
    field: keyof ContactFormInput,
    value: string
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent duplicate submission
    if (status === "submitting") return;

    const validation = validateContactInput(values);
    if (!validation.valid) {
      setFieldErrors(validation.errors);
      return;
    }

    setFieldErrors({});
    setStatus("submitting");
    setServerErrorMessage("");

    // Initiate 3D Origami Paper-Plane Bird diagonal flight synchronized with email request
    onFlightStatusChange?.("flying");

    // Flight duration (4.5s) matches the graceful flight of the 3D paper bird
    const minFlightPromise = new Promise((resolve) => setTimeout(resolve, 4500));

    try {
      const fetchPromise = fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: validation.sanitized.name,
          email: validation.sanitized.email,
          phone: validation.sanitized.phone,
          description: validation.sanitized.description,
          honeypot: values.honeypot || "",
        }),
      });

      // Synchronize backend response with flight exit off-screen
      const [response] = await Promise.all([fetchPromise, minFlightPromise]);

      const data = (await response.json()) as {
        ok?: boolean;
        code?: string;
        errors?: Partial<Record<keyof ContactFormInput, FieldErrorKey>>;
        message?: string;
        messageBn?: string;
      };

      if (!response.ok || !data.ok) {
        onFlightStatusChange?.("error");
        if (data.errors) {
          setFieldErrors(data.errors);
        }
        const errorText =
          lang === "bn"
            ? data.messageBn || "বার্তা পাঠাতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন বা সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করুন।"
            : data.message || "Could not send your message. Please try again or reach out on WhatsApp.";
        setServerErrorMessage(errorText);
        setStatus("error");
        return;
      }

      onFlightStatusChange?.("success");
      setConfirmedPayload(validation.sanitized);
      setStatus("success");
      setValues({
        name: "",
        email: "",
        phone: "",
        description: "",
        honeypot: "",
      });
    } catch {
      onFlightStatusChange?.("error");
      setServerErrorMessage(
        lang === "bn"
          ? "নেটওয়ার্ক সংক্রান্ত জটিলতা দেখা দিয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।"
          : "A network issue occurred while sending. Please try again."
      );
      setStatus("error");
    }
  };

  const handleResetForm = () => {
    onFlightStatusChange?.("idle");
    setStatus("idle");
    setConfirmedPayload(null);
    setServerErrorMessage("");
    setFieldErrors({});
  };

  if (status === "success" && confirmedPayload) {
    return (
      <SuccessCheckmark
        submittedData={confirmedPayload}
        onReset={handleResetForm}
      />
    );
  }

  const fallbackWhatsappUrl = buildWhatsAppInquiryUrl(values);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Direct message contact form"
      className="rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
    >
      {/* Honeypot field for anti-spam bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website-trap">Leave this blank</label>
        <input
          id="website-trap"
          name="honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={(e) => handleChange("honeypot", e.target.value)}
        />
      </div>

      <div className="space-y-5">
        {/* 1. Name */}
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-medium tracking-wide text-[var(--heading)] uppercase"
          >
            {t(UI_TEXT.contact.form.nameLabel)}{" "}
            <span className="text-[var(--accent)]" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder={t(UI_TEXT.contact.form.namePlaceholder)}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={
              fieldErrors.name ? "contact-name-error" : undefined
            }
            disabled={status === "submitting"}
            className={`mt-2 w-full rounded-[12px] border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] transition-colors focus:outline-none ${
              fieldErrors.name
                ? "border-red-400 focus:border-red-400"
                : "border-[var(--border)] focus:border-[var(--accent)]"
            }`}
          />
          {fieldErrors.name && (
            <p
              id="contact-name-error"
              role="alert"
              className="mt-1.5 text-xs text-red-400"
            >
              {t(UI_TEXT.contact.form.validation[fieldErrors.name])}
            </p>
          )}
        </div>

        {/* 2. Email & 3. Phone */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="contact-email"
              className="block text-xs font-medium tracking-wide text-[var(--heading)] uppercase"
            >
              {t(UI_TEXT.contact.form.emailLabel)}{" "}
              <span className="text-[var(--accent)]" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              maxLength={160}
              autoComplete="email"
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder={t(UI_TEXT.contact.form.emailPlaceholder)}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={
                fieldErrors.email ? "contact-email-error" : undefined
              }
              disabled={status === "submitting"}
              className={`mt-2 w-full rounded-[12px] border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] transition-colors focus:outline-none ${
                fieldErrors.email
                  ? "border-red-400 focus:border-red-400"
                  : "border-[var(--border)] focus:border-[var(--accent)]"
              }`}
            />
            {fieldErrors.email && (
              <p
                id="contact-email-error"
                role="alert"
                className="mt-1.5 text-xs text-red-400"
              >
                {t(UI_TEXT.contact.form.validation[fieldErrors.email])}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="contact-phone"
              className="block text-xs font-medium tracking-wide text-[var(--heading)] uppercase"
            >
              {t(UI_TEXT.contact.form.phoneLabel)}{" "}
              <span className="text-[var(--accent)]" aria-hidden="true">
                *
              </span>
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              required
              maxLength={24}
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder={t(UI_TEXT.contact.form.phonePlaceholder)}
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={
                fieldErrors.phone ? "contact-phone-error" : undefined
              }
              disabled={status === "submitting"}
              className={`mt-2 w-full rounded-[12px] border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] transition-colors focus:outline-none ${
                fieldErrors.phone
                  ? "border-red-400 focus:border-red-400"
                  : "border-[var(--border)] focus:border-[var(--accent)]"
              }`}
            />
            {fieldErrors.phone && (
              <p
                id="contact-phone-error"
                role="alert"
                className="mt-1.5 text-xs text-red-400"
              >
                {t(UI_TEXT.contact.form.validation[fieldErrors.phone])}
              </p>
            )}
          </div>
        </div>

        {/* 4. Description */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="contact-description"
              className="block text-xs font-medium tracking-wide text-[var(--heading)] uppercase"
            >
              {t(UI_TEXT.contact.form.descriptionLabel)}{" "}
              <span className="text-[var(--accent)]" aria-hidden="true">
                *
              </span>
            </label>
            <span className="font-mono text-[11px] text-[var(--muted)]">
              {values.description.length}/3000
            </span>
          </div>
          <textarea
            id="contact-description"
            name="description"
            rows={5}
            required
            maxLength={3000}
            value={values.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder={t(UI_TEXT.contact.form.descriptionPlaceholder)}
            aria-invalid={Boolean(fieldErrors.description)}
            aria-describedby={
              fieldErrors.description ? "contact-description-error" : undefined
            }
            disabled={status === "submitting"}
            className={`mt-2 w-full rounded-[12px] border bg-[var(--surface)] px-4 py-3 text-sm leading-relaxed text-[var(--text)] placeholder:text-[var(--muted)] transition-colors focus:outline-none ${
              fieldErrors.description
                ? "border-red-400 focus:border-red-400"
                : "border-[var(--border)] focus:border-[var(--accent)]"
            }`}
          />
          {fieldErrors.description && (
            <p
              id="contact-description-error"
              role="alert"
              className="mt-1.5 text-xs text-red-400"
            >
              {t(UI_TEXT.contact.form.validation[fieldErrors.description])}
            </p>
          )}
        </div>

        {/* Server Failure State */}
        {status === "error" && (
          <div
            role="alert"
            aria-live="assertive"
            className="rounded-[12px] border border-red-500/40 bg-red-500/10 p-4"
          >
            <div className="flex items-start gap-3">
              <AlertCircle
                className="mt-0.5 h-5 w-5 shrink-0 text-red-400"
                aria-hidden="true"
              />
              <div className="flex-1">
                <p className="text-xs font-medium text-red-300">
                  {t(UI_TEXT.contact.form.errorHeading)}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[var(--text)]">
                  {serverErrorMessage}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2.5">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-[12px] bg-[var(--accent)] px-3.5 py-2 text-xs font-medium text-[var(--on-accent)] transition-colors hover:bg-[var(--accent-hover)] cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t(UI_TEXT.contact.form.retryButton)}</span>
                  </button>

                  {fallbackWhatsappUrl && (
                    <a
                      href={fallbackWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-[12px] border border-[var(--accent)] bg-transparent px-3.5 py-2 text-xs font-medium text-[var(--accent)] transition-colors hover:bg-[var(--surface)]"
                    >
                      <WhatsAppIcon size={14} />
                      <span>{t(UI_TEXT.contact.form.alsoSendViaWhatsapp)}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[12px] bg-[var(--accent)] px-6 py-3.5 text-sm font-medium text-[var(--on-accent)] transition-colors hover:bg-[var(--accent-hover)] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>{t(UI_TEXT.contact.form.submittingButton)}</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              <span>{t(UI_TEXT.contact.form.submitButton)}</span>
            </>
          )}
        </button>

        {/* Privacy Notice */}
        <p className="text-[11px] leading-relaxed text-[var(--muted)]">
          {t(UI_TEXT.contact.form.privacyNotice)}
        </p>
      </div>
    </form>
  );
}
