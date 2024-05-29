import { Post, User } from "@prisma/client";
import { db } from "@/lib/db";

type ReturnProps = Post | (null & { author: User });

type Props = {
  limit?: number;
};

export const getAllPosts = async ({ limit }: Props = {}): Promise<
  ReturnProps[]
> => {
  try {
    const posts = await db.post.findMany({
      include: {
        author: true,
      },
      take: limit ? limit : undefined,

      orderBy: { createdAt: "desc" },
    });
    if (posts.length === 0) {
      return [];
    }
    return posts;
  } catch (error) {
    console.log("[POST_ID]", error);
    return [];
  }
};
