//==============================================================================
// COLLECTION: SERVICES
//==============================================================================
// One entry per service line. Drives the homepage grid, /services pages, the
// mega menu, the footer and the contact form selector. Field shapes mirror
// the Service type in src/content/services.ts.
//------------------------------------------------------------------------------

import type { CollectionConfig } from "payload";

export const Services: CollectionConfig = {
  slug: "services",
  labels: { singular: "Service", plural: "Services" },
  defaultSort: "order",
  versions: { drafts: true },
  admin: {
    group: "Site",
    useAsTitle: "name",
    defaultColumns: ["name", "tagline", "order", "_status"],
    description:
      "The service lines Ignitox offers. Order controls how they appear everywhere on the site.",
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    //--------------------------------------------------------------------------
    // IDENTITY
    //--------------------------------------------------------------------------
    { name: "name", type: "text", required: true, label: "Service name" },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "URL segment, e.g. cloud-solutions. Changing it breaks links.",
      },
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 99,
      admin: { position: "sidebar", description: "Lower numbers appear first." },
    },
    {
      name: "icon",
      type: "select",
      required: true,
      options: [
        { label: "Cloud", value: "cloud" },
        { label: "Code", value: "code" },
        { label: "Server", value: "server" },
        { label: "Bolt", value: "bolt" },
      ],
      admin: { position: "sidebar" },
    },

    //--------------------------------------------------------------------------
    // COPY
    //--------------------------------------------------------------------------
    {
      name: "tagline",
      type: "text",
      required: true,
      admin: { description: "Headline on the service page, e.g. a short promise." },
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
      admin: { description: "One or two sentences shown on cards and in search results." },
    },

    //--------------------------------------------------------------------------
    // DETAILS
    //--------------------------------------------------------------------------
    {
      name: "features",
      type: "array",
      label: "What's included",
      minRows: 3,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
      admin: { initCollapsed: true },
    },
    {
      name: "technologies",
      type: "array",
      label: "Tooling",
      fields: [{ name: "value", type: "text", required: true }],
      admin: { initCollapsed: true, description: "Shown as chips, e.g. AWS, Terraform." },
    },
    {
      name: "deliverables",
      type: "array",
      label: "What you get",
      fields: [{ name: "value", type: "text", required: true }],
      admin: { initCollapsed: true },
    },
    {
      name: "faqs",
      type: "array",
      label: "FAQ",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
      admin: { initCollapsed: true },
    },
  ],
};
