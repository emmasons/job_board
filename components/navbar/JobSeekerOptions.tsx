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
          <Link href="/search" className="hover:cursor-pointer w-full h-full">
            Find a Job
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="mb-2 py-2">
          <Link href="#" className="hover:cursor-pointer w-full h-full">
            My CV
          </Link>
        </DropdownMenuItem>{" "}
        <DropdownMenuItem className="mb-2 py-2">
          <Link href="#" className="hover:cursor-pointer w-full h-full">
            My Jobs
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
