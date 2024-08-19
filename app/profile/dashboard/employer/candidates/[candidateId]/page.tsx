import { getJobSeekerProfile } from "@/actions/get-job-seeker-profile";
import { redirect } from "next/navigation";
import { getCurrentSessionUser } from "@/lib/auth";

import { Role } from "@prisma/client";
import { getUserCv } from "@/actions/get-user-cv";
import UploadCV from "@/components/dashboard/job-seeker/cv/UploadCV";
import { ArrowLeft, Download, Mail, Settings } from "lucide-react";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import { getAllSectors } from "@/actions/get-all-sectors";
import { getEducationLevels } from "@/actions/get-education-levels";
import { getExperience } from "@/actions/get-experience";
import JobSeekerProfileUpdate from "@/components/dashboard/job-seeker/cv/JobSeekerProfile";
import StepsWrapper from "@/components/dashboard/job-seeker/cv/StepsWrapper";
import Link from "next/link";
import { CandidateActions } from "@/components/dashboard/employer/candidates/CandidateActions";
import ContactCandidateWhatsApp from "@/components/find-candidates/ContactCandidateWhatsapp";

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
    <div className="">
      <div className="flex items-center justify-between px-2 md:px-12">
        <Link
          href="/profile/dashboard/employer/jobs"
          className="text-primary hover:text-sky-500 "
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <CandidateActions candidateId={props.params.candidateId} />
      </div>
      <div className=" px-2 md:px-12">
        <div className="rounded-md bg-sky-100 p-4 space-y-4">
          <a
            href={cvFile?.downloadUrl}
            download
            target="_blank"
            className="flex items-center gap-2 "
          >
            <Download className="h-4 w-4 text-primary" />
            <p className="text-sm">Download CV</p>
          </a>
          <a
            href={`mailto:${jobSeekerProfile?.user?.email}`}
            target="_blank"
            className="flex items-center gap-2"
          >
            <Mail className="h-4 w-4 text-primary" />
            <p className="text-sm"> Email candidate</p>
          </a>
          <ContactCandidateWhatsApp
            phoneNumber={jobSeekerProfile?.user?.profile?.phoneNumber}
          />
        </div>
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
