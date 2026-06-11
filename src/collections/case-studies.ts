//==============================================================================
// COLLECTION: CASE STUDIES
//==============================================================================
// Field shapes mirror the CaseStudy type in src/content/case-studies.ts.
//------------------------------------------------------------------------------

import type { CollectionConfig } from "payload";

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  labels: { singular: "Case Study", plural: "Case Studies" },
  defaultSort: "-date",
  versions: { drafts: true },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "client", "industry", "_status"],
    description:
      "Client engagements with results. Only publish what the client has approved in writing.",
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
    { name: "client", type: "text", required: true, admin: { position: "sidebar" } },
    { name: "industry", type: "text", required: true, admin: { position: "sidebar" } },

    //--------------------------------------------------------------------------
    // STORY
    //--------------------------------------------------------------------------
    {
      name: "summary",
      type: "textarea",
      required: true,
      admin: { description: "Shown on cards and used as the SEO description." },
    },
    {
      name: "challenge",
      type: "array",
      label: "The challenge (paragraphs)",
      fields: [{ name: "value", type: "textarea", required: true }],
    },
    {
      name: "solution",
      type: "array",
      label: "What we did (paragraphs)",
      fields: [{ name: "value", type: "textarea", required: true }],
    },
    {
      name: "outcomes",
      type: "array",
      label: "What changed (bullets)",
      fields: [{ name: "value", type: "text", required: true }],
      admin: { initCollapsed: true },
    },

    //--------------------------------------------------------------------------
    // NUMBERS & STACK
    //--------------------------------------------------------------------------
    {
      name: "results",
      type: "array",
      label: "Headline results",
      maxRows: 3,
      fields: [
        { name: "value", type: "text", required: true, admin: { description: "e.g. 31% or 0.9s" } },
        { name: "label", type: "text", required: true },
      ],
    },
    {
      name: "stack",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
      admin: { initCollapsed: true },
    },

    //--------------------------------------------------------------------------
    // CLIENT QUOTE (optional)
    //--------------------------------------------------------------------------
    {
      name: "quote",
      type: "group",
      fields: [
        { name: "text", type: "textarea" },
        { name: "name", type: "text" },
        { name: "role", type: "text" },
      ],
      admin: { description: "Leave empty to hide the quote section." },
    },
  ],
};
