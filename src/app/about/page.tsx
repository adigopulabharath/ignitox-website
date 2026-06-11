//==============================================================================
// PAGE: ABOUT
//==============================================================================
// Mission, story and values. Copy marked PLACEHOLDER needs real company
// details before launch.
//------------------------------------------------------------------------------

import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal } from "@/components/motion/reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import {
  EyeIcon,
  FlameOutlineIcon,
  HeartIcon,
  ShieldIcon,
} from "@/components/icons";

//------------------------------------------------------------------------------
// METADATA
//------------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "About",
  description:
    "Ignitox is a senior team of cloud and web engineers helping businesses build, host and scale their digital infrastructure.",
};

//------------------------------------------------------------------------------
// VALUES
//------------------------------------------------------------------------------
const VALUES = [
  {
    icon: FlameOutlineIcon,
    title: "Ownership",
    description:
      "We run your systems like they're ours — when something breaks at 3 a.m., it's our pager that goes off.",
  },
  {
    icon: EyeIcon,
    title: "Transparency",
    description:
      "Fixed scopes, honest timelines and plain-language reporting. You always know what you're paying for and why.",
  },
  {
    icon: ShieldIcon,
    title: "Security first",
    description:
      "OWASP-aligned practices, least-privilege access and encrypted-by-default infrastructure on every engagement.",
  },
  {
    icon: HeartIcon,
    title: "Long-term partnership",
    description:
      "Most of our clients stay for years. We optimize for the relationship, not the invoice.",
  },
];

//------------------------------------------------------------------------------
// PAGE
//------------------------------------------------------------------------------
export default function AboutPage() {
  return (
    <>
      {/*----------------------------------------------------------------------
        ABOUT HERO
      ----------------------------------------------------------------------*/}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[-260px] h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-flame/10 blur-[140px]"
        />
        <Container className="relative pb-16 pt-20 md:pb-20 md:pt-28">
          <p className="animate-fade-up font-mono text-xs font-medium uppercase tracking-[0.2em] text-flame">
            About Ignitox
          </p>
          <h1 className="animate-fade-up mt-4 max-w-3xl text-4xl font-semibold tracking-tighter text-foreground [animation-delay:100ms] md:text-6xl">
            We turn complex IT into{" "}
            <span className="text-gradient">competitive advantage</span>
          </h1>
          {/* PLACEHOLDER — replace with the real founding story */}
          <p className="animate-fade-up mt-6 max-w-2xl text-base text-muted [animation-delay:200ms] md:text-lg">
            Ignitox was founded by engineers who were tired of watching
            businesses overpay for slow websites and fragile infrastructure.
            Today we design, build and operate cloud platforms, hosting and web
            experiences for companies that want technology to be a strength —
            not a worry.
          </p>
        </Container>
      </section>

      {/*----------------------------------------------------------------------
        VALUES GRID
      ----------------------------------------------------------------------*/}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="What we stand for"
            title="The principles behind every engagement"
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {VALUES.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.06} className="h-full">
              <SpotlightCard className="h-full rounded-2xl border border-border bg-surface transition-colors hover:border-flame/40">
                <div className="p-8">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl border border-flame/30 bg-gradient-to-br from-flame/20 to-ember/10 text-flame transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <value.icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {value.description}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
