import { redirect } from "next/navigation";
import { getCurrentSessionUser } from "@/lib/auth";
import { columns } from "@/components/dashboard/job-seeker/alerts/columns";
import { DataTable } from "@/components/dashboard/job-seeker/alerts/data-table";
import { Role } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import { getAllJobAlerts } from "@/actions/jobseeker/get-all-job-alerts";

const page = async () => {
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.JOB_SEEKER)) {
    return redirect("/");
  }
  const alerts = await getAllJobAlerts(user.id);

  return (
    <MaxWidthWrapper>
      <div className="flex items-center gap-4 py-16 text-3xl">
        <Switch id="airplane-mode" />
        <Label className="text-lg" htmlFor="airplane-mode">
          Notifications
        </Label>
      </div>

      <DataTable columns={columns} data={alerts} />
    </MaxWidthWrapper>
  );
};

export default page;
