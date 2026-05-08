"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { C, BOOKING_URL, IMGS } from "@/lib/constants";

// Wave timing (ms)
const T = {
  HOLD: 800,
  W1_START: 0,
  W1_DUR: 700,
  W2_START: 300,
  W2_DUR: 500,
  W3_START: 700,
  W3_DUR: 950,
  WORD_OFFSET: 80,
  PERIOD_IN: 1100,
  PERIOD_COLOR: 2000,
  SUB_IN: 1500,
  CTA_IN: 1950,
  CTA_PULSE: 2600,
  RESOLVED: 3400,
};

// "AI Clarity. Executive Confidence."
const HEADLINE_WORDS = [
  { text: "AI Clarity.", line: 0 },
  { text: "Executive", line: 1 },
  { text: "Confidence", line: 1 },
];

const DOT_OFFSETS: [number, number][] = [
  [0, 0], [14, 5], [5, 13], [18, 15], [8, 7],
];

type Ring = "inner" | "mid" | "outer";

type ChaosItem = {
  id: number;
  type: "text" | "data" | "line" | "rect" | "dots";
  content?: string;
  x: number;
  y: number;
  rot?: number;
  opacity: number;
  fontSize?: number;
  width?: number;
  height?: number;
  angle?: number;
  seed?: number;
  residual?: boolean;
  ring: Ring;
  bp: 0 | 1 | 2;
};

const CHAOS: ChaosItem[] = [
  // Outer ring ambient text
  { id: 1, type: "text", content: "ROI", x: 7, y: 12, rot: -8, opacity: 0.18, fontSize: 16, ring: "outer", bp: 0 },
  { id: 2, type: "text", content: "Q3 pipeline", x: 78, y: 8, rot: 6, opacity: 0.15, fontSize: 13, ring: "outer", bp: 1 },
  { id: 5, type: "text", content: "neural network", x: 82, y: 76, rot: -11, opacity: 0.14, fontSize: 12, ring: "outer", bp: 2 },
  { id: 9, type: "text", content: "GPT", x: 88, y: 10, rot: -7, opacity: 0.22, fontSize: 20, ring: "outer", bp: 0 },
  { id: 10, type: "text", content: "predictive analytics", x: 35, y: 86, rot: 4, opacity: 0.12, fontSize: 11, ring: "outer", bp: 2 },
  { id: 12, type: "text", content: "risk model", x: 6, y: 80, rot: 10, opacity: 0.14, fontSize: 13, ring: "outer", bp: 2 },
  { id: 16, type: "text", content: "deep learning", x: 55, y: 88, rot: 7, opacity: 0.14, fontSize: 13, ring: "outer", bp: 2 },
  { id: 17, type: "text", content: "disrupt", x: 5, y: 22, rot: -13, opacity: 0.2, fontSize: 16, ring: "outer", bp: 0 },
  { id: 18, type: "text", content: "synergy", x: 80, y: 84, rot: 5, opacity: 0.14, fontSize: 13, ring: "outer", bp: 2 },

  // Mid ring secondary text
  { id: 6, type: "text", content: "deploy at scale", x: 14, y: 62, rot: 5, opacity: 0.2, fontSize: 13, ring: "mid", bp: 0 },
  { id: 11, type: "text", content: "cost reduction", x: 70, y: 38, rot: -6, opacity: 0.2, fontSize: 14, ring: "mid", bp: 1 },
  { id: 13, type: "text", content: "digital transformation", x: 62, y: 14, rot: -3, opacity: 0.17, fontSize: 12, ring: "mid", bp: 1 },
  { id: 14, type: "text", content: "data-driven", x: 24, y: 58, rot: 9, opacity: 0.22, fontSize: 15, ring: "mid", bp: 0 },
  { id: 19, type: "text", content: "real-time insights", x: 68, y: 28, rot: -5, opacity: 0.16, fontSize: 12, ring: "mid", bp: 1 },

  // Mid ring seeds (converging onto headline words)
  { id: 3, type: "text", content: "automate", x: 74, y: 24, rot: 7, opacity: 0.32, fontSize: 16, ring: "mid", bp: 0, seed: 0 },
  { id: 7, type: "text", content: "strategy", x: 16, y: 46, rot: -9, opacity: 0.28, fontSize: 19, ring: "mid", bp: 0, seed: 1 },
  { id: 8, type: "text", content: "workflow", x: 64, y: 62, rot: 11, opacity: 0.26, fontSize: 16, ring: "mid", bp: 0, seed: 2 },
  { id: 20, type: "text", content: "optimize", x: 80, y: 54, rot: -8, opacity: 0.3, fontSize: 17, ring: "mid", bp: 0 },

  // Inner ring data fragments
  { id: 21, type: "data", content: "847.3", x: 58, y: 32, rot: 3, opacity: 0.28, fontSize: 15, ring: "inner", bp: 0 },
  { id: 22, type: "data", content: "12.7%", x: 34, y: 26, rot: -5, opacity: 0.32, fontSize: 17, ring: "inner", bp: 0, residual: true },
  { id: 23, type: "data", content: "-$2.4M", x: 38, y: 68, rot: 7, opacity: 0.22, fontSize: 14, ring: "inner", bp: 0 },
  { id: 24, type: "data", content: "99.2", x: 62, y: 44, rot: -3, opacity: 0.24, fontSize: 14, ring: "inner", bp: 1 },
  { id: 25, type: "data", content: "0.034", x: 44, y: 72, rot: 5, opacity: 0.18, fontSize: 12, ring: "inner", bp: 2 },
  { id: 26, type: "data", content: "+186%", x: 72, y: 58, rot: -6, opacity: 0.3, fontSize: 16, ring: "inner", bp: 1, residual: true },
  { id: 27, type: "data", content: "0.247", x: 46, y: 18, rot: 4, opacity: 0.24, fontSize: 15, ring: "inner", bp: 0 },
  { id: 28, type: "data", content: "$4,291,000", x: 30, y: 74, rot: -7, opacity: 0.18, fontSize: 13, ring: "inner", bp: 2 },

  // Decorative
  { id: 29, type: "line", x: 8, y: 38, width: 70, angle: 28, opacity: 0.07, ring: "outer", bp: 1 },
  { id: 30, type: "line", x: 70, y: 80, width: 55, angle: -18, opacity: 0.05, ring: "outer", bp: 2 },
  { id: 31, type: "line", x: 52, y: 16, width: 90, angle: 42, opacity: 0.07, ring: "outer", bp: 1, residual: true },
  { id: 33, type: "rect", x: 78, y: 42, width: 55, height: 28, opacity: 0.05, ring: "outer", bp: 1 },
  { id: 35, type: "rect", x: 10, y: 55, width: 38, height: 22, opacity: 0.05, ring: "outer", bp: 2 },
  { id: 36, type: "dots", x: 44, y: 62, opacity: 0.14, ring: "mid", bp: 2 },
];

const EASE_OUT_EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_IN_QUART = "cubic-bezier(0.5, 0, 0.75, 0)";
const EASE_OUT_CUBIC = "cubic-bezier(0.33, 1, 0.68, 1)";

export default function AnimatedHero() {
  const heroRef = useRef<HTMLElement>(null);
  const chaosMap = useRef(new Map<number, HTMLElement>());
  const wordMap = useRef(new Map<number, HTMLElement>());
  const periodRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);

  const [phase, setPhase] = useState<"loading" | "chaos" | "animating" | "resolved">("loading");
  const [items, setItems] = useState<ChaosItem[]>([]);
  const reducedMotion = useRef(false);

  useEffect(() => {
    const flush = (el: Element | null | undefined) => el?.getAnimations().forEach((a) => a.cancel());
    wordMap.current.forEach(flush);
    chaosMap.current.forEach(flush);
    flush(periodRef.current);
    flush(subRef.current);
    flush(ctaRef.current);
    flush(ctaBtnRef.current);
  }, []);

  useEffect(() => {
    const w = window.innerWidth;
    const bp = w >= 1024 ? 2 : w >= 768 ? 1 : 0;
    const filteredItems = CHAOS.filter((el) => el.bp <= bp);
    requestAnimationFrame(() => setItems(filteredItems));

    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) {
      requestAnimationFrame(() => setPhase("animating"));
      return;
    }

    const t = setTimeout(() => setPhase("chaos"), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "chaos") return;
    const t = setTimeout(() => setPhase("animating"), T.HOLD);
    return () => clearTimeout(t);
  }, [phase]);

  const runAnimation = useCallback((anims: Animation[]) => {
    const push = (a: Animation | undefined) => { if (a) anims.push(a); };

    if (reducedMotion.current) {
      HEADLINE_WORDS.forEach((_, idx) => {
        const wordEl = wordMap.current.get(idx);
        if (!wordEl) return;
        push(wordEl.animate(
          [{ opacity: 0 }, { opacity: 1 }],
          { duration: 300, delay: idx * 150, easing: "ease-out", fill: "forwards" }
        ));
      });
      push(periodRef.current?.animate(
        [{ opacity: 0, color: "white" }, { opacity: 1, color: C.goldLight }],
        { duration: 300, delay: 600, easing: "ease-out", fill: "forwards" }
      ));
      push(subRef.current?.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 400, delay: 750, easing: "ease-out", fill: "forwards" }
      ));
      push(ctaRef.current?.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 400, delay: 950, easing: "ease-out", fill: "forwards" }
      ));
      const t = setTimeout(() => setPhase("resolved"), 1450);
      anims.push({ cancel: () => clearTimeout(t) } as unknown as Animation);
      return;
    }

    // Wave 1
    const outerItems = items.filter((i) => i.ring === "outer" && i.seed === undefined && !i.residual);
    outerItems.forEach((item, idx) => {
      const el = chaosMap.current.get(item.id);
      if (!el) return;
      const nx = (item.x - 50) / Math.abs(item.x - 50 || 1);
      const ny = (item.y - 50) / Math.abs(item.y - 50 || 1);
      const mag = 120 + Math.abs(item.x - 50) * 0.8;
      const rot = item.rot ?? item.angle ?? 0;
      push(el.animate(
        [
          { transform: `translate(0,0) rotate(${rot}deg) scale(1)`, opacity: item.opacity, filter: "blur(0px)" },
          { transform: `translate(${nx * mag * 1.5}px,${ny * mag * 1.5}px) rotate(${rot + nx * 15}deg) scale(1.2)`, opacity: 0, filter: "blur(10px)" },
        ],
        { duration: T.W1_DUR, delay: T.W1_START + idx * 45, easing: EASE_IN_QUART, fill: "forwards" }
      ));
    });

    // Wave 2
    const dataItems = items.filter((i) => i.ring === "inner" && !i.residual);
    dataItems.forEach((item, idx) => {
      const el = chaosMap.current.get(item.id);
      if (!el) return;
      const rot = item.rot ?? 0;
      const cx = (50 - item.x);
      const cy = (50 - item.y);
      push(el.animate(
        [
          { transform: `translate(0,0) rotate(${rot}deg) scale(1)`, opacity: item.opacity, filter: "blur(0px)" },
          { transform: `translate(${cx * 0.8}px,${cy * 0.8}px) rotate(${rot}deg) scale(1.1)`, opacity: item.opacity * 1.5, filter: "blur(2px)" },
          { transform: `translate(${cx * 2}px,${cy * 2}px) rotate(${rot * 0.5}deg) scale(0.5)`, opacity: 0, filter: "blur(8px)" },
        ],
        { duration: T.W2_DUR, delay: T.W2_START + idx * 55, easing: EASE_OUT_CUBIC, fill: "forwards" }
      ));
    });

    const midAmbient = items.filter((i) => i.ring === "mid" && i.seed === undefined && !i.residual);
    midAmbient.forEach((item, idx) => {
      const el = chaosMap.current.get(item.id);
      if (!el) return;
      const rot = item.rot ?? 0;
      push(el.animate(
        [
          { transform: `translate(0,0) rotate(${rot}deg) scale(1)`, opacity: item.opacity, filter: "blur(0px)" },
          { transform: `translate(0,10px) rotate(${rot}deg) scale(0.95)`, opacity: 0, filter: "blur(6px)" },
        ],
        { duration: 600, delay: T.W2_START + 100 + idx * 40, easing: EASE_OUT_CUBIC, fill: "forwards" }
      ));
    });

    // Wave 3: Seeds
    const seeds = items.filter((i) => i.seed !== undefined);
    seeds.forEach((item, idx) => {
      const seedEl = chaosMap.current.get(item.id);
      const wordEl = wordMap.current.get(item.seed!);
      if (!seedEl || !wordEl) return;
      const rot = item.rot ?? 0;
      const sR = seedEl.getBoundingClientRect();
      const wR = wordEl.getBoundingClientRect();
      const dx = wR.left + wR.width / 2 - sR.left - sR.width / 2;
      const dy = wR.top + wR.height / 2 - sR.top - sR.height / 2;
      
      push(seedEl.animate(
        [
          { transform: `translate(0,0) rotate(${rot}deg) scale(1)`, opacity: item.opacity, filter: "blur(0px)" },
          { transform: `translate(${dx * 0.7}px,${dy * 0.7}px) rotate(${rot * 0.3}deg) scale(1.15)`, opacity: item.opacity + 0.3, filter: "blur(4px)" },
          { transform: `translate(${dx}px,${dy}px) rotate(0deg) scale(0.95)`, opacity: 0, filter: "blur(0px)" },
        ],
        { duration: T.W3_DUR, delay: T.W3_START + idx * T.WORD_OFFSET, easing: EASE_OUT_EXPO, fill: "forwards" }
      ));

      push(wordEl.animate(
        [
          { opacity: 0, transform: "translateY(12px) scale(0.95)", filter: "blur(8px)" },
          { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0px)" },
        ],
        { duration: 350, delay: T.W3_START + idx * T.WORD_OFFSET + T.W3_DUR * 0.65, easing: EASE_OUT_EXPO, fill: "forwards" }
      ));
    });

    // Period
    const pEl = periodRef.current;
    if (pEl) {
      push(pEl.animate(
        [
          { opacity: 0, transform: "scale(3) translateY(-10px)", filter: "blur(4px)" },
          { opacity: 1, transform: "scale(1) translateY(0)", filter: "blur(0px)" },
        ],
        { duration: 400, delay: T.PERIOD_IN, easing: EASE_OUT_EXPO, fill: "forwards" }
      ));
      push(pEl.animate(
        [{ color: "white" }, { color: C.goldLight }],
        { duration: 400, delay: T.PERIOD_COLOR, easing: EASE_OUT_CUBIC, fill: "forwards" }
      ));
    }

    // Subheadline
    push(subRef.current?.animate(
      [
        { opacity: 0, transform: "translateY(10px)", filter: "blur(4px)" },
        { opacity: 1, transform: "translateY(0)", filter: "blur(0px)" },
      ],
      { duration: 700, delay: T.SUB_IN, easing: EASE_OUT_EXPO, fill: "forwards" }
    ));

    // CTA
    push(ctaRef.current?.animate(
      [
        { opacity: 0, transform: "translateY(10px)", filter: "blur(4px)" },
        { opacity: 1, transform: "translateY(0)", filter: "blur(0px)" },
      ],
      { duration: 600, delay: T.CTA_IN, easing: EASE_OUT_EXPO, fill: "forwards" }
    ));

    // Glow pulse using coral
    push(ctaBtnRef.current?.animate(
      [
        { boxShadow: `0 0 20px ${C.coral}4D` },
        { boxShadow: `0 0 45px ${C.coral}A6` },
        { boxShadow: `0 0 20px ${C.coral}4D` },
      ],
      { duration: 700, delay: T.CTA_PULSE }
    ));

    // Residuals
    items.filter((i) => i.residual).forEach((item) => {
      push(chaosMap.current.get(item.id)?.animate(
        [{ opacity: item.opacity }, { opacity: 0.05 }],
        { duration: 1200, delay: T.W2_START, easing: EASE_OUT_CUBIC, fill: "forwards" }
      ));
    });

    const t = setTimeout(() => setPhase("resolved"), T.RESOLVED);
    anims.push({ cancel: () => clearTimeout(t) } as unknown as Animation);
  }, [items]);

  useEffect(() => {
    if (phase !== "animating") return;
    const anims: Animation[] = [];
    runAnimation(anims);
    return () => anims.forEach((a) => a.cancel());
  }, [phase, runAnimation]);

  useEffect(() => {
    if (phase !== "resolved") return;
    const kill = (el: Element | null | undefined) => el?.getAnimations().forEach((a) => a.cancel());
    wordMap.current.forEach(kill);
    chaosMap.current.forEach(kill);
    kill(periodRef.current);
    kill(subRef.current);
    kill(ctaRef.current);
    kill(ctaBtnRef.current);
  }, [phase]);

  const resolved = phase === "resolved";
  const showChaos = phase !== "loading" && !reducedMotion.current;

  const chaosRef = (id: number) => (el: HTMLElement | null) => {
    if (el) chaosMap.current.set(id, el);
    else chaosMap.current.delete(id);
  };
  const wordRef = (i: number) => (el: HTMLSpanElement | null) => {
    if (el) wordMap.current.set(i, el);
    else wordMap.current.delete(i);
  };

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] w-full overflow-hidden" style={{ backgroundColor: C.navy, paddingTop: "72px" }}>
      {/* Background Grid & Image */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <img src={IMGS.hero} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${C.navy}EE 0%, ${C.navy}BB 45%, ${C.navy}55 100%)` }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", opacity: 0.6 }} />
      </div>

      {/* Chaos Layer */}
      {showChaos && (
        <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true">
          {items.map((item) => {
            const base: React.CSSProperties = {
              position: "absolute",
              left: `${item.x}%`,
              top: `${item.y}%`,
              willChange: resolved ? "auto" : "transform, opacity",
            };

            const resolvedOpacity = item.residual ? 0.05 : 0;

            if (item.type === "text" || item.type === "data") {
              return (
                <span
                  key={item.id}
                  ref={chaosRef(item.id)}
                  style={{
                    ...base,
                    fontSize: `${item.fontSize}px`,
                    fontFamily: item.type === "data" ? "monospace" : "var(--font-outfit)",
                    color: item.type === "data" ? C.coral : "white",
                    transform: `rotate(${item.rot ?? 0}deg)`,
                    opacity: resolved ? resolvedOpacity : item.opacity,
                    whiteSpace: "nowrap"
                  }}
                >
                  {item.content}
                </span>
              );
            }

            if (item.type === "line") {
              return (
                <div key={item.id} ref={chaosRef(item.id)} style={{
                  ...base, width: `${item.width}px`, height: "1px", backgroundColor: "white",
                  transform: `rotate(${item.angle ?? 0}deg)`, opacity: resolved ? resolvedOpacity : item.opacity,
                }} />
              );
            }

            if (item.type === "rect") {
              return (
                <div key={item.id} ref={chaosRef(item.id)} style={{
                  ...base, width: `${item.width}px`, height: `${item.height}px`, border: "1px solid white",
                  opacity: resolved ? 0 : item.opacity,
                }} />
              );
            }

            if (item.type === "dots") {
              return (
                <div key={item.id} ref={chaosRef(item.id)} style={{ ...base, opacity: resolved ? 0 : item.opacity }}>
                  {DOT_OFFSETS.map(([dx, dy], j) => (
                    <div key={j} style={{ position: "absolute", height: "3px", width: "3px", borderRadius: "50%", left: dx, top: dy, backgroundColor: C.coral }} />
                  ))}
                </div>
              );
            }

            return null;
          })}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center" style={{ minHeight: "calc(100dvh - 72px)" }}>
        
        {/* Eyebrow */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          border: `1px solid ${C.gold}55`, borderRadius: "2px",
          padding: "5px 14px", marginBottom: "2rem",
          opacity: resolved ? 1 : 0,
        }} ref={(el) => { if (el && phase === "animating") el.animate([{opacity: 0}, {opacity: 1}], {duration: 600, delay: T.CTA_IN, fill: "forwards"}) }}>
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: C.gold, display: "inline-block" }} />
          <span style={{ color: C.goldLight, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-outfit)" }}>AI Enablement for Executives</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "var(--font-fraunces)", fontWeight: 700, lineHeight: 1.05,
          color: "#fff", fontSize: "clamp(3rem, 6.5vw, 5rem)", letterSpacing: "-0.025em"
        }} className="flex flex-col items-center gap-[0.25em]">
          <div className="flex flex-wrap items-center justify-center gap-[0.25em]">
            {HEADLINE_WORDS.map((word, absoluteIndex) => (
              word.line === 0 ? (
                <span key={`w0-${absoluteIndex}`} ref={wordRef(absoluteIndex)} className="inline-block" style={{ opacity: resolved ? 1 : 0 }}>
                  {word.text}
                </span>
              ) : null
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-[0.25em]">
            {HEADLINE_WORDS.map((word, absoluteIndex) => (
              word.line === 1 ? (
                <span key={`w1-${absoluteIndex}`} ref={wordRef(absoluteIndex)} className="inline-block" style={{ opacity: resolved ? 1 : 0 }}>
                  {word.text}
                </span>
              ) : null
            ))}
            <span ref={periodRef} className="inline-block" style={{ opacity: resolved ? 1 : 0, color: resolved ? C.goldLight : "white" }}>
              .
            </span>
          </div>
        </h1>

        {/* Sub */}
        <p ref={subRef} style={{
          fontFamily: "var(--font-outfit)", fontSize: "clamp(1rem, 2vw, 1.2rem)",
          color: "rgba(255,255,255,0.75)", lineHeight: 1.75, maxWidth: "560px",
          marginTop: "1.5rem", opacity: resolved ? 1 : 0
        }}>
          We help business leaders cut through AI complexity and build systems that deliver measurable, consistent value.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} style={{
          display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center",
          marginTop: "2.5rem", opacity: resolved ? 1 : 0
        }}>
          <Link href={BOOKING_URL} ref={ctaBtnRef} style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            backgroundColor: C.coral, color: "#fff",
            padding: "0.9rem 2rem", borderRadius: "3px",
            fontWeight: 700, fontSize: "0.9rem", fontFamily: "var(--font-outfit)",
            textDecoration: "none", letterSpacing: "0.03em",
            transition: "transform 0.15s, background-color 0.2s"
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.backgroundColor = C.coralDark; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.backgroundColor = C.coral; }}>
            Book Your Complimentary Strategy Review <ArrowRight size={16} />
          </Link>
          <Link href="#services" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            backgroundColor: "transparent", color: "#fff",
            padding: "0.9rem 2rem", borderRadius: "3px",
            fontWeight: 600, fontSize: "0.9rem", fontFamily: "var(--font-outfit)",
            textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.35)",
            transition: "border-color 0.2s, background-color 0.2s"
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.backgroundColor = "transparent"; }}>
            Explore Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
