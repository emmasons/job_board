import { getAllJobAlerts } from "@/actions/jobseeker/get-all-job-alerts";
import { JobAlertProp, columns } from "./columns";

import { getSession } from "next-auth/react"; // Or any other method to get the current user's session
import { DataTable } from "./data-table";

async function getData(userId: string): Promise<JobAlertProp[]> {
  const jobAlerts = await getAllJobAlerts(userId);
  // Ensure the data matches the JobAlertProp type
  return jobAlerts.map((jobAlert) => ({
    id: jobAlert.id,
    userId: jobAlert.userId,
    jobId: jobAlert.jobId,
    createdAt: jobAlert.createdAt,
    updatedAt: jobAlert.updatedAt,
    job: jobAlert.job,
  }));
}

export default async function JobAlertsPage() {
  const session = await getSession(); // Get session data to fetch user ID
  const userId = session?.user?.id; // Adjust based on how you store the user ID in session
  if (!userId) {
    // Handle case where user ID is not available
    return <div>User not logged in</div>;
  }

  const data = await getData(userId);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
