//==============================================================================
// COLLECTION: USERS (admin panel accounts)
//==============================================================================
// Cookie-based auth with login attempt lockout. Only authenticated users can
// manage users; there is no public signup.
//------------------------------------------------------------------------------

import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    // Lock the account for 10 minutes after 5 failed attempts.
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
  },
  admin: {
    group: "System",
    useAsTitle: "email",
    description: "People who can sign in to this admin panel.",
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Full name",
    },
  ],
};
