import getFeaturedPosts from "@/actions/get-featured-posts";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const News = async () => {
  const latest = await getFeaturedPosts();
  if (!latest)
    return (
      <div>
        <h1 className="text-2xl font-bold">We are compiling the latest news</h1>
      </div>
    );
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Latest News</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {latest.map((item) => (
          <Link
            href={`/blog/${item.slug}`}
            key={item.title}
            className="space-y-2 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
          >
            <Image
              src={item.mainImageUrl}
              alt={item.title}
              width={200}
              height={200}
              className="h-[200px] w-full object-cover"
            />
            <div className="space-y-2 p-4">
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p className="line-clamp-5 ">{item.epigraph}</p>
              <p className="flex items-center gap-4">
                <Clock className="h-4 w-4" /> {item.readingTime} min read
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default News;
