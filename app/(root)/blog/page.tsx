import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import RecentPosts from "@/components/recent-posts/RecentPosts";

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
