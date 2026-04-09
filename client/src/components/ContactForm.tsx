/*
 * CONTACT FORM
 * Single, focused form used on the dedicated /contact page.
 * Captures: name, email, company, message
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
  label, id, type = "text", placeholder, value, onChange, error, required, multiline,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const sharedStyle = {
    ...FIELD_STYLE,
    borderColor: error ? "#F87171" : focused ? C.coral : "rgba(255,255,255,0.1)",
    boxShadow: error ? "0 0 0 3px rgba(248,113,113,0.15)" : focused ? `0 0 0 3px rgba(106,138,158,0.2)` : "none",
  };
  return (
    <div>
      <label htmlFor={id} style={LABEL_STYLE}>
        {label}
        {required && <span style={{ color: "#F87171", marginLeft: "3px" }}>*</span>}
      </label>
      {multiline ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={4}
          style={{ ...sharedStyle, resize: "vertical", fontFamily: "'Outfit', sans-serif" }}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={sharedStyle}
        />
      )}
      {error && <div style={ERROR_STYLE}>{error}</div>}
    </div>
  );
}

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<FormState>("idle");
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
    if (honeypot) return;

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
        body: JSON.stringify({
          source: "contact",
          name,
          email,
          phone: phone || undefined,
          company: company || undefined,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div style={{ textAlign: "center", padding: "2rem 0" }}>
        <div style={{
          width: "56px", height: "56px", borderRadius: "50%",
          backgroundColor: "rgba(106,138,158,0.15)", border: `1.5px solid ${C.coral}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 1.5rem",
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.coral} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.25rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: "1rem" }}>
          We'll be in touch.
        </h2>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "1.05rem", color: "#B0B8C8", lineHeight: 1.75, maxWidth: "440px", margin: "0 auto" }}>
          Expect to hear from us within 24 hours. We'll learn about your business and walk you through how Throttl can help.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot */}
      <div style={{ position: "absolute", left: "-9999px", opacity: 0 }} aria-hidden="true">
        <input tabIndex={-1} autoComplete="off" name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Field label="Your Name" id="c-name" placeholder="John Smith" value={name} onChange={setName} error={errors.name} required />
        <Field label="Email Address" id="c-email" type="email" placeholder="john@company.com" value={email} onChange={setEmail} error={errors.email} required />
        <Field label="Phone Number" id="c-phone" type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={setPhone} />
        <Field label="Company Name" id="c-company" placeholder="Acme Manufacturing" value={company} onChange={setCompany} />
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
        {formState === "submitting" ? "Sending..." : <>Send Message <ArrowRight size={16} /></>}
      </button>
    </form>
  );
}
