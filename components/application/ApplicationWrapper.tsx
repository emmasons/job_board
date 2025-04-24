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
};

const ApplicationWrapper = ({ jobId, jobSeekerProfile, job, user }: Props) => {
  const [coverLetterContent, setCoverLetterContent] = useState("");

  const handleCoverLetterChange = (content: string) => {
    console.log(content);

    setCoverLetterContent(content);
  };
  const [loading, setLoading] = useState(false);

  const hasPromptData = !!(
    job?.title &&
    job?.city &&
    (jobSeekerProfile?.profilePercentage?.percentage ?? 0) > 50 &&
    (jobSeekerProfile?.skills ?? []).length > 0
  );

  const handleGenerateCoverLetter = async () => {
    // handleCoverLetterChange("Life sucks sometimes");
    setLoading(true);
    console.log("Generating Cover Letter");
    try {
      const promptContent = {
        jobTitle: job?.title,
        companyName: job?.company.companyName ?? "Company Name",
        location: job?.city,
        yearsOfExperience: jobSeekerProfile?.yearsOfExperience,
        keySkills: jobSeekerProfile?.skills
          .map((skill) => skill.skill)
          .join(", "),
      };

      const response = await fetch("/api/ai/cover-letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promptContent),
      });
      const aiContent = await response.json();
      handleCoverLetterChange(aiContent.message);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base text-sky-500">Cover Letter</h3>
        <p className="text-[0.7rem] text-muted-foreground">
          Make your CV standout!
        </p>
        {hasPromptData ? (
          <div className="space-y-4">
            <Suspense
              fallback={
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 p-6">
                  <Loader2 className="h-8 w-8 animate-spin" /> Loading cover
                  letter generator...
                </div>
              }
            >
              <FeatureGuard
                featureName="cover_letter_generation"
                userId={user.id}
                fallback={
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                    <h3 className="font-medium">
                      Generate Custom Cover Letters
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Upgrade to Standard plan to automatically generate
                      tailored cover letters for your job applications.
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
                <Button onClick={handleGenerateCoverLetter}>
                  {loading ? (
                    <Zap className="mr-2 h-4 w-4 animate-ping" />
                  ) : (
                    <>
                      Generate Professional Cover Letter
                      <Zap className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <CreateCoverLetterForm
                  content={coverLetterContent}
                  handleCoverLetterChange={handleCoverLetterChange}
                />
              </FeatureGuard>
            </Suspense>
          </div>
        ) : (
          <div className="my-2 space-y-2 rounded-md border border-dashed border-gray-300 p-4">
            <div className="flex items-center gap-1">
              <p className="text-[0.7rem] text-muted-foreground">
                Please complete your profile to generate a professional cover
                letter with our service.
              </p>
              <Zap className="ml-2 h-2 w-2" />
            </div>
            <p className="text-[0.7rem] text-muted-foreground">
              You are missing
            </p>
            <ul className="list-disc pl-5 text-[0.6rem] text-muted-foreground">
              {!job?.title && <li>Job Title</li>}
              {!job?.city && <li>City</li>}
              {/* {!jobSeekerProfile?.yearsOfExperience && (
                <li>Years of Experience</li>
              )} */}
              {!jobSeekerProfile?.skills.length && <li>Skills</li>}
              {(jobSeekerProfile?.profilePercentage?.percentage ?? 0) < 50 && (
                <li>Update your profile up to 50%</li>
              )}
            </ul>
          </div>
        )}
      </div>

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

export default ApplicationWrapper;
