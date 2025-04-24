// app/actions/jobActions.ts
"use server";

import { getCurrentSessionUser } from "@/lib/auth";
import { hasFeatureAccess } from "@/lib/subscription/subscription-utils";

export async function generateCoverLetter(jobId: string) {
  const user = await getCurrentSessionUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const userId = user.id;

  // Check if user has access to cover letter generation
  const hasAccess = await hasFeatureAccess(userId, "cover_letter_generation");

  if (!hasAccess) {
    return {
      success: false,
      error: "This feature requires a Standard or Premium subscription",
      upgradePlan: true,
    };
  }

  return {
    success: true,
  };
}

export async function applyToJob(jobId: string, data: JobApplicationData) {
  const user = await getCurrentSessionUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const userId = user.id;

  // Check if user has access to job application
  const hasAccess = await hasFeatureAccess(userId, "job_application");

  if (!hasAccess) {
    return {
      success: false,
      error: "You need at least a Basic subscription to apply for jobs",
      upgradePlan: true,
    };
  }

  // Job application logic...

  return {
    success: true,
  };
}
