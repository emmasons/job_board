import { Clock } from "lucide-react";
import Image from "next/image";
import React from "react";

const latest = [
  {
    title: "Want to make your cover letter stand out? Here's how",
    summary:
      "The era of digital recruitment is here, and employers are receiving more responses to their job postings than ever before. What can you do to help boost your application to the top of the selection list? The answer may lie in the cover letter.",
    readingTime: "4 min",
    mainImageUrl: "/assets/index/news/1.jpg",
  },
  {
    title: "Want to make your cover letter stand out? Here's how",
    summary:
      "The era of digital recruitment is here, and employers are receiving more responses to their job postings than ever before. What can you do to help boost your application to the top of the selection list? The answer may lie in the cover letter.",
    readingTime: "4 min",
    mainImageUrl: "/assets/index/news/1.jpg",
  },
  {
    title: "Want to make your cover letter stand out? Here's how",
    summary:
      "The era of digital recruitment is here, and employers are receiving more responses to their job postings than ever before. What can you do to help boost your application to the top of the selection list? The answer may lie in the cover letter.",
    readingTime: "4 min",
    mainImageUrl: "/assets/index/news/1.jpg",
  },
];

const News = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Latest News</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {latest.map((item) => (
          <div
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
              <p className="line-clamp-5 ">{item.summary}</p>
              <p className="flex items-center gap-4">
                <Clock className="h-4 w-4" /> {item.readingTime} min read
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
