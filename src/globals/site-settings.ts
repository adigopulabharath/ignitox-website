//==============================================================================
// GLOBAL: SITE SETTINGS
//==============================================================================
// Site-wide values editable without a deploy: SEO defaults and contact
// details. Read by src/lib/content.ts with static fallbacks.
//------------------------------------------------------------------------------

import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    group: "Site",
    description: "Company details and SEO defaults used across every page.",
  },
  access: {
    read: () => true,
    update: ({ req }) => Boolean(req.user),
  },
  fields: [
    //--------------------------------------------------------------------------
    // COMPANY
    //--------------------------------------------------------------------------
    {
      name: "tagline",
      type: "text",
      required: true,
      defaultValue: "IT solutions that ignite your business",
    },
    {
      name: "contactEmail",
      type: "email",
      required: true,
      defaultValue: "hello@ignitox.com",
      admin: { description: "Shown in the footer and on the contact page." },
    },

    //--------------------------------------------------------------------------
    // SEO DEFAULTS
    //--------------------------------------------------------------------------
    {
      name: "seo",
      type: "group",
      label: "SEO defaults",
      fields: [
        {
          name: "description",
          type: "textarea",
          required: true,
          defaultValue:
            "Ignitox builds and runs cloud platforms on AWS, Azure and Google Cloud, managed website hosting, and high-performance websites. One accountable partner from first deploy to day-2 operations.",
          admin: {
            description:
              "Default meta description (150 to 160 characters works best). Pages with their own description override this.",
          },
        },
      ],
    },
  ],
};
