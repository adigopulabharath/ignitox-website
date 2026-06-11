//==============================================================================
// PAGE: SERVICES INDEX (/services)
//==============================================================================
// Overview of all services — fed entirely by src/content/services.ts.
//------------------------------------------------------------------------------

import type { Metadata } from "next";
import { SERVICES } from "@/content/services";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { ServiceCard } from "@/components/sections/services-grid";
import { Process } from "@/components/sections/process";
import { CtaBanner } from "@/components/sections/cta-banner";

//------------------------------------------------------------------------------
// METADATA
//------------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "Services",
  description:
    "Cloud solutions on AWS, Azure & GCP, managed website hosting, web development and IT consulting — one accountable partner for your whole stack.",
};

//------------------------------------------------------------------------------
// PAGE
//------------------------------------------------------------------------------
export default function ServicesIndexPage() {
  return (
    <>
      {/*----------------------------------------------------------------------
        SERVICES HERO
      ----------------------------------------------------------------------*/}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[-260px] h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-flame/10 blur-[140px]"
        />
        <Container className="relative pb-16 pt-20 text-center md:pb-20 md:pt-28">
          <p className="animate-fade-up font-mono text-xs font-medium uppercase tracking-[0.2em] text-flame">
            Services
          </p>
          <h1 className="animate-fade-up mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tighter text-foreground [animation-delay:100ms] md:text-6xl">
            One partner for your{" "}
            <span className="text-gradient">entire stack</span>
          </h1>
          <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-base text-muted [animation-delay:200ms] md:text-lg">
            From cloud architecture to the pixels your customers touch — four
            practices that work as one team, with one person accountable to
            you.
          </p>
        </Container>
      </section>

      {/*----------------------------------------------------------------------
        ALL SERVICES
      ----------------------------------------------------------------------*/}
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.08} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Process />
      <CtaBanner />
    </>
  );
}
