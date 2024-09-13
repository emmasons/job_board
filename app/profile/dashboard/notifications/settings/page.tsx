import { revalidatePath } from "next/cache";
import { getAllJobAlerts } from "@/actions/jobseeker/get-all-job-alerts";
import { getCurrentSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import DeleteAlertAction from "./DeleteAlertAction";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/lib/db";
import { getWorkScheduleLabel } from "@/lib/utils";

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
        <div className="rounded-md bg-slate-100 p-6">
          <h3 className="text-xl font-bold">Alerts</h3>
          {alerts?.map((alert) => (
            <div
              key={alert.id}
              className="mb-4 p-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
            >
              <h4 className="text-[1rem] font-semibold">
                Jobs with the following criteria
              </h4>
              <p className="text-sm">
                <span className="me-1 font-semibold">Occupation:</span>
                {alert.occupation ? alert.occupation : "N/A"}
              </p>
              <p className="text-sm">
                <span className="me-1 font-semibold">City:</span>
                {alert.city ? alert.city : "N/A"}
              </p>
              <p className="text-sm">
                <span className="me-1 font-semibold">Country:</span>
                {alert.country ? alert.country : "N/A"}
              </p>
              <p className="text-sm">
                <span className="me-1 font-semibold">Company:</span>
                {alert.companyId ? alert.company?.companyName : "N/A"}
              </p>
              <p className="text-sm">
                <span className="me-1 font-semibold">Education Level:</span>
                {alert.educationLevelIds
                  ? alert.educationLevelIds.join(", ")
                  : "N/A"}
              </p>
              <p className="text-sm">
                <span className="me-1 font-semibold">Sector:</span>
                {alert.sectorIds ? alert.sectorIds.map((s) => s).join(", ") : "N/A"}
              </p>
              <p className="text-sm">
                <span className="me-1 font-semibold">Job Type:</span>
                {alert.jobType ? alert.jobType : "N/A"}
              </p>
              <p className="text-sm">
                <span className="me-1 font-semibold">Work Schedule:</span>
                {alert.workSchedules
                  ? alert.workSchedules
                      .map((w) => getWorkScheduleLabel(w))
                      .join(", ")
                  : "N/A"}
              </p>
              <p className="text-sm">
                <span className="me-1 font-semibold">Contract Type:</span>
                {alert.contractType ? alert.contractType : "N/A"}
              </p>
              <p className="text-sm">
                <span className="me-1 font-semibold">Job ID:</span>
                {alert.jobId ? alert.jobId : "N/A"}
              </p>
              <DeleteAlertAction id={alert.id} deleteAlert={deleteAlert} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
