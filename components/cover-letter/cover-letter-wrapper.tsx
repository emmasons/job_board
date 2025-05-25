"use client";
import React, { useState } from "react";
import {
  getTemplateById,
  TemplateContent,
} from "@/components/cover-letter/cover-letter-templates";
import CoverLetterForm from "@/components/cover-letter/letter-form";
import ApplicationWrapper from "@/components/application/ApplicationWrapper";

import { JobSeekerProfileProps } from "@/types/job-seeker-profile";
import { Company, Job, User } from "@prisma/client";
import { SessionUser } from "@/lib/auth";

type Props = {
  id: string;
  sampleData: TemplateContent;

  jobSeekerProfile: JobSeekerProfileProps | null;
  job: Job & {
    company: Company;
    owner: User;
  };
  user: SessionUser;
  jobId: string;
};

const CoverLetterTemplate = ({
  id,
  sampleData,
  jobSeekerProfile,
  job,
  user,
  jobId,
}: Props) => {
  const [data, setData] = React.useState<TemplateContent>(sampleData);
  const template = getTemplateById(id);

  const setCoverLetterContent = (content: string) => {
    setData((prevData) => ({
      ...prevData,
      coverLetter: content,
    }));
  };

  if (!template) {
    return <div>Template not found</div>;
  }

  const handleDataChange = (newData: TemplateContent) => {
    setData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <div className="flex">
      <div className="basis-1/2 w-1/2 relative">
        <CoverLetterForm
          templateId={id}
          initialData={{
            name: data.name,
            jobTitle: data.jobTitle,
            companyName: data.companyName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            address: data.address,
            hiringManager: data.hiringManager,
          }}
          onDataChange={handleDataChange}
        />
        <ApplicationWrapper
          jobSeekerProfile={jobSeekerProfile}
          job={job}
          user={user}
          setCoverLetterContent={setCoverLetterContent}
          coverLetterContent={data.coverLetter}
        />
      </div>
      <div className="basis-1/2">{template.content(data)}</div>
    </div>
  );
};

export default CoverLetterTemplate;
