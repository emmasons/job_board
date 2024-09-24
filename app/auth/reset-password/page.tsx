import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Reset Password",
};
type Props = {
  searchParams: Record<"email", string>;
};
const page = async (props: Props) => {
  if (!props.searchParams.email) {
    return notFound();
  }
  return (
    <MaxWidthWrapper className="flex h-full w-full flex-col justify-center">
      <div className="gap-2 rounded-md bg-slate-50 p-8 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]">
        <ResetPasswordForm email={props.searchParams.email} />
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
