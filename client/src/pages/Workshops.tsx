/*
 * THROTTL AI — AI WORKSHOPS PAGE
 * Sections: Hero → What Are the Workshops → How It Works → Topics → Certification → Pricing → CTA
 */

import { ArrowRight, CheckCircle2, Award, Users, Zap, BookOpen, Target, Clock } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FadeSection from "@/components/FadeSection";
import { useInView } from "@/hooks/useInView";
import { IMGS, C, BOOKING_URL } from "@/lib/constants";

const TOPICS = [
  "Using AI for faster analysis and decision-making",
  "Drafting SOPs, reports, and documentation with AI",
  "AI-powered meeting prep, summaries, and follow-ups",
  "Brainstorming and strategic planning with AI",
  "Automating repetitive management workflows",
  "AI tools for sales communication and follow-up",
  "Delegation frameworks enhanced by AI",
  "Identifying AI opportunities in your own role",
  "Prompting effectively for business outcomes",
  "Evaluating and selecting the right AI tools",
  "Managing AI risk and governance basics",
  "Building an AI-first operating mindset",
];

export default function Workshops() {
  const how = useInView();
  const topics = useInView();
  const cert = useInView();
  const pricing = useInView();

  return (
    <div style={{ backgroundColor: C.cream, color: C.navy, fontFamily: "'Outfit', sans-serif" }}>
      <NavBar />

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "64vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={IMGS.workshopsHero} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${C.navy}F0 0%, ${C.navy}CC 50%, ${C.navy}66 100%)` }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "115px", paddingBottom: "70px" }}>
          <div style={{ maxWidth: "640px" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.gold, display: "block", marginBottom: "1rem" }}>AI Management Training</span>
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(2.5rem, 5.5vw, 4rem)", fontWeight: 700, color: "#fff", lineHeight: 1.08, marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
              AI Workshops for<br />
              <span style={{ color: C.goldLight, fontStyle: "italic" }}>Executives & Managers</span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: "2.25rem", maxWidth: "520px" }}>
              We teach your team how to use the right AI tools—and more importantly, how to get real value from them in their day-to-day work.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="/contact" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                backgroundColor: C.coral, color: "#fff",
                padding: "0.875rem 2rem", borderRadius: "3px",
                fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
                transition: "background-color 0.2s, transform 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.coralDark; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.coral; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Get Started <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT ARE THE WORKSHOPS ── */}
      <section className="section-padding" style={{ backgroundColor: C.cream }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <FadeSection>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.coral, display: "block", marginBottom: "1rem" }}>What Are the Workshops</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 700, color: C.navy, lineHeight: 1.2, marginBottom: "1.25rem" }}>
                Practical AI training that actually changes how you work
              </h2>
              <p style={{ color: "#5A5550", lineHeight: 1.8, fontSize: "0.97rem", marginBottom: "1.25rem" }}>
                Our workshops are intensive, hands-on sessions designed specifically for executives and managers. We don't teach you what AI is. We teach you how to use it inside your actual job.
              </p>
              <p style={{ color: "#5A5550", lineHeight: 1.8, fontSize: "0.97rem" }}>
                Every workshop is tailored to your business, your industry, and the real workflows your team runs every day. You leave with skills you can apply Monday morning — and the certification to prove it.
              </p>
            </FadeSection>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { icon: Users, label: "For Leadership Teams", desc: "Designed for executives, managers, and department heads" },
                { icon: Target, label: "Business-Focused", desc: "Built around your actual workflows, not generic AI content" },
                { icon: Zap, label: "Hands-On", desc: "Live practice with real tools during every session" },
                { icon: Award, label: "Certified Outcomes", desc: "Participants earn the Throttl AI Operator Certification" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <FadeSection key={i} delay={i * 0.08}>
                    <div style={{ backgroundColor: "#fff", borderRadius: "6px", padding: "1.25rem", border: `1px solid rgba(15,28,63,0.07)`, boxShadow: "0 2px 10px rgba(15,28,63,0.05)" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "6px", backgroundColor: `${C.navy}10`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
                        <Icon size={16} color={C.navy} />
                      </div>
                      <div style={{ fontWeight: 700, color: C.navy, fontSize: "0.875rem", marginBottom: "0.3rem" }}>{item.label}</div>
                      <div style={{ color: C.warmGray, fontSize: "0.8rem", lineHeight: 1.55 }}>{item.desc}</div>
                    </div>
                  </FadeSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section-padding" style={{ backgroundColor: C.creamDark }}>
        <div className="container">
          <FadeSection>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.coral, display: "block", marginBottom: "1rem" }}>How It Works</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 700, color: C.navy, lineHeight: 1.2, marginBottom: "1.25rem" }}>
                Find the right workshop for your organisation
              </h2>
              <p style={{ color: C.warmGray, fontSize: "1rem", lineHeight: 1.8, maxWidth: "560px", margin: "0 auto" }}>
                Book a time with one of our directors to understand what workshops would be the best fit for your organisation.
              </p>
            </div>
          </FadeSection>
          <div ref={how.ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
            {[
              { n: "01", icon: BookOpen, title: "Understand the Business", body: "Identify how your business operates and where AI can drive immediate impact" },
              { n: "02", icon: Target, title: "Curate the Program", body: "Select the right workshops based on your workflows, team structure, and priorities" },
              { n: "03", icon: Zap, title: "Train the Teams", body: "Deliver hands-on workshops using real tools, workflows, and business scenarios" },
              { n: "04", icon: Award, title: "Certify Capability", body: "Certify leaders who demonstrate real ability to apply AI in daily work" },
              { n: "05", icon: Clock, title: "Reinforce & Scale", body: "Support adoption, reinforce usage, and expand AI across teams and workflows" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} style={{
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  padding: "1.75rem",
                  boxShadow: "0 2px 12px rgba(15,28,63,0.06)",
                  opacity: how.inView ? 1 : 0,
                  transform: how.inView ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "36px", marginBottom: "1rem" }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: C.creamDark, lineHeight: 1 }}>{s.n}</span>
                    <div style={{ width: "28px", height: "28px", borderRadius: "6px", backgroundColor: `${C.coral}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={14} color={C.coral} />
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: C.navy, fontSize: "0.9rem", marginBottom: "0.4rem" }}>{s.title}</div>
                  <div style={{ color: C.warmGray, fontSize: "0.83rem", lineHeight: 1.65 }}>{s.body}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TOPICS ── */}
      <section className="section-padding" style={{ backgroundColor: C.cream }}>
        <div className="container">
          <FadeSection>
            <div style={{ marginBottom: "3rem" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.coral, display: "block", marginBottom: "1rem" }}>Workshop Topics</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 700, color: C.navy, lineHeight: 1.2, marginBottom: "0.75rem" }}>
                What your team will learn
              </h2>
              <p style={{ color: C.warmGray, fontSize: "0.97rem", maxWidth: "540px", lineHeight: 1.75 }}>
                Topics are selected and sequenced based on your team's needs. Every program is different — here's a sample of what we cover.
              </p>
            </div>
          </FadeSection>
          <div ref={topics.ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "0" }}>
            {TOPICS.map((t, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "1rem",
                padding: "0.85rem 0",
                borderBottom: `1px solid rgba(15,28,63,0.07)`,
                opacity: topics.inView ? 1 : 0,
                transform: topics.inView ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`,
              }}
                onMouseEnter={e => { (e.currentTarget.querySelector(".topic-pill") as HTMLElement).style.backgroundColor = C.coral; }}
                onMouseLeave={e => { (e.currentTarget.querySelector(".topic-pill") as HTMLElement).style.backgroundColor = C.navy; }}
              >
                <span className="topic-pill" style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  minWidth: "28px", height: "28px", borderRadius: "14px",
                  backgroundColor: C.navy, color: "#fff",
                  fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.04em",
                  flexShrink: 0, transition: "background-color 0.18s ease",
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontSize: "0.9rem", color: C.navy, lineHeight: 1.5 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATION ── */}
      <section className="section-padding" style={{ backgroundColor: C.navy }}>
        <div className="container">
          <div ref={cert.ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <div style={{ opacity: cert.inView ? 1 : 0, transform: cert.inView ? "translateX(0)" : "translateX(-24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.gold, display: "block", marginBottom: "1rem" }}>Certification</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: "1.25rem" }}>
                The Throttl AI Operator Certification
              </h2>
              <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontSize: "0.97rem", marginBottom: "1.5rem" }}>
                Executives who complete our program and demonstrate real AI proficiency earn a certification that means something. This isn't a participation badge — it's tied to demonstrated tool mastery and real workflow application. It's proof that your leadership team can actually use AI, not just talk about it.
              </p>
              {[
                "Demonstrates practical AI capability, not just awareness",
                "Tied to specific tool mastery and workflow application",
                "Recognised as a mark of modern operational leadership",
                "Issued by Throttl — practitioners who build and deploy AI systems, not academics who study them",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "9px", marginBottom: "0.6rem" }}>
                  <CheckCircle2 size={15} color={C.gold} style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.75)" }}>{item}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="section-padding" style={{ backgroundColor: C.cream }}>
        <div className="container">
          <FadeSection>
            <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.coral, display: "block", marginBottom: "1rem" }}>Pricing</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 700, color: C.navy, lineHeight: 1.2, marginBottom: "1.25rem" }}>
                Tailored to your team
              </h2>
              <p style={{ color: C.warmGray, fontSize: "1rem", lineHeight: 1.8 }}>
                Workshop pricing is tailored to your team size and program scope. Book a call and we'll walk you through options — most programs start at $8,000.
              </p>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding" style={{ backgroundColor: C.coral }}>
        <div className="container" style={{ textAlign: "center" }}>
          <FadeSection>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: "1.25rem" }}>
              Ready to build an AI-capable leadership team?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "2.25rem", maxWidth: "460px", margin: "0 auto 2.25rem" }}>
              Book a free strategy call and we'll design a workshop program around your team's specific needs.
            </p>
            <a href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              backgroundColor: "#fff", color: C.coral,
              padding: "0.95rem 2.25rem", borderRadius: "3px",
              fontWeight: 700, fontSize: "0.9rem", textDecoration: "none",
              transition: "transform 0.15s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
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
