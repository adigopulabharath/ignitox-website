//==============================================================================
// ROUTE HANDLER: POST /api/contact
//==============================================================================
// Implements the contract in openapi/openapi.yaml (operation
// submitContactForm). Defense-in-depth, in order of cost:
//   1. Per-IP rate limit (nginx applies an outer limit in production too)
//   2. Payload size cap
//   3. JSON parsing
//   4. Honeypot check (bots get a fake 202)
//   5. Zod validation (mirrors the OpenAPI schema)
//   6. Cloudflare Turnstile verification
//   7. Email delivery via Resend
//------------------------------------------------------------------------------

import { NextRequest, NextResponse } from "next/server";
import {
  contactRequestSchema,
  type ApiError,
  type ContactAccepted,
} from "@/lib/contact-schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { sendContactEmail } from "@/lib/email";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 10_000;

const ACCEPTED_RESPONSE: ContactAccepted = {
  ok: true,
  message: "Thanks — we'll get back to you within one business day.",
};

//------------------------------------------------------------------------------
// ERROR HELPER
//------------------------------------------------------------------------------
function apiError(
  code: ApiError["code"],
  message: string,
  status: number,
  options?: { issues?: ApiError["issues"]; headers?: HeadersInit },
): NextResponse {
  const body: ApiError = { ok: false, code, message, ...options?.issues && { issues: options.issues } };
  return NextResponse.json(body, { status, headers: options?.headers });
}

//------------------------------------------------------------------------------
// HANDLER
//------------------------------------------------------------------------------
export async function POST(request: NextRequest): Promise<NextResponse> {
  // Client IP — x-forwarded-for is only trustworthy because nginx (and
  // Cloudflare in front of it) set it; the app is never exposed directly.
  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  //----------------------------------------------------------------------------
  // 1. RATE LIMIT
  //----------------------------------------------------------------------------
  const limit = checkRateLimit(`contact:${clientIp}`);
  if (!limit.allowed) {
    return apiError(
      "rate_limited",
      "Too many messages from your network — please try again later.",
      429,
      { headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  //----------------------------------------------------------------------------
  // 2–3. SIZE CAP & JSON PARSING
  //----------------------------------------------------------------------------
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return apiError("payload_too_large", "Request body is too large.", 413);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return apiError("invalid_json", "Request body must be valid JSON.", 400);
  }

  //----------------------------------------------------------------------------
  // 4. HONEYPOT — bots that fill the hidden field get a convincing 202
  //----------------------------------------------------------------------------
  const honeypot = (parsed as Record<string, unknown> | null)?.companyWebsite;
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return NextResponse.json(ACCEPTED_RESPONSE, { status: 202 });
  }

  //----------------------------------------------------------------------------
  // 5. VALIDATION
  //----------------------------------------------------------------------------
  const result = contactRequestSchema.safeParse(parsed);
  if (!result.success) {
    return apiError("validation_error", "Please check the highlighted fields.", 400, {
      issues: result.error.issues.map((issue) => ({
        field: issue.path.join(".") || "body",
        message: issue.message,
      })),
    });
  }

  //----------------------------------------------------------------------------
  // 6. TURNSTILE
  //----------------------------------------------------------------------------
  const turnstile = await verifyTurnstile(result.data.turnstileToken, clientIp);
  if (!turnstile.ok) {
    return apiError(
      "turnstile_failed",
      "We couldn't verify you're human — please retry the challenge.",
      403,
    );
  }

  //----------------------------------------------------------------------------
  // 7. DELIVERY
  //----------------------------------------------------------------------------
  try {
    await sendContactEmail(result.data);
  } catch (error) {
    console.error("[contact] email delivery failed:", error);
    return apiError(
      "internal_error",
      "We couldn't send your message right now — please email us directly.",
      500,
    );
  }

  return NextResponse.json(ACCEPTED_RESPONSE, { status: 202 });
}
