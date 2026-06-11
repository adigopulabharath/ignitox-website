//==============================================================================
// CLOUDFLARE TURNSTILE — SERVER-SIDE VERIFICATION
//==============================================================================
// Verifies the widget token against Cloudflare's siteverify endpoint. When
// TURNSTILE_SECRET_KEY is not configured (local dev), verification is skipped
// with a loud warning — always configure it in production.
//------------------------------------------------------------------------------

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const VERIFY_TIMEOUT_MS = 5_000;

let warnedMissingSecret = false;

//------------------------------------------------------------------------------
// VERIFY
//------------------------------------------------------------------------------
export async function verifyTurnstile(
  token: string | undefined,
  remoteIp: string,
): Promise<{ ok: boolean }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Not configured — skip (dev convenience only).
  if (!secret) {
    if (!warnedMissingSecret) {
      console.warn(
        "[turnstile] TURNSTILE_SECRET_KEY is not set — anti-bot verification is DISABLED.",
      );
      warnedMissingSecret = true;
    }
    return { ok: true };
  }

  // Configured — a token is mandatory.
  if (!token) return { ok: false };

  //----------------------------------------------------------------------------
  // CLOUDFLARE SITEVERIFY CALL
  //----------------------------------------------------------------------------
  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        remoteip: remoteIp,
      }),
      signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
    });

    if (!response.ok) return { ok: false };
    const outcome = (await response.json()) as { success?: boolean };
    return { ok: outcome.success === true };
  } catch (error) {
    // Fail closed: if Cloudflare is unreachable we reject rather than letting
    // unverified traffic through.
    console.error("[turnstile] verification request failed", error);
    return { ok: false };
  }
}
