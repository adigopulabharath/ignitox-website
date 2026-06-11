//==============================================================================
// HERO
//==============================================================================
// Full-width opener: blueprint grid + flame glow backdrop, staggered CSS
// entrance (no client JS — animations are pure CSS with reduced-motion
// fallbacks in globals.css).
//------------------------------------------------------------------------------

import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/*----------------------------------------------------------------------
        BACKDROP — grid fading out radially + gradient glows
      ----------------------------------------------------------------------*/}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[-220px] h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-flame/15 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="absolute left-[12%] top-[120px] h-[240px] w-[240px] rounded-full bg-ember/10 blur-[100px]"
      />

      {/*----------------------------------------------------------------------
        CONTENT
      ----------------------------------------------------------------------*/}
      <Container className="relative pb-24 pt-24 text-center md:pb-32 md:pt-36">
        {/* Eyebrow badge */}
        <p className="animate-fade-up mx-auto inline-flex items-center gap-2.5 rounded-full border border-border bg-surface-2 px-4 py-1.5 text-xs text-muted">
          <span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-flame" />
          Cloud · Hosting · Web Development
        </p>

        {/* Headline */}
        <h1 className="animate-fade-up mx-auto mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tighter text-foreground [animation-delay:120ms] md:text-7xl">
          IT solutions that <span className="text-gradient">ignite</span> your
          business
        </h1>

        {/* Subcopy */}
        <p className="animate-fade-up mx-auto mt-6 max-w-2xl text-base text-muted [animation-delay:240ms] md:text-lg">
          We design, build and run your digital infrastructure — cloud
          architecture on AWS, Azure & GCP, managed hosting, and web
          experiences your customers will love.
        </p>

        {/* Calls to action */}
        <div className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-3 [animation-delay:360ms] sm:flex-row sm:gap-4">
          <ButtonLink href="/contact" size="lg">
            Start a project
          </ButtonLink>
          <ButtonLink href="/#services" variant="secondary" size="lg">
            Explore services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
