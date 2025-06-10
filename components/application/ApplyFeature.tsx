"use client";

import { Suspense, useEffect, useState } from "react";
import Apply from "./Apply";
import { JobSeekerProfileProps } from "@/types/job-seeker-profile";
import { Loader2 } from "lucide-react";
import { Company, Job, User } from "@prisma/client";
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
  userSubscription: {
    id: string;
    status: string;
    plan: {
      name: string;
    };
  } | null;
};

const ApplyFeature = ({
  jobId,
  jobSeekerProfile,
  job,
  user,
  coverLetterContent,
  userSubscription,
}: Props) => {
  const hasActiveSubscription = userSubscription && userSubscription.status === "ACTIVE";

  const [hasFeatureAccess, setHasFeatureAccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkFeatureAccess = async () => {
      try {
        const res = await fetch(
          `/api/subscription/check-access?feature=cover_letter_generation`
        );
        const data = await res.json();
        setHasFeatureAccess(data.hasAccess);
      } catch (error) {
        console.error("Error checking feature access:", error);
        setHasFeatureAccess(false);
      } finally {
        setLoading(false);
      }
    };

    // Only check access if no active subscription
    if (!hasActiveSubscription) {
      checkFeatureAccess();
    } else {
      setHasFeatureAccess(true);
      setLoading(false);
    }
  }, [hasActiveSubscription]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-6">
        <Loader2 className="h-8 w-8 animate-spin" />
        Loading Access...
      </div>
    );
  }

  if (!hasFeatureAccess) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
        <h3 className="font-medium">Job Application</h3>
        <p className="mt-2 text-gray-600">
          You need an active Subscription to apply for this job.
        </p>
        <a
          href="/subscription/plans"
          className="mt-4 inline-block rounded-md bg-primary/70 px-4 py-2 text-white"
        >
          View Plans
        </a>
      </div>
    );
  }

  const profilePercentage = jobSeekerProfile?.profilePercentage?.percentage ?? 0;

  if (jobSeekerProfile && profilePercentage > 20) {
    return <Apply jobId={jobId} coverLetter={coverLetterContent} />;
  }

  return (
    <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
      <p className="text-[1rem] text-amber-700">
        Please complete your profile to apply for this job.
      </p>
      <ul className="list-disc pl-5 text-[0.8rem] text-amber-700">
        <li>Update your profile up to 40%</li>
      </ul>
    </div>
  );
};

export default ApplyFeature;
