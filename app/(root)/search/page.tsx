import { getAllJobs } from "@/actions/get-all-jobs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import JobList from "@/components/job/JobList";
import RemoveSearchParam from "@/components/search/RemoveSearchParam";
import Search from "@/components/search/Search";
import { JobsWithCompany } from "@/types/db";

interface SearchPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const items = (await getAllJobs({ ...searchParams })) as JobsWithCompany[];
  return (
    <main>
      <MaxWidthWrapper className="mb-12 mt-2 flex flex-col items-center justify-center text-center sm:mt-4">
        <Search />
        {searchParams && Object.keys(searchParams).length > 0 && (
          <div className="bg-slate-50 w-full rounded-md mt-6 p-4">
            <h2 className="text-xl font-semibold text-primary text-left">
              Remove filter
            </h2>
            <RemoveSearchParam />
          </div>
        )}
        {items && items.length > 0 && <JobList items={items} />}
      </MaxWidthWrapper>
    </main>
  );
}
