import { getUserJobs } from "@/actions/get-user-jobs";
import { columns } from "@/components/dashboard/staff/jobs/Columns";
import { DataTable } from "@/components/dashboard/staff/jobs/DataTable";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.STAFF)) {
    return redirect("/");
  }
  const jobs = await getUserJobs(user.id);
  return (
    <div className="p-6">
      <DataTable columns={columns} data={jobs} />
    </div>
  );
};

export default page;
