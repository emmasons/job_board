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
  const shareUrl = process.env.NEXT_PUBLIC_BASE_DOMAIN + "/jobs/" + job?.id;

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
        {job?.confidential && (
          <p className="text-xl">Company: {job?.company?.companyName}</p>
        )}
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-zinc-700">Job Overview</h2>
        <p className="text-lg">
          <span className="font-semibold">Work Schedule:</span>{" "}
          <span className="capitalize">
            {job?.workSchedule.toLocaleLowerCase().replace("_", " ")}
          </span>
        </p>
        <p className="text-lg">
          <span className="font-semibold">Occupation:</span> {job?.occupation}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Contract Type:</span>{" "}
          <span className="capitalize">{job?.contractType.toLowerCase()}</span>
        </p>
        <p className="text-lg ">
          <span className="font-semibold">Preferred candidate:</span>{" "}
          <span className="capitalize">
            {job?.preferredApplicantGender.toLocaleLowerCase()}
          </span>
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
          {job?.confidential && (
            <p className="text-lg">
              <span className="font-semibold">Employer:</span>{" "}
              {job?.company?.companyName || job?.companyName || "N/A"}
            </p>
          )}
        </div>

        <div className="flex justify-between">
          <Link
            href={`/jobs/${job?.id}/apply`}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white"
          >
            Apply
          </Link>
          <div className="z-10 flex items-center gap-2">
            <Icon icon="material-symbols:share" className="h-6 w-6 text-secondary" />
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${titleToShare}`}
              target="_blank"
              className="inline-flex items-center rounded-full transition duration-150 hover:scale-110"
            >
              <Icon icon="logos:facebook" className="h-6 w-6 text-blue-500" />
            </Link>

            <Link
              href={`https://twitter.com/share?url=${shareUrl}&text=${titleToShare}`}
              target="_blank"
              className="inline-flex items-center rounded-full transition duration-150 hover:scale-110"
            >
              <Icon icon="pajamas:twitter" className="h-6 w-6 text-gray-500" />
            </Link>
            {/* LinkedIn Share Button */}
            <Link
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${titleToShare}`}
              target="_blank"
              className="inline-flex items-center rounded-full transition duration-150 hover:scale-110"
            >
              <Icon icon="pajamas:linkedin" className="h-6 w-6 text-blue-700" />
            </Link>
            {/* WhatsApp Share Button */}
            <WhatsappShareButton url={shareUrl} title={titleToShare}>
              <Icon
                icon="akar-icons:whatsapp-fill"
                className="h-6 w-6 text-green-500"
              />
            </WhatsappShareButton>
            {/* Email Share Button */}
            <Link href={`mailto:?subject=${titleToShare}&body=${shareUrl}`}>
              <Icon icon="ic:baseline-email" className="h-6 w-6 text-red-500" />
            </Link>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default PageWrapper;
