import React from "react";
import RecentPost from "./RecentPost";
import { getAllPosts } from "@/actions/get-all-posts";
import Pagination from "@/components/PaginationControls";

interface SearchPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

const RecentPosts = async ({ searchParams }: SearchPageProps) => {
  const posts = await getAllPosts();
  const page = searchParams?.page ? searchParams?.page : "1";
  const pageSize = searchParams?.pageSize ? searchParams?.pageSize : "5";
  const start = (Number(page) - 1) * Number(pageSize); // 0, 5, 10 ...
  const end = start + Number(pageSize); // 5, 10, 15 ...
  const items = posts.slice(start, end);
  const totalPages = Math.ceil(posts.length / Number(pageSize));
  if (posts.length === 0) {
    return (
      <div>
        <h2 className="my-6 text-2xl font-semibold">Recent Posts</h2>
        <p>No posts found</p>
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col gap-8">
        {items?.map((post) => <RecentPost key={post.id} post={post} />)}
        {posts.length === 0 && <p>No posts found</p>}
      </div>
      <Pagination
        hasNextPage={end < posts.length}
        hasPrevPage={start > 0}
        totalPages={totalPages}
      />
    </div>
  );
};

export default RecentPosts;
