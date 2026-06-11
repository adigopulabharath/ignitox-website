//==============================================================================
// PAGE: TERMS OF SERVICE
//==============================================================================
// Generic baseline terms for the website itself (service contracts are agreed
// separately per engagement). PLACEHOLDER — have legal counsel review before
// launch and update the date below.
//------------------------------------------------------------------------------

import type { Metadata } from "next";
import { SITE } from "@/content/site";
import { Container } from "@/components/ui/container";

//------------------------------------------------------------------------------
// METADATA
//------------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the Ignitox website.",
};

//------------------------------------------------------------------------------
// TERMS CONTENT
//------------------------------------------------------------------------------
const SECTIONS: Array<{ heading: string; paragraphs: string[] }> = [
  {
    heading: "About these terms",
    paragraphs: [
      `These terms govern your use of the ${SITE.name} website. By using the site you agree to them. Professional services (cloud, hosting, development and consulting engagements) are governed by separate written agreements signed per project.`,
    ],
  },
  {
    heading: "Use of the website",
    paragraphs: [
      "You may browse the site and contact us for legitimate business purposes. You must not attempt to disrupt the site, probe or bypass its security controls, or submit unlawful, abusive or automated spam content through our forms.",
    ],
  },
  {
    heading: "Content & intellectual property",
    paragraphs: [
      `All content on this site — text, design, graphics and code — belongs to ${SITE.name} or its licensors and may not be reproduced without permission. Third-party product names and logos are trademarks of their respective owners and are used for identification only.`,
    ],
  },
  {
    heading: "No warranties",
    paragraphs: [
      "The website and its content are provided “as is” for general information. While we keep it accurate and online to the best of our ability, we make no warranties about completeness, availability or fitness for a particular purpose.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      `To the maximum extent permitted by law, ${SITE.name} is not liable for indirect or consequential damages arising from your use of this website.`,
    ],
  },
  {
    heading: "Changes & contact",
    paragraphs: [
      `We may update these terms from time to time; the date below reflects the latest revision. Questions? Email ${SITE.email}.`,
    ],
  },
];

//------------------------------------------------------------------------------
// PAGE
//------------------------------------------------------------------------------
export default function TermsPage() {
  return (
    <Container className="max-w-3xl pb-24 pt-20 md:pt-28">
      <h1 className="text-4xl font-semibold tracking-tighter text-foreground">
        Terms of Service
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
