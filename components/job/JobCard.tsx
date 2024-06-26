"use client";
import Link from "next/link";
import { Briefcase, MapPin, Clock, User, Share } from 'lucide-react';
import { Icon } from "@iconify/react";

import { formatDistanceToNow } from "date-fns";
type Props = {
  id: string;
  title: string;
  createdAt: Date;
  company: string;
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
  // const formattedDate = format(createdAt, "yyyy/MM/dd");
  const postedDate = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
  const relativeDate = formatDistanceToNow(postedDate, { addSuffix: true });

  return (
    <Link href={`/jobs/${id}`} className="group block">
      <div className="h-full overflow-hidden rounded-lg border border-gray-200 bg-white p-4 transition-shadow duration-200 hover:shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-xl font-semibold text-primary group-hover:text-orange-600">
            {title}
          </h4>
          <div className="flex items-center text-sm text-gray-500">
            <p>{relativeDate.charAt(0).toUpperCase() + relativeDate.slice(1)}</p>
            <Share className="ml-2 w-4 h-4 text-gray-400 cursor-pointer share-icon"/>
          </div>
        </div>
        {company && (
          <div className="text-sm text-gray-600 mb-1">
            <div className="flex items-center gap-1">
            <Briefcase className="mr-2 w-4 h-4 text-gray-400" />
              <span>{company}</span>
            </div>
          </div>
        )}
        <div className="text-sm text-gray-600">
          <div className="mb-1 flex items-center gap-1">
            <Briefcase className="mr-2 w-4 h-4 text-gray-400" />
            <span>{sector}</span>
          </div>
          <div className="mb-1 flex items-center gap-1">
            <MapPin className="mr-2 w-4 h-4 text-gray-400" />
            <span>
              {country}: {city}
            </span>
          </div>
          <div className="mb-1 flex items-center gap-1">
            <Clock className="mr-2 w-4 h-4 text-gray-400" />
            <span>{workSchedule}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="mr-2 w-4 h-4 text-gray-400" />
            <span>{occupation}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
