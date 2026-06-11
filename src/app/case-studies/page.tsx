//==============================================================================
// PAGE: CASE STUDIES (/case-studies)
//==============================================================================
// Listing of client engagements, fed by src/content/case-studies.ts.
//------------------------------------------------------------------------------

import type { Metadata } from "next";
import { CASE_STUDIES } from "@/content/case-studies";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { CaseStudyCard } from "@/components/sections/case-study-card";
import { CtaBanner } from "@/components/sections/cta-banner";

//------------------------------------------------------------------------------
// METADATA
//------------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real engagements with real numbers: cloud migrations, storefront rebuilds and managed hosting projects delivered by the Ignitox team.",
};

//------------------------------------------------------------------------------
// PAGE
//------------------------------------------------------------------------------
export default function CaseStudiesPage() {
  return (
    <>
      {/*----------------------------------------------------------------------
        CASE STUDIES HERO
      ----------------------------------------------------------------------*/}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[-260px] h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-flame/10 blur-[140px]"
        />
        <Container className="relative pb-14 pt-20 md:pb-16 md:pt-28">
          <p className="animate-fade-up font-mono text-xs font-medium uppercase tracking-[0.2em] text-flame">
            Case studies
          </p>
          <h1 className="animate-fade-up mt-4 max-w-2xl text-4xl font-semibold tracking-tighter text-foreground [animation-delay:100ms] md:text-6xl">
            Work that <span className="text-gradient">speaks in numbers</span>
          </h1>
          <p className="animate-fade-up mt-5 max-w-2xl text-base text-muted [animation-delay:200ms] md:text-lg">
            Every project here shipped to production. The names are anonymized,
            the numbers are the point.
          </p>
        </Container>
      </section>

      {/*----------------------------------------------------------------------
        ALL CASE STUDIES
      ----------------------------------------------------------------------*/}
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {CASE_STUDIES.map((study, index) => (
            <Reveal key={study.slug} delay={index * 0.07} className="h-full">
              <CaseStudyCard study={study} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
