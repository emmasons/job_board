import { getEmployerCandidates } from "@/actions/get-employer-candidates";
import { columns } from "@/components/dashboard/employer/candidates/Columns";
import { DataTable } from "@/components/dashboard/employer/candidates/DataTable";
import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.EMPLOYER)) {
    return redirect("/");
  }
  const candidates = await getEmployerCandidates(user.id);
  return (
    <div className="p-6">
      <DataTable columns={columns} data={candidates} />
    </div>
  );
};

export default page;
