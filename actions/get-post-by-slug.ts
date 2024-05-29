import { Post, User } from "@prisma/client";
import { db } from "@/lib/db";
type ReturnProps = Post | (null & { author: User });
export const getPostBySlug = async (
  slug: string,
): Promise<ReturnProps | null> => {
  try {
    const post = await db.post.findUnique({
      where: {
        slug,
      },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
      },
    });

    return post;
  } catch (error) {
    console.log("[POST_ID]", error);
    return null;
  }
};
