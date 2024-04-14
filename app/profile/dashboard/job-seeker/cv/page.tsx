import { redirect } from "next/navigation";
import { getCurrentSessionUser } from "@/lib/auth";

import { Role } from "@prisma/client";
import { getUserCv } from "@/actions/get-user-cv";
import UploadCV from "@/components/dashboard/job-seeker/cv/UploadCV";
import { Settings } from "lucide-react";

type Props = {};

const page = async (props: Props) => {
  const user = await getCurrentSessionUser();
  if (!user || !(user.role === Role.JOB_SEEKER)) {
    return redirect("/");
  }
  const cv = await getUserCv(user.id);
  return (
    <div className="p-6">
      <div className="md:w-1/2">
        <h1 className="text-pes-red my-4 flex items-center gap-4 text-2xl font-bold">
          CV Settings
          <Settings className="h-6 w-6 text-primary" />
        </h1>
        <UploadCV cv={cv} />
      </div>
    </div>
  );
};

export default page;
