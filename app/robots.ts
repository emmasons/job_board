import { MetadataRoute } from "next";
import { env } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/", // Allow all paths by default
    },
    sitemap: `${env.BASE_DOMAIN}/sitemap.xml`,
  };
}
