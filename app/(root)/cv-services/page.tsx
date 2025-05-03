import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProfessionalCvWriting from "@/components/cv-services/professionaCvWriting";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "CV Services",
  description:
    "Enhance your job applications with professional CV services from talentra.io. Get expert help in crafting a standout resume and cover letter to boost your job search.",
};

export default function Home() {
  return (
    <div className="w-full">
      <ProfessionalCvWriting />
    </div>
  );
}
