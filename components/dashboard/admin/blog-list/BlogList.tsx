import Blog from "./Blog";
import CreateBlogDialog from "./CreateBlogDialog";
import { Post } from "@prisma/client";

interface BlogListProps {
  posts: Post[];
}

// Helper to split posts into N columns for masonry effect
function splitIntoColumns<T>(items: T[], columns: number): T[][] {
  const cols: T[][] = Array.from({ length: columns }, () => []);
  items.forEach((item, idx) => {
    cols[idx % columns].push(item);
  });
  return cols;
}

const BlogList = async ({ posts }: BlogListProps) => {
  const columns = 3;
  const postColumns = splitIntoColumns(posts, columns);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <CreateBlogDialog />
      {postColumns.map((colPosts, colIdx) => (
        <div className="grid gap-4" key={colIdx}>
          {colPosts.map((post) => (
            <Blog
              key={post.id}
              title={post.title}
              content={post.epigraph}
              id={post.id}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default BlogList;
