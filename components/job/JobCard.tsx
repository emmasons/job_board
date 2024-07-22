"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { 
  FacebookShare,
  TwitterShare,
  WhatsappShare,
  LinkedinShare

} from 'react-share-kit';

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
  url,
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
  return (
    <Link href={`/jobs/${id}`} className="group block">
      <div className="h-full overflow-hidden rounded-lg border border-gray-200 p-4 bg-white transition-shadow duration-200 hover:shadow-lg">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="truncate text-primary text-start text-lg font-semibold group-hover:text-orange-600">
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
          <Icon icon="mdi:office-building" className="w-16 h-16 text-gray-500" />
        </div>
        <div className="text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1 mb-1">
            <Icon icon="mdi:location" className="text-gray-500" />
            <span>
              {country}, {city}
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1 mb-1">
            <Icon icon="maki:industry" className="text-gray-500" />
            <span>{sector}</span>
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
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400">{formattedDate}</p>
          <div className="flex items-center gap-2">
             {/* Facebook Share Button */}
            <FacebookShare 
              style={{ width: '20px', height: '20px' }}
              url={url} 
              quote={titleToShare} />

              {/* Twitter share button */}
              <TwitterShare
                  style={{ width: '20px', height: '20px' }}
                  url={url}
                  title={'react-share-kit - social share buttons for next & react apps.'}
                />

                {/* Linkedln share buton */}
                <LinkedinShare 
                style={{ width: '20px', height: '20px' }}
                url={url} />

                
            <span className="px-2 py-1 bg-blue-100 text-primary text-xs font-semibold rounded">
          
            Easy Apply
            </span>
          </div>
          
        </div>
      </div>
    </Link>
  );
};

export default JobCard;


