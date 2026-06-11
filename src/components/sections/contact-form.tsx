//==============================================================================
// CONTACT FORM
//==============================================================================
// Posts to /api/contact (contract: openapi/openapi.yaml). Includes a honeypot
// field and an optional Cloudflare Turnstile widget — the widget only renders
// when NEXT_PUBLIC_TURNSTILE_SITE_KEY is configured.
//------------------------------------------------------------------------------

"use client";

import { useState } from "react";
import Script from "next/script";
import { SERVICES } from "@/content/services";
import { Button } from "@/components/ui/button";

//------------------------------------------------------------------------------
// CONSTANTS & TYPES
//------------------------------------------------------------------------------
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

declare global {
  interface Window {
    turnstile?: { reset: () => void };
  }
}

//------------------------------------------------------------------------------
// FIELD STYLES
//------------------------------------------------------------------------------
const fieldClasses =
  "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 transition-colors focus:border-flame/60";

const labelClasses = "mb-2 block text-sm font-medium text-foreground";

//------------------------------------------------------------------------------
// FORM
//------------------------------------------------------------------------------
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          service: data.get("service"),
          message: data.get("message"),
          companyWebsite: data.get("company_website") ?? "",
          turnstileToken: data.get("cf-turnstile-response") ?? undefined,
        }),
      });

      const body = await response.json().catch(() => null);

      if (response.status === 202 && body?.ok) {
        form.reset();
        window.turnstile?.reset();
        setStatus({ state: "success", message: body.message });
      } else {
        setStatus({
          state: "error",
          message:
            body?.message ?? "Something went wrong. Please try again in a moment.",
        });
      }
    } catch {
      setStatus({
        state: "error",
        message: "Network error — please check your connection and try again.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
      noValidate={false}
    >
      <div className="grid gap-5">
        {/*--------------------------------------------------------------------
          NAME & EMAIL
        --------------------------------------------------------------------*/}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className={labelClasses}>
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              minLength={2}
              maxLength={100}
              autoComplete="name"
              placeholder="Ada Lovelace"
              className={fieldClasses}
            />
          </div>
          <div>
            <label htmlFor="contact-email" className={labelClasses}>
              Work email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              placeholder="ada@company.com"
              className={fieldClasses}
            />
          </div>
        </div>

        {/*--------------------------------------------------------------------
          SERVICE SELECTOR
        --------------------------------------------------------------------*/}
        <div>
          <label htmlFor="contact-service" className={labelClasses}>
            What do you need?
          </label>
          <select
            id="contact-service"
            name="service"
            required
            defaultValue="general"
            className={fieldClasses}
          >
            {SERVICES.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.name}
              </option>
            ))}
            <option value="general">Something else / not sure yet</option>
          </select>
        </div>

        {/*--------------------------------------------------------------------
          MESSAGE
        --------------------------------------------------------------------*/}
        <div>
          <label htmlFor="contact-message" className={labelClasses}>
            Project details
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            maxLength={2000}
            rows={5}
            placeholder="Tell us about your project, timeline and goals…"
            className={fieldClasses}
          />
        </div>

        {/*--------------------------------------------------------------------
          HONEYPOT — hidden from humans, tempting for bots
        --------------------------------------------------------------------*/}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="contact-company-website">Company website</label>
          <input
            id="contact-company-website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/*--------------------------------------------------------------------
          TURNSTILE (only when configured)
        --------------------------------------------------------------------*/}
        {TURNSTILE_SITE_KEY && (
          <>
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js"
              strategy="lazyOnload"
            />
            <div
              className="cf-turnstile"
              data-sitekey={TURNSTILE_SITE_KEY}
              data-theme="dark"
            />
          </>
        )}

        {/*--------------------------------------------------------------------
          SUBMIT & STATUS
        --------------------------------------------------------------------*/}
        <Button type="submit" size="lg" disabled={status.state === "submitting"}>
          {status.state === "submitting" ? "Sending…" : "Send message"}
        </Button>

        <p aria-live="polite" className="min-h-5 text-sm">
          {status.state === "success" && (
            <span className="text-emerald-400">{status.message}</span>
          )}
          {status.state === "error" && (
            <span className="text-red-400">{status.message}</span>
          )}
        </p>
      </div>
    </form>
  );
}
