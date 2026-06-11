//==============================================================================
// PAGE: HOME
//==============================================================================
// Assembles the homepage from the section components. Fully static — rendered
// at build time.
//------------------------------------------------------------------------------

import { Hero } from "@/components/sections/hero";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Stats } from "@/components/sections/stats";
import { Process } from "@/components/sections/process";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <ServicesGrid />
      <Stats />
      <Process />
      <CtaBanner />
    </>
  );
}
