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
import { ChevronDown, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UserMenuButtonProps {
  user: Session["user"] | undefined;
}

export default function UserMenuButton({ user }: UserMenuButtonProps) {
  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="focus-within:ring-transparent">
            <div className="flex items-center">
              <Image
                src={user?.image || profilePicPlaceholder}
                alt="Profile picture"
                width={40}
                height={40}
                className="w-10 rounded-full"
              />
              <ChevronDown />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Hi, {user?.lastName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="mb-2 py-2">
              <Link href="/dashboard/profile" className="hover:cursor-pointer">
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
        <Button size="sm" variant="default" onClick={() => signIn()}>
          <LogIn className="mr-2 h-4 w-4" /> LogIn
        </Button>
      )}
    </>
  );
}
