import { getUserJobs } from "@/actions/get-user-jobs";
import ProfileViewsGraph from "@/components/dashboard/job-seeker/cv/ProfileViewsGraph";
import JobCard from "@/components/job/JobCard";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { getUserAlerts } from "@/actions/get-user-alerts";

import { Bookmark, Building2, User, Eye, PencilLine } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getJobSeekerProfile } from "@/actions/get-job-seeker-profile";
import { getAllJobsApplications } from "@/actions/jobseeker/get-all-applications";
import { getAllJobs } from "@/actions/get-all-jobs";

type Props = {};

const Dashboard = async (props: Props) => {
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.JOB_SEEKER)) {
    return redirect("/");
  }

  const alerts = await getUserAlerts(user?.id);

  const jobs = await getUserJobs(user.id);
  // const jobs = await getAllJobs(user.id));

  const percentage = await getJobSeekerProfile(user.id);
  const applications = await getAllJobsApplications(user.id);

  return (
    <div className="space-y-8 bg-slate-100 p-6">
      <h1 className="my-6 flex items-center gap-4 text-2xl">Dashboard</h1>

      {/* Summary Boxes */}
      <div className="grid grid-cols-2 gap-4 pb-6 md:grid-cols-4">
        <div className="flex justify-between rounded-3xl bg-white p-4 shadow">
          <div>
            <h2 className="text-3xl">
              {percentage?.profilePercentage?.percentage || 0} %
            </h2>
            <p className="text-gray-600">Profile Strength</p>
          </div>
          <User className="h-10 w-10 rounded-full bg-sky-300 p-2" />
        </div>
        <div className="flex justify-between rounded-3xl bg-white p-4 shadow">
          <div>
            <h2 className="text-3xl">{alerts.length}</h2>
            <p className="text-gray-600">Job Alerts</p>
          </div>
          <Bookmark className="h-10 w-10 rounded-full bg-sky-300 p-2" />
        </div>
        {/* <div className="flex justify-between rounded-3xl bg-white p-4 shadow">
          <div>
            <h2 className="text-3xl">0</h2>
            <p className="text-gray-600">Views</p>
          </div>
          <Eye className="h-10 w-10 rounded-full bg-sky-300 p-2" />
        </div> */}
        <div className="flex justify-between rounded-3xl bg-white p-4 shadow">
          <div>
            <h2 className="text-3xl">{applications.length}</h2>
            <p className="text-gray-600">Applied Jobs</p>
          </div>
          <PencilLine className="h-10 w-10 rounded-full bg-sky-300 p-2" />
        </div>
      </div>

      {/* Profile Views and Recent Applied Jobs */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="mb-8 rounded-lg bg-white shadow">
          <div className="border-b">
            <h2 className="p-3 text-justify text-lg">Recommended jobs</h2>
          </div>

          {jobs.slice(0, 5).map((job) => (
            <div key={job.id}>
              <div className="p-5">
                <h2 className="text-primary">{job.title}</h2>
                <p className="text-sm">{job.description}</p>
              </div>
            </div>
          ))}

          {/* <div className="p-5">
            <h2 className="text-primary">Workshop supervicor</h2>
            <p className="text-sm">
              •Amenable to identify car malfunctions and other mechanical works
              in the workshop. •Supervises the team regarding mechanical,
              electrical, painting...
            </p>
          </div>
          <div className="p-5">
            <h2 className="text-primary">Workshop supervicor</h2>
            <p className="text-sm">
              •Amenable to identify car malfunctions and other mechanical works
              in the workshop. •Supervises the team regarding mechanical,
              electrical, painting...
            </p>
          </div>
          */}
        </div>

        <div className="rounded-lg bg-white shadow">
          <div className="border-b">
            <h2 className="p-3 text-justify text-lg">Recently applied</h2>
          </div>
          <div className="space-y-4 p-4">
            {applications.slice(0, 5).map((application) => (
              <div
                key={application.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <Building2 />
                  <div>
                    <h3 className="">{application.job.title}</h3>
                    <p className="text-gray-600">
                      {application.job.city} . {application.job.country}
                    </p>
                  </div>
                </div>
                <div className="relative text-primary">
                  
                          <Link href={`/jobs/${application.job.id}`}>
                            View
                          </Link>
                        
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
