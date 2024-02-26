import NavbarRoutes from "@/components/navbar/NavbarRoutes";

import { MobileSidebar } from "@/components/navbar/MobileSidebar";
import { getCurrentSessionUser } from "@/lib/auth";

export const Navbar = async () => {
  const user = await getCurrentSessionUser();
  return (
    <div className="flex h-full items-center border-b bg-white p-4 shadow-sm">
      <MobileSidebar />
      <NavbarRoutes user={user} />
    </div>
  );
};
