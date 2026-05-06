"use client";

import Link from "next/link";
import { C, BOOKING_URL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#080E1E", padding: "3.25rem 0 1.75rem" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2.5rem", marginBottom: "2.5rem" }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 700, color: "#fff", marginBottom: "1rem", letterSpacing: "-0.02em" }}>
              Throttl
            </div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", lineHeight: 1.7, maxWidth: "220px" }}>
              The AI enablement partner for executives and management teams.
            </p>
          </div>

          {/* Services */}
          <div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: "1rem" }}>Services</div>
            {[
              { label: "AI Workshops",             href: "/workshops" },
              { label: "AI Business Transformation", href: "/transformation" },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ display: "block", color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", textDecoration: "none", marginBottom: "0.6rem", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: "1rem" }}>Company</div>
            <Link href="/about" style={{ display: "block", color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", textDecoration: "none", marginBottom: "0.6rem", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            >
              About Throttl
            </Link>
            <a href={BOOKING_URL} style={{ display: "block", color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", textDecoration: "none", marginBottom: "0.6rem", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            >
              Contact Us
            </a>
          </div>

          {/* CTA */}
          <div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: "1rem" }}>Get Started</div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
              Book a free strategy call and find out where AI can move the needle for your business.
            </p>
            <a href={BOOKING_URL} style={{
              display: "inline-block", backgroundColor: C.coral, color: "#fff",
              padding: "0.6rem 1.25rem", borderRadius: "3px", fontSize: "0.8rem",
              fontWeight: 700, textDecoration: "none", letterSpacing: "0.04em", textTransform: "uppercase" as const,
              transition: "background-color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = C.coralDark)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.coral)}
            >
              Book a Free Call
            </a>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "1rem" }}>
          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.78rem" }}>
            © {new Date().getFullYear()} Throttl AI. All rights reserved.
          </div>
          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.78rem" }}>
            <a href="mailto:hello@throttl.ai" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>hello@throttl.ai</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
