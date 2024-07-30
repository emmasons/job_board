"use client";

import React from "react";
import { JobSeekerProfileProps } from "@/types/job-seeker-profile";
import { Briefcase, Mail, MapPin, Phone } from "lucide-react";

type Props = {
  profileId: string;
  initialData: JobSeekerProfileProps;
};

const ProfileView = ({ profileId, initialData }: Props) => {
 
    const calculateAge = (dateString: string) => {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  return (
    <div className="w-full bg-slate-100 md:py-10">
      <div className="m-9 mx-auto max-w-4xl rounded-md bg-white p-6  shadow-md">
        <div className="mb-6 flex items-center">
          <div className="mr-4 h-24 w-24 overflow-hidden rounded-full">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile Picture"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Richard Sanchez</h1>
            <p className="text-gray-600">Product Designer</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="py-2">
              <h2 className="mb-2 text-xl font-semibold">About Me</h2>
              <p className="text-sm">{initialData.profileSummary}</p>
              <div className="mt-4">
                <p className="flex items-center gap-2 py-1">
                  <Phone className="h-4 w-4" />
                  +123-456-7890
                </p>
                <p className="flex items-center gap-2 py-1">
                  <Mail className="h-4 w-4" />
                  hello@reallygreatsite.com
                </p>
                <p className="flex items-center gap-2 py-1">
                  <MapPin className="h-4 w-4" />
                  {initialData.personalDetails.currentLocation}
                </p>
              </div>
              <div className="py-4">
                <h2 className="mb-2 text-xl font-semibold">Languages</h2>
                <ul>
                  <li>English</li>
                  <li>Swahili</li>
                  <li>Arabic</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className=" text-xl font-semibold">Experience</h2>
            {initialData.employmentDetails.map((job) => (
              <div
                key={job.id}
                className="flex flex-wrap items-center gap-2 py-4"
              >
                {/* <div className="rounded-full bg-blue-50 p-4 ">
                  <Briefcase className="h-6 " />
                </div> */}

                <div className="max-w-64">
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
            <p>Borcelle University</p>
            <p>Bachelor of Business Management</p>
            <p>2014-2023</p>
            <p>Master of Business Management</p>
            <p>2014-2018</p>
          </div>
          <div>
            <h2 className="mb-2 text-xl font-semibold">Desired Job</h2>

            <p>Designation: {initialData.desiredJob.designation}</p>
            <p>Industry: {initialData.desiredJob.industry}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-2 text-xl font-semibold">Personal Details</h2>
            <p>Gender: {initialData.personalDetails.gender}</p>
            <p>
              Age:{" "}
              {calculateAge(
                initialData.personalDetails.dateOfBirth.toLocaleDateString(),
              )}
            </p>
            <p>Marital Status: {initialData.personalDetails.maritalStatus}</p>
            <p>Religion: {initialData.personalDetails.religion}</p>
          </div>
          <div>
            <h2 className="mb-2 text-xl font-semibold">Skills</h2>
            <p>{initialData.skills.map((skill) => skill.skill).join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
