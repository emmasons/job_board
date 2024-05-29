import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import AuthorDate from "@/components/AuthorDate";
import { Post, User } from "@prisma/client";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import { ChevronRight } from "lucide-react";

type RecentPostProps = {
  post: Post | (null & { author: User; category: Category });
};

const RecentPost = async ({ post }: RecentPostProps) => {
  if (!post) return null;
  const imageMetadata = await getLatestFileMetaData(post.id);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    year: "numeric",
  }).format(post.createdAt);

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <Image
        src={imageMetadata?.downloadUrl || "/assets/travel.jpg"}
        height={300}
        width={600}
        alt={`${post?.title} thumbnail` || "Category Title Thumbnail"}
        className="rounded-0 h-auto max-h-[300px] w-full basis-2/5 object-cover"
      />
      <div className="flex flex-1 flex-col items-start justify-center gap-2 px-4 md:px-0">
        <AuthorDate date={formattedDate} category={post?.category?.title} />
        <p className="text-xl font-bold">{post?.title}</p>
        <p className="line-clamp-5 text-slate-600">{post?.epigraph}</p>
        <Button variant="link" className="m-0 h-auto p-0">
          <Link
            href={`/blog/${post?.slug}`}
            className="flex items-center hover:text-slate-500"
          >
            Read More <ChevronRight className="h-5 w-5" />{" "}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default RecentPost;
