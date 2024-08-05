import { getJob } from "@/actions/employer/get-job";
import { getMatchingJobsCvs } from "@/actions/employer/get-matching-job-cvs";
import { getAllSectors } from "@/actions/get-all-sectors";
import { getContractTypes } from "@/actions/get-contract-types";
import { getEducationLevels } from "@/actions/get-education-levels";
import { getExperience } from "@/actions/get-experience";
import { getWorkSchedules } from "@/actions/get-work-schedules";
import EditJobForm from "@/components/dashboard/employer/jobs/edit/EditJob";
import { SwitchJobStatusForm } from "@/components/dashboard/employer/jobs/edit/SwitchJobStatusForm";
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronRight, FileText, Hammer } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import PaginationControls from "@/components/search/PaginationControls";
import CandidatesSkeleton from "@/components/find-candidates/CandidatesSkeleton";
import { Suspense } from "react";
import CandidateFilters from "@/components/find-candidates/CandidateFilters";
import CandidateList from "@/components/find-candidates/CandidateList";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { getEmployerCandidatesIds } from "@/actions/get-employer-candidates-ids";
import { JobActions } from "@/components/dashboard/employer/jobs/JobActions";
import { Banner } from "@/components/Banner";

type Props = {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

const page = async ({ params, searchParams }: Props) => {
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.EMPLOYER)) {
    return redirect(
      `/auth/signup/employer?callBack=/profile/dashboard/employer/jobs/${params.id}`,
    );
  }
  const jobId = params.id;
  const job = await getJob(jobId);
  if (!job) {
    return redirect("/profile/dashboard/employer/jobs");
  }

  const sectors = await getAllSectors();
  const contractTypeList = await getContractTypes();
  const workSchedules = await getWorkSchedules();
  const educationLevels = await getEducationLevels();
  const experience = await getExperience();

  const candidates = await getMatchingJobsCvs({
    jobTitle: job.title,
    occupation: job.occupation || "",
  });

  const page = searchParams?.page ? searchParams?.page : "1";
  const pageSize = searchParams?.pageSize ? searchParams?.pageSize : "10";
  const start = (Number(page) - 1) * Number(pageSize); // 0, 5, 10 ...
  const end = start + Number(pageSize); // 5, 10, 15 ...
  const items = candidates.slice(start, end);
  const totalPages = Math.ceil(candidates.length / Number(pageSize));
  const loggedInEmployer = user?.id && user?.role === Role.EMPLOYER;
  const candidateIds =
    loggedInEmployer && (await getEmployerCandidatesIds(user.id));

  return (
    <div className="space-y-4 p-6">
      {!job.published ||
        (!job.isOpen && (
          <Banner
            label={
              "Please note, this job will not be available to job seekers until you set it to PUBLISHED and the status is OPEN. Also make sure all the required fields are provided."
            }
          />
        ))}
      <div className="flex items-center justify-between">
        <Link
          href="/profile/dashboard/employer/jobs"
          className="text-primary hover:text-sky-500 "
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <JobActions jobId={jobId} published={job.published} />
      </div>
      <div className="justify-between gap-4 rounded-md bg-white p-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
        <h1 className="my-4 flex items-center gap-4 text-2xl font-bold">
          {job.title}
        </h1>
        <p className="my-4 flex items-center gap-4 text-lg capitalize">
          <Hammer className="h-6 w-6 text-primary" />
          {job?.sector?.label}
        </p>
        <div className="flex flex-col gap-2">
          <SwitchJobStatusForm
            jobId={jobId}
            initialData={{
              isOpen: job.isOpen,
            }}
          />
        </div>
      </div>
      <div className="grid-cols-3 justify-between  gap-2 md:grid ">
        <div className="flex w-full flex-col items-center rounded-md bg-white p-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
          <Link
            href={"/profile/dashboard/employer/applications"}
            className="my-4 flex items-center gap-4 border-b text-lg font-bold text-zinc-600 hover:text-secondary"
          >
            Applications
            <ChevronRight className="h-6 w-6  hover:text-secondary" />
          </Link>
          <p className="text-[1.2rem] font-bold text-primary">
            {job.applications.length}
          </p>
        </div>
        <div className="flex w-full flex-col items-center rounded-md bg-white p-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
          <h2 className="my-4 flex items-center gap-4 border-b text-lg font-bold text-zinc-600">
            Views
          </h2>
          <p className="text-[1.2rem] font-bold text-primary">
            {job.metrics.reduce((acc, curr) => acc + curr.view, 0)}
          </p>
        </div>
        <div className="flex w-full flex-col items-center rounded-md bg-white p-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
          <h2 className="my-4 flex items-center gap-4 border-b text-lg font-bold text-zinc-600">
            Hired
          </h2>
          <p className="text-[1.2rem] font-bold text-primary">0</p>
        </div>
      </div>

      <EditJobForm
        initialData={job}
        sectorList={sectors.map((sector) => ({
          label: sector.label,
          value: sector.id,
        }))}
        contractTypeList={contractTypeList}
        workScheduleList={workSchedules}
        educationLevelList={educationLevels.map((level) => ({
          label: level.label,
          value: level.id,
        }))}
        experienceList={experience.map((exp) => ({
          label: exp.label,
          value: exp.id,
        }))}
      />
      <div className="rounded-md bg-slate-100 p-4">
        <h2 className="my-4 flex items-center gap-4 border-b text-lg font-bold text-zinc-600">
          <FileText className="h-6 w-6 text-primary" />
          Similar CVs
        </h2>
        <div className="space-y-4">
          <Suspense fallback={<CandidatesSkeleton />}>
            <section className="mt-6">
              <div className="space-y-4 md:w-2/3">
                <CandidateList
                  candidates={items}
                  candidateIds={candidateIds}
                  loggedInEmployer={loggedInEmployer || false}
                  hasBackground={false}
                  cardBg="bg-white"
                />
                <PaginationControls
                  hasNextPage={end < candidates.length}
                  hasPrevPage={start > 0}
                  totalPages={totalPages}
                />
              </div>
            </section>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default page;
