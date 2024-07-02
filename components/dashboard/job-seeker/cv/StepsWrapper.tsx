"use client";
import useSteps from "@/hooks/useStepsHook";
import CVHeadlineForm from "./steps/CVHeadlineForm";
import SkillsForm from "./steps/SkillsForm";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  CV,
  EducationLevel,
  Experience,
  GCPData,
  Sector,
} from "@prisma/client";
import { JobSeekerProfileProps } from "@/types/job-seeker-profile";
import { Progress } from "@/components/ui/progress";
import UploadCV from "./UploadCV";
import JobSeekerProfileUpdate from "@/components/dashboard/job-seeker/cv/JobSeekerProfile";

type Props = {
  jobSeekerProfile: JobSeekerProfileProps;
  cv: CV;
  cvFile: GCPData | null;
  sectors: Sector[];
  educationLevels: EducationLevel[];
  experience: Experience[];
};

const StepsWrapper = ({
  jobSeekerProfile,
  cvFile,
  cv,
  sectors,
  educationLevels,
  experience,
}: Props) => {
  const { steps, step, goTo, currentStepIndex } = useSteps([
    <CVHeadlineForm
      key={1}
      title="CV Headline"
      profilePercentage={10}
      initialData={{ cvHeadLine: jobSeekerProfile.cvHeadLine }}
      profileId={jobSeekerProfile.id}
      description="Highlight your professional career"
    />,
    <SkillsForm
      key={2}
      title="Skills"
      profileId={jobSeekerProfile.id}
      skills={jobSeekerProfile.skills}
      description="Add your skills"
    />,
    <UploadCV
      cv={cv}
      cvFile={cvFile}
      key={3}
      title="Update CV"
      description="An updated CV increases your chances of getting job offers by 60%"
    />,
    <JobSeekerProfileUpdate
      profilePercentage={20}
      description="Your sector, education level, experience and country of origin."
      key={4}
      title="Professional Summary"
      profile={jobSeekerProfile}
      sectorList={sectors.map((sector) => ({
        label: sector.label,
        value: sector.id,
      }))}
      educationLevelList={educationLevels.map((level) => ({
        label: level.label,
        value: level.id,
      }))}
      experienceList={experience.map((exp) => ({
        label: exp.label,
        value: exp.id,
      }))}
    />,
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
      <div className="flex gap-4 items-start">
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
                  ? "shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
                  : "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
              )}
            >
              <div className="flex items-start justify-between">
                <div className="basis-2/3">
                  <p className="text-[0.9rem] font-semibold">
                    {step.props.title}
                  </p>
                  <p className="text-[0.75rem]">{step.props.description}</p>
                  <p
                    className="cursor-pointer text-[0.75rem] text-sky-500"
                    onClick={() => goTo(index)}
                  >
                    Add details
                  </p>
                </div>
                {step.props.profilePercentage && (
                  <Badge>Adds {step.props.profilePercentage}</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* main content  */}
        <div className="flex-1 rounded-md shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
          {step}
        </div>
      </div>
    </div>
  );
};

export default StepsWrapper;
