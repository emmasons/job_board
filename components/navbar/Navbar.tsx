import NavbarRoutes from "./NavbarRoutes";
import { MobileSidebar } from "./MobileSidebar";
import { getCurrentSessionUser } from "@/lib/auth";

const Navbar = async () => {
  const user = await getCurrentSessionUser();

  return (
    <header className="flex h-full items-center border-b bg-white p-6 shadow-sm">
      <nav className="flex h-full w-full items-center justify-between sm:p-2">
        <MobileSidebar />

        {/* <jobs/> */}
        <NavbarRoutes user={user} />
      </nav>
    </header>
  );
};

export default Navbar;
