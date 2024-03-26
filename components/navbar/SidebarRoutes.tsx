"use client";

import {
  BarChart,
  Layout,
  Settings2,
  Users2,
  BriefcaseIcon,
  LayoutDashboardIcon,
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
  {
    icon: BriefcaseIcon,
    label: "Jobs",
    href: "/profile/dashboard/staff/jobs",
  },
];

const adminRoutes = [
  {
    icon: Users2,
    label: "Users",
    href: "/profile/dashboard/admin/users",
  },
];

export default function SidebarRoutes() {
  const pathname = usePathname();

  const isStaffPage = pathname?.includes("/staff");
  const isAdminPage = pathname?.includes("/admin");

  const routes = isStaffPage
    ? staffRoutes
    : isAdminPage
    ? adminRoutes
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
