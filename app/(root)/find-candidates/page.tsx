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
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Find Visa-Sponsored Talent for Your Job Openings in Europe",
  description:
    "Discover and connect with qualified, visa-ready candidates for your job vacancies across Europe. Use Talentra.io to hire top international talent quickly and efficiently.",
};

const cvFaqs = [
  {
    title: "How can I find CVs for free?",
    description:
      "Talentra.io's free CV search tool offers instant previews of visa-sponsored candidates ready to relocate to Europe. You can also request a free demo tailored to your hiring needs. For a personalized recruitment solution, talk to a Talentra consultant today.",
  },
  {
    title: "How do I contact candidates?",
    description:
      "Once you've found a suitable candidate, simply click on the profile to access contact options or request direct outreach through our platform.",
  },
  {
    title: "How do I search CVs on Talentra.io?",
    description:
      "Talentra’s CV search lets you filter candidates by relocation readiness, visa eligibility, experience, industry, language, nationality, and more. Our tools make it easy to shortlist candidates who match your European job requirements.",
  },
  {
    title: "What type of candidates can I find on Talentra.io?",
    description:
      "Talentra.io connects you to a growing pool of skilled professionals seeking visa-sponsored jobs in Europe. From IT and healthcare to engineering and hospitality, our platform attracts top global talent with verified qualifications and relocation potential.",
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
      <MaxWidthWrapper className="py-4">
        <div className="flex flex-col items-center justify-between gap-4 rounded-md bg-sky-100 p-4 py-16">
          <h1 className="text-2xl font-semibold">CV Search For Employers</h1>
          <p className="text-center text-sm">
            Search for the perfect candidate. Please enter one or more keywords
            that will help us find relevant CVs.
          </p>
          <div className="mt-6 md:w-2/4">
            <SearchInput />
          </div>
          <RemoveSearchParam />
        </div>
        <div className="space-y-4">
          <Suspense fallback={<CandidatesSkeleton />}>
            <section className="mt-6 flex flex-wrap justify-evenly gap-12 md:flex-nowrap">
              <div className="md:w-1/3">
                <CandidateFilters />
              </div>
              <div className="mb-3 md:w-3/5">
                <div className="mb-4 flex justify-between text-sm text-slate-700">
                  <p className="text-sm ">
                    <span className="font-semibold">{items.length}</span>{" "}
                    candidates
                  </p>
                  <p className="rounded-md border p-3 text-[0.7rem]">
                    Sort By (default)
                  </p>
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
          <div className="mt-4 flex items-center justify-center ">
            <div className="m-auto w-full p-4">
              <h2 className="my-6 text-center text-2xl font-semibold">
                Frequently Asked Questions
              </h2>
              <Accordion
                type="single"
                collapsible
                defaultValue={cvFaqs[0].title}
                className="m-auto w-full pr-4"
              >
                {cvFaqs.map((faq) => (
                  <AccordionItem
                    value={faq.title}
                    key={faq.title}
                    className="m-4 w-full rounded-md border px-4 shadow-sm"
                  >
                    <AccordionTrigger className="text-md font-semibold">
                      {faq.title}
                    </AccordionTrigger>
                    <AccordionContent className="border-t pt-2 text-sm text-slate-600">
                      {faq.description}
                    </AccordionContent>
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
