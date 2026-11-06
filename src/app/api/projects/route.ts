import { NextRequest, NextResponse } from "next/server";
import { PROJECTS, ProjectRecord } from "@/data/portfolio";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search")?.toLowerCase().trim();
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    // Dynamic environment URL overrides (when user deploys live real production URLs)
    const envOverrides: Record<string, { liveUrl?: string; githubUrl?: string }> = {
      focentia: {
        liveUrl: process.env.FOCENTIA_LIVE_URL || process.env.NEXT_PUBLIC_FOCENTIA_URL,
        githubUrl: process.env.FOCENTIA_GITHUB_URL,
      },
      "ecommerce-website": {
        liveUrl: process.env.AURUM_LIVE_URL || process.env.NEXT_PUBLIC_AURUM_URL,
        githubUrl: process.env.AURUM_GITHUB_URL,
      },
      "isp-website": {
        liveUrl: process.env.ISP_LIVE_URL || process.env.NEXT_PUBLIC_ISP_URL,
        githubUrl: process.env.ISP_GITHUB_URL,
      },
      "radiation-coaching-website": {
        liveUrl: process.env.RADIATION_LIVE_URL || process.env.NEXT_PUBLIC_RADIATION_URL,
        githubUrl: process.env.RADIATION_GITHUB_URL,
      },
    };

    const hydratedProjects: ProjectRecord[] = PROJECTS.map((proj) => {
      const override = envOverrides[proj.id];
      if (!override) return proj;
      return {
        ...proj,
        liveUrl: override.liveUrl || proj.liveUrl,
        githubUrl: override.githubUrl || proj.githubUrl,
      };
    });

    // Single item lookup by id or slug
    if (id || slug) {
      const match = hydratedProjects.find(
        (p) => p.id === (id || slug) || p.slug === (id || slug)
      );
      if (!match) {
        return NextResponse.json(
          { ok: false, error: "Project not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ ok: true, project: match });
    }

    // Filter by category
    let result = hydratedProjects;
    if (category && category !== "All") {
      result = result.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search query
    if (search) {
      result = result.filter(
        (p) =>
          p.title.en.toLowerCase().includes(search) ||
          p.title.bn.toLowerCase().includes(search) ||
          p.summary.en.toLowerCase().includes(search) ||
          p.summary.bn.toLowerCase().includes(search) ||
          p.verifiedTechTags.some((tag) => tag.toLowerCase().includes(search))
      );
    }

    return NextResponse.json({
      ok: true,
      count: result.length,
      total: hydratedProjects.length,
      projects: result,
      source: "production-verified-catalog",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}

