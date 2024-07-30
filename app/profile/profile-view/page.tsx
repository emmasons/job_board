import { redirect } from "next/navigation";
import { getCurrentSessionUser } from "@/lib/auth";

import { Role } from "@prisma/client";

import ProfileView from "@/components/dashboard/job-seeker/cv/profile/ProfileView";
import { getJobSeekerProfile } from "@/actions/get-job-seeker-profile";

const page = async () => {
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.JOB_SEEKER)) {
    return redirect("/");
  }
  
  const jobSeekerProfile = await getJobSeekerProfile(user.id)
  return (
    <>
      <ProfileView
        initialData={jobSeekerProfile}
        user={user}

      />
    </>
  );
};

export default page;
