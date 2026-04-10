/*
 * THROTTL AI — CONTACT PAGE
 * Dedicated, focused page for all "Get Started" CTAs across the site.
 */

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { C } from "@/lib/constants";

export default function Contact() {
  return (
    <div style={{ backgroundColor: "#0A1628", color: "#fff", fontFamily: "'Outfit', sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <NavBar />

      {/* ── FORM SECTION ── */}
      <section style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "140px 0 80px", position: "relative", overflow: "hidden" }}>
        {/* Subtle background grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "560px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.gold, display: "block", marginBottom: "1rem" }}>
                Get Started
              </span>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 2.75rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: "1rem", letterSpacing: "-0.015em" }}>
                Let's start the conversation.
              </h1>
              <p style={{ fontSize: "1.05rem", color: "#B0B8C8", lineHeight: 1.7, maxWidth: "460px", margin: "0 auto" }}>
                Tell us a bit about yourself and we'll be in touch within 24 hours.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
