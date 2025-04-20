import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { JobListSkeleton } from "@/components/job/JobListSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const loading = (props: Props) => {
  return (
    <MaxWidthWrapper className="mb-12 mt-2 flex h-full flex-col items-center justify-center space-y-4 text-center sm:mt-4">
      <Skeleton className="h-[80px] w-full bg-slate-300" />
      <JobListSkeleton />
    </MaxWidthWrapper>
  );
};

export default loading;
