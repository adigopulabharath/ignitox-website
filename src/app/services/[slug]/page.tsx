//==============================================================================
// PAGE: SERVICE DETAIL (/services/[slug])
//==============================================================================
// One template, fully driven by src/content/services.ts: hero, feature grid,
// deliverables, FAQ (native <details> — works without JavaScript), related
// services and CTA. All slugs statically generated at build time.
//------------------------------------------------------------------------------

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, SERVICES } from "@/content/services";
import { SITE } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ServiceCard } from "@/components/sections/services-grid";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/json-ld";
import { CheckIcon, ChevronDownIcon, SERVICE_ICONS } from "@/components/icons";

//------------------------------------------------------------------------------
// STATIC GENERATION & METADATA
//------------------------------------------------------------------------------
export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.name,
    description: service.summary,
    openGraph: { title: `${service.name} · ${SITE.name}`, description: service.summary },
  };
}

//------------------------------------------------------------------------------
// PAGE
//------------------------------------------------------------------------------
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const IconComponent = SERVICE_ICONS[service.icon];
  const relatedServices = SERVICES.filter((entry) => entry.slug !== service.slug);

  //----------------------------------------------------------------------------
  // STRUCTURED DATA (Service + Breadcrumb + FAQ)
  //----------------------------------------------------------------------------
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
    url: `${SITE.url}/services/${service.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `${SITE.url}/services/${service.slug}`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/*----------------------------------------------------------------------
        SERVICE HERO
      ----------------------------------------------------------------------*/}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[-260px] h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-flame/10 blur-[140px]"
        />
        <Container className="relative pb-16 pt-20 md:pb-20 md:pt-28">
          <p className="animate-fade-up inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-flame">
            <IconComponent className="size-4" />
            Services / {service.name}
          </p>
          <h1 className="animate-fade-up mt-4 max-w-3xl text-4xl font-semibold tracking-tighter text-foreground [animation-delay:100ms] md:text-6xl">
            {service.tagline}
          </h1>
          <p className="animate-fade-up mt-6 max-w-2xl text-base text-muted [animation-delay:200ms] md:text-lg">
            {service.summary}
          </p>
          <div className="animate-fade-up mt-8 flex flex-wrap gap-3 [animation-delay:300ms]">
            <ButtonLink href="/contact" size="lg">
              Discuss your project
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary" size="lg">
              All services
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/*----------------------------------------------------------------------
        FEATURE GRID
      ----------------------------------------------------------------------*/}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow={service.name}
            title="What's included"
            lead="Every engagement is scoped to your needs — these are the capabilities we bring to the table."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {service.features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.05} className="h-full">
              <SpotlightCard className="h-full rounded-2xl border border-border bg-surface">
                <div className="p-6">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {feature.description}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {/*--------------------------------------------------------------------
          TECHNOLOGY CHIPS
        --------------------------------------------------------------------*/}
        <Reveal className="mt-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 font-mono text-xs uppercase tracking-[0.2em] text-muted/70">
              Tooling
            </span>
            {service.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </Section>

      {/*----------------------------------------------------------------------
        DELIVERABLES & FAQ
      ----------------------------------------------------------------------*/}
      <Section className="pt-0">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          {/* What you get */}
          <Reveal>
            <div>
              <SectionHeading eyebrow="Deliverables" title="What you get" />
              <ul className="mt-8 space-y-4">
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex items-start gap-3 text-sm text-muted">
                    <CheckIcon className="mt-0.5 size-4 shrink-0 text-flame" />
                    {deliverable}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* FAQ — native disclosure, zero JavaScript required */}
          <Reveal delay={0.08}>
            <div>
              <SectionHeading eyebrow="FAQ" title="Common questions" />
              <div className="mt-8 space-y-3">
                {service.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group rounded-xl border border-border bg-surface open:border-flame/40"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <ChevronDownIcon className="size-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/*----------------------------------------------------------------------
        RELATED SERVICES
      ----------------------------------------------------------------------*/}
      <Section className="pt-0">
        <Reveal>
          <SectionHeading eyebrow="Explore more" title="Other ways we can help" />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {relatedServices.map((related, index) => (
            <Reveal key={related.slug} delay={index * 0.06} className="h-full">
              <ServiceCard service={related} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
