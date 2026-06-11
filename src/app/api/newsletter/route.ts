//==============================================================================
// ROUTE HANDLER: POST /api/newsletter
//==============================================================================
// Implements the subscribeNewsletter operation from openapi/openapi.yaml.
// Protections, in order of cost: per-IP rate limit, payload cap, JSON
// parsing, honeypot (bots get a fake 202), Zod validation, then delivery.
//------------------------------------------------------------------------------

import { NextRequest, NextResponse } from "next/server";
import {
  newsletterRequestSchema,
  type NewsletterAccepted,
} from "@/lib/newsletter-schema";
import type { ApiError } from "@/lib/contact-schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { subscribeToNewsletter } from "@/lib/newsletter";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 2_000;

const ACCEPTED_RESPONSE: NewsletterAccepted = {
  ok: true,
  message: "You're on the list. No spam, unsubscribe anytime.",
};

//------------------------------------------------------------------------------
// ERROR HELPER
//------------------------------------------------------------------------------
function apiError(
  code: ApiError["code"],
  message: string,
  status: number,
  headers?: HeadersInit,
): NextResponse {
  const body: ApiError = { ok: false, code, message };
  return NextResponse.json(body, { status, headers });
}

//------------------------------------------------------------------------------
// HANDLER
//------------------------------------------------------------------------------
export async function POST(request: NextRequest): Promise<NextResponse> {
  // Trustworthy only behind our proxy chain (nginx, Cloudflare).
  const clientIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  //----------------------------------------------------------------------------
  // 1. RATE LIMIT
  //----------------------------------------------------------------------------
  const limit = checkRateLimit(`newsletter:${clientIp}`);
  if (!limit.allowed) {
    return apiError(
      "rate_limited",
      "Too many attempts from your network. Please try again later.",
      429,
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  //----------------------------------------------------------------------------
  // 2-3. SIZE CAP & JSON PARSING
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
  // 4. HONEYPOT
  //----------------------------------------------------------------------------
  const honeypot = (parsed as Record<string, unknown> | null)?.companyWebsite;
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return NextResponse.json(ACCEPTED_RESPONSE, { status: 202 });
  }

  //----------------------------------------------------------------------------
  // 5. VALIDATION
  //----------------------------------------------------------------------------
  const result = newsletterRequestSchema.safeParse(parsed);
  if (!result.success) {
    return apiError("validation_error", "Please enter a valid email address.", 400);
  }

  //----------------------------------------------------------------------------
  // 6. SUBSCRIBE
  //----------------------------------------------------------------------------
  try {
    await subscribeToNewsletter(result.data.email);
  } catch (error) {
    console.error("[newsletter] subscription failed:", error);
    return apiError(
      "internal_error",
      "We couldn't subscribe you right now. Please try again later.",
      500,
    );
  }

  return NextResponse.json(ACCEPTED_RESPONSE, { status: 202 });
}
