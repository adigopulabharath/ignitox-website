//==============================================================================
// NEWSLETTER SUBSCRIPTION (Resend Audiences REST API)
//==============================================================================
// Adds a contact to the Resend audience configured via RESEND_AUDIENCE_ID
// (free tier). When the keys are missing (local dev) the address is logged to
// stdout instead so nothing is silently lost.
//------------------------------------------------------------------------------

const SUBSCRIBE_TIMEOUT_MS = 10_000;

export async function subscribeToNewsletter(email: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  // Not configured: log instead of dropping the subscriber (dev convenience).
  if (!apiKey || !audienceId) {
    console.warn(
      "[newsletter] RESEND_API_KEY / RESEND_AUDIENCE_ID not set, logging instead:",
      email,
    );
    return;
  }

  //----------------------------------------------------------------------------
  // CREATE CONTACT (idempotent: Resend treats an existing address as success)
  //----------------------------------------------------------------------------
  const response = await fetch(
    `https://api.resend.com/audiences/${audienceId}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
      signal: AbortSignal.timeout(SUBSCRIBE_TIMEOUT_MS),
    },
  );

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Resend audiences API responded ${response.status}: ${body}`);
  }
}
