import { getApplicationById } from "@/actions/applications/get-application-by-id";
import { ChangeApplicationStatusForm } from "@/components/dashboard/employer/applications/ChangeStatus";
import { Badge } from "@/components/ui/badge";
import { getCurrentSessionUser } from "@/lib/auth";
import { ApplicationStatus, Role } from "@prisma/client";
import {
  ArrowLeft,
  BriefcaseBusiness,
  BriefcaseIcon,
  ChevronRight,
  Flag,
  GraduationCap,
  Hammer,
  MapPin,
  ReceiptTextIcon,
  UserSquareIcon,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: {
    applicationId: string;
  };
};

const page = async ({ params }: Props) => {
  const user = await getCurrentSessionUser();
  if (user.role !== Role.EMPLOYER && user.role !== Role.ADMIN) {
    return redirect("/");
  }
  const application = await getApplicationById(params.applicationId);

  if (!application) {
    return redirect("/profile/dashboard/employer/applications");
  }
  return (
    <div className="space-y-4 p-6">
      <Link
        href="/profile/dashboard/employer/applications"
        className="inline-flex items-center gap-2"
      >
        <ArrowLeft className="h-6 w-6 text-primary" />
        Back
      </Link>
      <div className="rounded-sm p-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <h1 className="my-4 flex items-center gap-4 text-2xl font-bold">
          Job Application
          <BriefcaseIcon className="h-6 w-6 text-primary" />
        </h1>
        <div className="space-y-4">
          <div className="rounded-md bg-sky-100 p-4">
            <Link
              href={`/profile/dashboard/employer/candidates/${application?.user?.id}`}
              className="mb-2 flex items-center text-[0.9rem] font-medium text-sky-700"
              target="_blank"
            >
              Job Summary: {application?.job.title || "N/A"}
            </Link>
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-primary" />
              <p className="text-[0.9rem] font-medium text-zinc-700">
                Country: {application?.job?.country || "N/A"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <p className="text-[0.9rem] font-medium text-zinc-700">
                City: {application?.job?.city || "N/A"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              <p className="text-[0.9rem] font-medium text-zinc-700">
                Edication: {application?.job.education?.label || "N/A"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <ReceiptTextIcon className="h-4 w-4 text-primary" />
              <p className="text-[0.9rem] font-medium text-zinc-700">
                Contract: {application?.job.contractType || "N/A"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <BriefcaseBusiness className="h-4 w-4 text-primary" />
              <p className="text-[0.9rem] font-medium text-zinc-700">
                Positions: {application?.job?.numberOfPositions || "N/A"}
              </p>
            </div>
            <Link
              href={`/profile/dashboard/employer/jobs/${application?.job?.id}`}
              className="flex items-center text-[0.9rem] font-medium text-sky-700"
              target="_blank"
            >
              View full job profile
              <ChevronRight />
            </Link>
          </div>
          <div className="rounded-md bg-sky-100 p-4">
            <Link
              href={`/profile/dashboard/employer/candidates/${application?.user?.id}`}
              className="mb-2 flex items-center text-[0.9rem] font-medium text-sky-700"
              target="_blank"
            >
              Applicant Summary:{" "}
              {application?.user?.profile?.firstName || "N/A"}{" "}
              {application?.user?.profile?.lastName || "N/A"}
            </Link>
            <div className="flex items-center gap-2">
              <UserSquareIcon className="h-4 w-4 text-primary" />
              <p className="text-[0.9rem] font-medium text-zinc-700">
                {application?.user?.jobSeekerProfile?.cvHeadLine || "N/A"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Flag className="h-4 w-4 text-primary" />
              <p className="text-[0.9rem] font-medium text-zinc-700">
                Country: {application?.user?.jobSeekerProfile?.country || "N/A"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              <p className="text-[0.9rem] font-medium text-zinc-700">
                Edication:{" "}
                {application?.user?.jobSeekerProfile?.education?.label || "N/A"}
              </p>
            </div>

            <div className="text-[0.9rem] font-medium text-zinc-700">
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
            </div>
            <div className="flex items-center gap-2 text-[0.8rem] text-zinc-700">
              <span className="flex items-center gap-2 text-[0.9rem] font-medium">
                <Hammer className="h-4 w-4 text-primary" />
                Skills
              </span>
              {application.user?.jobSeekerProfile?.skills && (
                <div className="space-x-2">
                  {application.user?.jobSeekerProfile.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="py-1text-primary rounded-[0.7rem] bg-primary/10 px-2"
                    >
                      {skill.skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <Link
              href={`/profile/dashboard/employer/candidates/${application?.user?.id}`}
              className="flex items-center text-[0.9rem] font-medium text-sky-700"
              target="_blank"
            >
              View full applicant profile
              <ChevronRight />
            </Link>
          </div>
        </div>
      </div>
      <div className="rounded-md bg-sky-100 md:p-8">
        <div className="rounded-md bg-white p-4">
          <ChangeApplicationStatusForm
            applicationId={params.applicationId}
            initialData={{ status: application?.status }}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
