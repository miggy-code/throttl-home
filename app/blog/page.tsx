import type { Metadata } from "next";
import FadeSection from "@/components/FadeSection";
import GlobalCTA from "@/components/GlobalCTA";
import { BlogGallery } from "@/components/blog/BlogGallery";
import { getAllPosts, getAllTags, getAllThemes } from "@/lib/blog";
import { C } from "@/lib/constants";
import { absoluteUrl, defaultOgImage } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Thought leadership on AI strategy, implementation, and operations.",
  alternates: {
    canonical: absoluteUrl("/blog"),
  },
  openGraph: {
    title: "Insights",
    description:
      "Thought leadership on AI strategy, implementation, and operations.",
    url: absoluteUrl("/blog"),
    type: "website",
    images: [
      {
        url: absoluteUrl(defaultOgImage),
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights",
    description:
      "Thought leadership on AI strategy, implementation, and operations.",
    images: [absoluteUrl(defaultOgImage)],
  },
};

type BlogPageProps = {
  searchParams: Promise<{
    q?: string;
    theme?: string;
    tags?: string;
    sort?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const posts = getAllPosts();
  const allTags = getAllTags();
  const allThemes = getAllThemes();
  const query = await searchParams;

  return (
    <>
      <section style={{ backgroundColor: C.cream }} className="pt-[72px]">
        <div className="container py-16 md:py-[100px]">
          <FadeSection>
            <span style={{ color: C.coral }} className="font-sans text-[14px] font-medium uppercase tracking-[0.08em]">
              Insights
            </span>
            <h1 style={{ color: C.navy }} className="font-hero mt-4 font-bold text-[40px] leading-tight md:text-[56px]">
              From the field.
            </h1>
            <p style={{ color: C.warmGray }} className="font-sans mt-5 max-w-[600px] text-lg">
              Practical thinking on AI strategy, engineering, and operations.
              No fluff, just what works.
            </p>
          </FadeSection>

          <div className="mt-12">
            <BlogGallery
              posts={posts}
              allTags={allTags}
              allThemes={allThemes}
              initialQuery={query}
            />
          </div>
        </div>
      </section>
      <GlobalCTA />
    </>
  );
}
