import Blog from "./Blog";
import CreateBlogDialog from "./CreateBlogDialog";
import { Post } from "@prisma/client";

interface BlogListProps {
  posts: Post[];
}

const BlogList = async ({ posts }: BlogListProps) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 w-full md:grid-cols-2">
      <CreateBlogDialog />
      {posts.map((post) => (
        <Blog
          key={post.id}
          title={post.title}
          content={post.epigraph}
          id={post.id}
        />
      ))}
    </div>
  );
};

export default BlogList;
