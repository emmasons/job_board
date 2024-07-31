import { notFound, redirect } from "next/navigation";
import FirstNameForm from "@/components/dashboard/profile/FirstNameForm";
import { db } from "@/lib/db";
import PhoneNumberForm from "@/components/dashboard/profile/PhoneNumberForm";
import LastNameForm from "@/components/dashboard/profile/LastNameForm";
import { Info, KeyRound, Mail, Settings } from "lucide-react";
import ChangeEmailForm from "@/components/dashboard/profile/ChangeEmailForm";
import ChangePasswordForm from "@/components/dashboard/profile/ChangePasswordForm";
import { getCurrentSessionUser } from "@/lib/auth";
import AvatarForm from "@/components/dashboard/profile/AvatarForm";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import { GCProfiler } from "v8";

const page = async () => {
  const user = await getCurrentSessionUser();

  if (!user) {
    return redirect("/");
  }
  const currentUser = await db.user.findUnique({
    where: { id: user.id },
    include: { profile: true },
  });

  if (!currentUser) {
    return notFound();
  }
  const imageMetaData = await getLatestFileMetaData(currentUser.id);

  return (
    <div className="p-12">
      <h1 className="text-pes-red my-4 flex items-center gap-4 text-2xl font-bold">
        Profile Settings
        <Settings className="h-6 w-6 text-primary" />
      </h1>
      <div className="mb-8 gap-6 md:flex">
        <div className="basis-1/2">
          {user.registeredUser && (
            <div className="mb-4">
              <AvatarForm
                userId={currentUser.id}
                isDeleting={false}
                gcpData={imageMetaData}
              />
            </div>
          )}
          <div className="mb-4">
            <FirstNameForm
              userId={currentUser.id}
              initialData={{
                firstName: currentUser.profile?.firstName || "N/A",
              }}
            />
          </div>
          <div className="mb-4">
            <PhoneNumberForm
              initialData={{
                phoneNumber: currentUser.profile?.phoneNumber || "N/A",
              }}
              userId={currentUser.id}
            />
          </div>
          <div className="mb-4">
            <LastNameForm
              initialData={{
                lastName: currentUser.profile?.lastName || "N/A",
              }}
              userId={currentUser.id}
            />
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-pes-red my-4 flex items-center gap-4 text-2xl font-bold">
          Account Settings
          <KeyRound className="h-6 w-6 text-primary" />
        </h1>
        <div>
          <span className="flex  items-center gap-2">
            <Info className="text-pes-red h-4 w-4" />
            <p className="text-pes-blue italic">
              You will be logged out after changing your email or password.
            </p>
          </span>
          <div>
            <h2 className="text-pes-red my-4 flex items-center gap-4 text-xl font-bold">
              Change email
              <Mail className="h-6 w-6 text-primary" />
            </h2>
            <ChangeEmailForm
              initialData={{
                email: currentUser.email,
              }}
              userId={currentUser.id}
            />
          </div>
          <div>
            <h2 className="text-pes-red my-4 flex items-center gap-4 text-xl font-bold">
              Change Password
              <KeyRound className="h-6 w-6 text-primary" />
            </h2>
            <ChangePasswordForm userId={currentUser.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
