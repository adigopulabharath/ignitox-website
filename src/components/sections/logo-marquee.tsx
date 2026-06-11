//==============================================================================
// TECHNOLOGY MARQUEE
//==============================================================================
// Infinite horizontal scroll of the platforms we build on. Pure CSS animation
// (disabled under prefers-reduced-motion); the list is duplicated once with
// aria-hidden so the loop is seamless without confusing screen readers.
//------------------------------------------------------------------------------

import { TECH_MARQUEE } from "@/content/site";

//------------------------------------------------------------------------------
// MARQUEE ROW
//------------------------------------------------------------------------------
function MarqueeRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-12 pr-12"
    >
      {TECH_MARQUEE.map((tech) => (
        <li
          key={tech}
          className="whitespace-nowrap font-mono text-sm text-muted/80"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

//------------------------------------------------------------------------------
// SECTION
//------------------------------------------------------------------------------
export function LogoMarquee() {
  return (
    <section className="border-y border-white/5 py-10">
      <p className="text-center font-mono text-xs uppercase tracking-[0.25em] text-muted/60">
        Powering workloads on
      </p>
      <div className="marquee-mask mt-6 overflow-hidden">
        <div className="animate-marquee flex w-max">
          <MarqueeRow />
          <MarqueeRow hidden />
        </div>
      </div>
    </section>
  );
}
