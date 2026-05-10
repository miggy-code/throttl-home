import fs from "fs";
import path from "path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { blogAuthors, type BlogAuthor } from "@/lib/blog-authors";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");
const DEFAULT_COVER_GRADIENT = "from-slate-800 to-slate-900";
const DEFAULT_AUTHOR_ROLE = "Throttl";

type BlogFrontmatter = {
  title?: string;
  description?: string;
  date?: string;
  tags?: string[];
  theme?: string;
  coverGradient?: string;
  author?: string;
  draft?: boolean;
  image?: string;
};

export type ResolvedBlogAuthor = BlogAuthor & {
  isRegistryAuthor: boolean;
};

export type BlogHeading = {
  id: string;
  text: string;
  depth: 2 | 3;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  theme: string;
  coverGradient: string;
  draft: boolean;
  image?: string;
  author: ResolvedBlogAuthor;
  readTime: string;
  content: string;
  headings: BlogHeading[];
};

export type BlogMeta = Omit<BlogPost, "content" | "headings">;

type GetPostOptions = {
  includeDrafts?: boolean;
};

function shouldIncludeDrafts(includeDrafts?: boolean) {
  if (includeDrafts !== undefined) return includeDrafts;
  return process.env.NODE_ENV !== "production";
}

function resolveAuthor(authorValue?: string): ResolvedBlogAuthor {
  const rawAuthor = authorValue?.trim() || "Throttl Team";
  const registryAuthor = blogAuthors[rawAuthor] ?? blogAuthors[rawAuthor.toLowerCase()];

  if (registryAuthor) {
    return {
      ...registryAuthor,
      isRegistryAuthor: true,
    };
  }

  return {
    id: rawAuthor.toLowerCase().replace(/\s+/g, "-"),
    name: rawAuthor,
    role: DEFAULT_AUTHOR_ROLE,
    isRegistryAuthor: false,
  };
}

function getHeadingText(node: unknown): string {
  if (typeof node === "string") return node;

  if (!node || typeof node !== "object") return "";

  const value =
    "value" in node && typeof node.value === "string" ? node.value : "";
  const children =
    "children" in node && Array.isArray(node.children) ? node.children : [];

  return `${value}${children.map(getHeadingText).join("")}`;
}

function extractHeadings(content: string): BlogHeading[] {
  const tree = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkGfm)
    .parse(content);

  const slugger = new GithubSlugger();
  const headings: BlogHeading[] = [];

  visit(tree, "heading", (node: { depth?: number; children?: unknown[] }) => {
    if (node.depth !== 2 && node.depth !== 3) return;

    const text = getHeadingText(node).trim();
    if (!text) return;

    headings.push({
      id: slugger.slug(text),
      text,
      depth: node.depth,
    });
  });

  return headings;
}

function parsePost(file: string): BlogPost {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as BlogFrontmatter;
  const stats = readingTime(content);

  return {
    slug,
    title: frontmatter.title ?? "",
    description: frontmatter.description ?? "",
    date: frontmatter.date ?? "",
    tags: frontmatter.tags ?? [],
    theme: frontmatter.theme ?? "General",
    coverGradient: frontmatter.coverGradient ?? DEFAULT_COVER_GRADIENT,
    draft: frontmatter.draft ?? false,
    image: frontmatter.image,
    author: resolveAuthor(frontmatter.author),
    readTime: stats.text,
    content,
    headings: extractHeadings(content),
  };
}

export function getAllPosts(options: GetPostOptions = {}): BlogMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const includeDrafts = shouldIncludeDrafts(options.includeDrafts);
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((file) => parsePost(file))
    .filter((post) => includeDrafts || !post.draft)
    .map(({ content, headings, ...meta }) => meta);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(
  slug: string,
  options: GetPostOptions = {},
): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const post = parsePost(`${slug}.mdx`);
  const includeDrafts = shouldIncludeDrafts(options.includeDrafts);

  if (post.draft && !includeDrafts) return null;

  return post;
}

export function getAllTags(options: GetPostOptions = {}): string[] {
  const posts = getAllPosts(options);
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

export function getAllThemes(options: GetPostOptions = {}): string[] {
  const posts = getAllPosts(options);
  const themes = new Set<string>();
  posts.forEach((post) => themes.add(post.theme));
  return Array.from(themes).sort();
}
