"use client";

import {
  BarChart,
  Compass,
  Layout,
  List,
  FolderCheck,
  Settings2,
  FileStack,
  Library,
  Users2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./SidebarItem";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Compass,
    label: "Courses",
    href: "/dashboard/student/courses",
  },
  {
    icon: FileStack,
    label: "My Quizzes",
    href: "#",
  },
  {
    icon: Settings2,
    label: "Profile Settings",
    href: "/dashboard/profile",
  },
];

const instructorRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/dashboard/instructor/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/dashboard/instructor/analytics",
  },
  {
    icon: FolderCheck,
    label: "Quizzes",
    href: "/dashboard/instructor/quizzes",
  },
];

const adminRoutes = [
  {
    icon: Users2,
    label: "Users",
    href: "/dashboard/admin/users",
  },
  {
    icon: Library,
    label: "Courses",
    href: "/dashboard/admin/courses",
  },
];

export default function SidebarRoutes() {
  const pathname = usePathname();

  const isInstructorPage = pathname?.includes("/instructor");
  const isAdminPage = pathname?.includes("/admin");

  const routes = isInstructorPage
    ? instructorRoutes
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
