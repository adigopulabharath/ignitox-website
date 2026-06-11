//==============================================================================
// STATS BAND
//==============================================================================
// Animated counters inside a bordered band. Figures live in src/content/site.ts
// (currently placeholders).
//------------------------------------------------------------------------------

import { STATS } from "@/content/site";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";

export function Stats() {
  return (
    <Section className="py-10 md:py-14">
      <Reveal>
        <dl className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-background p-8 text-center">
              <dd className="text-4xl font-semibold tracking-tight text-foreground">
                {stat.value !== undefined ? (
                  <Counter
                    value={stat.value}
                    decimals={stat.decimals ?? 0}
                    suffix={stat.suffix ?? ""}
                  />
                ) : (
                  stat.display
                )}
              </dd>
              <dt className="mt-2 text-sm text-muted">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
