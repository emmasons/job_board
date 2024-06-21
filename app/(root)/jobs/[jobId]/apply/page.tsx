import { getJobById } from "@/actions/get-job-by-id";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getCurrentSessionUser } from "@/lib/auth";
import { CheckCircle, FileText } from "lucide-react";
import { redirect } from "next/navigation";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import { getAllSectors } from "@/actions/get-all-sectors";
import { getEducationLevels } from "@/actions/get-education-levels";
import { getExperience } from "@/actions/get-experience";
import { getJobSeekerProfile } from "@/actions/get-job-seeker-profile";
import JobSeekerProfileUpdate from "@/components/dashboard/job-seeker/cv/JobSeekerProfile";
import { getUserCv } from "@/actions/get-user-cv";
import UploadCV from "@/components/dashboard/job-seeker/cv/UploadCV";
import { getUserApplicationById } from "@/actions/applications/get-user-application-by-id";
import Apply from "@/components/application/Apply";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    jobId: string;
  };
};

const page = async (props: Props) => {
  const user = await getCurrentSessionUser();
  if (!user) {
    return redirect("/auth/signin?callbackUrl=/jobs/[jobId]/apply");
  }

  const cv = await getUserCv(user.id);
  const cvFile = await getLatestFileMetaData(cv?.id);
  const educationLevels = await getEducationLevels();
  const experience = await getExperience();
  const sectors = await getAllSectors();
  const jobSeekerProfile = await getJobSeekerProfile(user.id);
  const application = await getUserApplicationById(user.id, props.params.jobId);
  const job = await getJobById(props.params.jobId);

  return (
    <div className="h-full bg-zinc-100">
      <MaxWidthWrapper className="py-4">
        {application ? (
          <div className="mt-6 flex flex-col items-center justify-center gap-4 rounded-md bg-white p-8">
            {/* <h1 className="text-3xl font-bold text-zinc-700">Thank you!</h1> */}
            <CheckCircle className="h-12 w-12 text-green-500" />
            <p className="text-center text-xl md:w-[60%]">
              You have already applied for this job. You will be contacted
              shortly to confirm your application.
            </p>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-12 rounded-md bg-white p-8">
            <h1 className="flex items-center gap-4 text-2xl font-bold text-zinc-700">
              Apply for {job?.title}
              <FileText className="h-6 w-6 text-primary" />
            </h1>
            <div className="space-y-12">
              <UploadCV cv={cv} cvFile={cvFile} />
              <JobSeekerProfileUpdate
                profile={jobSeekerProfile}
                sectorList={sectors.map((sector) => ({
                  label: sector.label,
                  value: sector.id,
                }))}
                educationLevelList={educationLevels.map((level) => ({
                  label: level.label,
                  value: level.id,
                }))}
                experienceList={experience.map((exp) => ({
                  label: exp.label,
                  value: exp.id,
                }))}
              />
            </div>
            {jobSeekerProfile && <Apply jobId={props.params.jobId} />}
          </div>
        )}
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
