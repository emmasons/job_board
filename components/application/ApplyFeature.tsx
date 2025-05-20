"use client";
import { Suspense, useState } from "react";
import CreateCoverLetterForm from "./CreateCoverLetter";
import Apply from "./Apply";
import { JobSeekerProfileProps } from "@/types/job-seeker-profile";
import { Button } from "@/components/ui/button";
import { Loader2, Zap } from "lucide-react";
import { Company, Job, User } from "@prisma/client";
import { FeatureGuard } from "../FeatureGuard";
import { SessionUser } from "@/lib/auth";

type Props = {
  jobId: string;
  jobSeekerProfile: JobSeekerProfileProps | null;
  job: Job & {
    company: Company;
    owner: User;
  };
  user: SessionUser;
  coverLetterContent?: string;
};

const ApplyFeature = ({
  jobId,
  jobSeekerProfile,
  job,
  user,
  coverLetterContent,
}: Props) => {
  return (
    <div className="space-y-4">
      <Suspense
        fallback={
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <Loader2 className="h-8 w-8 animate-spin" /> Loading cover letter
            generator...
          </div>
        }
      >
        <FeatureGuard
          featureName="cover_letter_generation"
          userId={user.id}
          fallback={
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h3 className="font-medium">Job Application</h3>
              <p className="mt-2 text-gray-600">
                Upgrade to Basic plan to apply for this job.
              </p>
              <a
                href="/subscription/plans"
                className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-white"
              >
                Upgrade Plan
              </a>
            </div>
          }
        >
          {jobSeekerProfile &&
          (jobSeekerProfile?.profilePercentage?.percentage ?? 0) > 50 ? (
            <Apply jobId={jobId} coverLetter={coverLetterContent} />
          ) : (
            <div className="my-2 space-y-2 rounded-md border border-dashed border-gray-300 p-4">
              <p className="text-[0.7rem] text-muted-foreground">
                Please complete your profile to apply for this job.
              </p>
              <ul className="list-disc pl-5 text-[0.6rem] text-muted-foreground">
                <li>Update your profile up to 50%</li>
              </ul>
            </div>
          )}
        </FeatureGuard>
      </Suspense>
    </div>
  );
};

export default ApplyFeature;
