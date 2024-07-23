"use client";

import {
  BarChart,
  Files,
  FileBarChart,
  Layout,
  Settings,
  Settings2,
  Bookmark,
  Users2,
  BriefcaseIcon,
  LayoutDashboard,
  LayoutDashboardIcon,
  Users,
  BarChart2Icon,
} from "lucide-react";

import { usePathname } from "next/navigation";
import { SidebarItem } from "./SidebarItem";

const guestRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/profile/main-dashboard",
  },
  {
    icon: Users2,
    label: "My Profile",
    href: "/profile/dashboard",
  },
  {
    icon: Bookmark,
    label: "Saved Job",
    href: "/profile/saved",
  },
  {
    icon: Settings,
    label: "Account Settings",
    href: "/profile/settings",
  },
];

const staffRoutes = [
  {
    icon: LayoutDashboardIcon,
    label: "Home",
    href: "/profile/dashboard/staff",
  },
];

const employerRoutes = [
  {
    icon: LayoutDashboardIcon,
    label: "Home",
    href: "/profile/dashboard/employer",
  },
  {
    icon: BriefcaseIcon,
    label: "Jobs",
    href: "/profile/dashboard/employer/jobs",
  },
  {
    icon: Users,
    label: "Candidates",
    href: "/profile/dashboard/employer/candidates",
  },
  {
    icon: Files,
    label: "Applications",
    href: "/profile/dashboard/employer/applications",
  },
];

const adminRoutes = [
  {
    icon: Users2,
    label: "Users",
    href: "/profile/dashboard/admin/users",
  },
  {
    icon: BarChart2Icon,
    label: "Data",
    href: "/profile/dashboard/admin/data",
  },
  {
    icon: Files,
    label: "Blogs",
    href: "/profile/dashboard/admin/blog",
  },
  {
    icon: FileBarChart,
    label: "Cv Services",
    href: "/profile/dashboard/admin/service",
  },
];

export default function SidebarRoutes() {
  const pathname = usePathname();

  const isStaffPage = pathname?.includes("/staff");
  const isAdminPage = pathname?.includes("/admin");
  const isEmployerPage = pathname?.includes("/employer");

  const routes = isStaffPage
    ? staffRoutes
    : isAdminPage
      ? adminRoutes
      : isEmployerPage
        ? employerRoutes
        : guestRoutes;

  return (
    <div className="flex h-full w-full flex-col">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
}
