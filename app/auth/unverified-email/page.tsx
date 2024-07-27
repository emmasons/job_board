import ResendEmail from "@/components/auth/ResendEmail";
import { HomeIcon, MailWarning } from "lucide-react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";

type Props = {
  searchParams: Record<"u", string>;
};

const page = async (props: Props) => {
  const userId = props.searchParams.u;
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return notFound();
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-slate-50 p-8 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
        <MailWarning className="h-16 w-16 text-white" />
        <h2 className="text-2xl font-bold text-secondary">
          Verify your email address
        </h2>
        <p className="text-center text-secondary">
          We noticed your email address has not been verified. <br />
          We have sent a verification link to your inbox <br />
          Click on the link to complete the verification process. <br />
          You might need to check your spam folder if you can&apos;t see it or
          <br />
          click the resend button below.
        </p>
        <div className="flex gap-4">
          <ResendEmail toEmail={user.email} />
          <Link
            href="/"
            className="flex items-center justify-center rounded-md bg-secondary px-4"
          >
            <HomeIcon className="h-5 w-5 text-primary" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
