//==============================================================================
// TESTIMONIALS & CLIENT TRUST STRIP
//==============================================================================
// "Trusted by" wordmark row followed by a grid of client quotes. Content
// (currently placeholder) lives in src/content/testimonials.ts.
//------------------------------------------------------------------------------

import { CLIENT_LOGOS } from "@/content/testimonials";
import { getTestimonials } from "@/lib/content";
import { Section, SectionHeading } from "@/components/ui/section";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal } from "@/components/motion/reveal";

export async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <Section>
      {/*----------------------------------------------------------------------
        CLIENT LOGO STRIP
      ----------------------------------------------------------------------*/}
      <Reveal>
        <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-muted/60">
          Trusted by teams at
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {CLIENT_LOGOS.map((client) => (
            <span
              key={client}
              className="text-lg font-semibold tracking-tight text-muted/50 transition-colors hover:text-muted"
            >
              {client}
            </span>
          ))}
        </div>
      </Reveal>

      {/*----------------------------------------------------------------------
        QUOTES
      ----------------------------------------------------------------------*/}
      <Reveal className="mt-16">
        <SectionHeading
          eyebrow="Testimonials"
          title="What clients say after the dust settles"
          align="center"
        />
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 0.07} className="h-full">
            <SpotlightCard className="h-full rounded-2xl border border-border bg-surface">
              <figure className="flex h-full flex-col p-7">
                <span aria-hidden="true" className="text-gradient font-serif text-5xl leading-none">
                  &ldquo;
                </span>
                <blockquote className="mt-2 text-sm leading-relaxed text-foreground">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-auto pt-6 text-xs text-muted">
                  <span className="block font-medium text-foreground">
                    {testimonial.name}
                  </span>
                  {testimonial.role}, {testimonial.company}
                </figcaption>
              </figure>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
