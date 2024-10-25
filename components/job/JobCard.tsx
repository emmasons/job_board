"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from "react-share";

import { formatDistanceToNow } from "date-fns";
type Props = {
  id: string;
  title: string;
  url: string;
  createdAt: Date;
  companyName?: string | null;
  sector: string;
  city: string;
  country: string;
  occupation: string | null;
  workSchedule: string;
};

const JobCard = ({
  id,
  title,

  createdAt,
  companyName,
  sector,
  city,
  country,
  occupation,
  workSchedule,
}: Props) => {
  const formattedDate = formatDistanceToNow(createdAt, { addSuffix: true });
  const titleToShare = `Check out this amazing job: ${title}`;
  const shareUrl = process.env.NEXT_PUBLIC_BASE_DOMAIN + "/jobs/" + id;

  return (
    <Link href={`/jobs/${id}`} className="group block">
      <div className="h-full overflow-hidden rounded-lg border border-gray-200 bg-slate-50 p-4 transition-shadow duration-200 hover:shadow-lg">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h2 className="truncate text-start text-lg font-semibold text-primary group-hover:text-orange-600">
              {title}
            </h2>
            {companyName && (
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Icon icon="mdi:office-building" className="text-gray-500" />
                  <span>{companyName}</span>
                </div>
              </div>
            )}
          </div>
          {/* add company logo if needed */}
        </div>
        <div className="mb-4 text-sm text-gray-600">
          <div className="mb-1 flex items-center gap-1">
            <Icon icon="mdi:location" className="text-gray-500" />
            <span>
              {country}, {city}
            </span>
          </div>
        </div>
        <div className="mb-4 text-sm text-gray-600">
          <div className="mb-1 flex items-center gap-1">
            <Icon icon="maki:industry" className="text-gray-500" />
            <span>{sector}</span>
          </div>
          <div className="mb-1 flex items-center gap-1">
            <Icon icon="mdi:file-edit-outline" className="text-gray-500" />
            <span>{workSchedule}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon icon="clarity:employee-solid" className="text-gray-500" />
            <span>{occupation}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-400">{formattedDate}</p>
          <div className="flex items-center gap-2">
            {/* Facebook Share Button */}
            <FacebookShareButton url={shareUrl} hashtag={titleToShare}>
              <Icon
                icon="akar-icons:facebook-fill"
                className="h-4 w-4 text-blue-600"
              />
            </FacebookShareButton>
            {/* Twitter Share Button */}
            <TwitterShareButton url={shareUrl} title={titleToShare}>
              <Icon
                icon="akar-icons:twitter-fill"
                className="h-4 w-4 text-blue-400"
              />
            </TwitterShareButton>
            {/* LinkedIn Share Button */}
            <LinkedinShareButton url={shareUrl} title={titleToShare}>
              <Icon
                icon="akar-icons:linkedin-fill"
                className="h-4 w-4 text-blue-700"
              />
            </LinkedinShareButton>
            {/* WhatsApp Share Button */}
            <WhatsappShareButton url={shareUrl} title={titleToShare}>
              <Icon
                icon="akar-icons:whatsapp-fill"
                className="h-4 w-4 text-green-500"
              />
            </WhatsappShareButton>
            {/* Email Share Button */}
            <EmailShareButton
              url={shareUrl}
              subject={titleToShare}
              body={titleToShare}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 32 32"
              >
                <path
                  fill="blue"
                  d="M28 6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m-2.2 2L16 14.78L6.2 8ZM4 24V8.91l11.43 7.91a1 1 0 0 0 1.14 0L28 8.91V24Z"
                />
              </svg>
            </EmailShareButton>
            <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-primary">
              Easy Apply
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
