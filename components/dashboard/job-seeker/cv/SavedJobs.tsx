import { getUserApplicationById } from "@/actions/applications/get-user-application-by-id";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

// Define the type for the job application
interface JobApplication {
  id: string;
  userId: string;
  jobId: string;
  status: string; // Adjust type based on your $Enums.ApplicationStatus
  createdAt: Date;
  updatedAt: Date;
}

// Component to display saved jobs
const SavedJobs = async () => {
  // Fetch the current user
  const user = await getCurrentSessionUser();

  // Redirect if the user is not a job seeker
  if (!user || user.role !== Role.JOB_SEEKER) {
    return redirect("/");
  }

  // Fetch user applications
  const jobs: JobApplication[] = []; // Initialize as empty array
  try {
    // Here, you should fetch all job applications. Replace `''` with actual job ID or fetch logic
    const job = await getUserApplicationById(user.id, "");
    if (job) {
      jobs.push(job); // Assuming you want to handle one job. If multiple jobs, adjust accordingly.
    }
  } catch (error) {
    console.error("Failed to fetch job applications", error);
    // Handle the error as needed
  }

  // Return the rendered JSX
  return (
    <div className="p-6">
      <h1 className="my-9 flex items-center gap-4 text-2xl">Applied Jobs</h1>
      {jobs.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Application Progress
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Date Applied
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Posted On
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    {/* Replace with actual job title */}
                    Job Title Placeholder
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{job.status}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {/* Application Progress Placeholder */}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {new Date(job.updatedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Add pagination if necessary */}
        </div>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
};

export default SavedJobs;
