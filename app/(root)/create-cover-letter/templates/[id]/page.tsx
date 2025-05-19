"use client";
import React from "react";
import { getTemplateById, TemplateContent } from "@/components/cover-letter/cover-letter-templates";
import CoverLetterForm from "@/components/cover-letter/letter-form";
type Props = {
  params: {
    id: string;
  };
};

const sampleData: TemplateContent = {
  name: "John Smith",
  jobTitle: "Senior Developer",
  address: "123 Tech Street, Silicon Valley, CA 94025",
  email: "john.smith@email.com",
  phoneNumber: "(555) 123-4567",
  companyName: "Tech Solutions Inc.",
  hiringManager: "Mrs. Jane Wilson",
  coverLetter: `
    <p>I am writing to express my strong interest in the Senior Developer position at Tech Solutions Inc. With over 8 years of experience in software development and a proven track record of delivering high-quality solutions, I believe I would be a valuable addition to your team.</p>
    
    <p>Throughout my career, I have demonstrated expertise in full-stack development, team leadership, and project management. I have successfully led teams of 5-10 developers, delivered projects on time and within budget, and implemented best practices that improved code quality and team productivity.</p>
    
    <p>I am particularly impressed with Tech Solutions' commitment to innovation and your recent work in AI integration. I would welcome the opportunity to contribute to your future projects and help drive technological advancement.</p>
  `,
  date: new Date().toLocaleDateString(),
};

const Page = ({ params }: Props) => {
  const { id } = params;
  const template = getTemplateById(id);
  console.log("Template ID:", id);
  console.log("Template Data:", template);
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
      <div className="basis-1/2">{template.content(sampleData)}</div>
    </div>
  );
};

export default Page;
