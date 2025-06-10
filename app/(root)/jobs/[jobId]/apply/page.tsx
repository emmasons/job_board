import { getJobById } from "@/actions/get-job-by-id";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getCurrentSessionUser } from "@/lib/auth";
import { CheckCircle, FilePen, PencilLine, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import { getJobSeekerProfile } from "@/actions/get-job-seeker-profile";
import { getUserCv } from "@/actions/get-user-cv";
import { getUserSubscription } from "@/actions/get-user-subscription";
import UploadCV from "@/components/dashboard/job-seeker/cv/UploadCV";
import { getUserApplicationById } from "@/actions/applications/get-user-application-by-id";
import Link from "next/link";
import ApplicationWrapper from "@/components/application/ApplicationWrapper";
import ApplyFeature from "@/components/application/ApplyFeature";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    jobId: string;
  };
};

const page = async (props: Props) => {
  const user = await getCurrentSessionUser();
  if (!user) {
    return redirect(
      `/auth/signin?callbackUrl=/jobs/${props.params.jobId}/apply`
    );
  }

  const cv = await getUserCv(user.id);
  const cvFile = await getLatestFileMetaData(cv?.id);
  const jobSeekerProfile = await getJobSeekerProfile(user.id);
  const application = await getUserApplicationById(user.id, props.params.jobId);
  const job = await getJobById(props.params.jobId);
  const userSubscription = await getUserSubscription(user.id);


  return (
    <div className="h-full bg-zinc-100">
      <MaxWidthWrapper className="py-4">
        {application ? (
          <div className="mt-6 flex flex-col items-center justify-center gap-4 rounded-md bg-white p-8">
            {/* <h1 className="text-3xl font-bold text-zinc-700">Thank you!</h1> */}
            <CheckCircle className="h-12 w-12 text-green-500" />
            <p className="text-center text-xl md:w-[60%]">
              You have applied for this job. You will be contacted shortly to
              confirm your application.
            </p>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-12 rounded-md bg-white p-8">
            <h1 className="flex items-center gap-4 text-2xl font-bold text-zinc-700">
              Apply for {job?.title}
              <Plus className="h-6 w-6 text-primary" />
            </h1>
            <div className="space-y-12">
              {/* <JobSeekerProfileUpdate
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
              /> */}

              <div className="space-y-2 p-4">
                <div className="inline-flex items-center gap-4">
                  <h2>My CV Summary</h2>
                  <p className="muted">
                    Please note, this is what prospective employers will see.
                  </p>
                  <Link
                    href="/profile/dashboard/job-seeker"
                    className="flex items-center gap-1 text-primary"
                    target="_blank"
                  >
                    <span className="text-sm">edit</span>
                    <PencilLine className="size-4" />
                  </Link>
                </div>
                <p className="text-[0.8rem] italic text-muted-foreground">
                  Please note, this is what prospective employers will see.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 p-4 shadow-[0_2px_5px_rgb(0,0,0,0.1)]">
                  <UploadCV
                    cv={cv}
                    cvFile={cvFile}
                    isJobSeekerComponent={true}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 p-4 shadow-[0_2px_5px_rgb(0,0,0,0.1)]">
                  <Link
                    href={`/create-cover-letter/templates?jobId=${props.params.jobId}`}
                    className="inline-flex items-center justify-center rounded bg-sky-500 px-4 py-2 text-white font-medium hover:bg-sky-600 transition"
                    target="_blank"
                  >
                    Generate Cover Letter
                    <FilePen className="ml-2 inline-block" />
                  </Link>
                  <Link
                    href={`/generate-cv`}
                    className="inline-flex items-center justify-center rounded bg-sky-500 px-4 py-2 text-white font-medium hover:bg-sky-600 transition"
                    target="_blank"
                  >
                    Generate CV
                    <FilePen className="ml-2 inline-block" />
                  </Link>
                </div>
                <div className="p-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                  <h3 className="font-semibold">
                    CV Percentage:{" "}
                    {jobSeekerProfile?.profilePercentage?.percentage || 0}
                  </h3>
                  <p className="text-[0.8rem]">
                    {jobSeekerProfile?.cvHeadLine || "No CV Headline provided"}
                  </p>
                </div>

                <div className="space-y-2 p-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                  <h3 className="font-semibold">About me</h3>
                  <p className="text-[0.8rem]">
                    {jobSeekerProfile?.profileSummary || "No profile summary provided"}
                  </p>
                </div>

                <div className="space-y-2 p-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                  <h3 className="font-semibold">Key Skills</h3>
                  <div>
                    {jobSeekerProfile?.skills?.length ? (
                      jobSeekerProfile?.skills?.map((skill) => (
                        <span
                          className="mr-2 inline-block rounded bg-sky-100 px-2 py-1 text-xs font-medium leading-4 text-sky-700"
                          key={skill.id}
                        >
                          {skill.skill}
                        </span>
                      ))
                    ) : (
                      <span className="mr-2 inline-block rounded bg-sky-100 px-2 py-1 text-xs font-medium leading-4 text-sky-700">
                        No skills
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 p-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                  <h3 className="font-semibold">Professional</h3>
                  <div>
                    <p className="text-[0.8rem]">
                      {jobSeekerProfile?.experience?.label || "No experience added"}
                    </p>
                    <p className="text-[0.8rem]">
                      {jobSeekerProfile?.sector?.label || "No sector added"}
                    </p>
                    <p className="text-[0.8rem]">
                      {jobSeekerProfile?.expectedSalary || "No salary range added"}
                    </p>
                    <p className="text-[0.8rem]">
                      {jobSeekerProfile?.currentSalary || "Current salary not added"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 p-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                  <h3 className="font-semibold">Educational Background</h3>
                  {jobSeekerProfile?.educationDetails &&
                  jobSeekerProfile.educationDetails.length > 0 ? (
                    jobSeekerProfile?.educationDetails?.map((edu) => (
                      <div key={edu.id}>
                        <p className="text-sm">{edu.level}</p>
                        <p className="text-sm">{edu.course}</p>
                        <p className="text-sm">
                          {edu.college}: {edu.collegeLocation}
                        </p>
                        <p className="text-sm">
                          {edu.startYear} - {edu.endYear}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-[0.8rem]">No educational background added</p>
                  )}
                </div>

                <div className="space-y-2 p-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                  <h3 className="font-semibold">Professional Background</h3>
                  <p className="text-[0.8rem]">
                    {jobSeekerProfile?.employmentDetails?.length === 0 &&
                      "No professional background added"}
                  </p>
                  {jobSeekerProfile?.employmentDetails &&
                    jobSeekerProfile.employmentDetails.length > 0 &&
                    jobSeekerProfile.employmentDetails.map((emp) => (
                      <div key={emp.id}>
                        <p className="text-sm">Company: {emp.company}</p>
                        <p className="text-sm">Title: {emp.designation}</p>
                        <p className="text-sm">Location: {emp.location}</p>
                        <p className="text-sm">Description: {emp.description}</p>
                        <p className="text-sm">
                          {emp.startYear} - {emp.endYear}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              </div>
            </div>
            {/* <ApplicationWrapper
              jobId={props.params.jobId}
              jobSeekerProfile={jobSeekerProfile}
              job={job}
              user={user}
            /> */}
            <ApplyFeature
              jobId={props.params.jobId}
              jobSeekerProfile={jobSeekerProfile}
              job={job}
              user={user}
              userSubscription={userSubscription}
              coverLetterContent={application?.coverLetterContent}
            />
          </div>
        )}
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
