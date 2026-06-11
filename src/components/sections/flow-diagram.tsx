//==============================================================================
// FLOW DIAGRAM — FROM COMMIT TO CUSTOMER
//==============================================================================
// Vercel-style animated pipeline: five stages joined by connectors with a
// traveling light pulse (pure CSS, disabled under prefers-reduced-motion).
// Stacks vertically on small screens.
//------------------------------------------------------------------------------

import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import {
  BoltIcon,
  CheckIcon,
  CloudIcon,
  CodeIcon,
  HeartIcon,
} from "@/components/icons";

//------------------------------------------------------------------------------
// STAGES
//------------------------------------------------------------------------------
const STAGES = [
  { icon: CodeIcon, title: "Code ships", caption: "git push" },
  { icon: CheckIcon, title: "Checks pass", caption: "tests + security" },
  { icon: BoltIcon, title: "Deploy runs", caption: "zero downtime" },
  { icon: CloudIcon, title: "Edge caches", caption: "global CDN" },
  { icon: HeartIcon, title: "Customers load it", caption: "under 1 second" },
];

//------------------------------------------------------------------------------
// CONNECTOR (animated pulse travels left to right; delay staggers the flow)
//------------------------------------------------------------------------------
function Connector({ delay }: { delay: number }) {
  return (
    <div
      aria-hidden="true"
      className="relative hidden h-px flex-1 overflow-hidden bg-border md:block"
    >
      <span
        className="animate-flow-pulse absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-flame to-transparent"
        style={{ animationDelay: `${delay}ms` }}
      />
    </div>
  );
}

//------------------------------------------------------------------------------
// SECTION
//------------------------------------------------------------------------------
export function FlowDiagram() {
  return (
    <Section className="py-16 md:py-20">
      <Reveal>
        <SectionHeading
          eyebrow="The pipeline"
          title="From commit to customer, on rails"
          lead="Every project we run rides the same automated path to production. No manual steps, nothing to forget at 6 p.m. on a Friday."
          align="center"
        />
      </Reveal>

      <Reveal className="mt-12">
        <div className="flex flex-col items-stretch gap-4 rounded-3xl border border-border bg-surface p-6 md:flex-row md:items-center md:gap-3 md:p-8">
          {STAGES.map((stage, index) => (
            <div key={stage.title} className="contents">
              {/* Stage node */}
              <div className="flex items-center gap-3 md:w-36 md:flex-col md:gap-2 md:text-center">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-flame/30 bg-gradient-to-br from-flame/15 to-ember/10 text-flame">
                  <stage.icon className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-foreground">
                    {stage.title}
                  </span>
                  <span className="mt-0.5 block font-mono text-[11px] text-muted">
                    {stage.caption}
                  </span>
                </span>
              </div>

              {/* Connector between nodes */}
              {index < STAGES.length - 1 && <Connector delay={index * 450} />}
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
