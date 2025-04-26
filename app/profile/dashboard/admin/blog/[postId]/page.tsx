import { Banner } from "@/components/Banner";
import { Actions } from "@/components/dashboard/admin/post/Actions";
import { db } from "@/lib/db";
import { getCurrentSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/IconBadge";
import { LayoutDashboard } from "lucide-react";
import TitleForm from "@/components/dashboard/admin/post/TitleForm";
import EpigraphForm from "@/components/dashboard/admin/post/EpigraphForm";
import IsFeaturedForm from "@/components/dashboard/admin/post/IsFeatured";
import IsPublishedForm from "@/components/dashboard/admin/post/IsPublished";
import PostImageForm from "@/components/dashboard/admin/post/PostImageForm";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import ContentForm from "@/components/dashboard/admin/post/ContentForm";

interface PostProps {
  params: {
    postId: string;
  };
}

const Post = async ({ params }: PostProps) => {
  const { postId } = params;
  const user = await getCurrentSessionUser();

  if (!user) {
    return redirect("/");
  }

  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return redirect("/profile/dashboard/admin/blog");
  }
  const gcpData = await getLatestFileMetaData(post.id);
  const requiredFields = [
    post.title,
    post.content,
    post.imageUrl,
    post.isPublished,
    post.categoryId,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!post.isPublished && (
        <Banner
          variant="warning"
          label="This post is not published. It will not be visible to your readers."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Update Your Post</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <Actions
            disabled={!isComplete}
            postId={params.postId}
            isPublished={post.isPublished}
          />
        </div>
        <div className="mt-16 ">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your post</h2>
            </div>
            <TitleForm initialData={post} postId={post.id} />
            <PostImageForm
              isDeleting={false}
              postId={post.id}
              gcpData={gcpData}
            />

            <EpigraphForm initialData={post} postId={post.id} />
            <IsFeaturedForm initialData={post} />
            <IsPublishedForm initialData={post} />
            <ContentForm initialData={post} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
