import { redirect } from "next/navigation";
import { getCurrentSessionUser } from "@/lib/auth";

import { Role } from "@prisma/client";
import { getUserCv } from "@/actions/get-user-cv";
import UploadCV from "@/components/dashboard/job-seeker/cv/UploadCV";
import { Settings } from "lucide-react";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import { getAllSectors } from "@/actions/get-all-sectors";
import { getEducationLevels } from "@/actions/get-education-levels";
import { getExperience } from "@/actions/get-experience";
import { getJobSeekerProfile } from "@/actions/get-job-seeker-profile";
import JobSeekerProfileUpdate from "@/components/dashboard/job-seeker/cv/JobSeekerProfile";
import StepsWrapper from "@/components/dashboard/job-seeker/cv/StepsWrapper";

const page = async () => {
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.JOB_SEEKER)) {
    return redirect("/auth/signin?callbackUrl=/profile/dashboard/job-seeker");
  }
  const cv = await getUserCv(user.id);

  const cvFile = await getLatestFileMetaData(cv?.id);

  const educationLevels = await getEducationLevels();
  const experience = await getExperience();
  const sectors = await getAllSectors();

  const jobSeekerProfile = await getJobSeekerProfile(user.id);
  console.log(jobSeekerProfile?.profilePercentage);

  return (
    <>
      {/* <div className="p-6">
        <div className="md:w-1/2">
          <h1 className="text-pes-red my-4 flex items-center gap-4 text-2xl font-bold">
            CV Settings
            <Settings className="h-6 w-6 text-primary" />
          </h1>
          <div className="space-y-12">
            <UploadCV cv={cv} cvFile={cvFile} />
            <JobSeekerProfileUpdate
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
            />
          </div>
        </div>
      </div> */}
      {jobSeekerProfile && <StepsWrapper jobSeekerProfile={jobSeekerProfile} />}
    </>
  );
};

export default page;
