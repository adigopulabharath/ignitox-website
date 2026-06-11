//==============================================================================
// PAGE: HOME
//==============================================================================
// Assembles the homepage from the section components. Fully static — rendered
// at build time.
//------------------------------------------------------------------------------

// Refresh CMS-driven sections every 5 minutes without a redeploy.
export const revalidate = 300;

import { Hero } from "@/components/sections/hero";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { FlowDiagram } from "@/components/sections/flow-diagram";
import { ServicesGrid } from "@/components/sections/services-grid";
import { Stats } from "@/components/sections/stats";
import { CaseStudiesPreview } from "@/components/sections/case-study-card";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <FlowDiagram />
      <ServicesGrid />
      <Stats />
      <CaseStudiesPreview />
      <Process />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
