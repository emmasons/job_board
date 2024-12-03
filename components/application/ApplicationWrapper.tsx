"use client";
import { useState } from "react";
import CreateCoverLetterForm from "./CreateCoverLetter";
import Apply from "./Apply";
import { JobSeekerProfileProps } from "@/types/job-seeker-profile";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { Job } from "@prisma/client";

type Props = {
  jobId: string;
  jobSeekerProfile: JobSeekerProfileProps | null;
  job: Job | null;
};

const ApplicationWrapper = ({ jobId, jobSeekerProfile, job }: Props) => {
  const [coverLetterContent, setCoverLetterContent] = useState("");

  const handleCoverLetterChange = (content: string) => {
    console.log(content);

    setCoverLetterContent(content);
  };
  const [loading, setLoading] = useState(false);
  const handleGenerateCoverLetter = async () => {
    // handleCoverLetterChange("Life sucks sometimes");
    setLoading(true);
    console.log("Generating Cover Letter");
    try {
      const promptContent = {
        jobTitle: job?.title,
        companyName: "your organization",
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
      </div>

      {jobSeekerProfile && (
        <Apply jobId={jobId} coverLetter={coverLetterContent} />
      )}
    </div>
  );
};

export default ApplicationWrapper;
