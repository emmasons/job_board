import { getJobSeekerProfile } from "@/actions/get-job-seeker-profile";
import { redirect } from "next/navigation";
import { getCurrentSessionUser } from "@/lib/auth";

import { Role } from "@prisma/client";
import { getUserCv } from "@/actions/get-user-cv";
import UploadCV from "@/components/dashboard/job-seeker/cv/UploadCV";
import { ArrowLeft, Settings } from "lucide-react";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import { getAllSectors } from "@/actions/get-all-sectors";
import { getEducationLevels } from "@/actions/get-education-levels";
import { getExperience } from "@/actions/get-experience";
import JobSeekerProfileUpdate from "@/components/dashboard/job-seeker/cv/JobSeekerProfile";
import StepsWrapper from "@/components/dashboard/job-seeker/cv/StepsWrapper";
import Link from "next/link";
import { CandidateActions } from "@/components/dashboard/employer/candidates/CandidateActions";

type Props = {
  params: {
    candidateId: string;
  };
};

const page = async (props: Props) => {
  const jobSeekerProfile = await getJobSeekerProfile(props.params.candidateId);
  const cv = await getUserCv(props.params.candidateId);

  const cvFile = await getLatestFileMetaData(cv?.id);

  const educationLevels = await getEducationLevels();
  const experience = await getExperience();
  const sectors = await getAllSectors();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <Link
          href="/profile/dashboard/employer/jobs"
          className="text-primary hover:text-sky-500 "
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <CandidateActions candidateId={props.params.candidateId} />
      </div>
      {jobSeekerProfile && (
        <StepsWrapper
          jobSeekerProfile={jobSeekerProfile}
          cvFile={cvFile}
          cv={cv}
          sectors={sectors}
          educationLevels={educationLevels}
          experience={experience}
          isJobSeekerComponent={false}
        />
      )}
    </div>
  );
};

export default page;
