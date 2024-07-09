"use client";

import {
  BarChart,
  Files,
  FileBarChart,
  Layout,
  Settings2,
  Users2,
  BriefcaseIcon,
  LayoutDashboardIcon,
  Users,
  BarChart2Icon,
} from "lucide-react";

import { usePathname } from "next/navigation";
import { SidebarItem } from "./SidebarItem";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/profile/dashboard",
  },
  {
    icon: Settings2,
    label: "Profile Settings",
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
    <div className="flex w-full flex-col">
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
