import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  theme: string;
  coverGradient: string;
  author: string;
  readTime: string;
  content: string;
};

export type BlogMeta = Omit<BlogPost, "content">;

export function getAllPosts(): BlogMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title ?? "",
      description: data.description ?? "",
      date: data.date ?? "",
      tags: data.tags ?? [],
      theme: data.theme ?? "General",
      coverGradient: data.coverGradient ?? "from-slate-800 to-slate-900", // Adapted from ThrottlHome
      author: data.author ?? "Throttl Team",
      readTime: stats.text,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    tags: data.tags ?? [],
    theme: data.theme ?? "General",
    coverGradient: data.coverGradient ?? "from-slate-800 to-slate-900", // Adapted from ThrottlHome
    author: data.author ?? "Throttl Team",
    readTime: stats.text,
    content,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function getAllThemes(): string[] {
  const posts = getAllPosts();
  const themes = new Set<string>();
  posts.forEach((p) => themes.add(p.theme));
  return Array.from(themes).sort();
}
