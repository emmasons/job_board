import { CheckCircle2, LogIn, MailOpen } from "lucide-react";
import { verifyEmail } from "../actions/actions";
import Link from "next/link";
import { notFound } from "next/navigation";
import ResendEmail from "@/components/auth/ResendEmail";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
export const metadata: Metadata = {
  title: "Verify your email address",
};
type Props = {
  searchParams: Record<"t", string>;
};
const page = async (props: Props) => {
  const { user, isVerified } = await verifyEmail(props.searchParams.t);
  if (!user) {
    return notFound();
  }

  if (!isVerified) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2 bg-white p-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] ">
          <span className=" bg-white p-2">
            <MailOpen className="h-16 w-16 text-green-400" />
          </span>
          <h2 className="text-2xl font-bold text-secondary">
            Looks like that verification link has expired
          </h2>
          <ResendEmail toEmail={user.email} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 bg-slate-50 p-8 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
        <span className="p-2">
          <CheckCircle2 className="h-16 w-16 text-green-400" />
        </span>
        <h2 className="text-2xl font-bold text-secondary">
          Congratulations, you email has been verified
        </h2>
        <Link
          href="/auth/signin"
          className="flex items-center gap-1 font-semibold text-primary"
        >
          <Button variant="outline">
            Login <LogIn className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
