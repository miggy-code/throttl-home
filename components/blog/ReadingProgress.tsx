"use client";

import { useEffect, useState } from "react";
import { C } from "@/lib/constants";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector<HTMLElement>(
        "article[data-blog-article='true']",
      );

      if (!article) {
        setProgress(0);
        return;
      }

      const rect = article.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const articleHeight = article.scrollHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = Math.max(articleHeight - viewportHeight, 1);
      const current = Math.min(
        Math.max(window.scrollY - articleTop, 0),
        maxScroll,
      );

      setProgress((current / maxScroll) * 100);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-[72px] z-40 h-1 bg-white/40 backdrop-blur-sm">
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${C.coral} 0%, ${C.gold} 100%)`,
        }}
      />
    </div>
  );
}
