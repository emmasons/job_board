"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiper.css";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  templates,
  TemplateContent,
} from "@/components/cover-letter/cover-letter-templates";

// Sample data for preview
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

const Page = () => {
  const jobId = useSearchParams().get("jobId");

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between bg-sky-300 p-6">
        <h1 className="text-2xl font-bold mb-6">Choose a Template</h1>
      </div>
      <div className="p-6 flex-1 md:grid grid-cols-2 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="md:basis-1/2 lg:basis-1/3 relative shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className={`cursor-pointer rounded-lg h-[700px] w-full`}>
              <div className="h-full overflow-y-auto">
                <div className="">{template.content(sampleData)}</div>
                <Link
                  href={
                    "/create-cover-letter/templates" +
                    `/${template.id}?jobId=${jobId}`
                  }
                  className="absolute left-1/2 top-1/2"
                >
                  <Button variant="default" className="px-4 py-2">
                    Use template
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
