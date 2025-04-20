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
    <MaxWidthWrapper className="flex h-full items-center justify-between gap-8 max-md:flex-col">
      <div className="md:basis-1/2">
        <SignupMessage />
      </div>
      <div className="flex h-full flex-col justify-center gap-4 rounded-md bg-slate-50 p-8 max-md:w-full md:basis-1/2">
        <Login
          error={props.searchParams?.error}
          callbackUrl={props.searchParams?.callbackUrl}
        />
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
