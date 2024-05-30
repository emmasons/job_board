import { db } from "@/lib/db";
import { Post } from "@prisma/client";
import { getLatestFileMetaData } from "./get-latest-file-metadata";
import { readingTime } from "reading-time-estimator";

type PostProps = Post & {
  mainImageUrl: string;
  readingTime: string;
};

export default async function getFeaturedPosts(): Promise<PostProps[] | null> {
  try {
    const posts = await db.post.findMany({
      where: {
        isFeatured: true,
        isPublished: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    const postsWithMainImage = await Promise.all(
      posts.map(async (post) => {
        const mainImage = await getLatestFileMetaData(post.id);
        return {
          ...post,
          mainImageUrl: mainImage?.downloadUrl || "",
          readingTime: readingTime(post.content || "", 200).minutes.toFixed(0),
        };
      }),
    );
    return postsWithMainImage;
  } catch (error) {
    console.log("[POST_ID]", error);
    return null;
  }
}
