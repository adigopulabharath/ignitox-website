//==============================================================================
// SERVICES GRID
//==============================================================================
// Homepage bento grid — one card per service, each linking to its detail page.
//------------------------------------------------------------------------------

import Link from "next/link";
import { SERVICES, type Service } from "@/content/services";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { ArrowRightIcon, CheckIcon, SERVICE_ICONS } from "@/components/icons";

//------------------------------------------------------------------------------
// SERVICE CARD
//------------------------------------------------------------------------------
function ServiceCard({ service }: { service: Service }) {
  const IconComponent = SERVICE_ICONS[service.icon];

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-flame/50 hover:bg-white/[0.04]"
    >
      {/* Icon */}
      <span className="inline-flex size-11 items-center justify-center rounded-xl border border-flame/30 bg-gradient-to-br from-flame/20 to-ember/10 text-flame">
        <IconComponent className="size-5" />
      </span>

      {/* Copy */}
      <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
        {service.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{service.summary}</p>

      {/* Highlights — first three features */}
      <ul className="mt-6 space-y-2.5">
        {service.features.slice(0, 3).map((feature) => (
          <li key={feature.title} className="flex items-center gap-2.5 text-sm text-muted">
            <CheckIcon className="size-4 shrink-0 text-flame" />
            {feature.title}
          </li>
        ))}
      </ul>

      {/* Card CTA */}
      <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-medium text-foreground">
        Learn more
        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

//------------------------------------------------------------------------------
// SECTION
//------------------------------------------------------------------------------
export function ServicesGrid() {
  return (
    <Section id="services">
      <Reveal>
        <SectionHeading
          eyebrow="Services"
          title="Everything your stack needs, under one roof"
          lead="Four practices, one accountable partner — from the first deploy to day-2 operations."
          align="center"
        />
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {SERVICES.map((service, index) => (
          <Reveal key={service.slug} delay={index * 0.08} className="h-full">
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
