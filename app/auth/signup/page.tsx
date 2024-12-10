import { getCurrentSessionUser } from "@/lib/auth";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

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
    <div className="w-full basis-full">
      <div className="flex flex-col md:h-full justify-center gap-4 rounded-lg bg-slate-50 p-8">
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
    </div>
  );
};

export default page;
