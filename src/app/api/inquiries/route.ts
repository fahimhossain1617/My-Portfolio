import { NextRequest, NextResponse } from "next/server";
import { getAllInquiries, getInquiriesStats } from "@/lib/inquiries-store";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 50, 100);
    const stats = getInquiriesStats();
    const inquiries = getAllInquiries(limit);

    return NextResponse.json({
      ok: true,
      stats,
      count: inquiries.length,
      inquiries: inquiries.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        description: item.description,
        submittedAtIso: item.submittedAtIso,
        submittedAtReadable: item.submittedAtReadable,
        status: item.status,
        resendId: item.resendId || null,
      })),
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}

