import { getCompanyForUser } from "@/actions/get-company-for-user";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { BriefcaseIcon, ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.EMPLOYER)) {
    return redirect("/");
  }
  const company = await getCompanyForUser(user.id);
  return (
    <div className="p-6">
      <h1 className="my-4 flex items-center gap-4 text-2xl font-bold">
        Company Settings
        <BriefcaseIcon className="h-6 w-6 text-primary" />
      </h1>
      {company ? (
        <Link href={`/profile/dashboard/staff/company/${company.id}`}>
          Company: {company.companyName}
        </Link>
      ) : (
        <Link
          href="/profile/dashboard/staff/company"
          className="inline-flex items-center rounded-md bg-slate-200 p-4 text-sky-700 hover:text-sky-500"
        >
          <p>Please set up your company</p>
          <ChevronRight />
        </Link>
      )}
    </div>
  );
};

export default page;
