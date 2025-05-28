import Link from "next/link";
import { Session } from "next-auth";
import { Logo } from "./Logo";
import Common from "./Common";
import JobsDropdown from "./jobs-dropdown";
import BlogsDropdown from "./blogs-dropdown";
import ServicesDropdown from "./services-dropdown";
import UserMenuButton from "./UserMenuButton";
import Notifications from "../notifications/Notifications";

interface Props {
  user: Session["user"] | undefined;
}

export default function NavbarRoutes({ user }: Props) {
  return (
    <>
      <div className="hidden flex-auto md:block">
        <div className="flex w-full justify-between align-middle">
          <Link href="/">
            <Logo />
          </Link>
          <div className="ml-auto mr-auto flex items-center gap-x-2 text-sm">
            <div className="group relative">
              <Common />
            </div>
            <div className="group relative">
              <JobsDropdown />
            </div>
            <div className="group relative">
              <BlogsDropdown />
            </div>
            <div className="group relative">
              <ServicesDropdown />
            </div>
            <ul className="py-2 flex">
              <li>
                <Link
                  href="/subscription/plans"
                  className="block px-4 py-2 uppercase text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/create-cover-letter/templates"
                  className="block px-4 py-2 uppercase text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                >
                  Cover Letter
                </Link>
              </li>
            </ul>
            
          </div>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-x-2">
        <UserMenuButton user={user} />
        <div className="">
          <Link
            href="/profile/dashboard/notifications"
            className="px-4 pb-7 text-sm font-medium text-gray-700 hover:text-orange-500"
          >
            <Notifications userId={user?.id} />
          </Link>
        </div>
      </div>
    </>
  );
}
