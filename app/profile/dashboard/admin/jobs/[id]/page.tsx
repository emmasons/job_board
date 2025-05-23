import { getJob } from "@/actions/employer/get-job";
import { getMatchingJobsCvs } from "@/actions/employer/get-matching-job-cvs";
import { getAllSectors } from "@/actions/get-all-sectors";
import { getContractTypes } from "@/actions/get-contract-types";
import { getEducationLevels } from "@/actions/get-education-levels";
import { getExperience } from "@/actions/get-experience";
import { getWorkSchedules } from "@/actions/get-work-schedules";
import EditJobForm from "@/components/dashboard/employer/jobs/edit/EditJob";
import { SwitchJobStatusForm } from "@/components/dashboard/employer/jobs/edit/SwitchJobStatusForm";
import { SwitchJobFeatureForm } from "@/components/dashboard/employer/jobs/edit/SwitchJobFeatureForm";

import { ArrowLeft, ChevronRight, Hammer } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
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
  if (!user || !(user.role === Role.ADMIN)) {
    return redirect(
      `/auth/signin?callBack=/profile/dashboard/admin/jobs/${params.id}`,
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


  const page = searchParams?.page ? searchParams?.page : "1";
  const pageSize = searchParams?.pageSize ? searchParams?.pageSize : "10";
  const start = (Number(page) - 1) * Number(pageSize); // 0, 5, 10 ...

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
          href={
            user?.role === Role.EMPLOYER
              ? "/profile/dashboard/employer"
              : user?.role === Role.ADMIN
                ? "/profile/dashboard/admin"
                : "/profile/dashboard/job-seeker"
          }
          className="text-primary hover:text-sky-500 "
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <JobActions published={job.published} jobId={jobId} />
      </div>
      <div className="justify-between gap-4 rounded-md bg-white p-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
        <Link
          href={`/jobs/${job.id}`}
          target="_blank"
          className="my-4 inline-flex items-center gap-2 text-2xl font-bold text-primary hover:text-sky-400"
        >
          {job.title}
          <ChevronRight className="h-6 w-6" />
        </Link>
        <p className="my-4 flex items-center gap-4 text-lg capitalize">
          <Hammer className="h-6 w-6 text-primary" />
          {job.sector?.label}
        </p>
        <div className="flex gap-10">
          <div>
            <SwitchJobStatusForm
              jobId={jobId}
              initialData={{
                isOpen: job.isOpen,
              }}
            />
          </div>

          <div>
            <SwitchJobFeatureForm
              jobId={jobId}
              initialData={{
                isFeatured: job.isFeatured,
              }}
            />
          </div>
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
          <p className="text-[1.2rem] font-bold text-primary">0</p>
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
    </div>
  );
};

export default page;
