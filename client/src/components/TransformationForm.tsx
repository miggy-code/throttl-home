/*
 * TRANSFORMATION INQUIRY FORM — TWO-STEP
 * Step 1: Name + Email (immediate lead capture)
 * Step 2: Company qualification fields
 * Inline section at bottom of Transformation page
 */

import { useState, useRef, useEffect } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { C } from "@/lib/constants";

type FormState = "step1" | "step2" | "success" | "error";

const FIELD_STYLE: React.CSSProperties = {
  width: "100%",
  backgroundColor: "#1A2538",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "1rem",
  fontFamily: "'Outfit', sans-serif",
  padding: "14px 16px",
  outline: "none",
  transition: "border-color 150ms ease, box-shadow 150ms ease",
  boxSizing: "border-box",
};

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "#B0B8C8",
  marginBottom: "6px",
};

const ERROR_STYLE: React.CSSProperties = {
  fontFamily: "'Outfit', sans-serif",
  fontSize: "0.8125rem",
  color: "#F87171",
  marginTop: "5px",
};

function TextField({
  label, id, type = "text", placeholder, value, onChange, error, required,
}: {
  label: string; id: string; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; error?: string; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label htmlFor={id} style={LABEL_STYLE}>
        {label}{required && <span style={{ color: "#F87171", marginLeft: "3px" }}>*</span>}
      </label>
      <input
        id={id} type={type} placeholder={placeholder} value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          ...FIELD_STYLE,
          borderColor: error ? "#F87171" : focused ? C.coral : "rgba(255,255,255,0.1)",
          boxShadow: error ? "0 0 0 3px rgba(248,113,113,0.15)" : focused ? `0 0 0 3px rgba(106,138,158,0.2)` : "none",
        }}
      />
      {error && <div style={ERROR_STYLE}>{error}</div>}
    </div>
  );
}

function SelectField({
  label, id, value, onChange, options, error, required,
}: {
  label: string; id: string; value: string;
  onChange: (v: string) => void; options: { value: string; label: string }[];
  error?: string; required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <label htmlFor={id} style={LABEL_STYLE}>
        {label}{required && <span style={{ color: "#F87171", marginLeft: "3px" }}>*</span>}
      </label>
      <button
        id={id} type="button"
        onClick={() => { setOpen(!open); setFocused(true); }}
        style={{
          ...FIELD_STYLE,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          cursor: "pointer", textAlign: "left",
          borderColor: error ? "#F87171" : focused ? C.coral : "rgba(255,255,255,0.1)",
          boxShadow: error ? "0 0 0 3px rgba(248,113,113,0.15)" : focused ? `0 0 0 3px rgba(106,138,158,0.2)` : "none",
        }}
      >
        <span style={{ color: selected ? "#fff" : "#6B7280" }}>
          {selected ? selected.label : "Select…"}
        </span>
        <ChevronDown size={16} color="#6B7280" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms ease", flexShrink: 0 }} />
      </button>
      {error && <div style={ERROR_STYLE}>{error}</div>}
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 50,
          backgroundColor: "#1A2538", border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "8px", overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          maxHeight: "220px", overflowY: "auto",
        }}>
          {options.map(opt => (
            <button key={opt.value} type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              style={{
                width: "100%", textAlign: "left",
                padding: "11px 16px", border: "none",
                backgroundColor: value === opt.value ? "rgba(106,138,158,0.2)" : "transparent",
                color: value === opt.value ? "#fff" : "rgba(255,255,255,0.75)",
                fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", cursor: "pointer",
              }}
              onMouseEnter={e => { if (value !== opt.value) e.currentTarget.style.backgroundColor = "#0A1628"; }}
              onMouseLeave={e => { if (value !== opt.value) e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TextAreaField({
  label, id, placeholder, value, onChange, rows = 3, error,
}: {
  label: string; id: string; placeholder?: string; value: string;
  onChange: (v: string) => void; rows?: number; error?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label htmlFor={id} style={LABEL_STYLE}>{label}</label>
      <textarea
        id={id} rows={rows} placeholder={placeholder} value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          ...FIELD_STYLE,
          resize: "vertical",
          minHeight: `${rows * 1.5 + 2}rem`,
          borderColor: error ? "#F87171" : focused ? C.coral : "rgba(255,255,255,0.1)",
          boxShadow: error ? "0 0 0 3px rgba(248,113,113,0.15)" : focused ? `0 0 0 3px rgba(106,138,158,0.2)` : "none",
        }}
      />
      {error && <div style={ERROR_STYLE}>{error}</div>}
    </div>
  );
}

const COMPANY_SIZE_OPTIONS = [
  { value: "under-50", label: "Under 50 employees" },
  { value: "50-200",   label: "50–200 employees" },
  { value: "200-500",  label: "200–500 employees" },
  { value: "500+",     label: "500+ employees" },
];

const INDUSTRY_OPTIONS = [
  { value: "manufacturing",      label: "Manufacturing" },
  { value: "distribution",       label: "Distribution & Logistics" },
  { value: "financial",          label: "Financial Services / Family Office" },
  { value: "professional",       label: "Professional Services" },
  { value: "retail",             label: "Retail / E-Commerce" },
  { value: "other",              label: "Other" },
];

const AI_USAGE_OPTIONS = [
  { value: "not-yet",           label: "Not at all yet" },
  { value: "experimenting",     label: "Experimenting informally" },
  { value: "some-tools",        label: "Some tools in use, but nothing structured" },
  { value: "have-strategy",     label: "We have a strategy but need help executing" },
];

export default function TransformationForm() {
  const [formState, setFormState] = useState<FormState>("step1");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Step 1 fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");

  // Step 2 fields
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [industry, setIndustry] = useState("");
  const [challenge, setChallenge] = useState("");
  const [aiUsage, setAiUsage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState(false);

  // Animation state
  const [step1Visible, setStep1Visible] = useState(true);
  const [step2Visible, setStep2Visible] = useState(false);
  const [headline, setHeadline] = useState<"step1" | "step2">("step1");
  const [headlineOpacity, setHeadlineOpacity] = useState(1);

  function validateStep1() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "This field is required";
    if (!email.trim()) errs.email = "This field is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Please enter a valid email address";
    return errs;
  }

  function validateStep2() {
    const errs: Record<string, string> = {};
    if (!company.trim()) errs.company = "This field is required";
    if (!role.trim()) errs.role = "This field is required";
    if (!companySize) errs.companySize = "This field is required";
    if (!industry) errs.industry = "This field is required";
    if (!aiUsage) errs.aiUsage = "This field is required";
    return errs;
  }

  async function handleStep1Submit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) return;

    const errs = validateStep1();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});

    // Fire-and-forget partial lead capture
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "transformation-partial", name, email }),
    }).catch(() => {/* intentional no-op */});

    if (isTransitioning) return;
    setIsTransitioning(true);

    // Crossfade headline
    setHeadlineOpacity(0);
    setTimeout(() => {
      setHeadline("step2");
      setHeadlineOpacity(1);
    }, 300);

    // Fade out step 1
    setStep1Visible(false);
    // After step 1 exits, show step 2
    setTimeout(() => {
      setFormState("step2");
      setStep2Visible(true);
      setIsTransitioning(false);
    }, 600);
  }

  async function handleStep2Submit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateStep2();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitError(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "transformation-complete",
          name, email, company, role, companySize, industry, challenge, aiUsage,
        }),
      });
      if (!res.ok) throw new Error("Request failed");

      setStep2Visible(false);
      setTimeout(() => setFormState("success"), 500);
    } catch {
      setSubmitError(true);
    }
  }

  const step2Fields = [
    { key: "company" },
    { key: "role" },
    { key: "companySize" },
    { key: "industry" },
    { key: "challenge" },
    { key: "aiUsage" },
  ];

  return (
    <section id="get-started" style={{ padding: "5rem 0", backgroundColor: "#0A1628" }}>
      <div className="container">
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>

          {formState === "success" ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.25rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: "1.25rem" }}>
                You're in.
              </h2>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", color: "#B0B8C8", lineHeight: 1.75, marginBottom: "2rem" }}>
                Gabriel will reach out within 24 hours to schedule your strategy call. In the meantime, here's what to expect:
              </p>
              {[
                "1. A 45-minute call to understand your business",
                "2. An honest assessment of where AI fits — and where it doesn't",
                "3. A clear recommendation on next steps",
              ].map((line, i) => (
                <p key={i} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1rem", color: "#B0B8C8", lineHeight: 1.75, marginBottom: "0.5rem" }}>{line}</p>
              ))}
            </div>
          ) : (
            <>
              {/* Section label */}
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: C.coral, display: "block", marginBottom: "1rem" }}>
                Get Started
              </span>

              {/* Crossfading headline */}
              <div style={{ marginBottom: "0.75rem", minHeight: "3rem" }}>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.8rem, 4vw, 2.25rem)",
                  fontWeight: 700, color: "#fff", lineHeight: 1.15,
                  opacity: headlineOpacity,
                  transition: "opacity 300ms ease",
                  margin: 0,
                }}>
                  {headline === "step1" ? "Tell us about your business." : "A few more details."}
                </h2>
              </div>

              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", color: "#B0B8C8", lineHeight: 1.75, marginBottom: "2.5rem" }}>
                {formState === "step1"
                  ? "Start here — we'll follow up within 24 hours to schedule your strategy call."
                  : "This helps us prepare for your strategy call."}
              </p>

              {/* Honeypot */}
              <div style={{ position: "absolute", left: "-9999px", opacity: 0 }} aria-hidden="true">
                <input tabIndex={-1} autoComplete="off" name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
              </div>

              {/* STEP 1 */}
              {(formState === "step1" || isTransitioning) && (
                <form onSubmit={handleStep1Submit} noValidate
                  style={{
                    opacity: step1Visible ? 1 : 0,
                    transform: step1Visible ? "translateY(0)" : "translateY(-12px)",
                    transition: "opacity 400ms cubic-bezier(0.4, 0, 1, 1), transform 400ms cubic-bezier(0.4, 0, 1, 1)",
                    pointerEvents: step1Visible ? "auto" : "none",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <TextField label="Your Name" id="tf-name" placeholder="John Smith" value={name} onChange={setName} error={errors.name} required />
                    <TextField label="Email Address" id="tf-email" type="email" placeholder="john@company.com" value={email} onChange={setEmail} error={errors.email} required />
                  </div>
                  <button type="submit"
                    style={{
                      marginTop: "28px", width: "100%",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      backgroundColor: C.coral, color: "#fff",
                      padding: "14px 24px", borderRadius: "3px",
                      fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.9rem",
                      border: "none", cursor: "pointer",
                      transition: "background-color 0.2s, transform 0.15s, box-shadow 0.2s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.coralDark; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${C.coral}40`; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.coral; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                </form>
              )}

              {/* STEP 2 */}
              {formState === "step2" && (
                <form onSubmit={handleStep2Submit} noValidate>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {step2Fields.map((f, i) => (
                      <div key={f.key} style={{
                        opacity: step2Visible ? 1 : 0,
                        transform: step2Visible ? "translateY(0)" : "translateY(16px)",
                        transition: `opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms`,
                      }}>
                        {f.key === "company" && (
                          <TextField label="Company Name" id="tf-company" placeholder="Acme Manufacturing" value={company} onChange={setCompany} error={errors.company} required />
                        )}
                        {f.key === "role" && (
                          <TextField label="Your Role / Title" id="tf-role" placeholder="Chief Operating Officer" value={role} onChange={setRole} error={errors.role} required />
                        )}
                        {f.key === "companySize" && (
                          <SelectField label="Company Size" id="tf-size" value={companySize} onChange={setCompanySize} options={COMPANY_SIZE_OPTIONS} error={errors.companySize} required />
                        )}
                        {f.key === "industry" && (
                          <SelectField label="Industry" id="tf-industry" value={industry} onChange={setIndustry} options={INDUSTRY_OPTIONS} error={errors.industry} required />
                        )}
                        {f.key === "challenge" && (
                          <TextAreaField
                            label="What's your biggest operational challenge right now?"
                            id="tf-challenge" rows={3}
                            placeholder="e.g., Too much manual reporting, slow decision-making, scaling without adding headcount..."
                            value={challenge} onChange={setChallenge}
                          />
                        )}
                        {f.key === "aiUsage" && (
                          <SelectField label="How is your team currently using AI?" id="tf-aiusage" value={aiUsage} onChange={setAiUsage} options={AI_USAGE_OPTIONS} error={errors.aiUsage} required />
                        )}
                      </div>
                    ))}
                  </div>

                  {submitError && (
                    <div style={{ marginTop: "1rem", padding: "12px 16px", backgroundColor: "rgba(248,113,113,0.1)", borderRadius: "6px", border: "1px solid rgba(248,113,113,0.3)" }}>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.875rem", color: "#F87171", margin: 0 }}>
                        Something went wrong. Please try again or email us at <a href="mailto:hello@throttl.ai" style={{ color: "#F87171" }}>hello@throttl.ai</a>.
                      </p>
                    </div>
                  )}

                  <div style={{
                    opacity: step2Visible ? 1 : 0,
                    transition: `opacity 500ms cubic-bezier(0.16, 1, 0.3, 1) ${step2Fields.length * 80}ms`,
                  }}>
                    <button type="submit"
                      style={{
                        marginTop: "28px", width: "100%",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                        backgroundColor: C.coral, color: "#fff",
                        padding: "14px 24px", borderRadius: "3px",
                        fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "0.9rem",
                        border: "none", cursor: "pointer",
                        transition: "background-color 0.2s, transform 0.15s, box-shadow 0.2s",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.coralDark; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${C.coral}40`; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = C.coral; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                    >
                      Book Your Strategy Call <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
