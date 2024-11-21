import Login from "@/components/auth/Login";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SignupMessage from "@/components/auth/SignupMessage";
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
   <MaxWidthWrapper className="flex gap-8 h-full items-center justify-between max-md:flex-col" >
    <div className="md:basis-1/2">
      <SignupMessage/>
    </div>
    <div className="flex md:basis-1/2 h-full flex-col justify-center gap-4 rounded-md bg-slate-50 p-8 max-md:w-full">
        <Login
          error={props.searchParams?.error}
          callbackUrl={props.searchParams?.callbackUrl}
        />
      </div>
    </div>
  );
};

export default page;
