import { redirect } from "next/navigation";
import { getCurrentSessionUser } from "@/lib/auth";

import { Role } from "@prisma/client";
import { getUserCv } from "@/actions/get-user-cv";
import { Settings } from "lucide-react";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import { getAllSectors } from "@/actions/get-all-sectors";
import { getEducationLevels } from "@/actions/get-education-levels";
import { getExperience } from "@/actions/get-experience";
import { getJobSeekerProfile } from "@/actions/get-job-seeker-profile";
import JobSeekerProfileUpdate from "@/components/dashboard/job-seeker/cv/JobSeekerProfile";
import ProfileHeader from "@/components/dashboard/job-seeker/cv/ProfileHeader";
import ProfileProgress from "@/components/dashboard/job-seeker/cv/ProfileProgress";
import ProfileSections from "@/components/dashboard/job-seeker/cv/ProfileSections";

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

  return (
    <div className="flex justify-center p-6">
      <div className="lg:w-3/4">
        <ProfileHeader user={user} />
        <ProfileSections
          cv={cv}
          cvFile={cvFile}
          sectors={sectors}
          educationLevels={educationLevels}
          experience={experience}
          jobSeekerProfile={jobSeekerProfile}
          />
          
        {/* <div className="space-y-12">
         
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
        </div> */}
      </div>
    </div>
  );
};

export default page;
