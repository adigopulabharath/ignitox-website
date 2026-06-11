//==============================================================================
// SITEMAP (served at /sitemap.xml)
//==============================================================================

import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { getCaseStudies, getPosts, getServices } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts, caseStudies] = await Promise.all([
    getServices(),
    getPosts(),
    getCaseStudies(),
  ]);

  //----------------------------------------------------------------------------
  // STATIC ROUTES
  //----------------------------------------------------------------------------
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/insights`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/case-studies`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  //----------------------------------------------------------------------------
  // SERVICE ROUTES
  //----------------------------------------------------------------------------
  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE.url}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  //----------------------------------------------------------------------------
  // INSIGHT ROUTES
  //----------------------------------------------------------------------------
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE.url}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  //----------------------------------------------------------------------------
  // CASE STUDY ROUTES
  //----------------------------------------------------------------------------
  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${SITE.url}/case-studies/${study.slug}`,
    lastModified: new Date(study.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...postRoutes, ...caseStudyRoutes];
}
