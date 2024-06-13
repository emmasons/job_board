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
              <ChevronDown className="w-4 h-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Hi, {user?.lastName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="mb-2 py-2">
              <Link href="/profile/dashboard/" className="hover:cursor-pointer">
                Profile
              </Link>
            </DropdownMenuItem>
            <Button
              size="sm"
              variant="default"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex">
          <button className="flex items-center border-0 p-2 text-medium hover:scale-95 hover:text-orange-500" onClick={() => signIn()}>
            <LogIn className="mr-2 h-4 w-4" /> LogIn
          </button>
          <Link className="flex items-center p-2  border border-orange-400 rounded-lg bg-orange-400 h-9 hover:scale-95" href="/auth/signup/job-seeker">
            <UserPlus className="mr-2 h-4 w-4" /> Register
          </Link>
        </div>
      )}
      
      
     
    </>
  );
}
