"use client";
import { useState } from "react";
import CreateCoverLetterForm from "./CreateCoverLetter";
import Apply from "./Apply";
import { JobSeekerProfileProps } from "@/types/job-seeker-profile";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { Company, Job, User } from "@prisma/client";

type Props = {
  jobId: string;
  jobSeekerProfile: JobSeekerProfileProps | null;
  job: Job & {
    company: Company;
    owner: User;
  };
};

const ApplicationWrapper = ({ jobId, jobSeekerProfile, job }: Props) => {
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
    <div>
      <div>
        <h3 className="text-base text-sky-500">Cover Letter</h3>
        <p className="text-[0.7rem] text-muted-foreground">
          Make your CV standout!
        </p>
        {hasPromptData ? (
          <>
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
          </>
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
    </div>
  );
};

export default ApplicationWrapper;
