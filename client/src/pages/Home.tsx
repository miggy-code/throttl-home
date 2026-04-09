/*
 * THROTTL AI — HOMEPAGE
 * Sections: Hero → Problem → Use Cases → Services → The Throttl Accelerator → Who It's For → CTA
 * Design: Premium B2B, navy/cream, Fraunces + Outfit, coral CTA
 */

import { useState, useEffect } from "react";
import { ArrowRight, ChevronDown, CheckCircle2, Zap, BarChart2, FileText, Users, MessageSquare, Calendar, TrendingUp, Clock, Send, Search, BookOpen, Wrench } from "lucide-react";
import { Link } from "wouter";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FadeSection from "@/components/FadeSection";
import { useInView } from "@/hooks/useInView";
import { IMGS, C, BOOKING_URL } from "@/lib/constants";

const USE_CASES = [
  { icon: BarChart2,    title: "Faster Decisions",          body: "Analyse data, surface insights, and make better calls in a fraction of the time." },
  { icon: Zap,          title: "Brainstorming & Strategy",  body: "Use AI as a thinking partner to stress-test ideas and accelerate planning." },
  { icon: MessageSquare,title: "Clearer Communication",     body: "Draft sharper emails, proposals, and internal memos in minutes." },
  { icon: FileText,     title: "SOPs & Documentation",      body: "Turn tribal knowledge into structured, searchable operating procedures." },
  { icon: Calendar,     title: "Meeting Prep & Summaries",  body: "Walk into every meeting prepared. Walk out with a clean action log." },
  { icon: Users,        title: "Smarter Delegation",        body: "Brief your team with AI-generated context so nothing gets lost in translation." },
  { icon: TrendingUp,   title: "Automated Reporting",       body: "Stop building the same reports manually. Let AI do the heavy lifting." },
  { icon: Clock,        title: "Reduce Admin Load",         body: "Reclaim hours every week by automating repetitive management tasks." },
  { icon: Send,         title: "Sales Communication",       body: "Follow up faster, personalise at scale, and close more with less effort." },
];

export default function Home() {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const problem = useInView();
  const useCases = useInView();
  const services = useInView();
  const accelerator = useInView();
  const audience = useInView();

  useEffect(() => { setTimeout(() => setHeroLoaded(true), 100); }, []);

  return (
    <div style={{ backgroundColor: C.cream, color: C.navy, fontFamily: "'Outfit', sans-serif" }}>
      <NavBar />

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={IMGS.hero} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, ${C.navy}EE 0%, ${C.navy}BB 45%, ${C.navy}55 100%)` }} />
          {/* Subtle grid overlay */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", opacity: 0.6 }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "120px", paddingBottom: "80px" }}>
          <div style={{ maxWidth: "720px" }}>
            {/* Eyebrow */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              border: `1px solid ${C.gold}55`, borderRadius: "2px",
              padding: "5px 14px", marginBottom: "2rem",
              opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: C.gold, display: "inline-block" }} />
              <span style={{ color: C.goldLight, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>AI Enablement for Executives</span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(3rem, 6.5vw, 5rem)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.05,
              marginBottom: "1.5rem",
              letterSpacing: "-0.025em",
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}>
              We Teach<br />
              <span style={{ color: C.goldLight, fontStyle: "italic" }}>Executives AI.</span>
            </h1>

            {/* Sub */}
            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.75,
              marginBottom: "2.75rem",
              maxWidth: "560px",
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
            }}>
              So they can make better decisions, lead more effectively, and run companies that get more done with fewer resources.
            </p>

            {/* CTAs */}
            <div style={{
              display: "flex", gap: "1rem", flexWrap: "wrap",
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
            }}>
              <a href={BOOKING_URL} style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                backgroundColor: C.coral, color: "#fff",
                padding: "0.9rem 2rem", borderRadius: "3px",
                fontWeight: 700, fontSize: "0.9rem",
                textDecoration: "none", letterSpacing: "0.03em",
                transition: "background-color 0.2s, transform 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.coralDark; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.coral; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Get Started <ArrowRight size={16} />
              </a>
              <a href="#services" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                backgroundColor: "transparent", color: "#fff",
                padding: "0.9rem 2rem", borderRadius: "3px",
                fontWeight: 600, fontSize: "0.9rem",
                textDecoration: "none",
                border: "1.5px solid rgba(255,255,255,0.35)",
                transition: "border-color 0.2s, background-color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                Explore Our Services
              </a>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <a href="#problem" style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 1, textDecoration: "none", animation: "bounce 2.2s ease-in-out infinite" }}>
          <ChevronDown size={26} color="rgba(255,255,255,0.4)" />
        </a>
        <style>{`@keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)}}`}</style>
      </section>

      {/* ── PROBLEM ── */}
      <section id="problem" className="section-padding" style={{ backgroundColor: C.navy }}>
        <div className="container">
          <div ref={problem.ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <div style={{ opacity: problem.inView ? 1 : 0, transform: problem.inView ? "translateX(0)" : "translateX(-24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.gold, display: "block", marginBottom: "1rem" }}>The Problem</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: "1.5rem" }}>
                AI is everywhere.<br />
                <span style={{ color: C.goldLight, fontStyle: "italic" }}>Adoption is not.</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, fontSize: "1rem", marginBottom: "1.25rem" }}>
                Most companies are experimenting with AI — but very few are actually doing it at scale. The bottleneck isn't the technology. It's the people leading the business.
              </p>
              <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8, fontSize: "1rem" }}>
                When your management team doesn't know how to use AI effectively, the whole organisation stalls. Throttl fixes that.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", opacity: problem.inView ? 1 : 0, transform: problem.inView ? "translateX(0)" : "translateX(24px)", transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s" }}>
              {[
                { num: "~4 in 5", label: "executives say lack of internal AI skills is their top barrier to adoption" },
                { num: "70%", label: "of AI projects fail due to poor team adoption" },
                { num: "55%", label: "of employees already use unapproved AI tools at work" },
                { num: "3×",  label: "more revenue growth at companies with AI-enabled leadership" },
              ].map((s, i) => (
                <div key={i} style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "6px",
                  padding: "1.5rem",
                  opacity: problem.inView ? 1 : 0,
                  transform: problem.inView ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 0.5s ease ${0.3 + i * 0.1}s, transform 0.5s ease ${0.3 + i * 0.1}s`,
                }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.4rem", fontWeight: 700, color: C.gold, lineHeight: 1, marginBottom: "0.5rem" }}>{s.num}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", lineHeight: 1.5 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── USE CASES ── */}
      <section className="section-padding" style={{ backgroundColor: C.cream }}>
        <div className="container">
          <FadeSection>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.coral, display: "block", marginBottom: "1rem" }}>What AI Actually Does for Executives</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", fontWeight: 700, color: C.navy, lineHeight: 1.2, marginBottom: "1rem" }}>
                AI that fits how you already work
              </h2>
              <p style={{ color: C.warmGray, fontSize: "1rem", maxWidth: "520px", margin: "0 auto", lineHeight: 1.75 }}>
                Not theoretical. Not technical. These are the workflows where AI creates immediate leverage for managers and executives.
              </p>
            </div>
          </FadeSection>

          <div ref={useCases.ref}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
              {USE_CASES.map((uc, i) => {
                const Icon = uc.icon;
                return (
                  <div key={i} style={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    padding: "2.25rem",
                    border: "1px solid rgba(15,28,63,0.08)",
                    boxShadow: "0 4px 24px rgba(15,28,63,0.02)",
                    opacity: useCases.inView ? 1 : 0,
                    transform: useCases.inView ? "translateY(0)" : "translateY(24px)",
                    transition: `all 0.5s cubic-bezier(0.23,1,0.32,1) ${0.1 + i * 0.05}s`,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.borderColor = "rgba(201,168,76,0.6)";
                      el.style.boxShadow = "0 12px 32px rgba(15,28,63,0.06)";
                      el.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.borderColor = "rgba(15,28,63,0.08)";
                      el.style.boxShadow = "0 4px 24px rgba(15,28,63,0.02)";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    <div style={{ width: "42px", height: "42px", borderRadius: "8px", backgroundColor: "rgba(15,28,63,0.03)", border: "1px solid rgba(15,28,63,0.06)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                      <Icon size={18} color={C.navy} />
                    </div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.35rem", color: C.navy, marginBottom: "0.75rem", lineHeight: 1.2 }}>{uc.title}</div>
                    <div style={{ fontSize: "0.95rem", color: C.warmGray, lineHeight: 1.65, flex: 1 }}>{uc.body}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="section-padding" style={{ backgroundColor: C.creamDark }}>
        <div className="container">
          <FadeSection>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.coral, display: "block", marginBottom: "1rem" }}>Our Services</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", fontWeight: 700, color: C.navy, lineHeight: 1.2 }}>
                Two ways to become AI-enabled
              </h2>
            </div>
          </FadeSection>

          <div ref={services.ref} style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem",
            maxWidth: "1100px",
            margin: "0 auto",
          }}>
            {/* Card 1: Workshops */}
            <div style={{
              backgroundColor: C.white,
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: `0 8px 32px ${C.navy}0C`,
              opacity: services.inView ? 1 : 0,
              transform: services.inView ? "translateY(0)" : "translateY(28px)",
              transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0s",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.boxShadow = `0 24px 64px ${C.navy}1A`;
                el.style.transform = "translateY(-8px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.boxShadow = `0 8px 32px ${C.navy}0C`;
                el.style.transform = "translateY(0)";
              }}
            >
              <div style={{ position: "relative", height: "210px", overflow: "hidden" }}>
                <img src={IMGS.workshopsHero} alt="AI Workshops" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.navy}CC 0%, transparent 60%)` }} />
                <div style={{ position: "absolute", bottom: "1.25rem", left: "1.25rem" }}>
                  <span style={{ backgroundColor: C.coral, color: "#fff", padding: "3px 10px", borderRadius: "2px", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>01 — AI Workshops</span>
                </div>
              </div>
              <div style={{ padding: "1.75rem 1.75rem 2rem" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.55rem", fontWeight: 700, color: C.navy, marginBottom: "0.75rem", lineHeight: 1.2 }}>
                  AI Management Training
                </h3>
                <p style={{ color: "#5A5550", lineHeight: 1.75, marginBottom: "1.5rem", fontSize: "0.92rem" }}>
                  Hands-on workshops that give your executives and managers the skills to use AI inside their real workflows — and the certification to prove it.
                </p>
                {["Live workshops tailored to your business", "Practical tool mastery for real workflows", "AI Operator Certification on completion", "Confidence to lead AI adoption internally"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "9px", marginBottom: "0.55rem" }}>
                    <CheckCircle2 size={15} color={C.coral} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "0.86rem", color: "#3A3530" }}>{item}</span>
                  </div>
                ))}
                <Link href="/workshops" style={{
                  display: "inline-flex", alignItems: "center", gap: "7px",
                  color: C.coral, fontWeight: 700, fontSize: "0.875rem",
                  textDecoration: "none", marginTop: "1.75rem",
                  borderBottom: `2px solid ${C.coral}`, paddingBottom: "2px",
                  transition: "gap 0.2s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.gap = "12px"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.gap = "7px"; }}
                >
                  Explore Workshops <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Card 2: Enablement */}
            <div style={{
              backgroundColor: C.navy,
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: `0 8px 32px ${C.navy}26`,
              opacity: services.inView ? 1 : 0,
              transform: services.inView ? "translateY(0)" : "translateY(28px)",
              transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.15s",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.boxShadow = `0 24px 64px ${C.navy}4D`;
                el.style.transform = "translateY(-8px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.boxShadow = `0 8px 32px ${C.navy}26`;
                el.style.transform = "translateY(0)";
              }}
            >
              <div style={{ position: "relative", height: "210px", overflow: "hidden" }}>
                <img src={IMGS.enablementHero} alt="AI Enablement" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.navy}EE 0%, ${C.navy}55 60%)` }} />
                <div style={{ position: "absolute", bottom: "1.25rem", left: "1.25rem" }}>
                  <span style={{ backgroundColor: C.coral, color: "#fff", padding: "3px 10px", borderRadius: "2px", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>02 — Transformation</span>
                </div>
              </div>
              <div style={{ padding: "1.75rem 1.75rem 2rem" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.55rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem", lineHeight: 1.2 }}>
                  AI Business Transformation
                </h3>
                <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: "1.5rem", fontSize: "0.92rem" }}>
                  Our team embeds inside your business to assess, implement, and scale AI across your operations — using <strong style={{ color: C.goldLight, fontWeight: 700 }}>The Throttl Accelerator</strong>, our proprietary 4-step framework.
                </p>
                {["AI opportunity assessment & workflow mapping", "Identify highest-value use cases fast", "Embedded Throttl team inside your business", "From experimentation to making it part of daily operations"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "9px", marginBottom: "0.55rem" }}>
                    <CheckCircle2 size={15} color={C.gold} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "0.86rem", color: "rgba(255,255,255,0.8)" }}>{item}</span>
                  </div>
                ))}
                <Link href="/transformation" style={{
                  display: "inline-flex", alignItems: "center", gap: "7px",
                  color: C.goldLight, fontWeight: 700, fontSize: "0.875rem",
                  textDecoration: "none", marginTop: "1.75rem",
                  borderBottom: `2px solid ${C.gold}`, paddingBottom: "2px",
                  transition: "gap 0.2s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.gap = "12px"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.gap = "7px"; }}
                >
                  Explore Transformation <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THROTTL ACCELERATOR INTRO ── */}
      <section className="section-padding" style={{ backgroundColor: C.navy, position: "relative", overflow: "hidden" }}>
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src={IMGS.playbookHero} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.25 }} />
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${C.navy}FF 40%, ${C.navy}AA 100%)` }} />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div ref={accelerator.ref} style={{ maxWidth: "680px" }}>
            <div style={{ opacity: accelerator.inView ? 1 : 0, transform: accelerator.inView ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.gold, display: "block", marginBottom: "1rem" }}>Our Methodology</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.75rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: "1.25rem" }}>
                The Throttl Accelerator
              </h2>
              <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontSize: "1rem", marginBottom: "2.5rem" }}>
                Our proprietary 4-step framework that takes companies from AI experimentation to full operationalisation. Every AI Business Transformation engagement is built around it.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {[
                { step: "01", label: "Identify",   desc: "Find where AI creates immediate impact", icon: Search },
                { step: "02", label: "Train",      desc: "Certify your leadership team in AI", icon: BookOpen },
                { step: "03", label: "Implement",  desc: "Apply AI to real business operations", icon: Wrench },
                { step: "04", label: "Scale",      desc: "Build a truly AI-enabled company", icon: TrendingUp },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                <div key={i} style={{
                  backgroundColor: "rgba(10, 18, 45, 0.6)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: `1px solid rgba(255,255,255,0.06)`,
                  borderRadius: "12px",
                  padding: "2.5rem 2.25rem",
                  opacity: accelerator.inView ? 1 : 0,
                  transform: accelerator.inView ? "translateY(0)" : "translateY(24px)",
                  transition: `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${0.2 + i * 0.15}s`,
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.backgroundColor = "rgba(15, 25, 60, 0.8)";
                    el.style.borderColor = `rgba(201,168,76,0.4)`;
                    el.style.transform = "translateY(-6px)";
                    el.style.boxShadow = `0 24px 48px rgba(0,0,0,0.4), 0 0 24px rgba(201,168,76,0.1)`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.backgroundColor = "rgba(10, 18, 45, 0.6)";
                    el.style.borderColor = `rgba(255,255,255,0.06)`;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2)";
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, opacity: 0.8 }} />
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.75rem" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={20} color={C.goldLight} />
                    </div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: "rgba(255,255,255,0.15)", fontWeight: 700, letterSpacing: "0.05em", lineHeight: 1 }}>{s.step}</div>
                  </div>
                  
                  <div style={{ fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "1.45rem", marginBottom: "0.75rem", letterSpacing: "0.02em" }}>{s.label}</div>
                  <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", lineHeight: 1.7, flex: 1 }}>{s.desc}</div>
                </div>
              )})}
            </div>

            <div style={{ marginTop: "2.5rem", opacity: accelerator.inView ? 1 : 0, transition: "opacity 0.7s ease 0.6s" }}>
              <Link href="/transformation" style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                color: C.goldLight, fontWeight: 700, fontSize: "0.9rem",
                textDecoration: "none", borderBottom: `2px solid ${C.gold}`, paddingBottom: "2px",
                transition: "gap 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.gap = "13px"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.gap = "8px"; }}
              >
                See the Full Framework <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section className="section-padding" style={{ backgroundColor: C.cream }}>
        <div className="container">
          <FadeSection>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: C.coral, display: "block", marginBottom: "1rem" }}>Who This Is For</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: C.navy, lineHeight: 1.2 }}>
                Built for operators who want to lead, not follow
              </h2>
            </div>
          </FadeSection>

          <div ref={audience.ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {[
              { role: "CEOs & Founders",        desc: "You want your company doing more with the same team. You need everyone moving faster without adding headcount." },
              { role: "COOs & Operators",       desc: "You're responsible for execution. AI should make your workflows sharper, not add more complexity." },
              { role: "Management Teams",       desc: "You lead people and projects. AI gives you better information, faster decisions, and more time for what matters." },
            ].map((item, i) => (
              <div key={i} style={{
                backgroundColor: "#fff",
                borderRadius: "6px",
                padding: "1.75rem",
                border: `1px solid rgba(15,28,63,0.07)`,
                boxShadow: "0 2px 12px rgba(15,28,63,0.04)",
                opacity: audience.inView ? 1 : 0,
                transform: audience.inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}>
                <div style={{ width: "28px", height: "3px", backgroundColor: C.coral, borderRadius: "2px", marginBottom: "1rem" }} />
                <div style={{ fontWeight: 700, color: C.navy, fontSize: "0.95rem", marginBottom: "0.5rem" }}>{item.role}</div>
                <div style={{ color: C.warmGray, fontSize: "0.86rem", lineHeight: 1.65, flex: 1 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section-padding" style={{ backgroundColor: C.coral, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <FadeSection>
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", display: "block", marginBottom: "1rem" }}>Get Started</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4.5vw, 3.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: "1.25rem", maxWidth: "600px", margin: "0 auto 1.25rem" }}>
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

      <Footer />
    </div>
  );
}
