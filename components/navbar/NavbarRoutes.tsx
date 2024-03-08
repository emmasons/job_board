"use client";

import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { Logo } from "./Logo";

import UserMenuButton from "./UserMenuButton";
import { Role } from "@prisma/client";

interface Props {
  user: Session["user"] | undefined;
}

export default function NavbarRoutes({ user }: Props) {
  const pathname = usePathname();

  const isStaffPage = pathname?.includes("/staff");
  const isAdminPage = pathname?.includes("/admin");
  const isDashboard = pathname?.includes("/profile/dashboard");

  return (
    <>
      <div className="hidden flex-1 md:block">
        <div className="flex w-full justify-between gap-x-2 align-middle">
          <Link href="/">
            <Logo />
          </Link>
          {!isDashboard && (
            <ul className="flex items-center">
              <li className="mr-4">
                <Link href="/search">
                  <p className="after:bg-pes-red hover:text-pes-red relative block w-fit cursor-pointer after:absolute after:block after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:transition after:duration-300 after:content-[''] after:hover:scale-x-100">
                    Search
                  </p>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="ml-auto flex items-center gap-x-2">
        {user?.role === Role.STAFF && isStaffPage ? (
          <Link href="/profile/dashboard">
            <Button size="sm" variant="ghost">
              <LogOut className="mr-2 h-4 w-4" />
              Exit
            </Button>
          </Link>
        ) : user?.role === Role.STAFF ? (
          <Link href="/dashboard/staff/courses">
            <Button size="sm" variant="outline" className="h-auto py-2">
              Teacher mode
            </Button>
          </Link>
        ) : null}

        {user?.role === Role.ADMIN && isAdminPage ? (
          <Link href="/profile/dashboard">
            <Button size="sm" variant="ghost">
              <LogOut className="mr-2 h-4 w-4" />
              Exit
            </Button>
          </Link>
        ) : user?.role === Role.ADMIN ? (
          <Link href="/profile/dashboard/admin/users">
            <Button size="sm" variant="outline" className="h-auto py-2">
              Admin mode
            </Button>
          </Link>
        ) : null}

        <UserMenuButton user={user} />
      </div>
    </>
  );
}
