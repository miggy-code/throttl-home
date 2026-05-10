import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import GlobalCTA from "@/components/GlobalCTA";
import { mdxComponents } from "@/components/blog/MDXComponents";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { formatBlogDate } from "@/lib/blog-date";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { C } from "@/lib/constants";
import { absoluteUrl, defaultOgImage } from "@/lib/site";

type Params = Promise<{ slug: string }>;

function getAuthorInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const socialImage = post.image ?? defaultOgImage;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: absoluteUrl(`/blog/${slug}`),
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: absoluteUrl(`/blog/${slug}`),
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: absoluteUrl(socialImage),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [absoluteUrl(socialImage)],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const formattedDate = formatBlogDate(post.date);

  return (
    <>
      <ReadingProgress />

      <section
        style={{ backgroundColor: C.navy }}
        className="relative overflow-hidden pt-[72px]"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute -left-[200px] top-[20%] h-[600px] w-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(59,125,216,0.12) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -right-[100px] bottom-0 h-[400px] w-[400px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="container relative z-10 py-16 md:py-24">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-sans text-[14px] font-medium text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All articles
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-4 font-sans text-[14px] text-white/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
            <span
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.7)",
              }}
              className="rounded-[4px] px-2.5 py-0.5 font-sans text-[12px] font-semibold uppercase tracking-[0.06em]"
            >
              {post.theme}
            </span>
            {post.draft ? (
              <span
                style={{
                  backgroundColor: "rgba(224,90,71,0.18)",
                  color: "rgba(255,255,255,0.85)",
                }}
                className="rounded-full px-3 py-1 font-sans text-[12px] font-semibold uppercase tracking-[0.06em]"
              >
                Draft
              </span>
            ) : null}
          </div>

          <h1 className="font-hero mt-6 max-w-[800px] font-bold text-[32px] leading-[1.15] text-white md:text-[48px]">
            {post.title}
          </h1>

          <p className="font-sans mt-5 max-w-[640px] text-lg leading-relaxed text-white/60">
            {post.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.5)",
                }}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1 font-mono text-[12px] font-medium"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="h-11 w-11 rounded-full border border-white/10 object-cover"
              />
            ) : (
              <div
                style={{ backgroundColor: `${C.coral}33`, color: C.coral }}
                className="flex h-11 w-11 items-center justify-center rounded-full font-sans text-sm font-bold"
              >
                {getAuthorInitials(post.author.name)}
              </div>
            )}
            <div>
              <p className="font-sans text-[15px] font-medium text-white">
                {post.author.name}
              </p>
              <p className="font-sans text-[13px] text-white/40">
                {post.author.role}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: C.cream }}>
        <div className="container py-12 md:py-16">
          {post.image ? (
            <div className="mx-auto mb-10 max-w-[980px] overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_28px_80px_rgba(15,28,63,0.12)]">
              <img
                src={post.image}
                alt={post.title}
                className="h-full max-h-[520px] w-full object-cover"
              />
            </div>
          ) : null}

          <div className="mx-auto grid max-w-[980px] gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
            <TableOfContents headings={post.headings} />

            <article data-blog-article="true" className="min-w-0">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [
                        rehypePrettyCode,
                        {
                          theme: "github-dark-dimmed",
                          keepBackground: true,
                        },
                      ],
                    ],
                  },
                }}
              />
            </article>
          </div>
        </div>
      </section>

      <GlobalCTA />
    </>
  );
}
