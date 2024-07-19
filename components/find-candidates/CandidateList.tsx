import {
  Candidate,
  EducationLevel,
  Experience,
  JobSeekerProfile,
  Profile,
  Sector,
  User,
} from "@prisma/client";
import {
  Briefcase,
  CheckCircle,
  Flag,
  GraduationCap,
  UserSquareIcon,
} from "lucide-react";
import AddCandidateForm from "@/components/find-candidates/AddCandidateForm";

type candidate =
  | (User & {
      profile: Profile;
      jobSeekerProfile: JobSeekerProfile & {
        sector: Sector;
        education: EducationLevel;
        experience: Experience;
      };
    })
  | null;

type Props = {
  candidates: candidate[] | null;
  candidateIds: Candidate[] | null;
};

const CandidateList = ({ candidates, candidateIds }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {candidates?.map((candidate) => (
        <div
          key={candidate?.id}
          className="rounded-md  p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
        >
          <p className="flex items-center gap-2 text-[0.9rem] font-semibold">
            <UserSquareIcon className="h-4 w-4 text-primary" />
            {`${candidate?.profile?.firstName} ${candidate?.profile?.lastName}` ||
              candidate?.email}
          </p>
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
          {candidateIds?.some(
            ({ candidateId }) => candidateId === candidate?.id,
          ) ? (
            <p className="flex items-center gap-2 text-[0.8rem] text-zinc-700">
              <CheckCircle className="h-4 w-4 text-primary" />
              Added to your list
            </p>
          ) : (
            <>
              <AddCandidateForm candidateId={candidate?.id} />
            </>
          )}
        </div>
      ))}
      {candidates && candidates.length === 0 && <div>No candidates found</div>}
    </div>
  );
};

export default CandidateList;
