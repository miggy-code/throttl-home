import Link from "next/link";
import type { BlogHeading } from "@/lib/blog";
import { C } from "@/lib/constants";

export function TableOfContents({ headings }: { headings: BlogHeading[] }) {
  if (headings.length === 0) return null;

  return (
    <aside className="mb-10 lg:mb-0" aria-label="Article sections">
      <details className="group border-y border-[#0F1C3F]/15 lg:hidden">
        <summary
          style={{ color: C.navy }}
          className="flex cursor-pointer list-none items-center justify-between py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] marker:hidden"
        >
          <span>Read this article</span>
          <span className="text-[16px] font-normal leading-none transition-transform group-open:rotate-45" aria-hidden="true">+</span>
        </summary>
        <nav className="pb-4" aria-label="Article sections">
          <HeadingLinks headings={headings} />
        </nav>
      </details>

      <nav
        className="hidden max-h-[calc(100vh-8rem)] overflow-y-auto border-l border-[#0F1C3F]/15 pl-4 pr-3 lg:sticky lg:top-28 lg:block"
        aria-label="Article sections"
      >
        <p style={{ color: C.coral }} className="mb-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
          In this article
        </p>
        <HeadingLinks headings={headings} />
      </nav>
    </aside>
  );
}

function HeadingLinks({ headings }: { headings: BlogHeading[] }) {
  return (
    <ul className="space-y-2">
      {headings.map((heading) => (
        <li key={heading.id}>
          <Link
            href={`#${heading.id}`}
            style={{ color: heading.depth === 2 ? C.navy : C.warmGray }}
            className={`block font-sans text-[13px] leading-[1.35] transition-colors hover:text-[#E05A47] ${
              heading.depth === 3 ? "pl-3 text-[12px]" : ""
            }`}
          >
            {heading.text}
          </Link>
        </li>
      ))}
    </ul>
  );
}
