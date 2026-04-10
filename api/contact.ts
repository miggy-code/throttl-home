/*
 * THROTTL — /api/contact
 * Vercel serverless function
 * Handles all contact form submissions and sends to Slack
 *
 * Required env variables:
 *   SLACK_WEBHOOK_URL    — Slack incoming webhook URL
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";

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

// ── Slack message formatting ──────────────────────────────────────────────────
const EMOJI: Record<ContactSource, string> = {
  "transformation-partial":  "🟡",
  "transformation-complete": "🟢",
  "workshop":                "📘",
  "contact":                 "✉️",
};

const TITLES: Record<ContactSource, string> = {
  "transformation-partial":  "New Transformation Lead",
  "transformation-complete": "Transformation Inquiry",
  "workshop":                "Workshop Inquiry",
  "contact":                 "Contact Inquiry",
};

function buildSlackMessage(p: ContactPayload): object {
  const emoji = EMOJI[p.source];
  const title = TITLES[p.source];

  let text = `${emoji} *${title}* — ${p.name}\n\n`;
  text += `*Name:* ${p.name}\n`;
  text += `*Email:* ${p.email}\n`;
  if (p.company) text += `*Company:* ${p.company}\n`;
  if (p.role) text += `*Role:* ${p.role}\n`;
  if (p.companySize) text += `*Company Size:* ${p.companySize}\n`;
  if (p.industry) text += `*Industry:* ${p.industry}\n`;
  if (p.aiUsage) text += `*Current AI Usage:* ${p.aiUsage}\n`;
  if (p.challenge) text += `*Challenge:* ${p.challenge}\n`;

  if (p.source === "transformation-partial") {
    text += `\n⚠️ *Note:* This person started the inquiry form but did not complete Step 2. Follow up to re-engage.`;
  }

  return {
    text: `${emoji} ${title} — ${p.name}`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text,
        },
      },
    ],
  };
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

  // Send to Slack via webhook
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    // Dev fallback — log and return success so the UI works without Slack configured
    console.log("[/api/contact] SLACK_WEBHOOK_URL not set. Payload:", payload);
    return res.status(200).json({ ok: true });
  }

  try {
    const message = buildSlackMessage(payload);
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      console.error("[/api/contact] Slack webhook error:", response.statusText);
      return res.status(500).json({ error: "Failed to send to Slack" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] Slack webhook error:", err);
    return res.status(500).json({ error: "Failed to send to Slack" });
  }
}
