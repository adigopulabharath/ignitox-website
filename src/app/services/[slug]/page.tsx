//==============================================================================
// PAGE: SERVICE DETAIL (/services/[slug])
//==============================================================================
// One template for every service, driven by src/content/services.ts. All
// slugs are statically generated at build time.
//------------------------------------------------------------------------------

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, SERVICES } from "@/content/services";
import { SITE } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/json-ld";
import { SERVICE_ICONS } from "@/components/icons";

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

  //----------------------------------------------------------------------------
  // STRUCTURED DATA (Service + Breadcrumb)
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
      {
        "@type": "ListItem",
        position: 2,
        name: service.name,
        item: `${SITE.url}/services/${service.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/*----------------------------------------------------------------------
        SERVICE HERO
      ----------------------------------------------------------------------*/}
      <section className="relative overflow-hidden border-b border-white/5">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[-260px] h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-flame/10 blur-[140px]"
        />
        <Container className="relative pb-16 pt-20 md:pb-20 md:pt-28">
          <p className="animate-fade-up inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.2em] text-flame">
            <IconComponent className="size-4" />
            Services
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
            <ButtonLink href="/#services" variant="secondary" size="lg">
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
              <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
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
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </Section>

      <CtaBanner />
    </>
  );
}
