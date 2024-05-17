import { getAllCandidates } from "@/actions/get-all-candidates";
import { getEmployerCandidatesIds } from "@/actions/get-employer-candidates-ids";
import AddCandidateForm from "@/components/find-candidates/AddCandidateForm";
import { SearchInput } from "@/components/find-candidates/SearchInput";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import {
  Briefcase,
  CheckCircle,
  Flag,
  GraduationCap,
  UserSquareIcon,
} from "lucide-react";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.EMPLOYER)) {
    return redirect("/auth/signup/employer?callBack=/find-candidates");
  }
  const candidates = await getAllCandidates();
  const candidateIds = await getEmployerCandidatesIds(user.id);
  console.log(candidateIds);
  return (
    <MaxWidthWrapper className="py-4">
      <SearchInput />
      <section className="mt-6 items-start gap-4 md:flex">
        <div className="flex basis-2/3 flex-col gap-4">
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
              {candidateIds.some(
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
          {candidates && candidates.length === 0 && (
            <div>No candidates found</div>
          )}
        </div>
        <div className="basis-1/3">
          <p className="text-sm font-semibold text-muted-foreground">
            Search for the perfect candidate.
          </p>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit beatae
            quo harum nobis, repellendus esse exercitationem ipsam rem
            perferendis dolorum.
          </p>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default page;
