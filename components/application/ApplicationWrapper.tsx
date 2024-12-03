"use client";
import { useState } from "react";
import CreateCoverLetterForm from "./CreateCoverLetter";
import Apply from "./Apply";

type Props = {
  jobId: string;
};

const ApplicationWrapper = ({ jobId }: Props) => {
  const [coverLetterContent, setCoverLetterContent] = useState("");

  const handleCoverLetterChange = (content: string) => {
    setCoverLetterContent(content);
    console.log(content);
  };

  return (
    <div>
      <CreateCoverLetterForm
        initialData={{ content: "" }}
        handleCoverLetterChange={handleCoverLetterChange}
      />
      <Apply jobId={jobId} coverLetter={coverLetterContent} />
    </div>
  );
};

export default ApplicationWrapper;
