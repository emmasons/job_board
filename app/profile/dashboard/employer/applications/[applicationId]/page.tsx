import { getApplicationById } from "@/actions/applications/get-application-by-id";
import { ChangeApplicationStatusForm } from "@/components/dashboard/employer/applications/ChangeStatus";
import { Badge } from "@/components/ui/badge";
import { getCurrentSessionUser } from "@/lib/auth";
import { ApplicationStatus, Role } from "@prisma/client";
import { BriefcaseIcon, ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: {
    applicationId: string;
  };
};

const page = async ({ params }: Props) => {
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.EMPLOYER)) {
    return redirect("/");
  }
  const application = await getApplicationById(params.applicationId);
  console.log(application?.status, "**********");
  if (!application) {
    return redirect("/profile/dashboard/employer/applications");
  }
  return (
    <div className="space-y-4 p-6">
      <div className="rounded-sm p-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <h1 className="my-4 flex items-center gap-4 text-2xl font-bold">
          Job Application
          <BriefcaseIcon className="h-6 w-6 text-primary" />
        </h1>
        <p className="text-lg font-medium text-zinc-700">
          {application?.job?.title}
        </p>
        <p className="text-lg font-medium text-zinc-700">
          Company Name: {application?.job?.company?.companyName || "N/A"}
        </p>
        <p className="text-lg font-medium text-zinc-700">
          Location: {application?.job?.city || "N/A"}
        </p>
        <p className="text-lg font-medium text-zinc-700">
          Status:{" "}
          {application?.status === ApplicationStatus.ACCEPTED ? (
            <Badge variant="default" className="bg-green-600">
              Accepted
            </Badge>
          ) : application?.status === ApplicationStatus.REJECTED ? (
            <Badge variant="default" className="bg-orange-600">
              Rejected
            </Badge>
          ) : (
            <Badge variant="default" className="bg-zinc-600">
              Pending
            </Badge>
          )}
        </p>
        <Link
          href={`/profile/dashboard/employer/candidates/${application?.user?.id}`}
          className="flex items-center text-lg font-medium text-sky-700"
        >
          Applicant: {application?.user?.profile?.firstName || "N/A"}{" "}
          {application?.user?.profile?.lastName || "N/A"}
          <ChevronRight />
        </Link>
      </div>
      <div className="shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:p-20">
        <ChangeApplicationStatusForm
          applicationId={params.applicationId}
          initialData={{ status: application?.status }}
        />
      </div>
    </div>
  );
};

export default page;
