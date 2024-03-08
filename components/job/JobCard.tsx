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
    <Link href={`/jobs/${id}`}>
      <div className="group h-full overflow-hidden rounded-lg border p-3 transition hover:shadow-sm">
        <div className="flex justify-between">
          <h2 className="truncate text-primary font-semibold text-lg">{title}</h2>
          <p className="text-muted-foreground text-xs">{formattedDate}</p>
        </div>
        <div className="flex items-center gap-2">
          <Icon icon="maki:industry" />
          <p>{sector}</p>
        </div>
        <div className="flex items-center gap-2">
          <Icon icon="mdi:location" />
          <p>
            {country}:&nbsp;{city}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Icon icon="mdi:file-edit-outline" />
          <p>{workSchedule}</p>
        </div>
        <div className="flex items-center gap-2">
          <Icon icon="clarity:employee-solid" />
          <p>{occupation}</p>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
