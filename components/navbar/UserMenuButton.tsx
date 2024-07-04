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
import { ChevronDown, LogIn, LogOut, UserPlus } from "lucide-react";
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
        <DropdownMenu>
          <DropdownMenuTrigger className={clsx("border-none focus-within:ring-transparent", "outline-none")}>
            <div className="flex items-center">
              <Image
                src={user?.image || profilePicPlaceholder}
                alt="Profile picture"
                width={30}
                height={30}
                className="w-9 p-1 rounded-full"
              />
              {user?.role === Role.ADMIN ?(
                <>
                Admin
                </>
              ):user?.role === Role.EMPLOYER  ?(
                <>
                Employer
                </>
              ):user?.role === Role.JOB_SEEKER ? (
                <>
                Job Seeker
                </>
              ):user?.role === Role.STAFF ? (
                <>
                Staff
                </>
                ):null}

              
              <ChevronDown className="w-4 h-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Hi, {user?.lastName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="py-2">
              <Link href="/profile/dashboard/" className="hover:cursor-pointer">
                Dashboard
              </Link>
            </DropdownMenuItem>
              {/* job seeker options */}
              {user?.role === Role.JOB_SEEKER ? (
                <>
                <DropdownMenuItem>
                  <Link href="/search" className="h-full w-full hover:cursor-pointer">
                    Find a Job
                  </Link>   
                </DropdownMenuItem>
                <DropdownMenuItem>
                <Link href="/profile/dashboard/job-seeker/jobs"
                  className="h-full w-full hover:cursor-pointer" >
                  My Jobs
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                  {/* 
                    add more dropdown items if needed
                   */}
                </DropdownMenuItem>
              </>
            ):null}

              {/* employer options */}
              
              {user?.role === Role.EMPLOYER  ?(
                <>
                <DropdownMenuItem>
                   <Link href="/profile/dashboard/employer/jobs"
                        className=" hover:cursor-pointer ">
                      Advertise
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/find-candidates" 
                        className="hover:cursor-pointer">
                      Find Candidates
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/profile/dashboard/employer/candidates" 
                        className="hover:cursor-pointer">
                      My candidates  
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {/* 
                    add more dropdown items if needed
                   */}
                </DropdownMenuItem>
                </>
              ):null}

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
              variant="default"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="text-sm mr-2 h-4 w-4" /> Logout
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center text-sm">
          <button className="flex items-center border-0 p-1 text-sm hover:scale-95 text-orange-500" onClick={() => signIn()}>
            {/* <LogIn className="mr-2 h-4 w-4" /> */}
             LogIn
          </button>
          <Link className="flex items-center text-sm p-2 px-2 rounded-lg  border-orange-400 text-white bg-primary hover:scale-95 hover:text-orange-500" href="/auth/signup/">
            {/* <UserPlus className="mr-2 h-4 w-4" /> */}
             Register
          </Link>
        </div>
      )}

    </>
  );
}
