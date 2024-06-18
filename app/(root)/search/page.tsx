import { getAllJobs } from "@/actions/get-all-jobs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import JobList from "@/components/job/JobList";
import PaginationControls from "@/components/search/PaginationControls";
import RemoveSearchParam from "@/components/search/RemoveSearchParam";
import Search from "@/components/search/Search";
import { JobsWithCompany } from "@/types/db";
import Link from "next/link";

interface SearchPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const itemsList = (await getAllJobs({
    ...searchParams,
  })) as JobsWithCompany[];
  const page = searchParams?.page ? searchParams?.page : "1";
  const pageSize = searchParams?.pageSize ? searchParams?.pageSize : "5";
  const start = (Number(page) - 1) * Number(pageSize); // 0, 5, 10 ...
  const end = start + Number(pageSize); // 5, 10, 15 ...
  const items = itemsList.slice(start, end);
  const totalPages = Math.ceil(itemsList.length / Number(pageSize));

  return (
    <main className="">
      <MaxWidthWrapper className="mb-12 mt-2 flex h-full flex-col items-center justify-center text-center sm:mt-4">
        <Search />
        {searchParams && Object.keys(searchParams).length > 0 && (
          <div className="mt-6 w-full rounded-md bg-slate-50 p-4">
            <h2 className="text-left text-xl font-semibold text-primary">
              Remove filter
            </h2>
            <RemoveSearchParam />
          </div>
        )}
        {items && (
          <JobList
            items={items}
            totalItems={itemsList.length}
            page={page}
            pageSize={pageSize}
            totalPages={totalPages}
          />
        )}
        <PaginationControls
          hasNextPage={end < itemsList.length}
          hasPrevPage={start > 0}
          totalPages={totalPages}
        />
      </MaxWidthWrapper>
    </main>
  );
}
