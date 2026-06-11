//==============================================================================
// COLLECTION: POSTS (Insights blog)
//==============================================================================
// Article bodies are composed from simple blocks (paragraph, heading, list,
// quote, code) whose slugs match the PostBlock union in
// src/content/insights.ts, so the public renderer needs no changes.
//------------------------------------------------------------------------------

import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Post", plural: "Posts" },
  defaultSort: "-date",
  versions: { drafts: true },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "date", "_status"],
    description: "Articles for the Insights section.",
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    //--------------------------------------------------------------------------
    // IDENTITY & META
    //--------------------------------------------------------------------------
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: { position: "sidebar", description: "URL segment. Changing it breaks links." },
    },
    {
      name: "date",
      type: "date",
      required: true,
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly" } },
    },
    {
      name: "readMinutes",
      type: "number",
      required: true,
      defaultValue: 5,
      label: "Read time (minutes)",
      admin: { position: "sidebar" },
    },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
      admin: { position: "sidebar", initCollapsed: true },
    },
    {
      name: "author",
      type: "group",
      fields: [
        { name: "name", type: "text", required: true, defaultValue: "Ignitox Engineering" },
        { name: "role", type: "text", required: true, defaultValue: "Cloud & Web team" },
      ],
      admin: { position: "sidebar" },
    },

    //--------------------------------------------------------------------------
    // LISTING COPY
    //--------------------------------------------------------------------------
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      admin: { description: "Shown on listing cards and used as the SEO description." },
    },

    //--------------------------------------------------------------------------
    // ARTICLE BODY
    //--------------------------------------------------------------------------
    {
      name: "body",
      type: "blocks",
      label: "Article body",
      blocks: [
        {
          slug: "p",
          labels: { singular: "Paragraph", plural: "Paragraphs" },
          fields: [{ name: "text", type: "textarea", required: true }],
        },
        {
          slug: "h2",
          labels: { singular: "Heading", plural: "Headings" },
          fields: [{ name: "text", type: "text", required: true }],
        },
        {
          slug: "ul",
          labels: { singular: "Bullet list", plural: "Bullet lists" },
          fields: [
            {
              name: "items",
              type: "array",
              fields: [{ name: "value", type: "textarea", required: true }],
            },
          ],
        },
        {
          slug: "quote",
          labels: { singular: "Pull quote", plural: "Pull quotes" },
          fields: [{ name: "text", type: "textarea", required: true }],
        },
        {
          slug: "code",
          labels: { singular: "Code block", plural: "Code blocks" },
          fields: [{ name: "text", type: "code", required: true }],
        },
      ],
    },
  ],
};
