"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
type Props = {
  id: string;
  title: string;
  createdAt: Date;
  sector: string;
  city: string;
  country: string;
  occupation: string;
  workSchedule: string;
};

const JobCard = ({
  id,
  title,
  createdAt,
  sector,
  city,
  country,
  occupation,
  workSchedule,
}: Props) => {
  const formattedDate = format(createdAt, "yyyy/MM/dd");

  return (
    <Link href={`/jobs/${id}`} className="group block">
      <div className="h-full overflow-hidden rounded-lg border border-gray-200 p-4 bg-white transition-shadow duration-200 hover:shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="truncate text-primary text-lg font-semibold text-gray-800 group-hover:text-orange-600">{title}</h2>
          <p className="text-sm text-gray-400">{formattedDate}</p>
        </div>
        <div className="text-sm text-gray-600">
          <div className="flex items-center gap-1 mb-1">
            <Icon icon="maki:industry" className="text-gray-500" />
            <span>{sector}</span>
          </div>
          <div className="flex items-center gap-1 mb-1">
            <Icon icon="mdi:location" className="text-gray-500" />
            <span>{country}: {city}</span>
          </div>
          <div className="flex items-center gap-1 mb-1">
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
