//==============================================================================
// PAGE: INSIGHTS (/insights)
//==============================================================================
// Blog listing — newest post featured large, the rest in a grid. Fed entirely
// by src/content/insights.ts.
//------------------------------------------------------------------------------

import type { Metadata } from "next";
import { getPosts } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { PostCard } from "@/components/sections/post-card";
import { CtaBanner } from "@/components/sections/cta-banner";

//------------------------------------------------------------------------------
// METADATA
//------------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical engineering insights from the Ignitox team on cloud, hosting, performance and the craft of running production systems.",
};

//------------------------------------------------------------------------------
// PAGE
//------------------------------------------------------------------------------
// Refresh from the CMS every 5 minutes without a redeploy.
export const revalidate = 300;

export default async function InsightsPage() {
  const [featured, ...rest] = await getPosts();

  return (
    <>
      {/*----------------------------------------------------------------------
        INSIGHTS HERO
      ----------------------------------------------------------------------*/}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[-260px] h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-flame/10 blur-[140px]"
        />
        <Container className="relative pb-14 pt-20 md:pb-16 md:pt-28">
          <p className="animate-fade-up font-mono text-xs font-medium uppercase tracking-[0.2em] text-flame">
            Insights
          </p>
          <h1 className="animate-fade-up mt-4 max-w-2xl text-4xl font-semibold tracking-tighter text-foreground [animation-delay:100ms] md:text-6xl">
            Notes from the <span className="text-gradient">engine room</span>
          </h1>
          <p className="animate-fade-up mt-5 max-w-2xl text-base text-muted [animation-delay:200ms] md:text-lg">
            Practical write-ups on cloud, hosting and web performance. The
            things we learn keeping production systems fast and online.
          </p>
        </Container>
      </section>

      {/*----------------------------------------------------------------------
        POSTS
      ----------------------------------------------------------------------*/}
      <Section>
        {featured && (
          <Reveal>
            <PostCard post={featured} featured />
          </Reveal>
        )}

        {rest.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {rest.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.07} className="h-full">
                <PostCard post={post} />
              </Reveal>
            ))}
          </div>
        )}
      </Section>

      <CtaBanner />
    </>
  );
}
