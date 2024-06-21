"use client";

import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { Logo } from "./Logo";
import Home from "./home";
import JobsDropdown from "./jobs-dropdown";
import BlogsDropdown from "./blogs-dropdown";
import ServicesDropdown from "./services-dropdown";

import UserMenuButton from "./UserMenuButton";
import { Role } from "@prisma/client";
import EmployerOptions from "./EmployerOptions";

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
      <div className="hidden flex-auto md:block">
        <div className="flex w-full justify-between align-middle">
          <Link href="/">
            <Logo />
          </Link>
          <div className="text-sm ml-auto flex items-center mr-auto gap-x-2">
            <div className="relative group">
              <Home />
            </div>
            <div className="relative group">
              <JobsDropdown />
            </div>
            <div className="relative group">
              <BlogsDropdown />
            </div>
            <div className="relative group">
              <ServicesDropdown/>
            </div>
          </div>


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

        {/* user menu and options */}
        <UserMenuButton user={user} />

        {/* conditionally render the Employers options */}
        {!isDashboard && user?.role !== Role.EMPLOYER &&(
            <ul className="flex items-center gap-4">
              {/* <li className="mr-4">
                <JobSeekerOptions />
              </li> */}
              <li className="mr-4 outline-none">
                <EmployerOptions />
              </li>
            </ul>
          )}

      </div>
    </>
  );
}
