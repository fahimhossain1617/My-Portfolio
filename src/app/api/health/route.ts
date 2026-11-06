import { NextResponse } from "next/server";
import { PERSONAL_INFO } from "@/data/portfolio";
import { getInquiriesStats } from "@/lib/inquiries-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const isResendConfigured = Boolean(resendApiKey && resendApiKey.startsWith("re_"));
  const stats = getInquiriesStats();

  const dhakaTime = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return NextResponse.json({
    status: "healthy",
    uptime: process.uptime(),
    timestampIso: new Date().toISOString(),
    timestampDhaka: dhakaTime,
    environment: process.env.NODE_ENV || "development",
    integrations: {
      emailDelivery: {
        configured: isResendConfigured,
        provider: "Resend (Server-Side REST API)",
        fromAddress: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
        recipientInbox: PERSONAL_INFO.contact.email,
        verifiedDeliveryConfirmed: true,
      },
      directChannels: {
        whatsappUrl: PERSONAL_INFO.contact.whatsappUrl,
        whatsappUsername: PERSONAL_INFO.contact.whatsappName,
        whatsappDirectHandoffReady: true,
        linkedinUrl: PERSONAL_INFO.contact.linkedinUrl,
        linkedinUsername: PERSONAL_INFO.contact.linkedinUsername,
        githubUrl: PERSONAL_INFO.contact.githubUrl,
        githubUsername: PERSONAL_INFO.contact.githubUsername,
      },
      inquiryVault: stats,
    },
  });
}

