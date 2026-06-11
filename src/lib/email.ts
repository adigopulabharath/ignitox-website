//==============================================================================
// CONTACT EMAIL DELIVERY (Resend REST API)
//==============================================================================
// Sends contact-form submissions to the team inbox via Resend's free tier —
// called with plain fetch so no SDK dependency is needed. When RESEND_API_KEY
// or CONTACT_TO_EMAIL is missing (local dev), the submission is logged to
// stdout instead so nothing is silently lost.
//------------------------------------------------------------------------------

import { getService } from "@/content/services";
import type { ContactRequest } from "@/lib/contact-schema";

const RESEND_URL = "https://api.resend.com/emails";
const SEND_TIMEOUT_MS = 10_000;

//------------------------------------------------------------------------------
// SEND
//------------------------------------------------------------------------------
export async function sendContactEmail(data: ContactRequest): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Ignitox Website <onboarding@resend.dev>";

  const serviceLabel = getService(data.service)?.name ?? "General inquiry";

  // Not configured — log instead of dropping the lead (dev convenience only).
  if (!apiKey || !to) {
    console.warn(
      "[email] RESEND_API_KEY / CONTACT_TO_EMAIL not set — logging submission instead:",
      JSON.stringify({ ...data, service: serviceLabel }),
    );
    return;
  }

  //----------------------------------------------------------------------------
  // COMPOSE (plain text — nothing to escape, nothing to render)
  //----------------------------------------------------------------------------
  const text = [
    `Name:    ${data.name}`,
    `Email:   ${data.email}`,
    `Service: ${serviceLabel}`,
    "",
    "Message:",
    data.message,
  ].join("\n");

  //----------------------------------------------------------------------------
  // DELIVER
  //----------------------------------------------------------------------------
  const response = await fetch(RESEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `New inquiry — ${data.name} (${serviceLabel})`,
      text,
    }),
    signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Resend API responded ${response.status}: ${body}`);
  }
}
