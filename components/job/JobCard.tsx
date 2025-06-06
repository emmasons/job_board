"use client";
import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { WhatsappShareButton } from "react-share";

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
  const formatEnum = (value: string | undefined) => {
      if (!value) return "";
      return value
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
    };


  return (
    <div className="relative rounded-lg border border-gray-200 bg-slate-50">
      <Link
        href={`/jobs/${id}`}
        className="group block py-4 transition-shadow duration-200 hover:shadow-lg"
      >
        <div className="h-full overflow-hidden p-4">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h2 className="truncate text-start text-lg font-semibold text-primary group-hover:text-orange-600">
                {title}
              </h2>
              {companyName && (
                <div className="text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="mdi:office-building"
                      className="text-gray-500"
                    />
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
              <span>{formatEnum(workSchedule)}</span>
            </div>     
          </div>
        </div>
      </Link>
      <div className="absolute bottom-0 flex w-full items-center justify-between p-4">
        <p className="text-sm text-gray-400">
          {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}
        </p>
        <div className="z-10 flex items-center gap-2">
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
          <Link href={`/jobs/${id}`}>
            <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-primary">
              Easy Apply
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
