//==============================================================================
// PAGE: PRIVACY POLICY
//==============================================================================
// Generic baseline policy matching what the site actually does (contact form
// emailed, no database, cookieless analytics). PLACEHOLDER — have legal
// counsel review before launch and update the date below.
//------------------------------------------------------------------------------

import type { Metadata } from "next";
import { SITE } from "@/content/site";
import { Container } from "@/components/ui/container";

//------------------------------------------------------------------------------
// METADATA
//------------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Ignitox collects, uses and protects your personal data.",
};

//------------------------------------------------------------------------------
// POLICY CONTENT
//------------------------------------------------------------------------------
const SECTIONS: Array<{ heading: string; paragraphs: string[] }> = [
  {
    heading: "What we collect",
    paragraphs: [
      "When you submit our contact form we collect the information you provide: your name, email address, the service you're interested in and your message. We do not require an account and we do not collect payment information through this website.",
      "Our infrastructure providers may process technical data (such as IP addresses) in server logs for security and abuse prevention. These logs are rotated automatically and are not used to profile visitors.",
    ],
  },
  {
    heading: "How we use it",
    paragraphs: [
      "Contact form submissions are delivered to our team inbox by email so we can respond to your inquiry. They are not stored in a database on this website and are not used for marketing without your explicit consent.",
    ],
  },
  {
    heading: "Third parties",
    paragraphs: [
      "We use a small number of infrastructure providers to operate this site: Cloudflare (content delivery, DDoS protection and bot mitigation), our hosting provider (Hetzner) and a transactional email service to deliver form submissions. Each processes data only as needed to provide their service.",
      "We never sell your personal data.",
    ],
  },
  {
    heading: "Cookies & analytics",
    paragraphs: [
      "This website does not use advertising or cross-site tracking cookies. If analytics are enabled, we use a cookieless, privacy-preserving solution that does not identify individual visitors.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "You may request access to, correction of, or deletion of personal data you've sent us at any time. Email us and we'll action it promptly.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      `Questions about this policy? Email us at ${SITE.email}.`,
    ],
  },
];

//------------------------------------------------------------------------------
// PAGE
//------------------------------------------------------------------------------
export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl pb-24 pt-20 md:pt-28">
      <h1 className="text-4xl font-semibold tracking-tighter text-foreground">
        Privacy Policy
      </h1>
      <p className="mt-3 font-mono text-xs text-muted">
        Last updated: June 2026 {/* PLACEHOLDER — update on every revision */}
      </p>

      {SECTIONS.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            {section.heading}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-3 text-sm leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </Container>
  );
}
