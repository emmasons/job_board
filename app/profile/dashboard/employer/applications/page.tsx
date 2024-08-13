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
  let tableApplications = [];

  if (applicants && applicants.length > 0) {
    tableApplications = applicants.map((applicant) => ({
      id: applicant.id,
      city: applicant.job.city,
      jobTitle: applicant.job.title,
      email: applicant.user.email,
      applicantName: `${applicant.user.profile.firstName} ${applicant.user.profile.lastName}`,
      status: applicant.status,
    }));
  }

  return (
    <div className="p-6">
      <DataTable columns={columns} data={tableApplications} />
    </div>
  );
};

export default page;
