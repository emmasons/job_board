import AuthorCard from "@/components/author-card/AuthorCard";
import Image from "next/image";
import { siteMetadata } from "@/lib/siteMetaData";
import { getPostBySlug } from "@/actions/get-post-by-slug";
import { Preview } from "@/components/ckeditor/RichTextRenderer";
import { getLatestFileMetaData } from "@/actions/get-latest-file-metadata";
import { notFound } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const blog = await getPostBySlug(params.slug);

  if (!blog) {
    return;
  }

  const createdAt = new Date(blog.createdAt).toISOString();
  const modifiedAt = new Date(blog.updatedAt || blog.createdAt).toISOString();

  let imageList = [siteMetadata.socialBanner];
  // if (blog.image) {
  //   imageList =
  //     typeof blog.image.filePath === "string"
  //       ? [siteMetadata.siteUrl + blog.image.filePath.replace("../public", "")]
  //       : blog.image;
  // }
  const ogImages = imageList.map((img) => {
    return { url: img.includes("http") ? img : siteMetadata.siteUrl + img };
  });

  const authors = blog?.author ? [blog.author.name] : siteMetadata.author;

  return {
    title: blog.title,
    description: blog.content,
    openGraph: {
      title: blog.title,
      description: blog.content,
      url: siteMetadata.siteUrl + blog.slug,
      siteName: siteMetadata.title,
      locale: "en_US",
      type: "article",
      publishedTime: createdAt,
      modifiedTime: modifiedAt,
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.content,
      images: ogImages,
    },
  };
}

const Post = async ({ params }: Props) => {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(post.createdAt);
  const imageMetadata = await getLatestFileMetaData(post.id);

  return (
    <MaxWidthWrapper className="px-4 md:px-0 font-serif">
      <div>
        <Image
          src={imageMetadata?.downloadUrl || "/assets/travel.jpg"}
          height={600}
          width={700}
          alt="Category Title Thumbnail"
          className="rounded-0 h-auto max-h-[600px] w-full object-cover"
        />
      </div>
      <div className="my-10  flex flex-col justify-between gap-[10%] basis-[60%]  ">
        <div className="flex flex-1 flex-col justify-center items-center text-center mb-2">
          <h1 className="border-border-color border-b-2 border-zinc-400 text-3xl font-semibold leading-[3rem] tracking-wide md:text-4xl md:mb-0">
            {post.title}
          </h1>
          
        </div>
        <AuthorCard date={formattedDate} author={""} />
      </div>
      <div className="font-sans flex justify-center items-center flex-col gap-[10%] md:flex-row">
        <div className="basis-[60%]">
          <div className="mb-4">
            <Preview value={post.content || ""} />
          </div>
          

        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Post;
