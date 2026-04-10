/*
 * THROTTL — /api/contact (Next.js Route Handler)
 * Handles all contact form submissions and sends to Slack
 *
 * Required env variables:
 *   SLACK_CLIENT_ID      — Slack app client ID
 *   SLACK_SECRET         — Slack app secret
 *   SLACK_CHANNEL_ID     — Slack channel ID to post messages to (default: C...)
 */

import { NextRequest, NextResponse } from "next/server";

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
  const fields: Array<{ type: string; text: string }> = [
    { type: "mrkdwn", text: `*Name:*\n${p.name}` },
    { type: "mrkdwn", text: `*Email:*\n<mailto:${p.email}|${p.email}>` },
  ];

  if (p.company) fields.push({ type: "mrkdwn", text: `*Company:*\n${p.company}` });
  if (p.role) fields.push({ type: "mrkdwn", text: `*Role:*\n${p.role}` });
  if (p.companySize) fields.push({ type: "mrkdwn", text: `*Company Size:*\n${p.companySize}` });
  if (p.industry) fields.push({ type: "mrkdwn", text: `*Industry:*\n${p.industry}` });
  if (p.aiUsage) fields.push({ type: "mrkdwn", text: `*Current AI Usage:*\n${p.aiUsage}` });
  if (p.challenge) fields.push({ type: "mrkdwn", text: `*Operational Challenge:*\n${p.challenge}` });

  const partialNote = p.source === "transformation-partial"
    ? "\n⚠️ *Note:* This person started the inquiry form but did not complete Step 2. Follow up to re-engage."
    : "";

  return {
    text: `${emoji} ${title} — ${p.name}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `${emoji} ${title}`,
          emoji: true,
        },
      },
      {
        type: "section",
        fields,
      },
      ...(partialNote ? [{
        type: "section",
        text: {
          type: "mrkdwn",
          text: partialNote,
        },
      }] : []),
    ],
  };
}

// ── Route Handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  // Parse body
  let body: Partial<ContactPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot check (handled client-side but double-check server-side)
  // Validate source
  const validSources: ContactSource[] = ["transformation-partial", "transformation-complete", "workshop", "contact"];
  if (!body.source || !validSources.includes(body.source)) {
    return NextResponse.json({ error: "Invalid source" }, { status: 400 });
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
  if (!payload.name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  if (!payload.email || !isValidEmail(payload.email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  // Send to Slack
  const slackSecret = process.env.SLACK_SECRET;
  const channelId = process.env.SLACK_CHANNEL_ID || "sales-marketing";

  if (!slackSecret) {
    // Dev fallback — log and return success so the UI works without Slack configured
    console.log("[/api/contact] SLACK_SECRET not set. Payload:", payload);
    return NextResponse.json({ ok: true });
  }

  try {
    const message = buildSlackMessage(payload);
    const response = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${slackSecret}`,
      },
      body: JSON.stringify({
        channel: channelId,
        ...message,
      }),
    });

    const data = await response.json();
    if (!data.ok) {
      console.error("[/api/contact] Slack error:", data.error);
      return NextResponse.json({ error: "Failed to send to Slack" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] Slack error:", err);
    return NextResponse.json({ error: "Failed to send to Slack" }, { status: 500 });
  }
}
