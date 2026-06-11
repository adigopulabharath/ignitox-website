//==============================================================================
// SITEMAP (served at /sitemap.xml)
//==============================================================================

import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { SERVICES } from "@/content/services";
import { POSTS } from "@/content/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  //----------------------------------------------------------------------------
  // STATIC ROUTES
  //----------------------------------------------------------------------------
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/services`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/insights`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE.url}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/contact`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  //----------------------------------------------------------------------------
  // SERVICE ROUTES
  //----------------------------------------------------------------------------
  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${SITE.url}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  //----------------------------------------------------------------------------
  // INSIGHT ROUTES
  //----------------------------------------------------------------------------
  const postRoutes: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${SITE.url}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...postRoutes];
}
