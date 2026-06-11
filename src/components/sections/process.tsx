//==============================================================================
// PROCESS — HOW WE WORK
//==============================================================================
// Three numbered steps from first call to managed production.
//------------------------------------------------------------------------------

import { PROCESS_STEPS } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal } from "@/components/motion/reveal";

export function Process() {
  return (
    <Section>
      <Reveal>
        <SectionHeading
          eyebrow="How we work"
          title="From first call to launch, without the chaos"
          lead="A predictable process with senior engineers at every step. No hand-offs to a B-team after the contract is signed."
        />
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {PROCESS_STEPS.map((step, index) => (
          <Reveal key={step.number} delay={index * 0.08}>
            <SpotlightCard className="h-full rounded-2xl border border-border bg-surface">
              <div className="p-8">
                <p className="font-mono text-sm text-flame">{step.number}</p>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
