//==============================================================================
// COLLECTION: MEDIA (image uploads)
//==============================================================================
// Stored on the persisted ./data volume next to the database. Alt text is
// required for accessibility.
//------------------------------------------------------------------------------

import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "data/media",
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "card", width: 800 },
      { name: "og", width: 1200, height: 630, crop: "center" },
    ],
  },
  admin: {
    group: "System",
    description: "Images used across the site. Always fill in the alt text.",
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Alt text",
      admin: { description: "Describe the image for screen readers and SEO." },
    },
  ],
};
