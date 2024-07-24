"use client";
import useSteps from "@/hooks/useStepsHook";
import CVHeadlineForm from "./steps/CVHeadlineForm";
import SkillsForm from "./steps/SkillsForm";

import ProfileSummaryForm from "./steps/ProfileSummaryForm";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  CV,
  EducationLevel,
  EmploymentDetails,
  DesiredJob,
  PersonalDetails,
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
import PersonalDetailsForm from "./steps/PersonalDetailsForm";
import DesiredJobsForm from "./steps/DesiredJobsForm";

type Props = {
  jobSeekerProfile: JobSeekerProfileProps;
  cv: CV;
  cvFile: GCPData | null;
  sectors: Sector[];
  educationLevels: EducationLevel[];
  employmentDetails: EmploymentDetails | null;
  desiredJob: DesiredJob | null;
  personalDetails: PersonalDetails | null;
  experience: Experience[];
  isJobSeekerComponent: boolean;
};

const StepsWrapper = ({
  jobSeekerProfile,
  cvFile,
  cv,
  sectors,
  educationLevels,
  employmentDetails,
  personalDetails,
  desiredJob,
  experience,
  isJobSeekerComponent = true,
}: Props) => {
  const { steps, step, goTo, currentStepIndex } = useSteps([
    <CVHeadlineForm
      key={1}
      title="CV Headline"
      profilePercentage={5}
      initialData={{ cvHeadLine: jobSeekerProfile.cvHeadLine }}
      profileId={jobSeekerProfile.id}
      description="Highlight your professional career"
      isJobSeekerComponent={isJobSeekerComponent}
    />,
    <SkillsForm
      key={2}
      title="Key Skills"
      profileId={jobSeekerProfile.id}
      skills={jobSeekerProfile.skills}
      description="Add your key skills "
      profilePercentage={5}
      isJobSeekerComponent={isJobSeekerComponent}
    />,
    <UploadCV
      cv={cv}
      cvFile={cvFile}
      key={3}
      title="Resume/CV"
      profilePercentage={10}
      description="An updated CV increases your chances of getting job offers by 60%"
      isJobSeekerComponent={isJobSeekerComponent}
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
      isJobSeekerComponent={isJobSeekerComponent}
    />,
    <ProfileSummaryForm
      key={5}
      title="Profile Summary"
      description="Outline the key highlights of your career to employers"
      profileId={jobSeekerProfile.id}
      profilePercentage={5}
      initialData={{
        profileSummary: jobSeekerProfile.profileSummary,
      }}
      isJobSeekerComponent={isJobSeekerComponent}
    />,
    <EmploymentDetailsForm
      key={6}
      title="Employment Details"
      profileId={jobSeekerProfile.id}
      designation={employmentDetails?.designation || ""}
      company={employmentDetails?.company || ""}
      location={employmentDetails?.location || ""}
      description={employmentDetails?.description || ""}
      profilePercentage={20}
      isJobSeekerComponent={isJobSeekerComponent}
    />,

    <DesiredJobsForm
      key={7}
      title="Desired job"
      description="Add your desired jobs"
      profileId={jobSeekerProfile.id}
      designation={desiredJob?.designation || ""}
      location={desiredJob?.location || ""}
      industry={desiredJob?.industry || ""}
      profilePercentage={10}
      isJobSeekerComponent={isJobSeekerComponent}
    />,

    <PersonalDetailsForm
      key={8} // Make sure the key is unique if you're rendering this within a list
      title="Personal Details"
      profilePercentage={25}
      profileId={jobSeekerProfile.id}
      initialData={personalDetails}
      // dateOfBirth={personalDetails?.dateOfBirth}
      // gender={personalDetails?.gender || ""}
      // nationality={personalDetails?.nationality || ""}
      // maritalStatus={personalDetails?.maritalStatus || ""}
      // drivingLicense={personalDetails?.drivingLicense || false}
      // currentLocation={personalDetails?.currentLocation || ""}
      // languagesKnown={personalDetails?.languagesKnown || ""}
      // visaStatus={personalDetails?.visaStatus || ""}
      // religion={personalDetails?.religion || ""}
      // alternateEmail={personalDetails?.alternateEmail || ""}
      // alternateContactNumber={personalDetails?.alternateContactNumber || ""}
      // isJobSeekerComponent={isJobSeekerComponent}
    />,
  ]);
  console.log(personalDetails);
  // State to toggle sidebar visibility on small screen
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="space-y-8 bg-slate-100/30 p-12">
      <h4 className="scroll-m-20 py-2 text-4xl  tracking-tight first:mt-0">
        My Profile
      </h4>
      {/* top bar  */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-white p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        {steps.map((step, index) => (
          <Badge
            key={index}
            variant={index === currentStepIndex ? "default" : "outline"}
            className={cn(
              currentStepIndex === index &&
                "w-2 bg-sky-500/20 p-0 text-zinc-100 hover:bg-sky-500/20",
              "text-xshover:text-slate-500 flex-1 cursor-pointer justify-center border-none py-2 text-center text-zinc-700",
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
      <div className=" flex flex-col items-start gap-4 md:flex-row ">
        <ScrollArea
          className={cn(
            "h-[540px] w-[350px] space-y-4 rounded-md border p-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition-all md:w-1/3",
            showSidebar ? "block" : "hidden bg-white md:block",
          )}
        >
          <div className="flex items-center justify-between ">
            <h3>
              <span className="text-[2rem]">
                {jobSeekerProfile?.profilePercentage?.percentage | 0}
              </span>
              % completed
            </h3>

            <button
              className="flex justify-between rounded-md p-2 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:hidden"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              {showSidebar ? "Hide Details" : "Show Details"}
            </button>
          </div>

          <Progress
            value={jobSeekerProfile?.profilePercentage?.percentage | 0}
          />
          {steps.map((step, index) => (
            <div
              key={index}
              onClick={() => goTo(index)}
              className={cn(
                "cursor-pointer rounded-md border-none bg-white p-4",
                currentStepIndex === index
                  ? "shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
                  : "shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
              )}
            >
              <div className="flex items-start justify-between rounded-md border-none bg-white">
                <div className="basis-2/3">
                  <p className="text-[0.9rem] font-semibold">
                    {step.props.title}
                  </p>
                  {isJobSeekerComponent && (
                    <div>
                      <p className="text-[0.75rem]">{step.props.description}</p>
                      <p className="text-[0.75rem] text-sky-500">Add details</p>
                    </div>
                  )}
                </div>
                {step.props.profilePercentage && (
                  <Badge>Adds {step.props.profilePercentage} %</Badge>
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
        {/* Mobile Progress Bar */}
        <div className="mb-4 block w-full rounded-md bg-white p-4 shadow-md md:hidden">
          <div className="flex w-full items-center justify-between">
            <h3 className="text-xl">
              {jobSeekerProfile?.profilePercentage?.percentage | 0}%
              <span className="block text-sm text-gray-500">
                Profile Completed
              </span>
            </h3>
            {/* toggle button for sidebar on small screen */}
            <button
              className="m-2 flex justify-between rounded-md p-2 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:hidden"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              {showSidebar ? "Hide" : "Details"}
            </button>
          </div>

          <Progress
            value={jobSeekerProfile?.profilePercentage?.percentage | 0}
            className="h-2 rounded-md"
          />
        </div>
        {/* main content  */}
        <div className="w-full flex-1  rounded-md bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
          {step}
        </div>
      </div>
    </div>
  );
};

export default StepsWrapper;
