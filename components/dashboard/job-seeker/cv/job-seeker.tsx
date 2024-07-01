// pages/profile/dashboard/job-seeker.tsx

import { redirect } from "next/navigation";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { getUserCv } from "@/actions/get-user-cv";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import { getAllSectors } from "@/actions/get-all-sectors";
import { getEducationLevels } from "@/actions/get-education-levels";
import { getExperience } from "@/actions/get-experience";
import { getJobSeekerProfile } from "@/actions/get-job-seeker-profile";
import ProfileCard from "./ProfileCard";
import { User, CV, Sector, EducationLevel, Experience, JobSeekerProfile } from "@/types";

const JobSeekerDashboard = async () => {
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.JOB_SEEKER)) {
    return redirect("/auth/signin?callbackUrl=/profile/dashboard/job-seeker");
  }

  const cv: CV = await getUserCv(user.id);
  const cvFile = await getLatestFileMetaData(cv?.id);
  const educationLevels: EducationLevel[] = await getEducationLevels();
  const experience: Experience[] = await getExperience();
  const sectors: Sector[] = await getAllSectors();
  const jobSeekerProfile: JobSeekerProfile = await getJobSeekerProfile(user.id);

  return (
    <div className="p-6">
      <ProfileCard
        user={user}
        cv={cv}
        cvFile={cvFile}
        sectors={sectors}
        educationLevels={educationLevels}
        experience={experience}
        jobSeekerProfile={jobSeekerProfile}
      />
    </div>
  );
};

export default JobSeekerDashboard;
