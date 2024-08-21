import { Candidate } from "@prisma/client";
import {
  Briefcase,
  CalendarDaysIcon,
  Flag,
  GraduationCap,
  Hammer,
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
      className={cn(
        "mb-4 flex flex-col gap-4 hover:shadow-md",
        hasBackground && "bg-white",
      )}
    >
      {candidates?.map((candidate) => (
        <div
          key={candidate?.id}
          className={cn(
            "space-y-4 rounded-md bg-slate-50 p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]",
            cardBg,
          )}
        >
          <div className="flex justify-between border-b border-b-slate-400 py-4">
            <p className="flex items-center gap-2 text-[0.9rem] font-semibold">
              <UserSquareIcon className="h-4 w-4 text-primary " />
              {`${candidate?.profile?.firstName} ${candidate?.profile?.lastName}` ||
                candidate?.email}
            </p>

            <ActionsComponent
              candidateIds={candidateIds}
              candidate={candidate}
              loggedInEmployer={loggedInEmployer}
            />
          </div>
          <div className="">
            <div className="">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 text-[0.9rem] font-semibold">
                  <UserSquareIcon className="h-4 w-4 text-primary" />
                  {candidate?.jobSeekerProfile?.cvHeadLine}
                </p>
                <div className="flex items-center gap-2 text-[0.8rem] text-zinc-700">
                  Profile Updated at
                  <CalendarDaysIcon className="h-4 w-4 text-primary" />
                  {candidate?.jobSeekerProfile?.updatedAt
                    ? format(
                        new Date(candidate.jobSeekerProfile.updatedAt),
                        "MMM d, yyyy",
                      )
                    : "N/A"}
                </div>
              </div>
              <p className="flex items-center gap-2 text-[0.8rem] text-zinc-700">
                <Flag className="h-4 w-4 text-primary" />
                {candidate?.jobSeekerProfile?.country || "N/A"}
              </p>
              <p className="flex items-center gap-2 text-[0.8rem] text-zinc-700">
                <GraduationCap className="h-4 w-4 text-primary" />
                {candidate?.jobSeekerProfile?.education?.label || "N/A"}
              </p>
              <p className="flex items-center gap-2 text-[0.8rem] text-zinc-700">
                <Briefcase className="h-4 w-4 text-primary" />
                {candidate?.jobSeekerProfile?.occupation || "N/A"}
              </p>
              <div className="flex items-center gap-2 text-[0.8rem] text-zinc-700">
                <Hammer className="h-4 w-4 text-primary" />
                {candidate?.jobSeekerProfile?.skills && (
                  <div className="space-x-2">
                    {candidate?.jobSeekerProfile.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="py-1text-primary rounded-[0.7rem] bg-primary/10 px-2"
                      >
                        {skill.skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div></div>
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
