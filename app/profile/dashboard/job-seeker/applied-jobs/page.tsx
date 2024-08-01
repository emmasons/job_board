import { redirect } from "next/navigation";
import { getCurrentSessionUser } from "@/lib/auth";

import { Role } from "@prisma/client";

import SavedJobs from "@/components/dashboard/job-seeker/cv/SavedJobs";

const page = async () => {
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.JOB_SEEKER)) {
    return redirect("/auth/signin?callbackUrl=/profile/dashboard/job-seeker");
  }


  return (
  <p>Applied jobs</p>
  );
};

export default page;