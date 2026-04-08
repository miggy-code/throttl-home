/*
 * THROTTL AI — AI BUSINESS TRANSFORMATION PAGE
 * Merges: In-House AI Enablement + The Throttl Accelerator (formerly "AI Operator Playbook")
 * Sections: Hero → What Is It → The Throttl Accelerator (4 steps) → Toolkit → CTA
 */

import { ArrowRight, CheckCircle2, Search, Map, Wrench, TrendingUp } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FadeSection from "@/components/FadeSection";
import { useInView } from "@/hooks/useInView";
import { IMGS, C, BOOKING_URL } from "@/lib/constants";

const ACCELERATOR_STEPS = [
  {
    n: "01",
    label: "Identify",
    tagline: "Find where AI creates immediate business impact.",
    body: "Before any tool is introduced, we map your business. We look at every workflow, every function, and every bottleneck — and identify where AI has the highest opportunity to save time, improve decisions, and create leverage.",
    outcomes: [
      "Full workflow map across key functions",
      "Prioritised list of AI use cases by ROI",
      "Identification of low-hanging fruit",
      "Risk and governance assessment",
      "Honest view of where AI won't help",
    ],
    color: C.coral,
  },
  {
    n: "02",
    label: "Train",
    tagline: "Certify your leadership team in how to use AI inside real workflows.",
    body: "AI tools are only as powerful as the people using them. We train your executives and managers to use the right tools effectively — not in theory, but in the actual workflows they run every day. Participants earn the Throttl AI Operator Certification.",
    outcomes: [
      "Hands-on workshops tailored to your business",
      "Practical tool mastery for real use cases",
      "AI Operator Certification for each participant",
      "Confidence to lead AI adoption internally",
      "Role-specific training modules",
    ],
    color: "#2A6FBF",
  },
  {
    n: "03",
    label: "Implement",
    tagline: "Apply AI tools and workflows into real business operations.",
    body: "Training is just the beginning. Implementation is where the value is created. We work alongside your team to embed AI into your actual processes — building workflows, automations, and systems that make your business run smarter.",
    outcomes: [
      "AI workflows built into real operations",
      "Tool integrations and automations deployed",
      "SOPs and documentation updated",
      "Team adoption tracked and supported",
      "Quick wins delivered in the first 30 days",
    ],
    color: "#1A7A5E",
  },
  {
    n: "04",
    label: "Scale",
    tagline: "Expand AI adoption across teams and build a truly AI-enabled company.",
    body: "Once the foundation is in place, we help you scale. We expand AI adoption across departments, build internal capability, and create the systems and culture that sustain AI-enabled operations long after our engagement ends.",
    outcomes: [
      "Department-by-department AI rollout",
      "Internal AI champion program",
      "AI governance and policy framework",
      "Ongoing measurement and optimisation",
      "A company that runs leaner without cutting capability",
    ],
    color: C.gold,
  },
];

const TOOLKIT = [
  "AI Opportunity Assessment Framework",
  "Workflow Mapping Templates",
  "AI Risk & Governance Checklist",
  "Use Case Prioritisation Matrix",
  "AI Tool Evaluation Scorecard",
  "Implementation Roadmap Template",
  "Team Readiness Assessment",
  "ROI Tracking Dashboard",
  "AI Policy & Guidelines Starter Kit",
  "Prompt Library for Management Teams",
];

export default function Transformation() {
  const steps = useInView(0.05);
  const toolkit = useInView();

  return (
    <div style={{ backgroundColor: C.cream, color: C.navy, fontFamily: "'Outfit', sans-serif" }}>
      <NavBar />

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "64vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={IMGS.enablementHero} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${C.navy}F2 0%, ${C.navy}CC 50%, ${C.navy}66 100%)` }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>
        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "115px", paddingBottom: "70px" }}>
          <div style={{ maxWidth: "680px" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.gold, display: "block", marginBottom: "1rem" }}>AI Business Transformation</span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5.5vw, 4rem)", fontWeight: 700, color: "#fff", lineHeight: 1.08, marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
              We transform how your<br />
              <span style={{ color: C.goldLight, fontStyle: "italic" }}>business operates.</span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: "1.5rem", maxWidth: "560px" }}>
              Our team embeds inside your business and works alongside your management to assess, implement, and scale AI — using <strong style={{ color: C.goldLight }}>The Throttl Accelerator</strong>, our proprietary 4-step framework.
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

      {/* ── WHAT IS IT ── */}
      <section className="section-padding" style={{ backgroundColor: C.cream }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <FadeSection>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.coral, display: "block", marginBottom: "1rem" }}>What Is AI Business Transformation</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 700, color: C.navy, lineHeight: 1.2, marginBottom: "1.25rem" }}>
                More than consulting.<br />We do the work with you.
              </h2>
              <p style={{ color: "#5A5550", lineHeight: 1.8, fontSize: "0.97rem", marginBottom: "1.25rem" }}>
                AI Business Transformation is our highest-level service. A dedicated Throttl team embeds inside your business — not in a consultancy office — and works shoulder-to-shoulder with your management to transform how you operate.
              </p>
              <p style={{ color: "#5A5550", lineHeight: 1.8, fontSize: "0.97rem" }}>
                Every engagement runs on <strong>The Throttl Accelerator</strong> — our proprietary 4-step framework that takes companies from AI experimentation to full operationalisation. We don't hand you a slide deck and leave. We stay until the work is done.
              </p>
            </FadeSection>
            <div>
              {[
                { icon: Search,     title: "Assess",     body: "We map your workflows, identify inefficiencies, and find where AI creates the most immediate value." },
                { icon: Map,        title: "Plan",       body: "We build a prioritised AI roadmap — quick wins first, long-term transformation second." },
                { icon: Wrench,     title: "Implement",  body: "We apply AI tools and workflows into your real operations, working alongside your team." },
                { icon: TrendingUp, title: "Scale",      body: "We expand AI adoption across departments and build the internal capability to sustain it." },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <FadeSection key={i} delay={i * 0.1}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "6px", backgroundColor: `${C.navy}0D`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={17} color={C.navy} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: C.navy, fontSize: "0.95rem", marginBottom: "0.25rem" }}>{item.title}</div>
                        <div style={{ color: C.warmGray, fontSize: "0.86rem", lineHeight: 1.65 }}>{item.body}</div>
                      </div>
                    </div>
                  </FadeSection>
                );
              })}
            </div>
          </div>
        </div>
      </section>


      {/* ── THE THROTTL ACCELERATOR ── */}
      <section className="section-padding" style={{ backgroundColor: C.creamDark }}>
        <div className="container">
          <FadeSection>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.coral, display: "block", marginBottom: "1rem" }}>Our Methodology</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", fontWeight: 700, color: C.navy, lineHeight: 1.15, marginBottom: "0.75rem" }}>
                The Throttl Accelerator
              </h2>
              <p style={{ color: C.warmGray, fontSize: "1rem", maxWidth: "540px", margin: "0 auto", lineHeight: 1.75 }}>
                Our proprietary 4-step framework that takes companies from AI experimentation to full operationalisation. Every AI Business Transformation engagement is built around it.
              </p>
            </div>
          </FadeSection>

          {/* Step progress bar */}
          <FadeSection delay={0.1}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "2.75rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
              {ACCELERATOR_STEPS.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", flex: 1, minWidth: "120px" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                    <div style={{
                      width: "48px", height: "48px", borderRadius: "50%",
                      backgroundColor: s.color, color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "0.9rem",
                      boxShadow: `0 4px 16px ${s.color}40`,
                      marginBottom: "0.5rem",
                    }}>
                      {s.n}
                    </div>
                    <div style={{ fontWeight: 700, color: C.navy, fontSize: "0.85rem", textAlign: "center" }}>{s.label}</div>
                  </div>
                  {i < ACCELERATOR_STEPS.length - 1 && (
                    <div style={{ height: "2px", flex: 1, backgroundColor: "rgba(15,28,63,0.12)", margin: "0 0.5rem", marginBottom: "1.5rem" }} />
                  )}
                </div>
              ))}
            </div>
          </FadeSection>

          {/* Step cards — alternating layout */}
          <div ref={steps.ref} style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {ACCELERATOR_STEPS.map((s, i) => (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "1fr 2fr" : "2fr 1fr",
                gap: "0",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(15,28,63,0.12)",
                opacity: steps.inView ? 1 : 0,
                transform: steps.inView ? "translateY(0)" : "translateY(32px)",
                transition: `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.12}s`,
                position: "relative",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.boxShadow = `0 16px 48px rgba(15,28,63,0.2)`;
                el.style.transform = "translateY(-6px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.boxShadow = `0 8px 32px rgba(15,28,63,0.12)`;
                el.style.transform = "translateY(0)";
              }}
              >
                {i % 2 === 0 && (
                  <div style={{ position: "relative", padding: "3rem 2.5rem", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 30% 0%, ${s.color} 0%, ${C.navy} 120%)` }} />
                    <div style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, opacity: 0.15, mixBlendMode: "overlay" }} />
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "5rem", fontWeight: 700, color: "rgba(255,255,255,0.15)", lineHeight: 1, marginBottom: "0.5rem", transition: "color 0.3s ease" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.3)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.15)"; }}
                      >{s.n}</div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>{s.label}</div>
                      <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", marginTop: "1rem", lineHeight: 1.6 }}>{s.tagline}</div>
                    </div>
                  </div>
                )}
                <div style={{ backgroundColor: "#fff", padding: "3rem 2.5rem" }}>
                  <p style={{ color: "#5A5550", lineHeight: 1.8, fontSize: "0.95rem", marginBottom: "2rem" }}>{s.body}</p>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: s.color, marginBottom: "1rem" }}>Key Outcomes</div>
                  {s.outcomes.map((o, j) => {
                    const isHighlight = o === "Honest view of where AI won't help";
                    return (
                      <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "0.6rem" }}>
                        <CheckCircle2 size={16} color={isHighlight ? s.color : s.color} style={{ flexShrink: 0, marginTop: "2px" }} />
                        <span style={{ fontSize: "0.9rem", color: isHighlight ? "#ffffff" : "#3A3530", fontWeight: isHighlight ? 600 : 400 }}>
                          {isHighlight ? "→ " : ""}{o}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {i % 2 !== 0 && (
                  <div style={{ position: "relative", padding: "3rem 2.5rem", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 70% 100%, ${s.color} 0%, ${C.navy} 120%)` }} />
                    <div style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`, opacity: 0.15, mixBlendMode: "overlay" }} />
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "5rem", fontWeight: 700, color: "rgba(255,255,255,0.15)", lineHeight: 1, marginBottom: "0.5rem", transition: "color 0.3s ease" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.3)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.color = "rgba(255,255,255,0.15)"; }}
                      >{s.n}</div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>{s.label}</div>
                      <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.95rem", marginTop: "1rem", lineHeight: 1.6 }}>{s.tagline}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── TOOLKIT ── */}
      <section className="section-padding" style={{ backgroundColor: C.cream }}>
        <div className="container">
          <FadeSection>
            <div style={{ marginBottom: "3rem" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.coral, display: "block", marginBottom: "1rem" }}>The Toolkit</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 700, color: C.navy, lineHeight: 1.2, marginBottom: "0.75rem" }}>
                What comes with every engagement
              </h2>
              <p style={{ color: C.warmGray, fontSize: "0.97rem", maxWidth: "520px", lineHeight: 1.75 }}>
                Every AI Business Transformation client gets access to Throttl's full suite of frameworks, templates, and tools — built to make AI adoption practical and repeatable.
              </p>
            </div>
          </FadeSection>
          <div ref={toolkit.ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "0.75rem" }}>
            {TOOLKIT.map((t, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "10px",
                backgroundColor: "#fff", borderRadius: "6px", padding: "1rem 1.25rem",
                border: `1px solid rgba(15,28,63,0.07)`,
                opacity: toolkit.inView ? 1 : 0,
                transform: toolkit.inView ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`,
              }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: C.gold, flexShrink: 0 }} />
                <span style={{ fontSize: "0.875rem", color: C.navy, fontWeight: 500 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding" style={{ backgroundColor: C.coral }}>
        <div className="container" style={{ textAlign: "center" }}>
          <FadeSection>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: "1.25rem" }}>
              Ready to transform how your business operates?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "2.25rem", maxWidth: "460px", margin: "0 auto 2.25rem" }}>
              Book a free 45-minute strategy call. We'll walk through where AI fits in your operation and where it doesn't.
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
              Start with a Strategy Call <ArrowRight size={16} />
            </a>
          </FadeSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
