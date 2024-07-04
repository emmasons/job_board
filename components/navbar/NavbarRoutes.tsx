
import Link from "next/link";
import { Session } from "next-auth";
import { Logo } from "./Logo";
import Home from "./home";
import JobsDropdown from "./jobs-dropdown";
import BlogsDropdown from "./blogs-dropdown";
import ServicesDropdown from "./services-dropdown";
import UserMenuButton from "./UserMenuButton";

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

        <UserMenuButton user={user} />
    
      </div>
    </>
  );
}
