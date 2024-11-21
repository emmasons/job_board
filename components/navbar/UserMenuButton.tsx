"use client";

import profilePicPlaceholder from "@/public/assets/profile-pic-placeholder.png";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogIn, LogInIcon, LogOut, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import clsx from "clsx"; // Import clsx for condition
import Signup from "../auth/Signup";

import { Role } from "@prisma/client";

interface UserMenuButtonProps {
  user: Session["user"] | undefined;
}

export default function UserMenuButton({ user }: UserMenuButtonProps) {
  return (
    <>
      {user ? (
        <DropdownMenu >
          <DropdownMenuTrigger
            className={clsx(
              "border-none focus-within:ring-transparent",
              "outline-none",
            )}
          >
            <div className="flex items-center">
              <Image
                src={user?.image || profilePicPlaceholder}
                alt="Profile picture"
                width={30}
                height={30}
                className="w-9 rounded-full p-1"
              />
              {user?.role === Role.ADMIN ? (
                <>Admin</>
              ) : user?.role === Role.EMPLOYER ? (
                <>Employer</>
              ) : user?.role === Role.JOB_SEEKER ? (
                <>Job Seeker</>
              ) : user?.role === Role.STAFF ? (
                <>Staff</>
              ) : null}

              <ChevronDown className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="space-y-3">
            <DropdownMenuLabel>Hi, {user?.lastName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user?.role === Role.ADMIN ? (
              <DropdownMenuItem className="">
                <Link
                  href="/profile/dashboard/admin/users"
                  className="block w-full hover:cursor-pointer py-1"
                >
                  Dashboard
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem className="py-2">
                <Link
                  href="/profile/dashboard/"
                  className="block w-full hover:cursor-pointer"
                >
                  Profile
                </Link>
              </DropdownMenuItem>
            )}

            {/* job seeker options */}
            {user?.role === Role.JOB_SEEKER ? (
              <>
                {/* <DropdownMenuItem>
                  <Link
                    href="/profile/main-dashboard"
                    className="h-full w-full hover:cursor-pointer"
                  >
                    Dashboard
                  </Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem>
                  <Link
                    href="/search"
                    className="block w-full hover:cursor-pointer"
                  >
                    Find a Job
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem>
                  <Link
                    href="/profile/dashboard/job-seeker/jobs"
                    className="block w-full hover:cursor-pointer"
                  >
                    My Jobs
                  </Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem>
                  {/*
                    add more dropdown items if needed
                   */}
                </DropdownMenuItem>
              </>
            ) : null}

            {/* employer options */}

            {user?.role === Role.EMPLOYER ? (
              <>
                <DropdownMenuItem>
                  <Link
                    href="/profile/dashboard/employer/jobs"
                    className="block w-full hover:cursor-pointer "
                  >
                    Advertise
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/find-candidates"
                    className="block w-full hover:cursor-pointer"
                  >
                    Search cv
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/profile/dashboard/employer/candidates"
                    className="block w-full hover:cursor-pointer"
                  >
                    My candidates
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {/*
                    add more dropdown items if needed
                   */}
                </DropdownMenuItem>
              </>
            ) : null}

            {/* STAFF OPTIONS */}
            {user?.role === Role.STAFF ? (
              <Link href="/profile/dashboard">
                <Button size="sm" variant="ghost">
                  <LogOut className="mr-2 h-4 w-4" />
                  Exit
                </Button>
              </Link>
            ) : null}
            <Button
              size="sm"
              variant="outline"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="mr-2 h-4 w-4 text-sm" /> 
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center gap-2 text-sm">
          <Button
            variant="ghost"
            className="flex items-center gap-2 border-0 p-2 text-sm text-secondary hover:scale-95 hover:bg-slate-50"
            onClick={() => signIn()}
          >
            {/* <LogIn className="mr-2 h-4 w-4" /> */}
            LogIn
            <LogInIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="text-primary hover:text-secondary"
          >
            <Link
              className="flex items-center gap-2 text-sm   hover:text-secondary"
              href="/auth/signup/"
            >
              Register
              <UserPlus className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}
