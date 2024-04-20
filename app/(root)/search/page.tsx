import { getAllJobs } from "@/actions/get-all-jobs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import JobList from "@/components/job/JobList";
import Search from "@/components/search/Search";
import { JobsWithCompany } from "@/types/db";

export const dynamic = "force-dynamic";
interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

// export const generateMetadata = ({ searchParams }: SearchPageProps) => {
//   return {
//     title: searchParams.title || "Search",
//   };
// }

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const items = (await getAllJobs({ ...searchParams })) as JobsWithCompany[];
  return (
    <main>
      <MaxWidthWrapper className="mb-12 mt-2 flex flex-col items-center justify-center text-center sm:mt-4">
        <Search />
        {items && items.length > 0 && <JobList items={items} />}
      </MaxWidthWrapper>
    </main>
  );
}
