import type { MetadataRoute } from "next";
import { getBlogRoutes, getStaticRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [...getStaticRoutes(), ...getBlogRoutes()];
}
