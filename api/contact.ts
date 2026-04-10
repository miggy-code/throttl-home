/*
 * THROTTL — /api/contact
 * Vercel serverless function
 * Handles all contact form submissions and sends email via Resend
 *
 * Required env variables:
 *   RESEND_API_KEY      — from resend.com dashboard
 *   RESEND_FROM_EMAIL   — verified sender (e.g. hello@throttl.ai)
 *   THROTTL_NOTIFY_EMAIL — inbox to notify (e.g. gabriel@throttl.ai)
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

type ContactSource = "transformation-partial" | "transformation-complete" | "workshop" | "contact";

interface ContactPayload {
  source: ContactSource;
  name: string;
  email: string;
  company?: string;
  role?: string;
  companySize?: string;
  industry?: string;
  challenge?: string;
  aiUsage?: string;
}

// ── Rate limiting (in-memory, resets on cold start) ──────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS_PER_HOUR = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }
  if (entry.count >= MAX_REQUESTS_PER_HOUR) return true;
  entry.count++;
  return false;
}

// ── Validation ────────────────────────────────────────────────────────────────
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(val: unknown, max = 1000): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, max);
}

// ── Email formatting ──────────────────────────────────────────────────────────
const SUBJECT: Record<ContactSource, (p: ContactPayload) => string> = {
  "transformation-partial":  p => `🟡 New Transformation Lead — ${p.name}`,
  "transformation-complete": p => `🟢 Transformation Inquiry — ${p.name} at ${p.company || "Unknown"}`,
  "workshop":                p => `📘 Workshop Inquiry — ${p.name}`,
  "contact":                 p => `✉️ Contact Inquiry — ${p.name}`,
};

function buildEmailHtml(p: ContactPayload): string {
  const row = (label: string, value: string | undefined) =>
    value
      ? `<tr><td style="padding:8px 12px;font-weight:600;color:#374151;white-space:nowrap;vertical-align:top;font-family:sans-serif;font-size:14px">${label}</td><td style="padding:8px 12px;color:#1f2937;font-family:sans-serif;font-size:14px">${value}</td></tr>`
      : "";

  const partialNote =
    p.source === "transformation-partial"
      ? `<div style="margin:16px 0;padding:12px 16px;background:#FEF9C3;border-left:4px solid #F59E0B;border-radius:4px;font-family:sans-serif;font-size:14px;color:#92400E">
          <strong>Note:</strong> This person started the inquiry form but did not complete Step 2. Follow up to re-engage.
        </div>`
      : "";

  const sourceLabels: Record<ContactSource, string> = {
    "transformation-partial":  "Transformation (Partial)",
    "transformation-complete": "Transformation (Complete)",
    "workshop":                "Workshop Inquiry",
    "contact":                 "Contact Inquiry",
  };

  return `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:24px;background:#f9fafb;font-family:sans-serif">
      <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1)">
        <div style="background:#0F1C3F;padding:24px 28px">
          <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700">New ${sourceLabels[p.source]}</h1>
        </div>
        <div style="padding:24px 28px">
          ${partialNote}
          <table style="border-collapse:collapse;width:100%;border:1px solid #e5e7eb;border-radius:6px;overflow:hidden">
            ${row("Name", p.name)}
            ${row("Email", `<a href="mailto:${p.email}" style="color:#6A8A9E">${p.email}</a>`)}
            ${row("Company", p.company)}
            ${row("Role / Title", p.role)}
            ${row("Company Size", p.companySize)}
            ${row("Industry", p.industry)}
            ${row("Current AI Usage", p.aiUsage)}
            ${p.challenge ? row("Operational Challenge", p.challenge) : ""}
          </table>
        </div>
        <div style="padding:16px 28px;background:#f3f4f6;border-top:1px solid #e5e7eb">
          <p style="margin:0;font-size:12px;color:#6b7280">Sent from the Throttl website contact form</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// ── Handler ───────────────────────────────────────────────────────────────────
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Rate limiting
  const ip =
    (Array.isArray(req.headers["x-forwarded-for"])
      ? req.headers["x-forwarded-for"][0]
      : req.headers["x-forwarded-for"]) ||
    req.socket?.remoteAddress ||
    "unknown";

  if (isRateLimited(ip as string)) {
    return res.status(429).json({ error: "Too many requests. Please try again later." });
  }

  // Parse body
  const body = req.body as Partial<ContactPayload>;

  // Validate source
  const validSources: ContactSource[] = ["transformation-partial", "transformation-complete", "workshop", "contact"];
  if (!body.source || !validSources.includes(body.source)) {
    return res.status(400).json({ error: "Invalid source" });
  }

  // Build validated payload
  const payload: ContactPayload = {
    source:      body.source,
    name:        sanitize(body.name, 200),
    email:       sanitize(body.email, 200),
    company:     sanitize(body.company),
    role:        sanitize(body.role),
    companySize: sanitize(body.companySize),
    industry:    sanitize(body.industry),
    challenge:   sanitize(body.challenge),
    aiUsage:     sanitize(body.aiUsage),
  };

  // Validate required fields
  if (!payload.name) return res.status(400).json({ error: "Name is required" });
  if (!payload.email || !isValidEmail(payload.email)) {
    return res.status(400).json({ error: "Valid email is required" });
  }

  // Send email
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "hello@throttl.ai";
  const toEmail = process.env.THROTTL_NOTIFY_EMAIL || "hello@throttl.ai";

  if (!apiKey) {
    // Dev fallback — log and return success so the UI works without Resend configured
    console.log("[/api/contact] RESEND_API_KEY not set. Payload:", payload);
    return res.status(200).json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `Throttl Website <${fromEmail}>`,
      to:   ["gabriel@throttlai.com", "miguel@throttlai.com"],
      subject: SUBJECT[payload.source](payload),
      html: buildEmailHtml(payload),
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] Resend error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
