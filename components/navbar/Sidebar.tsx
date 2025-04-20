import { User2 } from "lucide-react";
import Link from "next/link";
import SidebarRoutes from "./SidebarRoutes";

export const Sidebar = () => {
  return (
    <div className="flex h-full flex-col items-center overflow-y-auto border-r bg-white shadow-sm">
      <div className="p-12">
        <Link href="/profile/settings/">
          <User2 className="h-16 w-16 rounded-full border" />
        </Link>
      </div>
      <div className="flex w-full flex-col">
        <SidebarRoutes />
      </div>
    </div>
  );
};
