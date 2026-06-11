//==============================================================================
// CASE STUDY CARD & HOMEPAGE PREVIEW SECTION
//==============================================================================

import Link from "next/link";
import { CASE_STUDIES, type CaseStudy } from "@/content/case-studies";
import { Section, SectionHeading } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@/components/icons";

//------------------------------------------------------------------------------
// CARD
//------------------------------------------------------------------------------
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/case-studies/${study.slug}`} className="block h-full">
      <SpotlightCard className="h-full rounded-2xl border border-border bg-surface transition-colors hover:border-flame/50">
        <div className="flex h-full flex-col p-7">
          {/* Industry + client */}
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
            <span className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5">
              {study.industry}
            </span>
            {study.client}
          </div>

          {/* Title & summary */}
          <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
            {study.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{study.summary}</p>

          {/* Headline results */}
          <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-5">
            {study.results.map((result) => (
              <div key={result.label}>
                <dd className="text-lg font-semibold tracking-tight text-flame">
                  {result.value}
                </dd>
                <dt className="mt-1 text-[11px] leading-snug text-muted">
                  {result.label}
                </dt>
              </div>
            ))}
          </dl>

          {/* Card CTA */}
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-foreground">
            Read the case study
            <ArrowUpRightIcon className="size-4 text-flame transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </SpotlightCard>
    </Link>
  );
}

//------------------------------------------------------------------------------
// HOMEPAGE PREVIEW (two newest studies)
//------------------------------------------------------------------------------
export function CaseStudiesPreview() {
  const featured = CASE_STUDIES.slice(0, 2);

  return (
    <Section>
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Case studies"
            title="Proof beats promises"
            lead="A few recent engagements and the numbers they produced."
          />
          <ButtonLink href="/case-studies" variant="secondary">
            All case studies
          </ButtonLink>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {featured.map((study, index) => (
          <Reveal key={study.slug} delay={index * 0.08} className="h-full">
            <CaseStudyCard study={study} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
