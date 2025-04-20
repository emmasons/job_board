"use client";

import {
  Application,
  ApplicationStatus,
  Profile,
  User,
  Job,
} from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type ApplicationProp = {
  id: string;
  userId: string;
  jobId: string;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
  user: User & { profile: Profile | null };
  job: Job;
};

export const columns: ColumnDef<ApplicationProp>[] = [
  {
    accessorKey: "job.title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Job Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: "includesString", // Ensure filter function is specified
  },
  {
    accessorKey: "job.city",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          City
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "job.companyName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Application Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status");

      return (
        <Badge
          className={cn(
            "rounded-full",
            status === ApplicationStatus.ACCEPTED
              ? "bg-green-300"
              : status === ApplicationStatus.REJECTED
                ? "bg-orange-500"
                : "bg-slate-300 text-black",
          )}
        >
          {status === ApplicationStatus.ACCEPTED
            ? "Accepted"
            : status === ApplicationStatus.REJECTED
              ? "Rejected"
              : "Pending"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          {/* Uncomment the following part if needed */}
          {/* <DropdownMenuContent align="end">
            <Link href={`/profile/dashboard/employer/applications/${id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Pencil className="mr-2 h-4 w-4 " />
                Manage
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent> */}
        </DropdownMenu>
      );
    },
  },
];
