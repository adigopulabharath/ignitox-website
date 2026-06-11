//==============================================================================
// CONTENT ACCESS LAYER (Payload CMS with static fallback)
//==============================================================================
// Server-side getters used by pages and sections. They read from Payload's
// local API (SQLite) and map documents onto the existing content types, so
// components never change shape. When the database is unavailable or empty
// (CI builds, first boot before seeding), they fall back to the static
// content in src/content so the site always renders.
//------------------------------------------------------------------------------

import { cache } from "react";
import type { Config } from "@/payload-types.gen";
import { SERVICES as STATIC_SERVICES, type Service } from "@/content/services";
import { POSTS as STATIC_POSTS, type Post, type PostBlock } from "@/content/insights";
import {
  CASE_STUDIES as STATIC_CASE_STUDIES,
  type CaseStudy,
} from "@/content/case-studies";
import {
  TESTIMONIALS as STATIC_TESTIMONIALS,
  type Testimonial,
} from "@/content/testimonials";

type ServiceDoc = Config["collections"]["services"];
type PostDoc = Config["collections"]["posts"];
type CaseStudyDoc = Config["collections"]["case-studies"];
type TestimonialDoc = Config["collections"]["testimonials"];

//------------------------------------------------------------------------------
// PAYLOAD CLIENT (lazy; never throws to callers)
//------------------------------------------------------------------------------
async function findDocs<T>(
  collection: "services" | "posts" | "case-studies" | "testimonials",
  options: { sort: string; publishedOnly: boolean },
): Promise<T[] | null> {
  try {
    const { getPayload } = await import("payload");
    const { default: config } = await import("@payload-config");
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection,
      sort: options.sort,
      limit: 100,
      depth: 0,
      ...(options.publishedOnly
        ? { where: { _status: { equals: "published" } } }
        : {}),
    });
    return result.docs as T[];
  } catch (error) {
    console.warn(`[content] CMS unavailable for "${collection}", using static content.`, error);
    return null;
  }
}

//------------------------------------------------------------------------------
// MAPPERS (Payload document -> existing content type)
//------------------------------------------------------------------------------
const values = (rows: Array<{ value: string }> | null | undefined): string[] =>
  (rows ?? []).map((row) => row.value);

function mapService(doc: ServiceDoc): Service {
  return {
    slug: doc.slug,
    name: doc.name,
    tagline: doc.tagline,
    summary: doc.summary,
    icon: doc.icon as Service["icon"],
    features: (doc.features ?? []).map((f) => ({
      title: f.title,
      description: f.description,
    })),
    technologies: values(doc.technologies),
    deliverables: values(doc.deliverables),
    faqs: (doc.faqs ?? []).map((f) => ({ question: f.question, answer: f.answer })),
  };
}

function mapPost(doc: PostDoc): Post {
  const blocks: PostBlock[] = (doc.body ?? []).map((block) => {
    switch (block.blockType) {
      case "h2":
        return { type: "h2", text: block.text };
      case "ul":
        return { type: "ul", items: values(block.items) };
      case "quote":
        return { type: "quote", text: block.text };
      case "code":
        return { type: "code", text: block.text };
      default:
        return { type: "p", text: block.text };
    }
  });

  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    date: doc.date.slice(0, 10),
    readMinutes: doc.readMinutes,
    tags: values(doc.tags),
    author: { name: doc.author.name, role: doc.author.role },
    blocks,
  };
}

function mapCaseStudy(doc: CaseStudyDoc): CaseStudy {
  const quote =
    doc.quote?.text && doc.quote?.name && doc.quote?.role
      ? { text: doc.quote.text, name: doc.quote.name, role: doc.quote.role }
      : undefined;

  return {
    slug: doc.slug,
    title: doc.title,
    client: doc.client,
    industry: doc.industry,
    summary: doc.summary,
    challenge: values(doc.challenge),
    solution: values(doc.solution),
    outcomes: values(doc.outcomes),
    results: (doc.results ?? []).map((r) => ({ value: r.value, label: r.label })),
    stack: values(doc.stack),
    quote,
    date: doc.date.slice(0, 10),
  };
}

function mapTestimonial(doc: TestimonialDoc): Testimonial {
  return {
    quote: doc.quote,
    name: doc.name,
    role: doc.role,
    company: doc.company,
  };
}

//------------------------------------------------------------------------------
// PUBLIC GETTERS (request-deduplicated; CMS first, static fallback)
//------------------------------------------------------------------------------
export const getServices = cache(async (): Promise<Service[]> => {
  const docs = await findDocs<ServiceDoc>("services", {
    sort: "order",
    publishedOnly: true,
  });
  return docs?.length ? docs.map(mapService) : STATIC_SERVICES;
});

export const getServiceBySlug = cache(async (slug: string): Promise<Service | undefined> => {
  const services = await getServices();
  return services.find((service) => service.slug === slug);
});

export const getPosts = cache(async (): Promise<Post[]> => {
  const docs = await findDocs<PostDoc>("posts", { sort: "-date", publishedOnly: true });
  return docs?.length ? docs.map(mapPost) : STATIC_POSTS;
});

export const getPostBySlug = cache(async (slug: string): Promise<Post | undefined> => {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
});

export const getCaseStudies = cache(async (): Promise<CaseStudy[]> => {
  const docs = await findDocs<CaseStudyDoc>("case-studies", {
    sort: "-date",
    publishedOnly: true,
  });
  return docs?.length ? docs.map(mapCaseStudy) : STATIC_CASE_STUDIES;
});

export const getCaseStudyBySlug = cache(
  async (slug: string): Promise<CaseStudy | undefined> => {
    const studies = await getCaseStudies();
    return studies.find((study) => study.slug === slug);
  },
);

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const docs = await findDocs<TestimonialDoc>("testimonials", {
    sort: "order",
    publishedOnly: false,
  });
  return docs?.length ? docs.map(mapTestimonial) : STATIC_TESTIMONIALS;
});
