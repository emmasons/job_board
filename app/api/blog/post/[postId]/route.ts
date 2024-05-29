import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { Post, Role } from "@prisma/client";

async function performTransactionWithRetry(
  userId: string,
  postId: string,
  values: Post,
) {
  const maxRetries = 3;
  let currentRetry = 0;

  while (currentRetry < maxRetries) {
    try {
      await db.$transaction(async (db) => {
        await db.post.update({
          where: {
            id: postId,
            authorId: userId,
          },
          data: {
            ...values,
          },
        });
      });

      console.log("[POST_ID]", "Transaction completed successfully!");
      break; // Exit the loop if the transaction succeeds
    } catch (error) {
      console.error(
        `Transaction failed on attempt ${currentRetry + 1}:`,
        error,
      );
      currentRetry++;
    }
  }

  if (currentRetry >= maxRetries) {
    console.log("Transaction failed after maximum retries.");
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { postId: string } },
) {
  const author = await getCurrentSessionUser();
  if (!author || author.role !== Role.ADMIN) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { postId } = params;
  const values = await req.json();

  try {
    await db.post.update({
      where: {
        id: postId,
        authorId: author.id,
      },
      data: {
        ...values,
      },
    });

    await performTransactionWithRetry(author.id, postId, values)
      .catch((error) => {
        console.error("[POST_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
      })
      .finally(() => {
        db.$disconnect();
      });

    return NextResponse.json( { status: 200, message: "Post updated successfully" });
  } catch (error) {
    console.log("[POST_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    const user = await getCurrentSessionUser();
    if (!user || user.role !== Role.ADMIN) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { postId } = params;

    const post = await db.post.findUnique({
      where: {
        id: postId,
        authorId: user.id,
      },
    });

    if (!post) {
      return new NextResponse("Not found", { status: 404 });
    }

    const deletedPost = await db.post.delete({
      where: {
        id: postId,
      },
    });

    return NextResponse.json(deletedPost);
  } catch (error) {
    console.log("[POST_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
