"use client";

import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { Logo } from "./Logo";

import UserMenuButton from "./UserMenuButton";
import { Role } from "@prisma/client";
import EmployerOptions from "./EmployerOptions";
import JobSeekerOptions from "./JobSeekerOptions";

interface Props {
  user: Session["user"] | undefined;
}

export default function NavbarRoutes({ user }: Props) {
  const pathname = usePathname();

  const isStaffPage = pathname?.includes("/staff");
  const isAdminPage = pathname?.includes("/admin");
  const isDashboard = pathname?.includes("/profile/dashboard");
  const isEmployerPage = pathname?.includes("/employer");

  return (
    <>
      <div className="hidden flex-1 md:block">
        <div className="flex w-full justify-between gap-x-2 align-middle">
          <Link href="/">
            <Logo />
          </Link>
          {!isDashboard && (
            <ul className="flex items-center gap-4">
              <li className="mr-4">
                <JobSeekerOptions />
              </li>
              <li className="mr-4">
                <EmployerOptions />
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
          <Link href="/profile/dashboard/staff/jobs">
            <Button size="sm" variant="outline" className="h-auto py-2">
              Staff Dashboard
            </Button>
          </Link>
        ) : null}

        {user?.role === Role.EMPLOYER && isEmployerPage ? (
          <Link href="/profile/dashboard">
            <Button size="sm" variant="ghost">
              <LogOut className="mr-2 h-4 w-4" />
              Exit
            </Button>
          </Link>
        ) : user?.role === Role.EMPLOYER ? (
          <Link href="/profile/dashboard/employer">
            <Button size="sm" variant="outline" className="h-auto py-2">
              Employers Dashboard
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
              Admin Dashboard
            </Button>
          </Link>
        ) : null}

        <UserMenuButton user={user} />
      </div>
    </>
  );
}
