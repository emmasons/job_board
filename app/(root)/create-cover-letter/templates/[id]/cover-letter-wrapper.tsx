"use client";
import React from "react";
import {
  getTemplateById,
  TemplateContent,
} from "@/components/cover-letter/cover-letter-templates";
import CoverLetterForm from "@/components/cover-letter/letter-form";

type Props = {
  id: string;
  sampleData: TemplateContent;
};

const CoverLetterTemplate = ({ id, sampleData }: Props) => {
  const [data, setData] = React.useState<TemplateContent>(sampleData);
  const template = getTemplateById(id);

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
    <div className="flex p-4">
      <div className="basis-1/2">
        <CoverLetterForm
          templateId={id}
          initialData={{
            name: data.name,
            jobTitle: data.jobTitle,
            companyName: data.companyName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            address: data.address,
            coverLetter: data.coverLetter,
            hiringManager: data.hiringManager,
          }}
          onDataChange={handleDataChange}
        />
      </div>
      <div className="basis-1/2">{template.content(data)}</div>
    </div>
  );
};

export default CoverLetterTemplate;
