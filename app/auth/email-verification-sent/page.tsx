import ResendEmail from "@/components/auth/ResendEmail";
import { db } from "@/lib/db";
import { HomeIcon, Mail } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Verify your email address",
};

type Props = {
  searchParams: Record<"t", string>;
};
const page = async (props: Props) => {
  const user = await db.user.findUnique({
    where: {
      id: props.searchParams?.t,
    },
  });

  if (!user) {
    return notFound();
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2 rounded-md bg-slate-50 p-8 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
        <Mail className="h-16 w-16 text-green-400" />
        <h2 className="text-2xl font-bold text-secondary">
          Verify your email address
        </h2>
        <p className="w-[70%] text-center text-secondary">
          We have sent a verification link to your inbox Click on the link to
          complete the verification process. You might need to check your spam
          folder if you can&apos;t see it.
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
