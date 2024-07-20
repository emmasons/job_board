import { getAllEmployerJobsAndApplications } from "@/actions/employer/get-all-employer-jobs-and-applications";
import { columns } from "@/components/dashboard/employer/applications/Columns";
import { DataTable } from "@/components/dashboard/employer/applications/DataTable";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

type Props = {};

const page = async (props: Props) => {
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.EMPLOYER)) {
    return redirect("/");
  }
  const applicants = await getAllEmployerJobsAndApplications(user.id);

  return (
    <div className="p-6">
      <DataTable columns={columns} data={applicants} />
    </div>
  );
};

export default page;
