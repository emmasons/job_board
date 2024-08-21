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
  let tableCandidates;
  if (candidates && candidates.length > 0) {
    tableCandidates = candidates.map((candidate) => ({
      id: candidate.id,
      country: candidate.jobSeekerProfile?.country,
      jobTitle: candidate.jobSeekerProfile?.cvHeadLine,
      phoneNumber: candidate.profile?.phoneNumber,
      email: candidate.email,
      name: `${candidate.profile?.firstName} ${candidate.profile?.lastName}`,
    }));
  }

  return (
    <div className="p-6">
      <DataTable columns={columns} data={tableCandidates} />
    </div>
  );
};

export default page;
