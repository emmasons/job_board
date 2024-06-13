"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import clsx from "clsx"; // Import clsx for condition

export default function EmployerOptions() {
  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger className={clsx(
    //     "border-none ring-0 focus-visible:outline-none focus-visible:ring-0",
    //     "outline-none"
    //   )}>
    //     <div className="flex items-center ">
    //       <p className="px-1 text-sm">Employers</p>
    //       <ChevronDown className="w-4 h-4" />
    //     </div>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent>
    //     <DropdownMenuItem className="mb-2 py-2">
    //       <Link
    //         href="/profile/dashboard/employer/jobs"
    //         className="h-full w-full hover:cursor-pointer"
    //       >
    //         Advertise
    //       </Link>
    //     </DropdownMenuItem>
    //     <DropdownMenuItem className="mb-2 py-2">
    //       <Link
    //         href="/find-candidates"
    //         className="h-full w-full hover:cursor-pointer"
    //       >
    //         Find Candidates
    //       </Link>
    //     </DropdownMenuItem>
    //     <DropdownMenuItem className="mb-2 py-2">
    //       <Link
    //         href="/profile/dashboard/employer/candidates"
    //         className="h-full w-full hover:cursor-pointer"
    //       >
    //         My Candidates
    //       </Link>
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>

    <div className="group relative">
      <Link href="/blog" className="flex items-center font-medium w-full px-4 text-gray-700 hover:text-orange-500 text-sm">

        Employer  <ChevronDown className=" w-4 h-4" />
      </Link>
      <div className="absolute left-0 pt-7 hidden bg-white shadow-lg group-hover:flex w-auto">
      <ul className="py-2 w-max">
                <li>
                    <Link href="/auth/signin" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                        Login           
                    </Link>
                </li>
                <li>
                    <Link href="/auth/signup/employer" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                        Register
                    </Link>
                </li>
                <li>
                    <Link href="/find-candidates" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                        Find Candidates
                    </Link>
                </li>
                <li>
                    <Link href="/profile/dashboard/employer/candidates" className="block text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                        My candidates
                      
                    </Link>
                </li>

                </ul>

      </div>
    </div>
  );
}
