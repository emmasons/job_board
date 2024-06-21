import { getCurrentSessionUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const user = await getCurrentSessionUser();
  if (!user) {
    return redirect("/auth/signin?callbackUrl=/profile/dashboard");
  }

  if (user.role === Role.EMPLOYER) {
    return redirect("/profile/dashboard/employer");
  }

  if (user.role === Role.JOB_SEEKER) {
    return redirect("/profile/dashboard/job-seeker");
  }
  return <div className="p-6">Dashboard</div>;
};

export default Dashboard;
