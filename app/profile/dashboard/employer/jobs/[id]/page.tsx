import { getJob } from "@/actions/employer/get-job";
import { getAllSectors } from "@/actions/get-all-sectors";
import { getContractTypes } from "@/actions/get-contract-types";
import { getEducationLevels } from "@/actions/get-education-levels";
import { getExperience } from "@/actions/get-experience";
import { getWorkSchedules } from "@/actions/get-work-schedules";
import { ChangeJobStatusForm } from "@/components/dashboard/employer/jobs/edit/ChangeStatus";
import EditJobForm from "@/components/dashboard/employer/jobs/edit/EditJob";
import { cn } from "@/lib/utils";
import { JOBSTATUS } from "@prisma/client";
import { ArrowLeft, ChevronRight, Hammer } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Props) => {
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
  return (
    <div className="space-y-4 p-6">
      <Link
        href="/profile/dashboard/employer/jobs"
        className="text-primary hover:text-sky-500 "
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>
      <div className="justify-between gap-4 rounded-md bg-white p-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
        <h1 className="my-4 flex items-center gap-4 text-2xl font-bold">
          {job.title}
        </h1>
        <p className="my-4 flex items-center gap-4 text-lg capitalize">
          <Hammer className="h-6 w-6 text-primary" />
          {job.sector.label}
        </p>
        <div className="flex flex-col gap-2">
          <div className="inline-flex rounded-md">
            <p className="rounded-bl-sm rounded-tl-sm bg-zinc-500 p-2 text-white">
              Status
            </p>
            <p
              className={cn(
                "rounded-br-sm rounded-tr-sm p-2 text-white",
                job.status === JOBSTATUS.OPEN
                  ? "bg-green-500"
                  : job.status === JOBSTATUS.CLOSED
                    ? "bg-yellow-500"
                    : "bg-red-500",
              )}
            >
              {job.status}
            </p>
          </div>
          <ChangeJobStatusForm
            jobId={jobId}
            initialData={{
              status: job.status,
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
