import { Banner } from "@/components/Banner";
import { Actions } from "@/components/dashboard/admin/post/Actions";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/IconBadge";
import { LayoutDashboard } from "lucide-react";
import TitleForm from "@/components/dashboard/admin/service/TitleForm";
import EpigraphForm from "@/components/dashboard/admin/post/EpigraphForm";
import IsFeaturedForm from "@/components/dashboard/admin/post/IsFeatured";
import IsPublishedForm from "@/components/dashboard/admin/post/IsPublished";
import PostImageForm from "@/components/dashboard/admin/post/PostImageForm";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import ContentForm from "@/components/dashboard/admin/post/ContentForm";

interface ServiceProps{
  params: {
    serviceId: string;
  }
}

const Service = async ({params}: ServiceProps) => {
  const {serviceId} = params;
  const user = await getCurrentSessionUser();

  if (!user) {
    return redirect("/");
  }

  const service = await db.service.findUnique({
    where: {
      slug: serviceId,
    },
  });

  if (!service) {
    return redirect("/admin/dashboard/");
  }
  const gcpData = await getLatestFileMetaData(service.id);
  const requiredFields = [
    service.title,
    service.description,
   
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Update Your Service</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>

        </div>
        <div className="mt-16 ">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your service</h2>
            </div>
            <TitleForm initialData={service} serviceId={service.slug} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Service;
