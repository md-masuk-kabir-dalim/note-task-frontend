import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/login", "/signup", "/posts/"],
      disallow: [
        "/dashboard",
        "/notes",
        "/admin",
        "/profile",
        "/otp",
        "/forgot-password",
        "/api/",
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
