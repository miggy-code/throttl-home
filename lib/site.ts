import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export const siteName = "Throttl";
export const siteDescription =
  "Throttl helps executives and management teams become AI-enabled. Hands-on AI workshops, certification, and in-house AI enablement for leadership teams.";
export const siteUrl = "https://throttl.ai";

export const defaultOgImage = "/media/logo2.png";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function getStaticRoutes(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/") },
    { url: absoluteUrl("/workshops") },
    { url: absoluteUrl("/transformation") },
    { url: absoluteUrl("/contact") },
    { url: absoluteUrl("/blog") },
  ];
}

export function getBlogRoutes(): MetadataRoute.Sitemap {
  return getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.date,
  }));
}
