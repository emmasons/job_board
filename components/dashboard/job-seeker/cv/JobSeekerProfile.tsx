"use client";
import { JobSeekerProfile } from "@prisma/client";
import { FilePlus, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Profile from "./Profile";
import { ComboProps } from "@/types/db";
import { JobSeekerProfileProps } from "@/types/job-seeker-profile";

type Props = {
  profile: JobSeekerProfileProps | null;
  sectorList: ComboProps;
  educationLevelList: ComboProps;
  experienceList: ComboProps;
  title: String;
  profilePercentage: number;
  description: String | null;
  isJobSeekerComponent: Boolean;
};

const JobSeekerProfileUpdate = ({
  profile,
  title,
  isJobSeekerComponent = true,
  ...rest
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const { profilePercentage } = rest;
  const percentage = profile ? 0 : profilePercentage;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-6">
        <h3 className="font-semibold">{title}</h3>
        {isJobSeekerComponent && (
          <Button onClick={toggleEdit} variant="ghost" className="">
            {isEditing && <>Cancel</>}
            {!isEditing && !profile && (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Profile
              </>
            )}
            {!isEditing && profile && (
              <>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        )}
      </div>
      {!isEditing &&
        (!profile ? (
          <div className="h-auto rounded-md bg-slate-200">
            <Profile initialData={profile} {...rest} isEditing={false} profilePercentage={10} />
          </div>
        ) : (
          <div className="relative mt-2">
            <div className="p-6">
              {/* <p className="mb-3 text-sm text-slate-500">
                <span className="font-semibold">Occupation:</span>{" "}
                {profile.occupation}
              </p> */}
              <p className="mb-3 text-sm text-slate-500">
                <span className="font-semibold">Sector:</span>{" "}
                {profile.sector?.label}
              </p>
              <p className="mb-3 text-sm text-slate-500">
                <span className="font-semibold">Education Level:</span>{" "}
                {profile?.education?.label}
                <br />
              </p>
              <p className="mb-3 text-sm text-slate-500">
                <span className="font-semibold">Experience:</span>{" "}
                {profile.experience?.label}
              </p>
              <p className="mb-3 text-sm text-slate-500">
                <span className="font-semibold">Expected Salary:</span>{" "}
                {profile?.expectedSalary}
              </p>
              <p className="mb-3 text-sm text-slate-500">
                <span className="font-semibold">Current Salary:</span>{" "}
                {profile?.currentSalary}
              </p>
            </div>
          </div>
        ))}
      {isEditing && (
        <div>
          <Profile initialData={profile} {...rest} isEditing />
        </div>
      )}
    </div>
  );
};

export default JobSeekerProfileUpdate;
