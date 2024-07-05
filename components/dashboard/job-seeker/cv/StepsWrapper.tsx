"use client";
import useSteps from "@/hooks/useStepsHook";
import CVHeadlineForm from "./steps/CVHeadlineForm";
import SkillsForm from "./steps/SkillsForm";
import ProfileSummaryForm from "./steps/ProfileSummaryForm";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  CV,
  EducationLevel,
  EmploymentDetails,
  Experience,
  GCPData,
  Sector,
} from "@prisma/client";
import { JobSeekerProfileProps } from "@/types/job-seeker-profile";
import { Progress } from "@/components/ui/progress";
import UploadCV from "./UploadCV";
import JobSeekerProfileUpdate from "@/components/dashboard/job-seeker/cv/JobSeekerProfile";
import { useState } from "react";
import EmploymentDetailsForm from "./steps/EmploymentDetailsForm";


type Props = {
  jobSeekerProfile: JobSeekerProfileProps;
  cv: CV;
  cvFile: GCPData | null;
  sectors: Sector[];
  educationLevels: EducationLevel[];
  employmentDetails: EmploymentDetails | null;
  experience: Experience[];
};

const StepsWrapper = ({
  jobSeekerProfile,
  cvFile,
  cv,
  sectors,
  educationLevels,
  employmentDetails,
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
    <ProfileSummaryForm 
      key={5}
      title="Profile Summary"
       description="Outline the key highlights of your career to employers" 
       profileId={jobSeekerProfile.id} 
       profilePercentage={1} 
       initialData={{
          profileSummary: jobSeekerProfile.profileSummary
        }}    
    />,
    <EmploymentDetailsForm
      key={6}
      title="Employment Details"
      profileId={jobSeekerProfile.id} 
      designation={ employmentDetails?.designation || ''}
      company={ employmentDetails?.company || ''}
      location={ employmentDetails?.location || ''}
      description={ employmentDetails?.description || ''}
      profilePercentage={0}
      initialData={{
        employmentDetails: employmentDetails || null, // Pass initial employment details if available
      }}
    />,

  ]);

  // State to toggle sidebar visibility on small screen
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="space-y-8 bg-slate-100/30 p-12">

      {/* top bar  */}
      <div className="flex flex-wrap justify-between items-center gap-2 rounded-md p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        {steps.map((step, index) => (
          <Badge
            key={index}
            variant={index === currentStepIndex ? "default" : "outline"}
            className={cn(
              currentStepIndex === index && "bg-sky-500/20 text-zinc-100",
              "text-center flex-1 cursor-pointer justify-center py-2 text-zinc-700  hover:bg-sky-500/30",
            )}
            onClick={() => goTo(index)}
          >
            {step.props.title}
          </Badge>
        ))}
      </div>
      {/* side bar hidden by default on small screens */}

      {/* Toggle button for sidebar on small screen */}
        

        {/* content */}
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div 
         className={cn(
          "md:w-1/3 space-y-4 p-4 rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition-all",
          showSidebar ? "block" : "hidden md:block"
        )}>
          <div className="flex justify-between items-center">
            <h3>
              <span className="text-[2rem]">
                {jobSeekerProfile?.profilePercentage?.percentage | 0}
              </span>
              % Percentage completed
            </h3>

            <button 
              className="flex justify-between rounded-md text-sm p-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:hidden"
              onClick={() => setShowSidebar(!showSidebar)}
              >
              {showSidebar ? "Hide Details" : "Show Details" }
            </button>
          </div>
         
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
                  <Badge>Adds {step.props.profilePercentage} %</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Mobile Progress Bar */}
        <div
          className="block w-full md:hidden bg-white p-4 rounded-md shadow-md mb-4"
        >
          <div className="flex w-full justify-between items-center">
            <h3 className="text-xl">
              {jobSeekerProfile?.profilePercentage?.percentage | 0}%
              <span className="text-sm block text-gray-500">Profile Completed</span>
            </h3>
            {/* toggle button for sidebar on small screen */}
            <button 
              className="flex justify-between rounded-md text-sm m-2 p-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:hidden"
              onClick={() => setShowSidebar(!showSidebar)}
              >
              {showSidebar ? "Hide" : "Details" }
            </button>

          </div>




          <Progress
            value={jobSeekerProfile?.profilePercentage?.percentage | 0}
            className="h-2 rounded-md"
          />
        </div>
        {/* main content  */}
        <div className="flex-1 w-full  rounded-md shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
          {step}
        </div>
      </div>
    </div>
  );
};

export default StepsWrapper;
