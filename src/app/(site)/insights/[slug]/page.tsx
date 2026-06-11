//==============================================================================
// PAGE: INSIGHT ARTICLE (/insights/[slug])
//==============================================================================
// Article template rendering the structured blocks from
// src/content/insights.ts. All slugs statically generated at build time.
//------------------------------------------------------------------------------

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatPostDate, type PostBlock } from "@/content/insights";
import { getPostBySlug, getPosts } from "@/lib/content";
import { SITE } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { PostCard } from "@/components/sections/post-card";
import { JsonLd } from "@/components/json-ld";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

//------------------------------------------------------------------------------
// STATIC GENERATION & METADATA
//------------------------------------------------------------------------------
// Refresh from the CMS every 5 minutes; unknown slugs render on demand.
export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

//------------------------------------------------------------------------------
// BLOCK RENDERER
//------------------------------------------------------------------------------
function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-10 text-2xl font-semibold tracking-tight text-foreground">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-muted">
              <CheckIcon className="mt-1 size-4 shrink-0 text-flame" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="mt-6 border-l-2 border-flame pl-5 text-lg italic leading-relaxed text-foreground">
          {block.text}
        </blockquote>
      );
    case "code":
      return (
        <pre className="mt-6 overflow-x-auto rounded-xl border border-border bg-surface-2 p-5 font-mono text-sm leading-relaxed text-foreground">
          <code>{block.text}</code>
        </pre>
      );
    default:
      return (
        <p className="mt-5 text-base leading-relaxed text-muted">{block.text}</p>
      );
  }
}

//------------------------------------------------------------------------------
// PAGE
//------------------------------------------------------------------------------
export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = (await getPosts())
    .filter((entry) => entry.slug !== post.slug)
    .slice(0, 2);

  //----------------------------------------------------------------------------
  // STRUCTURED DATA (Article + Breadcrumb)
  //----------------------------------------------------------------------------
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
    mainEntityOfPage: `${SITE.url}/insights/${post.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${SITE.url}/insights` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE.url}/insights/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/*----------------------------------------------------------------------
        ARTICLE HEADER
      ----------------------------------------------------------------------*/}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[-260px] h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-flame/10 blur-[140px]"
        />
        <Container className="relative max-w-3xl pb-12 pt-20 md:pt-28">
          <Link
            href="/insights"
            className="group animate-fade-up inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-flame"
          >
            <ArrowRightIcon className="size-3.5 rotate-180 transition-transform group-hover:-translate-x-1" />
            All insights
          </Link>
          <h1 className="animate-fade-up mt-5 text-3xl font-semibold tracking-tighter text-foreground [animation-delay:100ms] md:text-5xl">
            {post.title}
          </h1>
          <div className="animate-fade-up mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted [animation-delay:200ms]">
            <span className="font-medium text-foreground">{post.author.name}</span>
            <span>{post.author.role}</span>
            <span className="font-mono">{formatPostDate(post.date)}</span>
            <span className="font-mono">{post.readMinutes} min read</span>
            <span className="flex gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5 font-mono text-[11px]"
                >
                  {tag}
                </span>
              ))}
            </span>
          </div>
        </Container>
      </section>

      {/*----------------------------------------------------------------------
        ARTICLE BODY
      ----------------------------------------------------------------------*/}
      <article>
        <Container className="max-w-3xl py-12 md:py-16">
          {post.blocks.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </Container>
      </article>

      {/*----------------------------------------------------------------------
        RELATED POSTS
      ----------------------------------------------------------------------*/}
      {related.length > 0 && (
        <Section className="border-t border-border">
          <Reveal>
            <SectionHeading eyebrow="Keep reading" title="More from the engine room" />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {related.map((entry, index) => (
              <Reveal key={entry.slug} delay={index * 0.07} className="h-full">
                <PostCard post={entry} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
