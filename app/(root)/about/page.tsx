import About from "@/components/footer/about";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "About",
  description:
    "Discover more about talentra.io, our mission, and how we help connect job seekers with employers across Europe. Learn about our team and values.",
};
export default function Home() {
  return (
    <div className="w-full">
      <About />
    </div>
  );
}
