import Link from "next/link";
import { options } from "../app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

const Navbar = async () => {
  const session = await getServerSession(options);

  return (
    <header className="bg-zinc-100 text-zinc-900 shadow-md">
      <nav className="flex w-full items-center justify-between px-10 py-4">
        <div>My Site</div>
        <div className="flex gap-10">
          <Link href="/">Home</Link>
          <Link href="/admin">Admin</Link>
          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
          ) : (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
