"use client";

import { ArrowRight } from "lucide-react";
import FadeSection from "@/components/FadeSection";
import { C, BOOKING_URL } from "@/lib/constants";

export default function GlobalCTA() {
  return (
    <section style={{ padding: "5.5rem 0", backgroundColor: C.coral, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
      <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <FadeSection>
          <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", display: "block", marginBottom: "1rem" }}>Get Started</span>
          <h2 style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: "600px", margin: "0 auto 1.25rem" }}>
            Ready to build an AI-enabled leadership team?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", lineHeight: 1.75, marginBottom: "2.5rem", maxWidth: "480px", margin: "0 auto 2.5rem" }}>
            Book a free 45-minute strategy call. We'll walk through where AI fits in your operation and where it doesn't — no pitch, no pressure, no jargon.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={BOOKING_URL} style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              backgroundColor: "#fff", color: C.coral,
              padding: "0.95rem 2.25rem", borderRadius: "3px",
              fontWeight: 700, fontSize: "0.9rem",
              textDecoration: "none", letterSpacing: "0.03em",
              transition: "transform 0.15s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Get Started <ArrowRight size={16} />
            </a>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}
