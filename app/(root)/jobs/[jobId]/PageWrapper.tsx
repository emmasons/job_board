"use client";
import { Preview } from "@/components/ckeditor/RichTextRenderer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { Icon } from "@iconify/react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from "react-share";
import { setCookie, getCookie } from "cookies-next";
import React, { useEffect } from "react";
import { Company, Job } from "@prisma/client";
import { JobAlertSwitch } from "@/components/job/AlertSwitch";

type Props = {
  job:
    | (Job & {
        company: Company | null;
      })
    | null;
  jobId: string;
  createAlert: (
    userId: string,
    args: Record<string, string | string[] | undefined>,
  ) => Promise<boolean>;
  userId: string | undefined;
  alert: boolean;
  url: string;
  deleteAlert: (
    userId: string,
    args: Record<string, string | string[] | undefined>,
  ) => Promise<boolean>;
};

const PageWrapper = ({
  job,
  jobId,
  url,
  createAlert,
  userId,
  alert,
  deleteAlert,
}: Props) => {
  useEffect(() => {
    const fetchJobMetrics = async () => {
      try {
        let visitorId = getCookie("visitorId");

        if (!visitorId) {
          const newVisitorId = Math.floor(Math.random() * 1000000000);
          setCookie("visitorId", `${newVisitorId}`);
        }
        await fetch("/api/metrics/job", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jobId, visitorId: visitorId }),
        });
      } catch (error) {
        console.error("Error fetching job metrics:", error);
      }
    };

    fetchJobMetrics();
  }, [jobId]);

  const titleToShare = `Check out this amazing job: ${job?.title}`;
  // get the url
  
  
  return (
    <MaxWidthWrapper className="py-4">
      <div className="flex items-center justify-between bg-sky-100 p-2">
        <p className="text-[1rem] font-semibold text-zinc-600">
          {alert
            ? "You have set alerts for similar job"
            : "Create a job alert for similar jobs"}
        </p>
        <JobAlertSwitch
          createAlert={createAlert}
          args={{ ...job, jobId: job?.id }}
          userId={userId}
          deleteAlert={deleteAlert}
          alert={alert}
        />
      </div>
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

        <div className="flex justify-between">
          <Link
            href={`/jobs/${job?.id}/apply`}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white"
          >
            Apply
          </Link>
          <div className="flex items-center gap-2">
            <p className="text-sm font-light">Share this job: </p>
            {/* Facebook Share Button */}
            <FacebookShareButton url={url} hashtag={titleToShare}>
              <Icon
                icon="akar-icons:facebook-fill"
                className="h-7 w-7 text-blue-600"
              />
            </FacebookShareButton>
            {/* Twitter Share Button */}
            <TwitterShareButton url={url} title={titleToShare}>
              <Icon
                icon="akar-icons:twitter-fill"
                className="h-7 w-7 text-blue-400"
              />
            </TwitterShareButton>
            {/* LinkedIn Share Button */}
            <LinkedinShareButton url={url} title={titleToShare}>
              <Icon
                icon="akar-icons:linkedin-fill"
                className="h-7 w-7 text-blue-700"
              />
            </LinkedinShareButton>
            {/* WhatsApp Share Button */}
            <WhatsappShareButton url={url} title={titleToShare}>
              <Icon
                icon="akar-icons:whatsapp-fill"
                className="h-7 w-7 text-green-500"
              />
            </WhatsappShareButton>
            {/* Email Share Button */}
            <EmailShareButton
              url={url}
              subject={titleToShare}
              body={titleToShare}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 32 32"
              >
                <path
                  fill="red"
                  d="M28 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m-2.2 2L16 14.78L6.2 8ZM4 24V8.91l11.43 7.91a1 1 0 0 0 1.14 0L28 8.91V24Z"
                />
              </svg>
            </EmailShareButton>
           
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default PageWrapper;
