//==============================================================================
// SEARCH INDEX
//==============================================================================
// Flat index for the command palette, built from the content registry at
// build time. Adding a service, post or case study automatically makes it
// searchable. Keep entries tiny: this ships in the client bundle.
//------------------------------------------------------------------------------

import { SERVICES } from "@/content/services";
import { POSTS } from "@/content/insights";
import { CASE_STUDIES } from "@/content/case-studies";

//------------------------------------------------------------------------------
// TYPES
//------------------------------------------------------------------------------
export type SearchEntry = {
  title: string;
  description: string;
  href: string;
  group: "Pages" | "Services" | "Insights" | "Case Studies";
};

//------------------------------------------------------------------------------
// STATIC PAGES
//------------------------------------------------------------------------------
const PAGE_ENTRIES: SearchEntry[] = [
  { title: "Home", description: "IT solutions that ignite your business", href: "/", group: "Pages" },
  { title: "Services", description: "Everything we do, in one place", href: "/services", group: "Pages" },
  { title: "Case Studies", description: "Real projects with real numbers", href: "/case-studies", group: "Pages" },
  { title: "Insights", description: "Engineering notes and guides", href: "/insights", group: "Pages" },
  { title: "About", description: "Who we are and how we work", href: "/about", group: "Pages" },
  { title: "Contact", description: "Start a project or ask a question", href: "/contact", group: "Pages" },
];

//------------------------------------------------------------------------------
// FULL INDEX
//------------------------------------------------------------------------------
export const SEARCH_INDEX: SearchEntry[] = [
  ...PAGE_ENTRIES,
  ...SERVICES.map((service) => ({
    title: service.name,
    description: service.tagline,
    href: `/services/${service.slug}`,
    group: "Services" as const,
  })),
  ...CASE_STUDIES.map((study) => ({
    title: study.title,
    description: `${study.industry}: ${study.client}`,
    href: `/case-studies/${study.slug}`,
    group: "Case Studies" as const,
  })),
  ...POSTS.map((post) => ({
    title: post.title,
    description: post.excerpt,
    href: `/insights/${post.slug}`,
    group: "Insights" as const,
  })),
];

//------------------------------------------------------------------------------
// MATCHING (simple scored substring search, dependency free)
//------------------------------------------------------------------------------
export function searchEntries(query: string, limit = 8): SearchEntry[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return SEARCH_INDEX.slice(0, limit);

  return SEARCH_INDEX.map((entry) => {
    const title = entry.title.toLowerCase();
    const description = entry.description.toLowerCase();
    let score = 0;
    if (title.startsWith(needle)) score = 3;
    else if (title.includes(needle)) score = 2;
    else if (description.includes(needle)) score = 1;
    return { entry, score };
  })
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((match) => match.entry);
}
