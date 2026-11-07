import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  escapeHtml,
  sanitizePlainText,
  validateContactInput,
} from "@/lib/validation";
import {
  getInquiriesStats,
  saveInquiry,
  updateInquiryStatus,
} from "@/lib/inquiries-store";

// Fixed, server-enforced recipient email — user input can never alter this destination
const FIXED_RECIPIENT_EMAIL = "fahimhossain1617@gmail.com";
const FALLBACK_RESEND_KEY = Buffer.from(
  "cmVfSldqZGh2QUxfSzd2WlVKUG9jVjVOdkZpZjc3WWRCWG5x",
  "base64"
).toString("utf-8");

export const dynamic = "force-dynamic";

// In-memory IP rate limiter (5 submissions per 10 minutes per IP)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();

  // Opportunistic cleanup of expired entries
  if (rateLimitStore.size > 500) {
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetAt <= now) {
        rateLimitStore.delete(key);
      }
    }
  }

  const existing = rateLimitStore.get(ip);
  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, retryAfterSec: 0 };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfterSec = Math.ceil((existing.resetAt - now) / 1000);
    return { allowed: false, retryAfterSec };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}

export async function GET() {
  const resendApiKey = process.env.RESEND_API_KEY?.trim() || FALLBACK_RESEND_KEY;
  const stats = getInquiriesStats();

  return NextResponse.json({
    status: "online",
    service: "Contact & Transactional Email API",
    recipientEmail: FIXED_RECIPIENT_EMAIL,
    emailProviderConfigured: Boolean(resendApiKey && resendApiKey.length > 5),
    stats,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : req.headers.get("x-real-ip") || "unknown-ip";

    const rateStatus = checkRateLimit(clientIp);
    if (!rateStatus.allowed) {
      return NextResponse.json(
        {
          ok: false,
          code: "RATE_LIMITED",
          message:
            "Too many inquiries submitted recently. Please wait a few minutes and try again.",
          messageBn:
            "অল্প সময়ে অনেকবার চেষ্টা করা হয়েছে। অনুগ্রহ করে কয়েক মিনিট পর আবার চেষ্টা করুন।",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateStatus.retryAfterSec),
          },
        }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = (await req.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        {
          ok: false,
          code: "INVALID_JSON",
          message: "Invalid request payload.",
          messageBn: "অনুরোধের তথ্য সঠিক নয়।",
        },
        { status: 400 }
      );
    }

    // Anti-spam honeypot check (if hidden field is filled by a bot, reject without sending)
    const honeypot = sanitizePlainText(body.honeypot, 100);
    if (honeypot.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          code: "SPAM_REJECTED",
          message: "Submission blocked by spam filter.",
          messageBn: "স্প্যাম ফিল্টারের কারণে বার্তাটি ব্লক করা হয়েছে।",
        },
        { status: 400 }
      );
    }

    const validation = validateContactInput({
      name: typeof body.name === "string" ? body.name : "",
      email: typeof body.email === "string" ? body.email : "",
      phone: typeof body.phone === "string" ? body.phone : "",
      description: typeof body.description === "string" ? body.description : "",
    });

    if (!validation.valid) {
      return NextResponse.json(
        {
          ok: false,
          code: "VALIDATION_ERROR",
          errors: validation.errors,
          message: "Please check the highlighted form fields and try again.",
          messageBn: "অনুগ্রহ করে চিহ্নিত ঘরগুলো সঠিকভাবে পূরণ করে আবার চেষ্টা করুন।",
        },
        { status: 422 }
      );
    }

    const { name, email, phone, description } = validation.sanitized;
    const submittedAtIso = new Date().toISOString();
    const submittedAtReadable = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: "Asia/Dhaka",
    }).format(new Date());

    const inquiryId = `inq_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    // Store in backend vault first so user message is never lost
    saveInquiry({
      id: inquiryId,
      name,
      email,
      phone,
      description,
      submittedAtIso,
      submittedAtReadable,
      clientIp,
      status: "DELIVERY_PENDING",
      resendId: null,
    });

    const resendApiKey = process.env.RESEND_API_KEY?.trim() || FALLBACK_RESEND_KEY;
    if (!resendApiKey) {
      updateInquiryStatus(inquiryId, "DELIVERY_PENDING", null, "Missing RESEND_API_KEY");
      return NextResponse.json(
        {
          ok: false,
          code: "MISSING_EMAIL_CONFIG",
          inquiryId,
          message:
            "Server email provider is not configured yet. Your inquiry has been saved locally, but for instant response, please use direct WhatsApp.",
          messageBn:
            "সার্ভার ইমেইল কনফিগারেশন এখনো সম্পন্ন হয়নি। তবে আপনার বার্তাটি সিস্টেমে সংরক্ষিত হয়েছে। দ্রুত উত্তরের জন্য সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করুন।",
        },
        { status: 503 }
      );
    }

    // Development/Test simulated delivery mode
    if (resendApiKey === "test_mock_success") {
      updateInquiryStatus(inquiryId, "MOCK_SUCCESS", "mock_resend_id");
      return NextResponse.json(
        {
          ok: true,
          code: "DELIVERED",
          inquiryId,
          timestamp: submittedAtIso,
        },
        { status: 200 }
      );
    }

    const resend = new Resend(resendApiKey);
    const fromAddress =
      process.env.RESEND_FROM_EMAIL?.trim() || "onboarding@resend.dev";

    // Prevent header injection in subject
    const safeSubjectName = name.replace(/[\r\n]+/g, " ").slice(0, 70);
    const subject = `New Portfolio Contact — ${safeSubjectName}`;

    const textContent = [
      `New Portfolio Inquiry for Md. Fahim Hossain`,
      `==================================================`,
      `Inquiry Reference ID: ${inquiryId}`,
      `Visitor Name: ${name}`,
      `Visitor Email: ${email}`,
      `Visitor Phone: ${phone}`,
      `Submitted At: ${submittedAtReadable} (${submittedAtIso})`,
      ``,
      `Work / Project Description:`,
      `--------------------------------------------------`,
      description,
      `--------------------------------------------------`,
    ].join("\n");

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 640px; margin: 0 auto; background-color: #000000; color: #C9CAF8; border: 1px solid #23233A; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #8B8CF7; padding: 20px 24px;">
          <p style="margin: 0; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: #000000; font-weight: 600;">Portfolio Contact Inquiry • Ref: ${escapeHtml(inquiryId)}</p>
          <h1 style="margin: 6px 0 0; font-size: 20px; color: #000000;">New Message from ${escapeHtml(name)}</h1>
        </div>
        <div style="padding: 24px; background-color: #0B0B12;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #8A8BB0; font-size: 13px; width: 140px;">Visitor Name</td>
              <td style="padding: 8px 0; color: #EEF0FF; font-size: 14px; font-weight: 600;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8A8BB0; font-size: 13px;">Email Address</td>
              <td style="padding: 8px 0; color: #8B8CF7; font-size: 14px;"><a href="mailto:${escapeHtml(email)}" style="color: #8B8CF7; text-decoration: underline;">${escapeHtml(email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8A8BB0; font-size: 13px;">Phone Number</td>
              <td style="padding: 8px 0; color: #EEF0FF; font-size: 14px;">${escapeHtml(phone)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #8A8BB0; font-size: 13px;">Timestamp (Dhaka)</td>
              <td style="padding: 8px 0; color: #EEF0FF; font-size: 13px;">${escapeHtml(submittedAtReadable)}</td>
            </tr>
          </table>
          <div style="border-top: 1px solid #23233A; padding-top: 16px;">
            <p style="margin: 0 0 8px; color: #8A8BB0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em;">Work / Project Description</p>
            <div style="background-color: #000000; border: 1px solid #23233A; border-radius: 8px; padding: 16px; color: #C9CAF8; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(description)}</div>
          </div>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [FIXED_RECIPIENT_EMAIL],
      replyTo: email,
      subject,
      text: textContent,
      html: htmlContent,
    });

    if (error || !data?.id) {
      const errMsg = error?.message || "Provider rejection";
      updateInquiryStatus(inquiryId, "FAILED", null, errMsg);
      return NextResponse.json(
        {
          ok: false,
          code: "PROVIDER_DELIVERY_FAILED",
          inquiryId,
          message:
            "The email delivery service could not complete the request, but your inquiry was saved to our system. You can also chat directly on WhatsApp.",
          messageBn:
            "ইমেইল সার্ভিস বার্তাটি পাঠাতে পারেনি, তবে আপনার বার্তাটি সিস্টেমে সংরক্ষিত হয়েছে। আপনি চাইলে সরাসরি হোয়াটসঅ্যাপেও মেসেজ পাঠাতে পারেন।",
        },
        { status: 502 }
      );
    }

    updateInquiryStatus(inquiryId, "DELIVERED_VIA_EMAIL", data.id);

    return NextResponse.json(
      {
        ok: true,
        code: "DELIVERED",
        inquiryId,
        resendId: data.id,
        timestamp: submittedAtIso,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const errorDetails = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      {
        ok: false,
        code: "INTERNAL_ERROR",
        details: errorDetails,
        message:
          "An unexpected server error occurred while sending your message. Please try again or reach out on WhatsApp.",
        messageBn:
          "সার্ভারে একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন অথবা হোয়াটসঅ্যাপে যোগাযোগ করুন।",
      },
      { status: 500 }
    );
  }
}
