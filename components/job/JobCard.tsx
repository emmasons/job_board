"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";

import { format } from "date-fns";
type Props = {
  id: string;
  title: string;
  createdAt: Date;
  company?: string;
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
  company, 
  sector,
  city,
  country,
  occupation,
  workSchedule,
}: Props) => {
  const formattedDate = format(createdAt, "yyyy/MM/dd");

  return (
    <Link href={`/jobs/${id}`} className="group block">
      <div className="h-full overflow-hidden rounded-lg border border-gray-200 bg-white p-4 transition-shadow duration-200 hover:shadow-lg">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="truncate text-lg font-semibold text-gray-800 text-primary group-hover:text-orange-600">
            {title}
          </h2>
          <p className="text-sm text-gray-400">{formattedDate}</p>
        </div>
        {company && (
          <div className="text-sm text-gray-600 mb-1">
            <div className="flex items-center gap-1">
              <Icon icon="mdi:office-building" className="text-gray-500" />
              <span>{company}</span>
            </div>
          </div>
        )}
        <div className="text-sm text-gray-600">
          <div className="mb-1 flex items-center gap-1">
            <Icon icon="maki:industry" className="text-gray-500" />
            <span>{sector}</span>
          </div>
          <div className="mb-1 flex items-center gap-1">
            <Icon icon="mdi:location" className="text-gray-500" />
            <span>
              {country}: {city}
            </span>
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
      </div>
    </Link>
  );
};

export default JobCard;
