import Login from "@/components/auth/Login";
import { getCurrentSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign in",
};
type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

const page = async (props: Props) => {
  const user = await getCurrentSessionUser();
  if (user) {
    return redirect("/profile/settings/");
  }
  return (
    <div className="flex flex-wrap justify-between basis-full">
      <div className="rounded-md bg-slate-50 w-full">
        <Login
          error={props.searchParams?.error}
          callbackUrl={props.searchParams?.callbackUrl}
        />
      </div>
    </div>
  );
};

export default page;
