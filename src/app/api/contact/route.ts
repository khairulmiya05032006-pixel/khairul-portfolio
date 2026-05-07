import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ─── Zod validation schema ────────────────────────────────────────────────────
const contactSchema = z.object({
  user_name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be under 100 characters")
    .regex(/^[a-zA-Z\s\-'.]+$/, "Name contains invalid characters"),

  user_email: z
    .string()
    .min(1, "Email is required")
    .max(254, "Email is too long")
    .email("Invalid email address"),

  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject must be under 200 characters"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),

  // Honeypot field — must be empty (bots fill it, humans don't see it)
  _honey: z.string().max(0, "Bot detected"),
});

// ─── Simple in-memory rate limiter ────────────────────────────────────────────
// Tracks last submission time per IP. Resets on server restart (fine for serverless).
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 60_000; // 60 seconds between submissions

function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")          // strip all HTML tags
    .replace(/javascript:/gi, "")     // strip JS protocol
    .replace(/on\w+\s*=/gi, "")       // strip event handlers
    .trim();
}

export async function POST(req: NextRequest) {
  try {
    // ── Validate environment variables are present ──
    const serviceId   = process.env.EMAILJS_SERVICE_ID;
    const templateId  = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey   = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey  = process.env.EMAILJS_PRIVATE_KEY; // Required for server-side strict mode

    if (!serviceId || !templateId || !publicKey || !privateKey) {
      console.error("[contact/route] Missing EmailJS environment variables. Ensure EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, and EMAILJS_PRIVATE_KEY are set in .env.local");
      return NextResponse.json(
        { success: false, error: "Server configuration error. Please try again later." },
        { status: 500 }
      );
    }

    // ── Rate limiting by IP ──
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim()
            ?? req.headers.get("x-real-ip")
            ?? "unknown";

    const lastSubmission = rateLimitMap.get(ip);
    const now = Date.now();

    if (lastSubmission && now - lastSubmission < RATE_LIMIT_MS) {
      const waitSeconds = Math.ceil((RATE_LIMIT_MS - (now - lastSubmission)) / 1000);
      return NextResponse.json(
        { success: false, error: `Please wait ${waitSeconds} seconds before sending another message.` },
        { status: 429 }
      );
    }

    // ── Parse & validate request body ──
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request format." },
        { status: 400 }
      );
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "Validation failed.";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 422 }
      );
    }

    // ── Sanitize inputs ──
    const { user_name, user_email, subject, message } = parsed.data;
    const safeName    = sanitizeText(user_name);
    const safeSubject = sanitizeText(subject);
    const safeMessage = sanitizeText(message);

    // ── Send via EmailJS REST API ──
    // accessToken (Private Key) is required when EmailJS is in strict mode
    // Get it from: https://dashboard.emailjs.com/admin/account/security
    const emailjsResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id:   serviceId,
        template_id:  templateId,
        user_id:      publicKey,
        accessToken:  privateKey,
        template_params: {
          user_name:  safeName,
          user_email: user_email,
          subject:    safeSubject,
          message:    safeMessage,
        },
      }),
    });

    if (!emailjsResponse.ok) {
      const errorText = await emailjsResponse.text();
      console.error("[contact/route] EmailJS error:", errorText);
      return NextResponse.json(
        { success: false, error: "Failed to send message. Please try again later." },
        { status: 502 }
      );
    }

    // ── Record successful submission for rate limiting ──
    rateLimitMap.set(ip, now);

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );

  } catch (err) {
    console.error("[contact/route] Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

// Block non-POST methods
export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
