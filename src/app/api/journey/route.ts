import { NextResponse } from "next/server";
import { JOURNEY_STAGES, SKILL_GROUPS, PERSONAL_INFO } from "@/data/portfolio";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const totalSkillsCount = SKILL_GROUPS.reduce(
      (acc, g) => acc + g.skills.length,
      0
    );

    return NextResponse.json({
      ok: true,
      profile: {
        name: PERSONAL_INFO.fullName.en,
        headline: PERSONAL_INFO.headline.en,
        education: {
          degree: PERSONAL_INFO.education.degree.en,
          institution: PERSONAL_INFO.education.institution.en,
          semester: PERSONAL_INFO.education.semester.en,
        },
        availability: PERSONAL_INFO.availability.isAvailable,
      },
      stats: {
        totalMilestones: JOURNEY_STAGES.length,
        currentStageId: JOURNEY_STAGES.find((s) => s.isCurrent)?.id || "stage-cse-uits",
        totalVerifiedSkills: totalSkillsCount,
        skillCategories: SKILL_GROUPS.length,
      },
      milestones: JOURNEY_STAGES,
      skillGroups: SKILL_GROUPS,
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

