"use client";
import useSteps from "@/hooks/useStepsHook";
import ProfileHeader from "@/components/dashboard/job-seeker/cv/ProfileHeader";
import CVHeadlineForm from "./steps/CVHeadlineForm";
import SkillsForm from "./steps/SkillsForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  CV,
  GCPData,
  JobSeekerProfile,
  JobSeekerProfilePercentage,
} from "@prisma/client";
import { JobSeekerProfileProps } from "@/types/job-seeker-profile";
import { Progress } from "@/components/ui/progress";
import UploadCV from "./UploadCV";

type Props = {
  jobSeekerProfile: JobSeekerProfileProps;
  cv: CV;
  cvFile: GCPData | null;
};

const StepsWrapper = ({ jobSeekerProfile, cvFile, cv }: Props) => {
  const { steps, step, goTo, currentStepIndex } = useSteps([
    <CVHeadlineForm
      key={1}
      title="CV Headline"
      profilePercentage={10}
      initialData={{ cvHeadLine: jobSeekerProfile.cvHeadLine }}
      profileId={jobSeekerProfile.id}
    />,
    <SkillsForm
      key={2}
      title="Skills"
      profileId={jobSeekerProfile.id}
      skills={jobSeekerProfile.skills}
    />,
    <UploadCV cv={cv} cvFile={cvFile} key={3} title="Update CV" />,
  ]);
  return (
    <div className="space-y-8 bg-slate-100/30 p-12">
      {/* top bar  */}
      <div className="flex justify-between gap-2 rounded-md p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        {steps.map((step, index) => (
          <Badge
            key={index}
            variant={index === currentStepIndex ? "default" : "outline"}
            className={cn(
              currentStepIndex === index && "bg-sky-500/20 text-zinc-100",
              "flex-1 cursor-pointer justify-center py-2 text-zinc-700  hover:bg-sky-500/30",
            )}
            onClick={() => goTo(index)}
          >
            {step.props.title}
          </Badge>
        ))}
      </div>
      {/* side bar  */}
      <div className="flex gap-4">
        <div className="basis-1/3 space-y-4 rounded-md p-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <h3>
            <span className="text-[2rem]">
              {jobSeekerProfile?.profilePercentage?.percentage | 0}
            </span>
            % Percentage completed
          </h3>
          <Progress
            value={jobSeekerProfile?.profilePercentage?.percentage | 0}
          />
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "p-4",
                currentStepIndex === index
                  ? "shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
                  : "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
              )}
            >
              <div className="flex items-center justify-between">
                <p>{step.props.title}</p>

                {step.props.profilePercentage && (
                  <Badge>Adds {step.props.profilePercentage}</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* main content  */}
        <div className="flex-1 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          {step}
        </div>
      </div>
    </div>
  );
};

export default StepsWrapper;
