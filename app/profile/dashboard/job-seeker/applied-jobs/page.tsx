import { redirect } from "next/navigation";
import { getCurrentSessionUser } from "@/lib/auth";
import { columns } from "@/components/dashboard/job-seeker/applications/columns";
import { DataTable } from "@/components/dashboard/job-seeker/applications/data-table";
import { Role } from "@prisma/client";
// import { getAllJobsApplications } from "@/actions/job-seeker/get-all-applications";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import SavedJobs from "@/components/dashboard/job-seeker/cv/SavedJobs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import { getAllJobsApplications } from "@/actions/jobseeker/get-all-applications";

const page = async () => {

 
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.JOB_SEEKER)) {
    return redirect("/");
  }
  const applications = await getAllJobsApplications(user.id)

  return (
    <MaxWidthWrapper>
      <div className="py-5">
        <h2 className="text-xl font-light">Applied jobs</h2>
      </div>

   
      <DataTable columns={columns} data={applications} />
    </MaxWidthWrapper>
  );
};

export default page;
