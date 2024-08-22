
import { getAllCandidates } from "@/actions/get-all-candidates";
import { getEmployerCandidatesIds } from "@/actions/get-employer-candidates-ids";
import CandidateList from "@/components/find-candidates/CandidateList";
import { SearchInput } from "@/components/find-candidates/SearchInput";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PaginationControls from "@/components/search/PaginationControls";
import CandidatesSkeleton from "@/components/find-candidates/CandidatesSkeleton";
import { Suspense } from "react";
import CandidateFilters from "@/components/find-candidates/CandidateFilters";
import RemoveSearchParam from "@/components/search/RemoveSearchParam";

const cvFaqs = [
  {
    title: "How can I find CVs for free?",
    description:
      "JobsConnect's free CV search tool gives an instant preview of profiles you can hire immediately. Alternatively, you may request a free demo to see CVs of relevant candidates specific to your vacancy. For a customized and affordable recruitment solution within your budget, speak to a JobsConnect consultant on +971 4 561 1500.",
  },
  {
    title: "How do I contact candidates?",
    description:
      "Once you've found relevant candidates, you can contact them directly through our platform. Simply click on the More details button on the candidate's profile page.",
  },
  {
    title: "How do I search CVs on JobsConnect?",
    description:
      "On JobsConnect CV search, you can filter candidates by over 20 different criteria - including education, experience, industry, location, nationality, age and salary expectation. See JobsConnect’s free CV search tool for a preview of how this works.",
  },
  {
    title: "What type of candidates can I find on JobsConnect?",
    description:
      "JobsConnect is one of the most popular recruitment platforms in the Middle East. It has a database of over 10 million professionals, both local as well as expatriate talent, covering all industries and job categories. Over 86% of the candidates hold a university degree, while their experience level ranges from fresh graduates to top management.",
  },
];

interface SearchPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const page = async ({ searchParams }: SearchPageProps) => {
  const hasParams = Object.keys(searchParams).length > 0;
  const user = await getCurrentSessionUser();

  const loggedInEmployer = user?.id && user?.role === Role.EMPLOYER;
  const candidates = await getAllCandidates({
    ...searchParams,
  });
  const candidateIds =
    loggedInEmployer && (await getEmployerCandidatesIds(user.id));

  const page = searchParams?.page ? searchParams?.page : "1";
  const pageSize = searchParams?.pageSize ? searchParams?.pageSize : "10";
  const start = (Number(page) - 1) * Number(pageSize); // 0, 5, 10 ...
  const end = start + Number(pageSize); // 5, 10, 15 ...
  const items = candidates.slice(start, end);
  const totalPages = Math.ceil(candidates.length / Number(pageSize));

  return (
    <div>
      <div className="flex flex-col items-center justify-between gap-4 rounded-md bg-sky-100 p-4 py-16">
        <h1 className="text-2xl font-semibold">CV Search For Employers</h1>
        <p className="text-center text-sm">
          Search for the perfect candidate. Please enter one or more keywords
          that will help us find relevant CVs.
        </p>
        <div className="mt-6 w-2/4">
          <SearchInput />
        </div>
        <RemoveSearchParam />
      </div>
      <MaxWidthWrapper className="py-4">
        <div className="space-y-4">
          <Suspense fallback={<CandidatesSkeleton />}>
            <section className="mt-6 flex flex-wrap justify-evenly gap-12 md:flex-nowrap">
              <div className="md:w-1/3">
                <CandidateFilters />
              </div>
              <div className="mb-3 ">
                <div className="mb-4 flex justify-between text-sm text-slate-700">
                  <p className="text-sm ">{candidates.length} candidate</p>
                  <p className="border p-3 rounded-md text-[0.7rem]">Sort By (default)</p>
                </div>
                <CandidateList
                  candidates={items}
                  candidateIds={candidateIds}
                  loggedInEmployer={loggedInEmployer || false}
                />
              </div>
            </section>
          </Suspense>
          <PaginationControls
            hasNextPage={end < candidates.length}
            hasPrevPage={start > 0}
            totalPages={totalPages}
          />
        </div>
        {!hasParams && (
          <div className="mt-4 flex items-center justify-center bg-sky-100 md:p-20">
            <div className="basis-2/3">
              <h2 className="my-6 text-xl">Frequently Asked Questions</h2>
              <Accordion
                type="single"
                collapsible
                defaultValue={cvFaqs[0].title}
              >
                {cvFaqs.map((faq) => (
                  <AccordionItem value={faq.title} key={faq.title}>
                    <AccordionTrigger className="text-lg font-semibold text-primary">
                      {faq.title}
                    </AccordionTrigger>
                    <AccordionContent>{faq.description}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
