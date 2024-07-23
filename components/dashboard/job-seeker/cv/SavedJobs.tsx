import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { BriefcaseIcon } from "lucide-react";
import { redirect } from "next/navigation";

// Demo data for jobs
const demoJobs = [
  {
    id: 1,
    title: "Secretary",
    status: "Open",
    salaryType: "Full-time",
    location: "Dubai",
    sector: "Management",
    applicationStatus: "Applied",
    time: "3 hours ago"
  },
  {
    id: 2,
    title: "Product Manager",
    status: "open",
    salaryType: "Full-time",
    location: "Qatar",
    sector: "Management",
    applicationStatus: "Shortlisted",
    time: "2 days ago"
  },
  {
    id: 3,
    title: "House Keeping Supervisor",
    status: "Open",
    salaryType: "Contract",
    location: "Oman",
    sector: "Service",
    applicationStatus: "Interview",
    time: "1 week ago"
  }
];

const SavedJobs = async () => {
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.JOB_SEEKER)) {
    return redirect("/");
  }
  
  // Simulating the async call to getUserJobs with demo data
  const jobs = demoJobs;

  return (
    <div className="p-6">
      <h1 className="my-9 flex items-center gap-4 text-2xl">
        Applied Jobs
        {/* <BriefcaseIcon className="h-6 w-6 text-primary" /> */}
      </h1>
      {jobs && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application Progress
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Applied
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posted On
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{job.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-green-500">({job.status})</div>
                    <div className="text-sm text-gray-500">{job.salaryType}. {job.location}</div>
                    <div className="text-sm text-gray-500">{job.sector}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.applicationStatus}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.time}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">View</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Add pagination if necessary */}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
