import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import RecentPosts from "@/components/recent-posts/RecentPosts";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog: Career Tips, Job Market Insights",
  description:
    "Stay updated with the latest job market trends, career advice, and industry news on the talentra.io blog. Explore tips and insights to enhance your job",
  keywords: ["Career", "Tips", "Job", "Market Insights"],
};

interface SearchPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}
export default function Home({ searchParams }: SearchPageProps) {
  return (
    <MaxWidthWrapper className="w-full">
      <h2 className="my-6 text-2xl font-semibold">Blog</h2>
      <RecentPosts searchParams={searchParams} />
    </MaxWidthWrapper>
  );
}
