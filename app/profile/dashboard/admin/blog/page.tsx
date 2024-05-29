import BlogList from "@/components/dashboard/admin/blog-list/BlogList";
import { db } from "@/lib/db";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Dashboard = async () => {
  const posts = await db.post.findMany({
    orderBy: { id: "desc" },
  });
  return (
    <section className="p-6">
      <h1 className="mb-8 text-4xl font-bold leading-tight text-gray-700 lg:text-4xl">
        Posts
      </h1>
      <div className="flex flex-col items-center justify-center">
        <BlogList posts={posts} />
      </div>
    </section>
  );
};

export default Dashboard;
