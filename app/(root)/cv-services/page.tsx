import Categories from "@/components/CvLandingCategories";
import CvLandingInfo from "@/components/CvLandingInfo";
import CvLandingTestimonial from "@/components/CvLandingTestimonial";
import CvLandingCta from "@/components/CvLandingCta";
import Hero from "@/components/CvLandingHome";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "AI CV builder",
  description:
    "Enhance your job applications with professional CV services from talentra.io. Get expert help in crafting a standout resume and cover letter to boost your job search.",
};

export default function Home() {
  return (
    <div className="w-full flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
      <Hero />
      <CvLandingInfo />
      <Categories />
      <CvLandingTestimonial />
      <CvLandingCta />
    </div>
  );
}
