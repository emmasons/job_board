import { redirect } from "next/navigation";
import { getCurrentSessionUser } from "@/lib/auth";
import Image from "next/image";
import profilePicPlaceholder from "@/public/assets/profile-pic-placeholder.png";

import { Role } from "@prisma/client";
import { getJobSeekerProfile } from "@/actions/get-job-seeker-profile";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import {
  BadgeDollarSign,
  Church,
  Download,
  Gem,
  GraduationCap,
  Hourglass,
  Mail,
  MapPin,
  MessagesSquare,
  Phone,
  Receipt,
  School,
  UserCog,
} from "lucide-react";
import AvatarForm from "@/components/dashboard/profile/AvatarForm";
import { db } from "@/lib/db";
import { getUserCv } from "@/actions/get-user-cv";

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
  const cv = await getUserCv(user.id);

  const cvFile = await getLatestFileMetaData(cv?.id);
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
    <div className="">
      <div className="mx-auto rounded-md bg-white">
        <div className="bg-slate-50 p-4">
          <div className="m-auto flex max-w-screen-lg flex-wrap items-center justify-between">
            <div className="flex flex-wrap items-center">
              <div className="mr-4 md:py-10 ">
                {/* <img src="{imageMetaData}" alt="" /> */}
                {user.registeredUser && (
                  <div className="h-70 w-70 overflow-hidden ">
                    <Image
                      src={user?.image || profilePicPlaceholder}
                      alt="Profile picture"
                      width={70}
                      height={70}
                      className=" rounded-full p-1"
                    />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-xl font-semibold">
                  {currentUser?.profile?.firstName}{" "}
                  {currentUser?.profile?.lastName}
                </h1>
                <div className="flex gap-3 text-xs text-gray-600">
                  <p className="">{jobSeekerProfile?.cvHeadLine}</p>

                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {jobSeekerProfile?.personalDetails?.currentLocation}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p>
                <a
                  href={cvFile?.downloadUrl}
                  download
                  target="_blank"
                  className="flex items-center gap-2 bg-primary p-3 rounded-md cursor-pointer"
                >
                  <Download className="h-4 w-7 text-white" />
                  <p className="text-xs text-white">Download CV</p>
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-12 p-4 py-6">
          <div className="flex flex-col md:w-2/4 ">
            <div>
              <div className="py-2">
                {/* <h2 className="mb-2 text-xl font-semibold">About Me</h2> */}
                <p className="text-sm text-zinc-700">
                  {jobSeekerProfile?.profileSummary}
                </p>
              </div>
            </div>

            <div className="py-4">
              <h2 className="font-semibold">Education</h2>
              <div className="flex items-center gap-6 py-4">
                <div className="h-6 w-6 rounded-full bg-amber-100 text-center">
                  <h2 className="text-sm text-red-500">E</h2>
                </div>
                {/* <School /> */}
                {jobSeekerProfile?.educationDetails
                  .slice(0, 2)
                  .map((education) => (
                    <div
                      key={education.id}
                      className="flex flex-wrap items-center gap-2"
                    >
                      <div className="text-sm">
                        <p className="font-medium capitalize">
                          {education.level} of {education.course}
                        </p>
                        <span className="flex gap-2">
                          <p className="text-sm font-medium text-red-500">
                            {education.college}
                          </p>
                          {/* <p className="font-medium">
                            {education.collegeLocation}
                          </p> */}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h2 className=" font-semibold">Work & Experience</h2>
              <div className="gap-6 py-4">
                {jobSeekerProfile?.employmentDetails.slice(0, 2).map((job) => (
                  <div key={job.id} className="flex gap-6 py-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-center">
                      <h2 className="p-4 text-center text-sm text-primary">
                        W
                      </h2>
                    </div>
                    <div>
                      <span className="flex gap-4">
                        <p className="font-medium">{job?.designation}</p>
                        <p className="rounded-md bg-sky-100 p-1 text-xs text-primary">
                          {job?.startMonth} {job?.startYear} -{" "}
                          {job.currentlyWorking
                            ? "Present"
                            : `${job?.endMonth} ${job?.endYear}`}{" "}
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
                      </span>

                      <span className="flex gap-2">
                        <p className="text-sm text-primary">{job?.company},</p>

                        <p className="text-xs text-zinc-700">{job?.location}</p>
                      </span>

                      <p className="pt-4 text-xs text-zinc-700">
                        {job?.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-2 font-semibold">Desired Job</h2>

              <p>Designation: {jobSeekerProfile?.desiredJob?.designation}</p>
              <p>Industry: {jobSeekerProfile?.desiredJob?.industry}</p>
            </div>
            <div className=""></div>
          </div>
          <div className="flex w-80 flex-col gap-6">
            <div className="bg-slate-50 p-4">
              <div className="flex items-center gap-4 py-3">
                <Hourglass className=" font-thin text-primary" />
                <div className="text-xs">
                  <h2 className="font-semibold">Age</h2>
                  <p>
                    {calculateAge(
                      jobSeekerProfile?.personalDetails?.dateOfBirth.toString() ||
                        "",
                    )}{" "}
                    years
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 py-3">
                <Receipt className=" font-thin text-primary" />
                <div className="text-xs">
                  <h2 className="font-semibold">Current Salary</h2>

                  <p>get expected salary</p>
                </div>
              </div>
              <div className="flex items-center gap-4 py-3">
                <BadgeDollarSign className=" font-thin text-primary" />
                <div className="text-xs">
                  <h2 className="font-semibold">Expected Salary</h2>

                  <p>Get expected salary</p>
                </div>
              </div>
              <div className="flex items-center gap-4 py-3">
                <UserCog className="font-thin text-primary" />
                <div className="text-xs">
                  <h2 className="text-md font-semibold">Gender</h2>
                  <p>{jobSeekerProfile?.personalDetails?.gender}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 py-3">
                <Gem className="text-xs font-thin text-primary" />
                <div className="text-xs">
                  <h2 className="font-semibold">Marital status</h2>

                  <p>{jobSeekerProfile?.personalDetails?.maritalStatus}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 py-3">
                <Church className=" text-xs font-thin text-primary" />
                <div className="text-xs">
                  <h2 className="font-semibold">Religion</h2>
                  <p>{jobSeekerProfile?.personalDetails?.religion}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 py-3">
                <MessagesSquare className=" text-xs font-thin text-primary" />
                <div className="text-xs">
                  <h2 className="font-semibold">Languages</h2>
                  <p>{jobSeekerProfile?.personalDetails?.languagesKnown}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 py-3">
                <GraduationCap className="text-xs font-thin text-primary" />
                <div className="text-xs">
                  <h2 className="font-semibold">Education level</h2>
                  <p>get education level</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-4">
              <h2 className="py-4 font-semibold">Contact Details</h2>
              <p className="flex items-center gap-2 py-1 text-sm">
                <Phone className="h-4 w-4" />
                {currentUser?.profile?.phoneNumber}
              </p>
              <p className="flex items-center gap-2 py-1 text-sm">
                <Mail className="h-4 w-4" />
                {user?.email}
              </p>
            </div>
            <div className="bg-slate-50 p-4">
              <h2 className="py-4 font-semibold">Professional Skills</h2>
              <p className="w-auto rounded-md bg-white p-2 text-xs">
                {jobSeekerProfile?.skills
                  .map((skill) => skill.skill)
                  .join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
