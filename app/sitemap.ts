import { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { getAllPosts } from "@/actions/get-all-posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const postEntries = posts.map((post) => ({
    url: `${env.BASE_DOMAIN}/blog/${post.slug}`,
    lastModified: post.updatedAt.toISOString(),
    priority: 0.7,
  }));
  return [
    {
      url: `${env.BASE_DOMAIN}/`,
      lastModified: new Date().toISOString(),
      priority: 1.0,
    },
    {
      url: `${env.BASE_DOMAIN}/FAQs`,
      lastModified: new Date().toISOString(),
      priority: 1.0,
    },
    {
      url: `${env.BASE_DOMAIN}/contact`,
      lastModified: new Date().toISOString(),
      priority: 1.0,
    },
    {
      url: `${env.BASE_DOMAIN}/find-candidates`,
      lastModified: new Date().toISOString(),
      priority: 1.0,
    },
    {
      url: `${env.BASE_DOMAIN}/privacy-policy`,
      lastModified: new Date().toISOString(),
      priority: 1.0,
    },
    {
      url: `${env.BASE_DOMAIN}/search`,
      lastModified: new Date().toISOString(),
      priority: 1.0,
    },
    {
      url: `${env.BASE_DOMAIN}/terms-and-conditions`,
      lastModified: new Date().toISOString(),
      priority: 0.8,
    },
    {
      url: `${env.BASE_DOMAIN}/blog`,
    },
    {
      url: `${env.BASE_DOMAIN}/about`,
      lastModified: new Date().toISOString(),
      priority: 0.8,
    },
    ...postEntries,
  ];
}
