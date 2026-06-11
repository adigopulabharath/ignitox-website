//==============================================================================
// PAYLOAD ADMIN — CUSTOM DASHBOARD
//==============================================================================
// Replaces Payload's default (empty) dashboard with grouped cards, live
// document counts and quick actions. Server component; styled with Payload's
// own CSS variables so it follows the admin light/dark theme.
//------------------------------------------------------------------------------

import React from "react";
import { getPayload } from "payload";
import config from "@payload-config";

//------------------------------------------------------------------------------
// DASHBOARD STRUCTURE (mirrors the collection admin groups)
//------------------------------------------------------------------------------
const GROUPS: Array<{
  label: string;
  items: Array<{ slug: string; label: string; href: string }>;
}> = [
  {
    label: "Site",
    items: [
      { slug: "services", label: "Services", href: "/admin/collections/services" },
      { slug: "testimonials", label: "Testimonials", href: "/admin/collections/testimonials" },
    ],
  },
  {
    label: "Content",
    items: [
      { slug: "case-studies", label: "Case Studies", href: "/admin/collections/case-studies" },
      { slug: "posts", label: "Posts", href: "/admin/collections/posts" },
    ],
  },
  {
    label: "System",
    items: [
      { slug: "media", label: "Media", href: "/admin/collections/media" },
      { slug: "users", label: "Users", href: "/admin/collections/users" },
    ],
  },
];

const QUICK_ACTIONS = [
  { label: "Write a post", href: "/admin/collections/posts/create" },
  { label: "Add a case study", href: "/admin/collections/case-studies/create" },
  { label: "Edit site settings", href: "/admin/globals/site-settings" },
  { label: "View website", href: "/" },
];

//------------------------------------------------------------------------------
// STYLES (Payload theme variables — adapt to admin light/dark automatically)
//------------------------------------------------------------------------------
const cardStyle: React.CSSProperties = {
  display: "block",
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid var(--theme-elevation-150)",
  background: "var(--theme-elevation-50)",
  color: "var(--theme-text)",
  textDecoration: "none",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "12px",
  marginTop: "12px",
};

//------------------------------------------------------------------------------
// VIEW
//------------------------------------------------------------------------------
export async function CustomDashboard() {
  const payload = await getPayload({ config });

  // Live document counts per collection.
  const counts = new Map<string, number>();
  for (const group of GROUPS) {
    for (const item of group.items) {
      try {
        const result = await payload.count({
          collection: item.slug as Parameters<typeof payload.count>[0]["collection"],
        });
        counts.set(item.slug, result.totalDocs);
      } catch {
        counts.set(item.slug, 0);
      }
    }
  }

  return (
    <div style={{ padding: "40px", maxWidth: "1100px" }}>
      {/*------------------------------------------------------------------
        WELCOME
      ------------------------------------------------------------------*/}
      <h1 style={{ margin: 0, fontSize: "28px" }}>Welcome back</h1>
      <p style={{ margin: "8px 0 0", color: "var(--theme-elevation-500)" }}>
        Everything on ignitox.com is edited from here. Changes appear on the
        live site within five minutes of publishing.
      </p>

      {/*------------------------------------------------------------------
        QUICK ACTIONS
      ------------------------------------------------------------------*/}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "24px" }}>
        {QUICK_ACTIONS.map((action) => (
          <a
            key={action.href}
            href={action.href}
            style={{
              padding: "10px 18px",
              borderRadius: "999px",
              border: "1px solid var(--theme-elevation-150)",
              background: "var(--theme-elevation-100)",
              color: "var(--theme-text)",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            {action.label}
          </a>
        ))}
      </div>

      {/*------------------------------------------------------------------
        GROUPED COLLECTION CARDS WITH COUNTS
      ------------------------------------------------------------------*/}
      {GROUPS.map((group) => (
        <section key={group.label} style={{ marginTop: "36px" }}>
          <h2
            style={{
              margin: 0,
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--theme-elevation-500)",
            }}
          >
            {group.label}
          </h2>
          <div style={gridStyle}>
            {group.items.map((item) => (
              <a key={item.slug} href={item.href} style={cardStyle}>
                <span style={{ fontSize: "26px", fontWeight: 700 }}>
                  {counts.get(item.slug) ?? 0}
                </span>
                <span style={{ display: "block", marginTop: "6px", fontSize: "14px" }}>
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default CustomDashboard;
