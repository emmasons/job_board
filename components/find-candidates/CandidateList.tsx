import { Candidate } from "@prisma/client";
import Image from "next/image";
import profilePicPlaceholder from "@/public/assets/profile-pic-placeholder.png";

import {
  Briefcase,
  CalendarDaysIcon,
  Flag,
  GraduationCap,
  Hammer,
  MapPin,
  UserSquareIcon,
} from "lucide-react";

import { format } from "date-fns";
import ActionsComponent from "./ActionsComponent";
import { candidate } from "@/actions/get-all-candidates";
import { cn } from "@/lib/utils";

type Props = {
  candidates: candidate[] | null;
  candidateIds: Candidate[] | null;
  loggedInEmployer: boolean;
  hasBackground?: boolean;
  cardBg?: string;
};

const CandidateList = ({
  candidates,
  candidateIds,
  loggedInEmployer,
  hasBackground = true,
  cardBg,
}: Props) => {
  return (
    <div
      className={cn("mb-4 flex flex-col gap-4", hasBackground && "bg-white")}
    >
      {candidates?.map((candidate) => (
        <div
          key={candidate?.id}
          className={cn(
            "w-fit space-y-4 rounded-md border p-2 hover:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]",
            cardBg,
          )}
        >
          <div className="flex flex-wrap justify-between  py-3">
            <div className="flex">
              <div className="flex flex-wrap justify-between gap-3">
                <div className="max-h-90 flex">
                  <Image
                    src={candidate?.image || profilePicPlaceholder}
                    alt="Profile picture"
                    width={90}
                    height={90}
                    className=" h-fit rounded-full p-1"
                  />
                </div>

                <div className="flex w-3/4 flex-col">
                  <div>
                    <p className="flex items-center gap-2 text-[0.9rem] font-semibold">
                      {/* <UserSquareIcon className="h-4 w-4 text-primary " /> */}
                      {`${candidate?.profile?.firstName} ${candidate?.profile?.lastName}` ||
                        candidate?.email}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 py-2">
                    <p className="flex items-center gap-2 text-[0.8rem] text-primary">
                      {/* <UserSquareIcon className="h-4 w-4 text-primary" /> */}
                      {candidate?.jobSeekerProfile?.cvHeadLine || "N/A"}
                    </p>
                    <p className="flex items-center gap-2 text-[0.8rem] text-zinc-700">
                      <MapPin className="h-4 w-4 text-primary" />
                      {candidate?.jobSeekerProfile?.country || "N/A"}
                    </p>
                    {/* <p className="flex items-center gap-2 text-[0.8rem] text-zinc-700">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      {candidate?.jobSeekerProfile?.education?.label || "N/A"}
                    </p> */}
                    {/* <p className="flex items-center gap-2 text-[0.8rem] text-zinc-700">
                      <Briefcase className="h-4 w-4 text-primary" />
                      {candidate?.jobSeekerProfile?.occupation || "N/A"}
                    </p> */}
                    <div className="flex items-center gap-1 py-2 text-[0.8rem] text-zinc-700">
                      <CalendarDaysIcon className="h-4 w-4 text-primary" />
                      Profile Updated at
                      {candidate?.jobSeekerProfile?.updatedAt
                        ? format(
                            new Date(candidate.jobSeekerProfile.updatedAt),
                            "MMM d, yyyy",
                          )
                        : "N/A"}
                    </div>
                  </div>
                  <div className="flex flex-wrap  items-center gap-2 text-[0.7rem] text-zinc-700">
                    {/* <Hammer className="h-4 w-4 text-primary" /> */}
                    {candidate?.jobSeekerProfile?.skills && (
                      <div className="flex flex-wrap text-nowrap">
                        {candidate?.jobSeekerProfile.skills
                          .slice(0, 3)
                          .map((skill) => (
                            <span
                              key={skill.id}
                              className="m-1 rounded-[0.7rem] bg-slate-50 p-1 px-2 text-zinc-500"
                            >
                              {skill.skill}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex "></div>
                  <ActionsComponent
                    candidateIds={candidateIds}
                    candidate={candidate}
                    loggedInEmployer={loggedInEmployer}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {candidates && candidates.length === 0 && (
        <div className="rounded-md bg-slate-100 p-8 text-center">
          No candidates found
        </div>
      )}
    </div>
  );
};

export default CandidateList;
