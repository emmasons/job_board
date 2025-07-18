"use client";

import {
  Files,
  FileBarChart,
  Users2,
  BriefcaseIcon,
  LayoutDashboardIcon,
  Users,
  BarChart2,
  FileText,
  FolderOutput,
  FolderInput,
  Logs,
  Search,
  FilePlus2,
  FileSignature,
  Globe2,
  Info,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

import { usePathname } from "next/navigation";
import { SidebarItem } from "./SidebarItem";

const guestRoutes = [
  {
    icon: Search,
    label: "Job Search",
    href: "/search",
  },
  {
    icon: FilePlus2,
    label: "Create a CV",
    href: "/generate-cv",
  },
  {
    icon: FileSignature,
    label: "Cover Letter",
    href: "/cover-letter-services",
  },
  {
    icon: Globe2,
    label: "Visa Eligibility",
    href: "/visa-eligibility-checker",
  },
  {
    icon: Info,
    label: "About Talentra",
    href: "/about",
  },
  {
    icon: ShieldCheck,
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    icon: HelpCircle,
    label: "FAQs",
    href: "/FAQs",
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
    label: "Jobs Posted",
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
  {
    icon: FileText,
    label: "Generated CVs",
    href: "/profile/dashboard/employer/generated-cvs",
  },
];

const adminRoutes = [
  {
    icon: Users2,
    label: "Users",
    href: "/profile/dashboard/admin/users",
  },

  {
    icon: BarChart2,
    label: "Metrics",
    href: "/profile/dashboard/admin/metrics",
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
  {
    icon: FolderOutput,
    label: "Scraped Jobs",
    href: "/profile/dashboard/admin/scraped-jobs",
  },
  {
    icon: FolderInput,
    label: "All Jobs",
    href: "/profile/dashboard/admin/all-jobs",
  },
  {
    icon: FileText,
    label: "Generated CVs",
    href: "/profile/dashboard/admin/generated-cvs",
  },

  {
    icon: Logs,
    label: "Log Errors",
    href: "/profile/dashboard/admin/logging",
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
