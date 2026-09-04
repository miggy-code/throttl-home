import type { MDXComponents } from "mdx/types";
import { C } from "@/lib/constants";

function Callout({
  children,
  type = "info",
}: {
  children: React.ReactNode;
  type?: "info" | "warning" | "tip";
}) {
  const styles = {
    info: { borderLeftColor: C.navy, backgroundColor: "rgba(15,28,63,0.05)" },
    warning: { borderLeftColor: C.coral, backgroundColor: "rgba(224,90,71,0.05)" },
    tip: { borderLeftColor: C.gold, backgroundColor: "rgba(201,168,76,0.05)" },
  };

  const icons = {
    info: "i",
    warning: "!",
    tip: "✓",
  };

  const iconColors = {
    info: C.navy,
    warning: C.coral,
    tip: C.gold,
  };

  return (
    <div
      style={{ ...styles[type], borderLeftWidth: "4px" }}
      className={`my-8 rounded-lg px-6 py-5`}
    >
      <div className="flex gap-3">
        <span
          style={{ backgroundColor: "rgba(15,28,63,0.1)", color: iconColors[type] }}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold"
        >
          {icons[type]}
        </span>
        <div className="prose-callout [&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  Callout,
  h1: (props) => (
    <h1
      style={{ color: C.navy }}
      className="font-display scroll-mt-28 font-bold text-[32px] leading-tight md:text-[40px] mt-12 mb-6 first:mt-0"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      style={{ color: C.navy }}
      className="font-display font-semibold text-[26px] leading-tight md:text-[30px] mt-14 mb-5 scroll-mt-28"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      style={{ color: C.navy }}
      className="font-display font-sans font-semibold text-[20px] leading-snug md:text-[22px] mt-10 mb-4 scroll-mt-28"
      {...props}
    />
  ),
  p: (props) => (
    <p
      style={{ color: C.warmGray }}
      className="my-5 font-sans text-[17px] leading-[1.8]"
      {...props}
    />
  ),
  a: (props) => (
    <a
      style={{ color: C.coral, textDecoration: "underline", textUnderlineOffset: "2px" }}
      className="transition-colors hover:opacity-80"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      style={{ color: C.warmGray }}
      className="my-7 ml-0 list-decimal space-y-4 pl-10 font-sans text-[17px] leading-[1.75] marker:font-mono marker:text-[13px] marker:font-semibold marker:text-[#4F6D7E]"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      style={{ borderLeftColor: C.gold, color: "rgba(15,28,63,0.8)" }}
      className="my-8 border-l-[3px] pl-6 italic [&>p]:my-2"
      {...props}
    />
  ),
  code: (props) => {
    // Inline code (not inside a pre)
    if (typeof props.children === "string") {
      return (
        <code className="rounded-[4px] bg-gray-100 px-[6px] py-[2px] font-mono text-[0.88em] text-gray-800">
          {props.children}
        </code>
      );
    }
    return <code {...props} />;
  },
  pre: (props) => (
    <pre
      style={{ backgroundColor: C.navy, borderColor: "rgba(15,28,63,0.1)" }}
      className="my-8 overflow-x-auto rounded-lg border p-5 font-mono text-[14px] leading-relaxed text-white [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit"
      {...props}
    />
  ),
  hr: () => (
    <hr style={{ borderColor: "rgba(15,28,63,0.1)" }} className="my-12 border-t" />
  ),
  img: (props) => (
    <figure className="my-10">
      <img
        style={{
          borderColor: "rgba(15,28,63,0.1)",
          boxShadow: "0 18px 40px rgba(15,28,63,0.08)",
        }}
        className="mx-auto w-full max-w-full rounded-2xl border bg-white object-cover"
        alt={props.alt ?? ""}
        {...props}
      />
      {props.alt ? (
        <figcaption
          style={{ color: "rgba(15,28,63,0.55)" }}
          className="mt-3 text-center font-sans text-[13px] leading-relaxed"
        >
          {props.alt}
        </figcaption>
      ) : null}
    </figure>
  ),
  ul: (props) => (
    <ul
      style={{ color: C.warmGray }}
      className="my-6 ml-1 list-disc space-y-3 pl-7 font-sans text-[17px] leading-[1.8] marker:text-[#6A8A9E] marker:text-[0.72em]"
      {...props}
    />
  ),
  table: (props) => (
    <div style={{ borderColor: "rgba(15,28,63,0.1)" }} className="my-8 overflow-x-auto rounded-lg border">
      <table className="w-full font-sans text-[15px]" {...props} />
    </div>
  ),
  thead: (props) => (
    <thead style={{ borderBottomColor: "rgba(15,28,63,0.1)", backgroundColor: "rgba(15,28,63,0.03)" }} className="border-b" {...props} />
  ),
  th: (props) => (
    <th
      style={{ color: C.navy }}
      className="px-4 py-3 text-left font-semibold"
      {...props}
    />
  ),
  td: (props) => (
    <td style={{ borderTopColor: "rgba(15,28,63,0.1)", color: C.warmGray }} className="border-t px-4 py-3" {...props} />
  ),
  strong: (props) => (
    <strong style={{ color: C.navy }} className="font-semibold" {...props} />
  ),
};
