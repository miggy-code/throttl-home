"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  Clock,
  Layers,
  Search,
  Tag,
  X,
} from "lucide-react";
import type { BlogMeta } from "@/lib/blog";
import { formatBlogDate } from "@/lib/blog-date";
import { C } from "@/lib/constants";

type BlogGalleryState = {
  search: string;
  activeTags: Set<string>;
  activeTheme: string | null;
  sortOrder: "newest" | "oldest";
};

type BlogGalleryQuery = {
  q?: string;
  theme?: string;
  tags?: string;
  sort?: string;
};

function parseQueryState(
  query: BlogGalleryQuery,
  allTags: string[],
  allThemes: string[],
): BlogGalleryState {
  const allowedTags = new Set(allTags);
  const activeTags = new Set(
    (query.tags ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag && allowedTags.has(tag)),
  );
  const activeTheme =
    query.theme && allThemes.includes(query.theme) ? query.theme : null;

  return {
    search: query.q ?? "",
    activeTags,
    activeTheme,
    sortOrder: query.sort === "oldest" ? "oldest" : "newest",
  };
}

function buildQueryString(state: BlogGalleryState) {
  const params = new URLSearchParams();

  if (state.search.trim()) params.set("q", state.search.trim());
  if (state.activeTheme) params.set("theme", state.activeTheme);

  const tags = Array.from(state.activeTags).sort();
  if (tags.length > 0) params.set("tags", tags.join(","));

  if (state.sortOrder === "oldest") params.set("sort", "oldest");

  return params.toString();
}

function normalizeState(state: BlogGalleryState) {
  return {
    search: state.search,
    activeTheme: state.activeTheme,
    sortOrder: state.sortOrder,
    activeTags: Array.from(state.activeTags).sort().join(","),
  };
}

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        backgroundColor: active ? C.navy : "rgba(15,28,63,0.05)",
        color: active ? "#fff" : C.navy,
        border: `1px solid ${active ? C.navy : "rgba(15,28,63,0.1)"}`,
        transition: "all 0.2s ease",
      }}
      className="inline-flex cursor-pointer items-center rounded-full px-3.5 py-1.5 font-sans text-[13px] font-medium hover:opacity-80"
    >
      {label}
    </button>
  );
}

function BlogCard({ post, index }: { post: BlogMeta; index: number }) {
  const formattedDate = formatBlogDate(post.date);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-white transition-all duration-300"
      style={{
        border: "1px solid rgba(15,28,63,0.07)",
        boxShadow: "0 2px 12px rgba(15,28,63,0.04)",
        animationDelay: `${index * 80}ms`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = C.coral;
        el.style.boxShadow = "0 8px 24px rgba(15,28,63,0.10)";
        el.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "rgba(15,28,63,0.07)";
        el.style.boxShadow = "0 2px 12px rgba(15,28,63,0.04)";
        el.style.transform = "translateY(0)";
      }}
    >
      <div className="relative h-[200px] overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className={`relative h-full bg-gradient-to-br ${post.coverGradient}`}>
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>
        )}

        <div className="absolute left-4 top-4">
          <span
            style={{ color: C.navy }}
            className="inline-flex items-center rounded-[4px] bg-white/90 px-2.5 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.06em] backdrop-blur-sm"
          >
            {post.theme}
          </span>
        </div>

        <div
          style={{ backgroundColor: C.coral }}
          className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{ backgroundColor: `${C.coral}12`, color: C.coral }}
              className="inline-block rounded-[3px] px-2 py-0.5 font-mono text-[11px] font-medium"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 3 ? (
            <span
              style={{
                backgroundColor: "rgba(15,28,63,0.05)",
                color: "rgba(15,28,63,0.6)",
              }}
              className="inline-block rounded-[3px] px-2 py-0.5 font-mono text-[11px] font-medium"
            >
              +{post.tags.length - 3}
            </span>
          ) : null}
        </div>

        <h3
          style={{ color: C.navy, transition: "color 0.2s ease" }}
          className="font-bold text-[20px] leading-snug group-hover:!text-[#E05A47] md:text-[22px]"
        >
          {post.title}
        </h3>

        <p
          style={{ color: C.warmGray }}
          className="mt-3 line-clamp-3 flex-1 font-sans text-[15px] leading-relaxed"
        >
          {post.description}
        </p>

        <div
          style={{ borderTop: "1px solid rgba(15,28,63,0.1)" }}
          className="mt-5 flex items-center justify-between pt-4"
        >
          <div
            style={{ color: "rgba(15,28,63,0.5)" }}
            className="flex items-center gap-4 font-sans text-[13px]"
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>
          <span
            style={{ color: C.coral }}
            className="flex items-center gap-1 font-sans text-[13px] font-medium opacity-0 transition-all duration-200 group-hover:opacity-100"
          >
            Read
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function BlogGallery({
  posts,
  allTags,
  allThemes,
  initialQuery,
}: {
  posts: BlogMeta[];
  allTags: string[];
  allThemes: string[];
  initialQuery: BlogGalleryQuery;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialState = parseQueryState(initialQuery, allTags, allThemes);
  const [search, setSearch] = useState(initialState.search);
  const [activeTags, setActiveTags] = useState(initialState.activeTags);
  const [activeTheme, setActiveTheme] = useState(initialState.activeTheme);
  const [sortOrder, setSortOrder] = useState(initialState.sortOrder);

  useEffect(() => {
    const nextState = parseQueryState(
      {
        q: searchParams.get("q") ?? undefined,
        theme: searchParams.get("theme") ?? undefined,
        tags: searchParams.get("tags") ?? undefined,
        sort: searchParams.get("sort") ?? undefined,
      },
      allTags,
      allThemes,
    );

    const current = normalizeState({
      search,
      activeTags,
      activeTheme,
      sortOrder,
    });
    const next = normalizeState(nextState);

    if (JSON.stringify(current) === JSON.stringify(next)) return;

    setSearch(nextState.search);
    setActiveTags(nextState.activeTags);
    setActiveTheme(nextState.activeTheme);
    setSortOrder(nextState.sortOrder);
  }, [searchParams, allTags, allThemes, search, activeTags, activeTheme, sortOrder]);

  const updateUrl = (
    nextState: BlogGalleryState,
    mode: "push" | "replace",
  ) => {
    const queryString = buildQueryString(nextState);
    const nextHref = queryString ? `${pathname}?${queryString}` : pathname;
    const currentHref = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    if (nextHref === currentHref) return;

    if (mode === "push") {
      router.push(nextHref, { scroll: false });
      return;
    }

    router.replace(nextHref, { scroll: false });
  };

  const filtered = useMemo(() => {
    let result = posts;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.description.toLowerCase().includes(q) ||
          post.tags.some((tag) => tag.toLowerCase().includes(q)),
      );
    }

    if (activeTags.size > 0) {
      result = result.filter((post) =>
        post.tags.some((tag) => activeTags.has(tag)),
      );
    }

    if (activeTheme) {
      result = result.filter((post) => post.theme === activeTheme);
    }

    if (sortOrder === "oldest") {
      result = [...result].reverse();
    }

    return result;
  }, [posts, search, activeTags, activeTheme, sortOrder]);

  const toggleTag = (tag: string) => {
    const nextTags = new Set(activeTags);
    if (nextTags.has(tag)) nextTags.delete(tag);
    else nextTags.add(tag);

    const nextState: BlogGalleryState = {
      search,
      activeTags: nextTags,
      activeTheme,
      sortOrder,
    };

    setActiveTags(nextTags);
    updateUrl(nextState, "push");
  };

  const hasFilters =
    search.trim().length > 0 ||
    activeTags.size > 0 ||
    activeTheme !== null ||
    sortOrder === "oldest";

  const clearAll = () => {
    const nextState: BlogGalleryState = {
      search: "",
      activeTags: new Set<string>(),
      activeTheme: null,
      sortOrder: "newest",
    };

    setSearch("");
    setActiveTags(nextState.activeTags);
    setActiveTheme(null);
    setSortOrder("newest");
    updateUrl(nextState, "push");
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => {
              const nextSearch = e.target.value;
              const nextState: BlogGalleryState = {
                search: nextSearch,
                activeTags,
                activeTheme,
                sortOrder,
              };

              setSearch(nextSearch);
              updateUrl(nextState, "replace");
            }}
            style={{ color: C.navy, borderColor: "rgba(15,28,63,0.15)" }}
            className="w-full rounded-lg border bg-white py-2.5 pl-10 pr-4 font-sans text-[15px] placeholder:text-gray-400 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          {search ? (
            <button
              type="button"
              onClick={() => {
                const nextState: BlogGalleryState = {
                  search: "",
                  activeTags,
                  activeTheme,
                  sortOrder,
                };

                setSearch("");
                updateUrl(nextState, "replace");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-sans text-[13px] text-gray-500">Sort:</span>
          <button
            type="button"
            onClick={() => {
              const nextSortOrder: BlogGalleryState["sortOrder"] =
                sortOrder === "newest" ? "oldest" : "newest";
              const nextState: BlogGalleryState = {
                search,
                activeTags,
                activeTheme,
                sortOrder: nextSortOrder,
              };

              setSortOrder(nextSortOrder);
              updateUrl(nextState, "push");
            }}
            style={{ color: C.navy, borderColor: "rgba(15,28,63,0.15)" }}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg border bg-white px-3 py-2 font-sans text-[13px] font-medium transition-colors hover:bg-gray-50"
          >
            <Calendar className="h-3.5 w-3.5 text-gray-400" />
            {sortOrder === "newest" ? "Newest first" : "Oldest first"}
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {allThemes.length > 1 ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 font-sans text-[13px] font-medium text-gray-500">
              <Layers className="h-3.5 w-3.5" />
              Theme
            </span>
            <Pill
              label="All"
              active={activeTheme === null}
              onClick={() => {
                const nextState: BlogGalleryState = {
                  search,
                  activeTags,
                  activeTheme: null,
                  sortOrder,
                };

                setActiveTheme(null);
                updateUrl(nextState, "push");
              }}
            />
            {allThemes.map((theme) => (
              <Pill
                key={theme}
                label={theme}
                active={activeTheme === theme}
                onClick={() => {
                  const nextTheme = activeTheme === theme ? null : theme;
                  const nextState: BlogGalleryState = {
                    search,
                    activeTags,
                    activeTheme: nextTheme,
                    sortOrder,
                  };

                  setActiveTheme(nextTheme);
                  updateUrl(nextState, "push");
                }}
              />
            ))}
          </div>
        ) : null}

        {allTags.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 font-sans text-[13px] font-medium text-gray-500">
              <Tag className="h-3.5 w-3.5" />
              Tags
            </span>
            {allTags.map((tag) => (
              <Pill
                key={tag}
                label={tag}
                active={activeTags.has(tag)}
                onClick={() => toggleTag(tag)}
              />
            ))}
          </div>
        ) : null}
      </div>

      {hasFilters ? (
        <div className="mt-4 flex items-center gap-2">
          <span className="font-sans text-[13px] text-gray-500">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </span>
          <button
            type="button"
            onClick={clearAll}
            className="ml-auto flex cursor-pointer items-center gap-1 rounded-full bg-gray-100 px-3 py-1 font-sans text-[12px] font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            <X className="h-3 w-3" />
            Clear filters
          </button>
        </div>
      ) : null}

      <div
        style={{ borderColor: "rgba(15,28,63,0.1)" }}
        className="mt-6 border-t"
      />

      {filtered.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Search className="h-7 w-7 text-gray-400" />
          </div>
          <h3 style={{ color: C.navy }} className="mt-5 font-bold text-[22px]">
            No articles found
          </h3>
          <p className="mt-2 max-w-sm font-sans text-[15px] text-gray-500">
            Try adjusting your search or filters to find what you&apos;re looking
            for.
          </p>
          <button
            type="button"
            onClick={clearAll}
            style={{ color: C.coral }}
            className="mt-4 cursor-pointer font-sans text-[14px] font-medium transition-colors hover:opacity-80"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
