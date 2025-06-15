import Categories from "@/components/CoverLandingCategories";
import Hero from "@/components/CoverLandingHome";
import CoverLandingInfo from "@/components/CoverLandingInfo";
import CoverLandingTestimonial from "@/components/CoverLandingTestimonials";
import CoverLandingCta from "@/components/CoverLandingCta";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "AI Cover letter Generator",
  description:
    "Enhance your job applications with professional Cover letter from talentra.io. Get expert help in crafting a standout resume and cover letter to boost your job search.",
};

export default function Home() {
  return (
    <div className="w-full flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip"> 
      <Hero />
      <CoverLandingInfo />
      <Categories />
      <CoverLandingTestimonial />
      <CoverLandingCta />
    </div>
  );
}
