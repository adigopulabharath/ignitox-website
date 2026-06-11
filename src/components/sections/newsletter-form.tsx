//==============================================================================
// NEWSLETTER FORM
//==============================================================================
// Inline email signup posting to /api/newsletter (contract in
// openapi/openapi.yaml). Includes the same honeypot pattern as the contact
// form. Used in the footer and on the Insights page.
//------------------------------------------------------------------------------

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          companyWebsite: data.get("company_website") ?? "",
        }),
      });
      const body = await response.json().catch(() => null);

      if (response.status === 202 && body?.ok) {
        form.reset();
        setStatus({ state: "success", message: body.message });
      } else {
        setStatus({
          state: "error",
          message: body?.message ?? "Something went wrong. Please try again.",
        });
      }
    } catch {
      setStatus({ state: "error", message: "Network error. Please try again." });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="you@company.com"
          className="h-10 w-full rounded-full border border-border bg-surface-2 px-4 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-flame/60"
        />
        <Button type="submit" size="md" disabled={status.state === "submitting"}>
          {status.state === "submitting" ? "Joining…" : "Subscribe"}
        </Button>
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="newsletter-company-website">Company website</label>
        <input
          id="newsletter-company-website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p aria-live="polite" className="mt-2 min-h-5 text-xs">
        {status.state === "success" && (
          <span className="text-emerald-500">{status.message}</span>
        )}
        {status.state === "error" && (
          <span className="text-red-400">{status.message}</span>
        )}
      </p>
    </form>
  );
}
