import { getAllJobsApplications } from "@/actions/jobseeker/get-all-applications";
import { ApplicationProp, columns } from "./columns";
import { DataTable } from "./data-table";
import { getSession } from "next-auth/react"; // Or any other method to get the current user's session

async function getData(userId: string): Promise<ApplicationProp[]> {
  const applications = await getAllJobsApplications(userId);
  // Ensure the data matches the ApplicationProp type
  return applications.map((application) => ({
    id: application.id,
    userId: application.userId,
    jobId: application.jobId,
    status: application.status,
    createdAt: application.createdAt,
    updatedAt: application.updatedAt,
    user: application.user,
    job: application.job,
  }));
}

export default async function DemoPage() {
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
