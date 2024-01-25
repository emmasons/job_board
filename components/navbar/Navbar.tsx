import NavbarRoutes from "./NavbarRoutes";
import { MobileSidebar } from "./MobileSidebar";
import { getCurrentSessionUser } from "@/lib/auth";

const Navbar = async () => {
  const user = await getCurrentSessionUser();

  return (
    <header className="h-16 bg-zinc-100 text-zinc-900 shadow-md">
      <nav className="flex h-full w-full items-center justify-between px-10 py-4">
        <MobileSidebar />
        <NavbarRoutes user={user} />
      </nav>
    </header>
  );
};

export default Navbar;
