import React from "react";
import { getTemplateById } from "@/components/cover-letter/cover-letter-templates";
import CoverLetterForm from "@/components/cover-letter/letter-form";
type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const { id } = params;
  const template = getTemplateById(id);

  if (!template) {
    return <div>Template not found</div>;
  }

  return (
    <div className="flex p-4">
      <div className="basis-1/2">
        <CoverLetterForm
          templateId={id}
          initialData={{
            name: "",
            jobTitle: "",
            companyName: "",
            email: "",
            phoneNumber: "",
            address: "",
            coverLetter: "",
            hiringManager: "",
          }}
        />
      </div>
      <div className="basis-1/2">{template.content}</div>
    </div>
  );
};

export default Page;
