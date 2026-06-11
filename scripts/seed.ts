//==============================================================================
// CMS SEED SCRIPT
//==============================================================================
// Imports the static content from src/content into Payload and creates the
// first admin user if none exists. Idempotent: existing documents (matched by
// slug) are updated, not duplicated. Run with:
//
//   npm run seed
//
// Override the first admin credentials with SEED_ADMIN_EMAIL and
// SEED_ADMIN_PASSWORD. Change the password immediately after first login.
//------------------------------------------------------------------------------

import { getPayload, type Payload } from "payload";
import config from "@payload-config";
import { SERVICES } from "@/content/services";
import { POSTS } from "@/content/insights";
import { CASE_STUDIES } from "@/content/case-studies";
import { TESTIMONIALS } from "@/content/testimonials";
import { SITE } from "@/content/site";

const rows = (items: string[]) => items.map((value) => ({ value }));

//------------------------------------------------------------------------------
// UPSERT HELPER (match by slug)
//------------------------------------------------------------------------------
async function upsertBySlug(
  payload: Payload,
  collection: "services" | "posts" | "case-studies",
  slug: string,
  data: Record<string, unknown>,
) {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
  });

  if (existing.docs[0]) {
    await payload.update({ collection, id: existing.docs[0].id, data });
    console.log(`[seed] updated ${collection}/${slug}`);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await payload.create({ collection, data: data as any });
    console.log(`[seed] created ${collection}/${slug}`);
  }
}

//------------------------------------------------------------------------------
// SEED
//------------------------------------------------------------------------------
const payload = await getPayload({ config });

//--- First admin user ---------------------------------------------------------
const users = await payload.find({ collection: "users", limit: 1 });
if (users.totalDocs === 0) {
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@ignitox.com";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "change-me-immediately";
  await payload.create({
    collection: "users",
    data: { email, password, name: "Ignitox Admin" },
  });
  console.warn(`[seed] Created admin user ${email}. CHANGE THE PASSWORD AFTER FIRST LOGIN.`);
}

//--- Services -------------------------------------------------------------------
for (const [index, service] of SERVICES.entries()) {
  await upsertBySlug(payload, "services", service.slug, {
    name: service.name,
    slug: service.slug,
    order: index + 1,
    icon: service.icon,
    tagline: service.tagline,
    summary: service.summary,
    features: service.features,
    technologies: rows(service.technologies),
    deliverables: rows(service.deliverables),
    faqs: service.faqs,
    _status: "published",
  });
}

//--- Posts ----------------------------------------------------------------------
for (const post of POSTS) {
  await upsertBySlug(payload, "posts", post.slug, {
    title: post.title,
    slug: post.slug,
    date: post.date,
    readMinutes: post.readMinutes,
    tags: rows(post.tags),
    author: post.author,
    excerpt: post.excerpt,
    body: post.blocks.map((block) => {
      switch (block.type) {
        case "ul":
          return { blockType: "ul", items: rows(block.items) };
        case "h2":
        case "quote":
        case "code":
        case "p":
          return { blockType: block.type, text: block.text };
      }
    }),
    _status: "published",
  });
}

//--- Case studies ---------------------------------------------------------------
for (const study of CASE_STUDIES) {
  await upsertBySlug(payload, "case-studies", study.slug, {
    title: study.title,
    slug: study.slug,
    date: study.date,
    client: study.client,
    industry: study.industry,
    summary: study.summary,
    challenge: rows(study.challenge),
    solution: rows(study.solution),
    outcomes: rows(study.outcomes),
    results: study.results,
    stack: rows(study.stack),
    quote: study.quote ?? {},
    _status: "published",
  });
}

//--- Testimonials ---------------------------------------------------------------
const existingTestimonials = await payload.find({ collection: "testimonials", limit: 1 });
if (existingTestimonials.totalDocs === 0) {
  for (const [index, testimonial] of TESTIMONIALS.entries()) {
    await payload.create({
      collection: "testimonials",
      data: { ...testimonial, order: index + 1 },
    });
    console.log(`[seed] created testimonial from ${testimonial.name}`);
  }
}

//--- Site settings --------------------------------------------------------------
await payload.updateGlobal({
  slug: "site-settings",
  data: {
    tagline: SITE.tagline,
    contactEmail: SITE.email,
    seo: { description: SITE.description },
  },
});

console.log("[seed] done");
process.exit(0);
