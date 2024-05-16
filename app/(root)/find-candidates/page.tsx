import { getAllCandidates } from "@/actions/get-all-candidates";
import { SearchInput } from "@/components/find-candidates/SearchInput";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Briefcase, Flag, GraduationCap, UserSquareIcon } from "lucide-react";

type Props = {};

const page = async (props: Props) => {
  const candidates = await getAllCandidates();
  console.log(candidates[0]?.jobSeekerProfile, "**");
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
