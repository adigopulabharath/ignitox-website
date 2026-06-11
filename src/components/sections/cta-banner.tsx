//==============================================================================
// CTA BANNER
//==============================================================================
// Closing call to action — reused on the homepage and service pages.
//------------------------------------------------------------------------------

import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function CtaBanner() {
  return (
    <Section>
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border px-8 py-16 text-center md:py-20">
          {/* Glow backdrop */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-full h-[320px] w-[640px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-flame/20 blur-[120px]"
          />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              Ready to <span className="text-gradient">ignite</span> your next
              project?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted md:text-lg">
              Tell us where you&apos;re headed — we&apos;ll map the fastest,
              safest route to production.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <ButtonLink href="/contact" size="lg">
                Start a project
              </ButtonLink>
              <ButtonLink href="/about" variant="secondary" size="lg">
                Why Ignitox
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
