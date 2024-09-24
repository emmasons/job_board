import Login from "@/components/auth/Login";
import SignupMessage from "@/components/auth/SignupMessage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
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
    <MaxWidthWrapper className="flex w-full justify-between">
      <SignupMessage />
      <div className="rounded-md bg-slate-50 md:p-24">
        <Login
          error={props.searchParams?.error}
          callbackUrl={props.searchParams?.callbackUrl}
        />
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
