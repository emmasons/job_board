import { getJobById } from "@/actions/get-job-by-id";
import { getUserPurchase } from "@/actions/get-user-purchase";
import { Preview } from "@/components/ckeditor/RichTextRenderer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getCurrentSessionUser } from "@/lib/auth";
import { FileText } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    jobId: string;
  };
};

const page = async (props: Props) => {
  const user = await getCurrentSessionUser();
  if (!user) {
    return redirect("/auth/signin?callbackUrl=/jobs/[jobId]/apply");
  }

  const job = await getJobById(props.params.jobId);
  return (
    <div className="h-full bg-zinc-100">
      <MaxWidthWrapper className="py-4">
        <div className="mt-6 flex flex-col gap-12 rounded-md bg-white p-8">
          <h1 className="flex items-center gap-4 text-2xl font-bold text-zinc-700">
            Apply for {job?.title}
            <FileText className="h-6 w-6 text-primary" />
          </h1>
          <div className="border-l-[0.3em] border-zinc-400 bg-zinc-100 pl-4">
            <Preview value={job?.howToApply} />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
