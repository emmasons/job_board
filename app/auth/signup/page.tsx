import Login from "@/components/auth/Login";
import SignupMessage from "@/components/auth/SignupMessage";
import { Logo } from "@/components/navbar/Logo";
import { getCurrentSessionUser } from "@/lib/auth";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
export const metadata: Metadata = {
  title: "Sign up",
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
    <MaxWidthWrapper className="md:flex py-[5%] gap-8 h-full max-md:h-auto items-center justify-between max-md:space-y-8">
      <div className="basis-1/2">
        <SignupMessage />
      </div>
      <div className="flex h-full flex-col justify-center gap-4 rounded-lg basis-1/2 bg-slate-50 p-8 max-md:h-auto">
        <h1 className="my-4 text-2xl font-bold text-secondary">Create an Account</h1>
        <Link
          href="/auth/signup/employer"
          className="inline-flex w-1/2 items-center max-md:w-full rounded-md bg-slate-200 p-4 text-sky-700 hover:text-sky-500"
        >
          <p>Register as an Employer</p>
          <ChevronRight />
        </Link>
        <Link
          href="/auth/signup/job-seeker"
          className="inline-flex w-1/2 items-center max-md:w-full rounded-md bg-slate-200 p-4 text-sky-700 hover:text-sky-500"
        >
          <p>Register as a Job Seeker</p>
          <ChevronRight />
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
