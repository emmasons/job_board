"use client";
import { useState } from "react";
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
import { Company, Job, Subscription, SubscriptionPlan } from "@prisma/client";
import { JobAlertSwitch } from "@/components/job/AlertSwitch";
import CvLandingCta from "@/components/Cvgeneratecta";

type Props = {
  job:
    | (Job & {
        company: Company | null;
        companyEmail2: string;
        companyName2: string;
        howToApply2: string;
      })
    | null;
  subscription:
    | (SubscriptionPlan & {
        status: "ACTIVE" | "CANCELLED" | "EXPIRED" | "TRIAL";
        endDate: string; // ISO string
        plan: {
          name: "FREE" | "BASIC" | "STANDARD" | "PREMIUM";
        };
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
  subscription,
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
  }, [jobId, subscription]);

  const titleToShare = `Check out this amazing job: ${job?.title}`;
  const shareUrl = process.env.NEXT_PUBLIC_BASE_DOMAIN + "/jobs/" + job?.id;
  const [showHowToApply, setShowHowToApply] = useState(false);

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
      {/* <CvLandingCta /> */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-zinc-700">{job?.title}</h1>
        {!job?.companyEmail2 && (
          <>
            {job?.confidential && (
              <p className="text-xl">Company: {job?.company?.companyName}</p>
            )}
          </>
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
        {job?.preferredApplicantGender !== 'ALL' && (
          <p className="text-lg">
            <span className="font-semibold">Preferred Gender:</span>{" "}
            <span className="capitalize">
              {job?.preferredApplicantGender.toLocaleLowerCase()}
            </span>
          </p>
        )}

        <h3 className="mb-4 mt-6 text-xl font-semibold text-zinc-700">
          Job Description
        </h3>
        <Preview value={job?.description} />
        <div className="my-4">
          <p className="text-lg">
            <span className="font-semibold">Location:</span> {job?.city},{" "}
            {job?.country}
          </p>
          {!job?.companyEmail2 && (
          <>
            {job?.confidential && (
              <p className="text-lg">
                <span className="font-semibold">Employer:</span>{" "}
                {job?.company?.companyName || job?.companyName || "N/A"}
              </p>
            )}
          </>
        )}
        </div>

        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
          {/* Left Section: How to Apply or Apply Button */}
            <div className="flex flex-col">
              {job?.companyEmail2 ? (
                <>
                  {/* Subscription Logic */}
                  {!subscription || subscription?.status !== 'ACTIVE' || new Date(subscription?.endDate) < new Date() ? (
                    <div className="mt-4 w-full max-w-md rounded-md bg-yellow-50 p-4 border border-yellow-300 text-yellow-800 shadow">
                      <p className="mb-2 font-semibold">
                        This is a Premium Job, You need to subscribe to the <span className="font-bold text-primary">Standard Plan</span> to view employer details and apply directly.
                      </p>
                      <Link
                        href="/subscription/plans"
                        className="mt-2 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white"
                      >
                        <Icon icon="mdi:credit-card-outline" className="text-white" />
                        View Plans
                      </Link>
                    </div>
                  ) : subscription?.plan.name === 'BASIC' || subscription?.plan.name === 'FREE' ? (
                    <div className="mt-4 w-full max-w-md rounded-md bg-yellow-50 p-4 border border-yellow-300 text-yellow-800 shadow">
                      <p className="mb-2 font-semibold">
                        You need to upgrade to a higher plan to View the employer details and apply directly.
                      </p>
                      <Link
                        href="/subscription/plans"
                        className="mt-2 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white"
                      >
                        <Icon icon="mdi:arrow-up-bold-circle-outline" className="text-white" />
                        Upgrade Plan
                      </Link>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setShowHowToApply(!showHowToApply)}
                        className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white"
                      >
                        <Icon icon="mdi:email-send-outline" className="text-white" />
                        How to Apply
                      </button>

                      {showHowToApply && (
                        <div className="mt-4 w-full max-w-md rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-md space-y-4">
                          <div className="flex items-start gap-2">
                            <Icon icon="mdi:office-building-outline" className="text-primary text-xl" />
                            <div>
                              <p className="text-sm text-gray-500">Company Name</p>
                              <p className="text-base font-medium text-gray-800">{job?.companyName2}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Icon icon="mdi:email-outline" className="text-primary text-xl" />
                            <div>
                              <p className="text-sm text-gray-500">Company Email</p>
                              <p className="text-base text-blue-600 underline">
                                <a href={`mailto:${job?.companyEmail2}`}>{job?.companyEmail2}</a>
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Icon icon="mdi:information-outline" className="text-primary text-xl mt-1" />
                            <div>
                              <p className="text-sm text-gray-500">How to Apply</p>
                              <p className="text-base text-gray-700 whitespace-pre-line">
                                {job?.howToApply2}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                <Link
                  href={`/jobs/${job?.id}/apply`}
                  className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white"
                >
                  Apply
                </Link>
              )}
            </div>



          {/* Right Section: Share Icons */}
          <div className="z-10 flex flex-wrap items-center gap-3 mt-4 md:mt-0">
            <Icon icon="material-symbols:share" className="h-6 w-6 text-secondary" />

            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${titleToShare}`}
              target="_blank"
              className="transition duration-150 hover:scale-110"
            >
              <Icon icon="logos:facebook" className="h-6 w-6 text-blue-500" />
            </Link>

            <Link
              href={`https://twitter.com/share?url=${shareUrl}&text=${titleToShare}`}
              target="_blank"
              className="transition duration-150 hover:scale-110"
            >
              <Icon icon="pajamas:twitter" className="h-6 w-6 text-gray-500" />
            </Link>

            <Link
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${titleToShare}`}
              target="_blank"
              className="transition duration-150 hover:scale-110"
            >
              <Icon icon="pajamas:linkedin" className="h-6 w-6 text-blue-700" />
            </Link>

            <WhatsappShareButton url={shareUrl} title={titleToShare}>
              <Icon icon="akar-icons:whatsapp-fill" className="h-6 w-6 text-green-500" />
            </WhatsappShareButton>

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
