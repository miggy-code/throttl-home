/*
 * WORKSHOP INTEREST FORM
 * Single-step lead capture — name, email, company name
 * Inline section at bottom of Workshops page
 */

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { C } from "@/lib/constants";

type FormState = "idle" | "submitting" | "success" | "error";

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

function Field({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label htmlFor={id} style={LABEL_STYLE}>
        {label}
        {required && <span style={{ color: "#F87171", marginLeft: "3px" }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
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

export default function WorkshopForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<FormState>("idle");

  // Honeypot
  const [honeypot, setHoneypot] = useState("");

  function validate() {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "This field is required";
    if (!email.trim()) errs.email = "This field is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Please enter a valid email address";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) return; // Silently reject bots

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "workshop", name, email, company: company || undefined }),
      });
      if (!res.ok) throw new Error("Request failed");
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  return (
    <section id="get-started" style={{ padding: "5rem 0", backgroundColor: "#0A1628" }}>
      <div className="container">
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          {formState === "success" ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: "1.25rem" }}>
                We'll be in touch.
              </h2>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", color: "#B0B8C8", lineHeight: 1.75 }}>
                Expect to hear from us within 24 hours. We'll walk you through available workshop formats and help you find the right fit for your team.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <span style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: C.coral, display: "block", marginBottom: "1rem" }}>
                Get Started
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.25rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: "0.75rem" }}>
                Let's find the right workshop for your team.
              </h2>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", color: "#B0B8C8", lineHeight: 1.75, marginBottom: "2.5rem" }}>
                Leave your details and we'll reach out within 24 hours with workshop options and availability.
              </p>

              {/* Honeypot */}
              <div style={{ position: "absolute", left: "-9999px", opacity: 0 }} aria-hidden="true">
                <input tabIndex={-1} autoComplete="off" name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <Field label="Your Name" id="ws-name" placeholder="John Smith" value={name} onChange={setName} error={errors.name} required />
                <Field label="Email Address" id="ws-email" type="email" placeholder="john@company.com" value={email} onChange={setEmail} error={errors.email} required />
                <Field label="Company Name" id="ws-company" placeholder="Acme Manufacturing" value={company} onChange={setCompany} />
              </div>

              {formState === "error" && (
                <div style={{ marginTop: "1rem", padding: "12px 16px", backgroundColor: "rgba(248,113,113,0.1)", borderRadius: "6px", border: "1px solid rgba(248,113,113,0.3)" }}>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.875rem", color: "#F87171", margin: 0 }}>
                    Something went wrong. Please try again or email us at <a href="mailto:hello@throttl.ai" style={{ color: "#F87171" }}>hello@throttl.ai</a>.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={formState === "submitting"}
                style={{
                  marginTop: "28px",
                  width: "100%",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  backgroundColor: formState === "submitting" ? C.coralDark : C.coral,
                  color: "#fff",
                  padding: "14px 24px",
                  borderRadius: "3px",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700, fontSize: "0.9rem",
                  border: "none", cursor: formState === "submitting" ? "not-allowed" : "pointer",
                  transition: "background-color 0.2s, transform 0.15s, box-shadow 0.2s",
                }}
                onMouseEnter={e => { if (formState !== "submitting") { e.currentTarget.style.backgroundColor = C.coralDark; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${C.coral}40`; } }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = formState === "submitting" ? C.coralDark : C.coral; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {formState === "submitting" ? "Sending..." : <>Get Workshop Information <ArrowRight size={16} /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
