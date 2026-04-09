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
            <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(2.5rem, 5.5vw, 4rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
              We Turn Your Business Into an <br className="hidden md:block" />
              <span style={{ color: C.goldLight, fontStyle: "italic" }}>
                AI-Enabled Operation
              </span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: "1.5rem", maxWidth: "560px" }}>
              We work alongside your leadership team to implement AI, drive adoption, and position your business to grow as a truly AI-enabled company—guided by our AI Operator Playbook™.
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
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.coral, display: "block", marginBottom: "1rem" }}>How The AI Transformation Process Begins</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 700, color: C.navy, lineHeight: 1.2, marginBottom: "1.25rem" }}>
                We embed inside your business and execute with you.
              </h2>
              <p style={{ color: "#5A5550", lineHeight: 1.8, fontSize: "0.97rem", marginBottom: "1.25rem" }}>
                AI Business Transformation is our highest-level service. A dedicated Throttl team embeds inside your business as a fractional AI operating executive, and works shoulder-to-shoulder with your management to transform how you operate.
              </p>
              <p style={{ color: "#5A5550", lineHeight: 1.8, fontSize: "0.97rem" }}>
                Every engagement leverages our AI Operator Playbooks in conjunction with The Throttl Accelerator — where the execution takes place.
              </p>
            </FadeSection>
            <div>
              {[
                { icon: Search, title: "Assess", body: "We map your workflows, identify inefficiencies, and find where AI creates the most immediate value." },
                { icon: Map, title: "Plan", body: "We build a prioritised AI roadmap — quick wins first, long-term transformation second." },
                { icon: Wrench, title: "Implement", body: "We apply AI tools and workflows into your real operations, working alongside your team." },
                { icon: TrendingUp, title: "Scale", body: "We expand AI adoption across departments and build the internal capability to sustain it." },
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

      {/* ── CTA ── */}
      <section className="section-padding" style={{ backgroundColor: C.coral }}>
        <div className="container" style={{ textAlign: "center" }}>
          <FadeSection>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: "1.25rem" }}>
              Ready to transform how your business operates?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "2.25rem", maxWidth: "460px", margin: "0 auto 2.25rem" }}>
              Book a free 30-minute strategy call. We'll walk through where AI fits in your operation and where it doesn't.
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
