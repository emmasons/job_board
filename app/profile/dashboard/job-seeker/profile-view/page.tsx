import { redirect } from "next/navigation";
import { getCurrentSessionUser } from "@/lib/auth";

import { Role } from "@prisma/client";
import { getJobSeekerProfile } from "@/actions/get-job-seeker-profile";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import { Mail, MapPin, Phone } from "lucide-react";
import AvatarForm from "@/components/dashboard/profile/AvatarForm";
import { db } from "@/lib/db";

const page = async () => {
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.JOB_SEEKER)) {
    return redirect("/");
  }
  const currentUser = await db.user.findUnique({
    where: { id: user.id },
    include: { profile: true },
  });
  const imageMetaData = await getLatestFileMetaData(user.id);
  const jobSeekerProfile = await getJobSeekerProfile(user.id);
  const calculateAge = (dateString: string) => {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  return (
    <div className="w-full md:py-10 bg-slate-100">
      <div className="mx-auto max-w-4xl rounded-md bg-white p-6  shadow-md">
        <div className="mb-6 flex items-center">
          <div className="mr-4">
            <img src="{imageMetaData}" alt="" />
            {user.registeredUser && (
              <div className="h-60 w-60 overflow-hidden ">
                <AvatarForm
                  userId={user.id}
                  isDeleting={false}
                  gcpData={imageMetaData}
                />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              {currentUser?.profile?.firstName} {currentUser?.profile?.lastName}
            </h1>
            <p className="text-gray-600">{jobSeekerProfile?.cvHeadLine}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="py-2">
              <h2 className="mb-2 text-xl font-semibold">About Me</h2>
              <p className="text-sm">{jobSeekerProfile?.profileSummary}</p>
              <div className="mt-4">
                <p className="flex items-center gap-2 py-1">
                  <Phone className="h-4 w-4" />
                  {currentUser?.profile?.phoneNumber}
                </p>
                <p className="flex items-center gap-2 py-1">
                  <Mail className="h-4 w-4" />
                  {user?.email}
                </p>
                <p className="flex items-center gap-2 py-1">
                  <MapPin className="h-4 w-4" />
                  {jobSeekerProfile?.personalDetails.currentLocation}
                </p>
              </div>
              <div className="py-4">
                <h2 className="mb-2 text-xl font-semibold">Languages</h2>

                <p>*Get Languages known here</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className=" text-xl font-semibold">Experience</h2>
            {jobSeekerProfile?.employmentDetails.slice(0, 2).map((job) => (
              <div
                key={job.id}
                className="flex flex-wrap items-center gap-2 py-4"
              >
                {/* <div className="rounded-full bg-blue-50 p-4 ">
                  <Briefcase className="h-6 " />
                </div> */}

                <div className="">
                  <p className="font-medium">{job.designation}</p>
                  <span className="flex gap-2">
                    <p className="text-sm text-zinc-700">{job.company},</p>

                    <p className="text-sm text-zinc-700">{job.location}</p>
                  </span>
                  <p className="text-sm text-gray-600">
                    {job.startMonth} {job.startYear} -{" "}
                    {job.currentlyWorking
                      ? "Present"
                      : `${job.endMonth} ${job.endYear}`}{" "}
                    {/* (
                      {calculateTotalMonths(
                        `${initialData.startMonth} 1, ${initialData.startYear}`,
                        initialData.currentlyWorking
                          ? null
                          : `${initialData.endMonth} 1, ${initialData.endYear}`,
                        initialData.currentlyWorking,
                      )}
                      ) */}
                  </p>
                  <p className="pt-2 text-sm text-zinc-700">
                    {job.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h2 className="mb-2 text-xl font-semibold">Education</h2>
            <p>{jobSeekerProfile?.educationLevelId}</p>
          </div>
          <div>
            <h2 className="mb-2 text-xl font-semibold">Desired Job</h2>

            <p>Designation: {jobSeekerProfile?.desiredJob.designation}</p>
            <p>Industry: {jobSeekerProfile?.desiredJob.industry}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-2 text-xl font-semibold">Personal Details</h2>
            <p>Gender: {jobSeekerProfile?.personalDetails.gender}</p>
            <p>
              Age:{" "}
              {calculateAge(
                jobSeekerProfile?.personalDetails.dateOfBirth.toString() || "",
              )}{" "}
              years
            </p>
            <p>
              Marital Status: {jobSeekerProfile?.personalDetails.maritalStatus}
            </p>
            <p>Religion: {jobSeekerProfile?.personalDetails.religion}</p>
          </div>
          <div>
            <h2 className="mb-2 text-xl font-semibold">Skills</h2>
            <p>
              {jobSeekerProfile?.skills.map((skill) => skill.skill).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
