"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function JobSeekerOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-within:ring-transparent">
        <div className="flex items-center">
          <p>Job Seeker</p>
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="mb-2 py-2">
          <Link href="/search" className="h-full w-full hover:cursor-pointer">
            Find a Job
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="mb-2 py-2">
          <Link
            href="/profile/dashboard/job-seeker/cv"
            className="h-full w-full hover:cursor-pointer"
          >
            My CV
          </Link>
        </DropdownMenuItem>{" "}
        <DropdownMenuItem className="mb-2 py-2">
          <Link
            href="/profile/dashboard/job-seeker/jobs"
            className="h-full w-full hover:cursor-pointer"
          >
            My Jobs
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
