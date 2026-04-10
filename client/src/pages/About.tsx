/*
 * THROTTL AI — ABOUT US PAGE
 * Sections: Hero → Mission → Who We Are → Values → CTA
 */

import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FadeSection from "@/components/FadeSection";
import { useInView } from "@/hooks/useInView";
import { IMGS, C, BOOKING_URL } from "@/lib/constants";

export default function About() {
  const values = useInView();
  const team = useInView();

  return (
    <div style={{ backgroundColor: C.cream, color: C.navy, fontFamily: "'Outfit', sans-serif" }}>
      <NavBar />

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "56vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={IMGS.hero} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${C.navy}F5 0%, ${C.navy}CC 55%, ${C.navy}77 100%)` }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "115px", paddingBottom: "70px" }}>
          <div style={{ maxWidth: "640px" }}>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.gold, display: "block", marginBottom: "1rem" }}>About Throttl</span>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(2.5rem, 5.5vw, 4rem)", fontWeight: 700, color: "#fff", lineHeight: 1.08, marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
              We exist to make<br />
              <span style={{ color: C.goldLight, fontStyle: "italic" }}>executives AI-capable.</span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, maxWidth: "520px" }}>
              So they can make better decisions, lead more effectively, and run companies that get more done with fewer resources.
            </p>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="section-padding" style={{ backgroundColor: C.cream }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <FadeSection>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.coral, display: "block", marginBottom: "1rem" }}>Our Mission</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 700, color: C.navy, lineHeight: 1.2, marginBottom: "1.25rem" }}>
                AI adoption starts at the top.
              </h2>
              <p style={{ color: "#5A5550", lineHeight: 1.8, fontSize: "0.97rem", marginBottom: "1.25rem" }}>
                Most AI initiatives fail because they start in the wrong place. They begin with tools, not people. They begin with IT, not leadership. They begin with experiments, not strategy.
              </p>
              <p style={{ color: "#5A5550", lineHeight: 1.8, fontSize: "0.97rem", marginBottom: "1.25rem" }}>
                Throttl was founded to fix that. We work with management teams — the people who actually run businesses — and give them the knowledge, skills, and support to lead AI adoption from the front.
              </p>
              <p style={{ color: "#5A5550", lineHeight: 1.8, fontSize: "0.97rem" }}>
                We do this two ways: <strong>hands-on workshops</strong> that certify your leadership team in real AI skills, and <strong>embedded transformation engagements</strong> where our team works inside your business until the job is done.
              </p>
            </FadeSection>
            <FadeSection delay={0.2}>
              <div style={{ backgroundColor: C.navy, borderRadius: "8px", padding: "2.5rem", boxShadow: "0 12px 40px rgba(15,28,63,0.15)" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem", fontWeight: 700, color: C.gold, lineHeight: 1, marginBottom: "0.5rem" }}>"</div>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.05rem", lineHeight: 1.8, fontStyle: "italic", marginBottom: "1.5rem" }}>
                  The businesses that win in the next decade won't be the ones with the most AI tools. They'll be the ones with the most AI-capable leaders.
                </p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem" }}>
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.9rem" }}>— Gabriel, Co-Founder</div>
                  <div style={{ color: C.gold, fontSize: "0.8rem" }}>Throttl AI</div>
                </div>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section-padding" style={{ backgroundColor: C.cream }}>
        <div className="container">
          <FadeSection>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.coral, display: "block", marginBottom: "1rem" }}>What We Do</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 700, color: C.navy, lineHeight: 1.2 }}>
                Two ways we work with you
              </h2>
            </div>
          </FadeSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {/* AI Workshops card */}
            <Link href="/workshops" style={{ textDecoration: "none", display: "block" }}>
              <FadeSection delay={0} style={{ height: "100%" }}>
                <div style={{
                  position: "relative",
                  backgroundColor: C.navy, borderRadius: "12px", padding: "2.5rem",
                  boxShadow: "0 8px 32px rgba(15,28,63,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
                  cursor: "pointer", transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
                  height: "100%", display: "flex", flexDirection: "column",
                  overflow: "hidden"
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "translateY(-6px) scale(1.02)";
                    el.style.boxShadow = "0 24px 64px rgba(15,28,63,0.25), inset 0 1px 0 rgba(255,255,255,0.1)";
                    (el.querySelector('.card1-glow') as HTMLDivElement).style.opacity = "1";
                    (el.querySelector('.card1-arrow') as HTMLDivElement).style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "translateY(0) scale(1)";
                    el.style.boxShadow = "0 8px 32px rgba(15,28,63,0.1), inset 0 1px 0 rgba(255,255,255,0.05)";
                    (el.querySelector('.card1-glow') as HTMLDivElement).style.opacity = "0";
                    (el.querySelector('.card1-arrow') as HTMLDivElement).style.transform = "translateX(0)";
                  }}
                >
                  <div className="card1-glow" style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 100% 0%, ${C.coral}33 0%, transparent 60%)`, opacity: 0, transition: "opacity 0.6s ease", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, opacity: 0.15, mixBlendMode: "overlay", pointerEvents: "none" }} />
                  <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: `${C.coral}22`, border: `1px solid ${C.coral}40`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                      <span style={{ fontSize: "1.3rem" }}>🎓</span>
                    </div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.gold, marginBottom: "0.75rem" }}>Service 01</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: "0.75rem" }}>AI Workshops</h3>
                    <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                      Hands-on training that certifies your management team in how to use AI tools inside their real workflows. Participants earn the Throttl AI Operator Certification.
                    </p>
                  </div>
                  <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "6px", color: C.coral, fontWeight: 700, fontSize: "0.85rem", marginTop: "auto" }}>
                    Explore Workshops <div className="card1-arrow" style={{ transition: "transform 0.3s ease" }}><ArrowRight size={14} /></div>
                  </div>
                </div>
              </FadeSection>
            </Link>

            {/* AI Business Transformation card */}
            <Link href="/transformation" style={{ textDecoration: "none", display: "block" }}>
              <FadeSection delay={0.15} style={{ height: "100%" }}>
                <div style={{
                  position: "relative",
                  backgroundColor: C.coral, borderRadius: "12px", padding: "2.5rem",
                  boxShadow: "0 8px 32px rgba(232,93,53,0.15), inset 0 1px 0 rgba(255,255,255,0.15)",
                  cursor: "pointer", transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
                  height: "100%", display: "flex", flexDirection: "column",
                  overflow: "hidden"
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "translateY(-6px) scale(1.02)";
                    el.style.boxShadow = "0 24px 64px rgba(232,93,53,0.35), inset 0 1px 0 rgba(255,255,255,0.25)";
                    (el.querySelector('.card2-glow') as HTMLDivElement).style.opacity = "1";
                    (el.querySelector('.card2-arrow') as HTMLDivElement).style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "translateY(0) scale(1)";
                    el.style.boxShadow = "0 8px 32px rgba(232,93,53,0.15), inset 0 1px 0 rgba(255,255,255,0.15)";
                    (el.querySelector('.card2-glow') as HTMLDivElement).style.opacity = "0";
                    (el.querySelector('.card2-arrow') as HTMLDivElement).style.transform = "translateX(0)";
                  }}
                >
                  <div className="card2-glow" style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 100% 100%, ${C.gold}44 0%, transparent 65%)`, opacity: 0, transition: "opacity 0.6s ease", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, opacity: 0.15, mixBlendMode: "overlay", pointerEvents: "none" }} />
                  <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                      <span style={{ fontSize: "1.3rem" }}>⚡</span>
                    </div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", marginBottom: "0.75rem" }}>Service 02</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: "0.75rem" }}>AI Business Transformation</h3>
                    <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                      Our team embeds inside your business and works alongside your management to assess, implement, and scale AI — using The Throttl Accelerator framework.
                    </p>
                  </div>
                  <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "6px", color: "#fff", fontWeight: 700, fontSize: "0.85rem", marginTop: "auto" }}>
                    Explore Transformation <div className="card2-arrow" style={{ transition: "transform 0.3s ease" }}><ArrowRight size={14} /></div>
                  </div>
                </div>
              </FadeSection>
            </Link>
          </div>
        </div>
      </section>



      {/* ── CTA ── */}
      <section className="section-padding" style={{ backgroundColor: C.navy }}>
        <div className="container" style={{ textAlign: "center" }}>
          <FadeSection>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: "1.25rem" }}>
              Want to work with us?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "2.25rem", maxWidth: "440px", margin: "0 auto 2.25rem" }}>
              Start with a free strategy call. We'll learn about your business and show you exactly how Throttl can help.
            </p>
            <a href={BOOKING_URL} style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              backgroundColor: C.coral, color: "#fff",
              padding: "0.95rem 2.25rem", borderRadius: "3px",
              fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
              transition: "background-color 0.2s, transform 0.15s",
            }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.coralDark; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.coral; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Get Started <ArrowRight size={16} />
            </a>
          </FadeSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
