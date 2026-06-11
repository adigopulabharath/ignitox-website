//==============================================================================
// PAGE: CASE STUDY DETAIL (/case-studies/[slug])
//==============================================================================
// Challenge, solution, outcomes, results band and client quote, all driven by
// src/content/case-studies.ts. Statically generated.
//------------------------------------------------------------------------------

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/content";
import { SITE } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { CaseStudyCard } from "@/components/sections/case-study-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/json-ld";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

//------------------------------------------------------------------------------
// STATIC GENERATION & METADATA
//------------------------------------------------------------------------------
// Refresh from the CMS every 5 minutes; unknown slugs render on demand.
export const revalidate = 300;

export async function generateStaticParams() {
  const studies = await getCaseStudies();
  return studies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return {};

  return {
    title: `${study.title} | Case Study`,
    description: study.summary,
    openGraph: { title: study.title, description: study.summary },
  };
}

//------------------------------------------------------------------------------
// PAGE
//------------------------------------------------------------------------------
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  const related = (await getCaseStudies())
    .filter((entry) => entry.slug !== study.slug)
    .slice(0, 2);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: `${SITE.url}/case-studies` },
      {
        "@type": "ListItem",
        position: 3,
        name: study.title,
        item: `${SITE.url}/case-studies/${study.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />

      {/*----------------------------------------------------------------------
        CASE STUDY HERO
      ----------------------------------------------------------------------*/}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[-260px] h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-flame/10 blur-[140px]"
        />
        <Container className="relative pb-12 pt-20 md:pt-28">
          <Link
            href="/case-studies"
            className="group animate-fade-up inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-flame"
          >
            <ArrowRightIcon className="size-3.5 rotate-180 transition-transform group-hover:-translate-x-1" />
            All case studies
          </Link>
          <h1 className="animate-fade-up mt-5 max-w-3xl text-3xl font-semibold tracking-tighter text-foreground [animation-delay:100ms] md:text-5xl">
            {study.title}
          </h1>
          <p className="animate-fade-up mt-5 max-w-2xl text-base text-muted [animation-delay:200ms] md:text-lg">
            {study.summary}
          </p>
          <div className="animate-fade-up mt-6 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted [animation-delay:300ms]">
            <span className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5">
              {study.industry}
            </span>
            <span>{study.client}</span>
          </div>
        </Container>
      </section>

      {/*----------------------------------------------------------------------
        RESULTS BAND
      ----------------------------------------------------------------------*/}
      <Section className="py-10 md:py-14">
        <Reveal>
          <dl className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3">
            {study.results.map((result) => (
              <div key={result.label} className="bg-background p-8 text-center">
                <dd className="text-4xl font-semibold tracking-tight text-flame">
                  {result.value}
                </dd>
                <dt className="mt-2 text-sm text-muted">{result.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      {/*----------------------------------------------------------------------
        CHALLENGE & SOLUTION
      ----------------------------------------------------------------------*/}
      <Section className="pt-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <SectionHeading eyebrow="The challenge" title="Where they started" />
              {study.challenge.map((paragraph) => (
                <p key={paragraph} className="mt-5 text-base leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <SectionHeading eyebrow="The solution" title="What we did" />
              {study.solution.map((paragraph) => (
                <p key={paragraph} className="mt-5 text-base leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        {/*--------------------------------------------------------------------
          OUTCOMES & STACK
        --------------------------------------------------------------------*/}
        <Reveal className="mt-14">
          <div className="rounded-2xl border border-border bg-surface p-8">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              What changed
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {study.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 text-sm text-muted">
                  <CheckIcon className="mt-0.5 size-4 shrink-0 text-flame" />
                  {outcome}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-6">
              <span className="mr-2 font-mono text-xs uppercase tracking-[0.2em] text-muted/70">
                Stack
              </span>
              {study.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-xs text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        {/*--------------------------------------------------------------------
          CLIENT QUOTE
        --------------------------------------------------------------------*/}
        {study.quote && (
          <Reveal className="mt-14">
            <figure className="mx-auto max-w-2xl text-center">
              <blockquote className="text-xl font-medium leading-relaxed tracking-tight text-foreground md:text-2xl">
                &ldquo;{study.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-muted">
                <span className="font-medium text-foreground">{study.quote.name}</span>
                , {study.quote.role}, {study.client}
              </figcaption>
            </figure>
          </Reveal>
        )}
      </Section>

      {/*----------------------------------------------------------------------
        RELATED CASE STUDIES
      ----------------------------------------------------------------------*/}
      {related.length > 0 && (
        <Section className="border-t border-border">
          <Reveal>
            <SectionHeading eyebrow="More work" title="Other engagements" />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {related.map((entry, index) => (
              <Reveal key={entry.slug} delay={index * 0.07} className="h-full">
                <CaseStudyCard study={entry} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <CtaBanner />
    </>
  );
}
