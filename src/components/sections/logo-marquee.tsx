//==============================================================================
// TECHNOLOGY MARQUEE
//==============================================================================
// Infinite horizontal scroll of the platforms we build on, each with its real
// brand mark. Pure CSS animation (disabled under prefers-reduced-motion); the
// list is duplicated once with aria-hidden so the loop is seamless without
// confusing screen readers.
//------------------------------------------------------------------------------

import { TECH_MARQUEE } from "@/content/site";
import { BrandIcon } from "@/components/brand-icons";

//------------------------------------------------------------------------------
// MARQUEE ROW
//------------------------------------------------------------------------------
function MarqueeRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {TECH_MARQUEE.map((tech) => (
        <li
          key={tech}
          className="flex items-center gap-2.5 whitespace-nowrap font-mono text-sm text-muted/80"
        >
          <BrandIcon name={tech} className="size-5 shrink-0" />
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
    <section className="border-y border-border py-10">
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
