"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function EmployerOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-within:ring-transparent">
        <div className="flex items-center">
          <p>Employers</p>
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="mb-2 py-2">
          <Link
            href="/profile/dashboard/employer/jobs"
            className="h-full w-full hover:cursor-pointer"
          >
            Advertise
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="mb-2 py-2">
          <Link
            href="/find-candidates"
            className="h-full w-full hover:cursor-pointer"
          >
            Find Candidates
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="mb-2 py-2">
          <Link
            href="/profile/dashboard/employer/candidates"
            className="h-full w-full hover:cursor-pointer"
          >
            My Candidates
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
