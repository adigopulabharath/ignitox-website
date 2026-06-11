//==============================================================================
// COLLECTION: TESTIMONIALS
//==============================================================================

import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: "Testimonial", plural: "Testimonials" },
  defaultSort: "order",
  admin: {
    group: "Site",
    useAsTitle: "name",
    defaultColumns: ["name", "company", "order"],
    description:
      "Client quotes for the homepage. Get written permission before publishing.",
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "quote", type: "textarea", required: true },
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", required: true },
    { name: "company", type: "text", required: true },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 99,
      admin: { position: "sidebar", description: "Lower numbers appear first." },
    },
  ],
};
