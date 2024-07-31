import { getUserJobs } from "@/actions/get-user-jobs";
import ProfileViewsGraph from "@/components/dashboard/job-seeker/cv/ProfileViewsGraph";
import JobCard from "@/components/job/JobCard";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { 
    Bookmark,
    Building2,
    User,
    Eye,
    PencilLine,
} from "lucide-react";
import { redirect } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { getJobSeekerProfile } from "@/actions/get-job-seeker-profile";

type Props = {
};

const Dashboard = async (props: Props) => {
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.JOB_SEEKER)) {
    return redirect("/");
  }
  const jobs = await getUserJobs(user.id);
  const percentage =  await getJobSeekerProfile(user.id)

 
  return (
    <div className="p-6 space-y-8 bg-slate-100">
      <h1 className="my-6 flex items-center gap-4 text-2xl">
        Dashboard
      </h1>

      {/* Summary Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6">
        <div className="flex justify-between bg-white shadow rounded-3xl p-4">
          <div>
            <h2 className="text-3xl">{percentage?.profilePercentage.percentage} %</h2>
            <p className="text-gray-600">Profile Strength</p>
          </div>
          <User className="bg-sky-300 rounded-full p-2 h-10 w-10"/>
        </div>
        <div className="flex justify-between bg-white shadow rounded-3xl p-4">
          <div>
            <h2 className="text-3xl">0</h2>
            <p className="text-gray-600">Job Alerts</p>
          </div>
          <Bookmark className="bg-sky-300 rounded-full p-2 h-10 w-10"/>
        </div>
        <div className="flex justify-between bg-white shadow rounded-3xl p-4">
          <div>
            <h2 className="text-3xl">0</h2>
            <p className="text-gray-600">Views</p>
          </div>
          <Eye className="bg-sky-300 rounded-full p-2 h-10 w-10"/>
        </div>
        <div className="flex justify-between bg-white shadow rounded-3xl p-4">
          <div>
            <h2 className="text-3xl">0</h2>
            <p className="text-gray-600">Applied Jobs</p>
          </div>
          <PencilLine className="bg-sky-300 rounded-full p-2 h-10 w-10"/>
        </div>
      </div>

      {/* Profile Views and Recent Applied Jobs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="border-b">
            <h2 className="text-lg text-justify p-3">Profile Views</h2>
          </div>
          <div className="p-5">
            <ProfileViewsGraph />
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="border-b">
            <h2 className="text-lg text-justify p-3">Recently applied</h2>
          </div>
          <div className="space-y-4 p-4">
            {jobs.map((job) => (
              <div key={job.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                <Building2/>
                <div>
                  <h3 className="">{job.title}</h3>
                  <p className="text-gray-600">{job.city} . {job.country}</p>
                </div>
                </div>
                <div className="relative">
                <Select>
                    <SelectTrigger className=" border-none focus:outline-none">
                        <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent className="focus:outline-none">
                        <SelectGroup>
                        <SelectItem value="view">View job</SelectItem>
                        <SelectItem value="archive">Archive</SelectItem>
                        <SelectItem value="delete">Delete</SelectItem>
                
                        </SelectGroup>
                    </SelectContent>
                </Select>
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
