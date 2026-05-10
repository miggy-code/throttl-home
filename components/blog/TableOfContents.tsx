import Link from "next/link";
import type { BlogHeading } from "@/lib/blog";
import { C } from "@/lib/constants";

export function TableOfContents({ headings }: { headings: BlogHeading[] }) {
  if (headings.length === 0) return null;

  return (
    <aside
      style={{ borderColor: "rgba(15,28,63,0.08)", backgroundColor: "rgba(255,255,255,0.7)" }}
      className="mb-10 rounded-2xl border p-5 backdrop-blur-sm lg:sticky lg:top-28 lg:mb-0"
    >
      <p
        style={{ color: C.navy }}
        className="font-sans text-[12px] font-bold uppercase tracking-[0.08em]"
      >
        On this page
      </p>
      <nav className="mt-4">
        <ul className="space-y-3">
          {headings.map((heading) => (
            <li key={heading.id}>
              <Link
                href={`#${heading.id}`}
                style={{ color: heading.depth === 2 ? C.navy : C.warmGray }}
                className={`block font-sans text-[14px] leading-relaxed transition-colors hover:opacity-70 ${
                  heading.depth === 3 ? "pl-4" : ""
                }`}
              >
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
