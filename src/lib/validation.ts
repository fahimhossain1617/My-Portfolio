import { PERSONAL_INFO } from "@/data/portfolio";

export interface ContactFormInput {
  name: string;
  email: string;
  phone: string;
  description: string;
  honeypot?: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, "nameRequired" | "emailRequired" | "phoneRequired" | "descriptionRequired">>;
  sanitized: {
    name: string;
    email: string;
    phone: string;
    description: string;
  };
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_ALLOWED_REGEX = /^[0-9+\-\s()]{7,24}$/;

/**
 * Strips control characters and normalizes whitespace safely without altering legitimate text.
 */
export function sanitizePlainText(input: unknown, maxLength: number): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

/**
 * Escapes HTML special characters for safe inclusion inside HTML email templates.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function validateContactInput(raw: Partial<ContactFormInput>): ContactValidationResult {
  const name = sanitizePlainText(raw.name, 100);
  const email = sanitizePlainText(raw.email, 160).toLowerCase();
  const phone = sanitizePlainText(raw.phone, 24);
  const description = sanitizePlainText(raw.description, 3000);

  const errors: ContactValidationResult["errors"] = {};

  if (name.length < 2) {
    errors.name = "nameRequired";
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    errors.email = "emailRequired";
  }

  const digitCount = (phone.match(/\d/g) || []).length;
  if (!phone || !PHONE_ALLOWED_REGEX.test(phone) || digitCount < 7 || digitCount > 16) {
    errors.phone = "phoneRequired";
  }

  if (description.length < 15) {
    errors.description = "descriptionRequired";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      name,
      email,
      phone,
      description,
    },
  };
}

/**
 * Generates a properly URL-encoded WhatsApp click-to-chat URL for +8801947281437
 * containing the visitor's inquiry details for explicit user review and sending.
 */
export function buildWhatsAppInquiryUrl(data: {
  name: string;
  email: string;
  phone: string;
  description: string;
}): string {
  const messageLines = [
    `Hello Fahim, I would like to discuss a project with you.`,
    ``,
    `Name: ${data.name.trim()}`,
    `Email: ${data.email.trim()}`,
    `Phone: ${data.phone.trim()}`,
    ``,
    `Work / Project Description:`,
    data.description.trim(),
  ];

  const encodedText = encodeURIComponent(messageLines.join("\n"));
  return `https://wa.me/${PERSONAL_INFO.contact.whatsappDigits}?text=${encodedText}`;
}
