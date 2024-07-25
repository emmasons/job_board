import { Skeleton } from "@/components/ui/skeleton";

export const CandidateListSkeleton = () => (
  <div className="flex w-full gap-6">
    <div className="basis-1/3 space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index}>
          <div className="flex gap-2">
            <div className="space-y-2">
              <Skeleton className="h-[20px] w-[200px] bg-slate-300" />
              <Skeleton className="h-[20px] w-[100px] rounded-full bg-slate-300" />
              <Skeleton className="h-[20px] w-[100px] rounded-full bg-slate-300" />
              <Skeleton className="h-[20px] w-[100px] rounded-full bg-slate-300" />
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="basis-2/3 space-y-6">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="bg-panel-background w-full rounded-lg p-4 shadow-sm"
        >
          <Skeleton className="h-[20px] w-full bg-slate-300" />
          <div className="mt-2 space-y-2">
            <div className="flex gap-4">
              <Skeleton className="h-[20px] w-[20px] rounded-full bg-slate-300" />
              <Skeleton className="h-[20px] w-[400px] bg-slate-300" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-[20px] w-[20px] rounded-full bg-slate-300" />
              <Skeleton className="h-[20px] w-[400px] bg-slate-300" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-[20px] w-[20px] rounded-full bg-slate-300" />
              <Skeleton className="h-[20px] w-[300px] bg-slate-300" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
