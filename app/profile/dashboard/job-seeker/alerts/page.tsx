import { revalidatePath } from "next/cache";
import { getAllJobAlerts } from "@/actions/jobseeker/get-all-job-alerts";
import { getCurrentSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import DeleteAlertAction from "./DeleteAlertAction";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/lib/db";
import { getWorkScheduleLabel } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { getSectorById } from "@/actions/get-sector-by-id";

type Props = {};

const page = async (props: Props) => {
  const user = await getCurrentSessionUser();
  if (!user) {
    return redirect("/auth/signin?callbackUrl=/profile/dashboard");
  }
  const alerts = await getAllJobAlerts(user.id);
  const deleteAlert = async (alertId: string) => {
    "use server";
    try {
      await db.jobAlert.delete({
        where: {
          id: alertId,
        },
      });
      await revalidatePath("/profile/dashboard/notifications/settings");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <div>
        <h2 className="text-xl font-bold">Manage your job alerts</h2>
        <div className="space-y-4 rounded-md bg-slate-100 p-6">
          <h3 className="flex items-center gap-2 text-xl font-bold text-primary">
            Alerts
            <AlertCircle className="inline-block size-4" />
          </h3>
          <h4 className="bg-slate-50 p-4 text-[1rem] font-semibold text-primary/70 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ">
            You have set alerts for jobs with the following criteria
          </h4>
          {alerts?.map((alert) => (
            <div
              key={alert.id}
              className="mb-4 bg-slate-50 p-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
            >
              {alert.occupation && (
                <p className="text-sm">
                  <span className="me-1 font-semibold">Occupation:</span>
                  {alert.occupation}
                </p>
              )}
              {alert.city && (
                <p className="text-sm">
                  <span className="me-1 font-semibold">City:</span>
                  {alert.city}
                </p>
              )}
              {alert.country && (
                <p className="text-sm">
                  <span className="me-1 font-semibold">Country:</span>
                  {alert.country}
                </p>
              )}
              {alert.companyId && (
                <p className="text-sm">
                  <span className="me-1 font-semibold">Company:</span>
                  {alert.company?.companyName}
                </p>
              )}
              {alert.educationLevelIds.length > 0 && (
                <p className="text-sm">
                  <span className="me-1 font-semibold">Education Level:</span>
                  {alert.educationLevelIds.join(", ")}
                </p>
              )}

              {alert.sectorIds.length > 0 && (
                <p className="text-sm">
                  <span className="me-1 font-semibold">Sector:</span>
                  {alert.sectorIds.map((s) => s).join(", ")}
                </p>
              )}

              {alert.jobType && (
                <p className="text-sm">
                  <span className="me-1 font-semibold">Job Type:</span>
                  {alert.jobType}
                </p>
              )}
              {alert.workSchedules && (
                <p className="text-sm">
                  <span className="me-1 font-semibold">Work Schedule:</span>
                  {alert.workSchedules
                    .map((w) => getWorkScheduleLabel(w))
                    .join(", ")}
                </p>
              )}
              {alert.contractTypes && alert.contractTypes.length > 0 && (
                <p className="text-sm">
                  <span className="me-1 font-semibold">Contract Type:</span>
                  {alert.contractTypes.map((c) => c).join(", ")}
                </p>
              )}
              {alert.jobId && (
                <p className="text-sm">
                  <span className="me-1 font-semibold">Job Title:</span>
                  {alert?.job?.title}
                </p>
              )}
              <DeleteAlertAction id={alert.id} deleteAlert={deleteAlert} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
