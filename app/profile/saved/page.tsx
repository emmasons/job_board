import { getUserJobs } from "@/actions/get-user-jobs";
import JobCard from "@/components/job/JobCard";
import JobList from "@/components/job/JobList";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { BriefcaseIcon } from "lucide-react";
import { redirect } from "next/navigation";

type Props = {};

const page = async (props: Props) => {
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.JOB_SEEKER)) {
    return redirect("/");
  }
  const jobs = await getUserJobs(user.id);
  return (
    <div className="p-6">
      <h1 className="my-4 flex items-center gap-4 text-2xl font-bold">
        My Jobs
        <BriefcaseIcon className="h-6 w-6 text-primary" />
      </h1>
      {jobs && (
        <div>
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} sector={job.sector.label} />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
