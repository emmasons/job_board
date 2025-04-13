import { getEmployerProfile } from "@/actions/employer/get-profile";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import {
  BriefcaseIcon,
  ChevronRight,
  Hammer,
  Mail,
  MapPin,
  Pencil,
  PhoneIcon,
  UserCogIcon,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentSessionUser();
  if (user.role !== Role.EMPLOYER && user.role !== Role.ADMIN) {
    return redirect("/");
  }

  const employer = await getEmployerProfile(user.id);
  if (!employer) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="h-full bg-slate-50 p-6">
      <div className="space-y-4 md:w-2/3">
        <div className="justify-between gap-4 rounded-md bg-white p-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] md:flex">
          <div className="flex-1">
            <h1 className="my-4 flex items-center gap-4 text-2xl font-bold">
              <BriefcaseIcon className="h-6 w-6 text-primary" />
              {employer.employerProfile?.company?.companyName}
              <Link
                href={`/profile/dashboard/employer/company/${employer.employerProfile?.company?.id}`}
              >
                <Pencil className="h-6 w-6 text-primary" />
              </Link>
            </h1>
            <p className="my-4 flex items-center gap-4 text-lg capitalize">
              <Hammer className="h-6 w-6 text-primary" />
              {employer.employerProfile?.company?.sector?.label}
            </p>
            <p className="my-4 flex items-center gap-4 text-lg capitalize">
              <MapPin className="h-6 w-6 text-primary" />
              {employer.address?.city}
            </p>
          </div>
          <div className="flex-1">
            <Link
              href={`/profile/settings`}
              className="my-4 flex items-center gap-4 text-lg font-bold hover:text-zinc-500"
            >
              <UserCogIcon className="h-6 w-6 text-primary" />
              {employer.profile?.firstName} {employer.profile?.lastName}
            </Link>
            <p className="my-4 flex items-center gap-4 text-sm">
              <PhoneIcon className="h-6 w-6 text-primary" />
              {employer.profile?.phoneNumber}
            </p>
            <p className="my-4 flex items-center gap-4 text-sm">
              <Mail className="h-6 w-6 text-primary" />
              {employer.email}
            </p>
          </div>
        </div>
        <div className="grid-cols-3 justify-between  gap-2 md:grid ">
          <div className="flex w-full flex-col items-center rounded-md bg-white p-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
            <Link
              href={"/profile/dashboard/employer/jobs"}
              className="my-4 flex items-center gap-4 border-b text-lg font-bold text-zinc-600 hover:text-secondary"
            >
              All Jobs
              <ChevronRight className="h-6 w-6  hover:text-secondary" />
            </Link>
            <p className="text-[1.2rem] font-bold text-primary">
              {employer.employerProfile?.company?.jobs?.length}
            </p>
          </div>
          <div className="flex w-full flex-col items-center rounded-md bg-white p-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
            <h2 className="my-4 flex items-center gap-4 border-b text-lg font-bold text-zinc-600">
              Open Jobs
            </h2>
            <p className="text-[1.2rem] font-bold text-primary">
              {employer.employerProfile?.company?.jobs?.reduce(
                (total, job) => (job.isOpen ? total + 1 : total),
                0,
              )}
            </p>
          </div>
          <div className="flex w-full flex-col items-center rounded-md bg-white p-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
            <h2 className="my-4 flex items-center gap-4 border-b text-lg font-bold text-zinc-600">
              Closed Jobs
            </h2>
            <p className="text-[1.2rem] font-bold text-primary">
              {employer.employerProfile?.company?.jobs?.reduce(
                (total, job) => (!job.isOpen ? total + 1 : total),
                0,
              )}
            </p>
          </div>
        </div>
        <div className="flex w-[calc(33%-0.25rem)] flex-col items-center rounded-md bg-white p-8 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
          <h2 className="my-4 flex items-center gap-4 border-b text-lg font-bold text-zinc-600">
            Total Candidates
          </h2>
          <p className="text-[1.2rem] font-bold text-primary">
            {employer.candidates?.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
