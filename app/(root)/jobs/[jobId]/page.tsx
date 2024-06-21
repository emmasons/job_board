import { getJobById } from "@/actions/get-job-by-id";
import { Preview } from "@/components/ckeditor/RichTextRenderer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    jobId: string;
  };
};

const page = async (props: Props) => {
  const job = await getJobById(props.params.jobId);
  return (
    <MaxWidthWrapper className="py-4">
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-zinc-700">{job?.title}</h1>
        <p className="text-xl">Company: {job?.company?.companyName}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-zinc-700">Job Overview</h2>
        <p className="text-lg">
          <span className="font-semibold">Work Schedule:</span>{" "}
          {job?.workSchedule}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Occupation:</span> {job?.occupation}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Contract Type:</span>{" "}
          {job?.contractType}
        </p>
        <h3 className="mb-4 mt-6 text-xl font-semibold text-zinc-700">
          Job Description
        </h3>
        <Preview value={job?.description} />
        <div className="my-4">
          <p className="text-lg">
            <span className="font-semibold">Location:</span> {job?.city},{" "}
            {job?.country}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Employer:</span>{" "}
            {job?.company?.companyName || job?.companyName || "N/A"}
          </p>
        </div>
        {/* <div className="border-l-[0.3em] border-zinc-400 bg-zinc-100 pl-4">
          <Preview value={job?.howToApply} />
        </div> */}
        <div>
          <Link
            href={`/jobs/${job?.id}/apply`}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white"
          >
            Apply
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
