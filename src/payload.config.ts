//==============================================================================
// PAYLOAD CMS CONFIGURATION
//==============================================================================
// Admin panel lives at /admin on the same Next.js app (same-origin, HttpOnly
// cookie auth, no client secrets). Data lives in SQLite on a persisted volume
// (swap to @payloadcms/db-postgres later without touching collections).
// GraphQL is disabled to keep the API surface minimal; pages read content
// through the local API in src/lib/content.ts.
//------------------------------------------------------------------------------

import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "@/collections/users";
import { Media } from "@/collections/media";
import { Services } from "@/collections/services";
import { Posts } from "@/collections/posts";
import { CaseStudies } from "@/collections/case-studies";
import { Testimonials } from "@/collections/testimonials";
import { SiteSettings } from "@/globals/site-settings";

const dirname = path.dirname(fileURLToPath(import.meta.url));

//------------------------------------------------------------------------------
// SECRET (must be set in production; the fallback only unblocks local dev/CI)
//------------------------------------------------------------------------------
const secret = process.env.PAYLOAD_SECRET ?? "dev-only-secret-change-me";
if (!process.env.PAYLOAD_SECRET && process.env.NODE_ENV === "production") {
  console.warn("[payload] PAYLOAD_SECRET is not set. Set it before going live.");
}

//------------------------------------------------------------------------------
// CONFIG
//------------------------------------------------------------------------------
export default buildConfig({
  secret,
  telemetry: false,
  graphQL: { disable: true },

  //--- Admin panel ------------------------------------------------------------
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " | Ignitox Admin",
    },
    avatar: "default",
    components: {
      views: {
        // Grouped cards + quick actions instead of the empty default.
        dashboard: {
          Component: "@/components/admin/custom-dashboard#CustomDashboard",
        },
      },
    },
  },

  //--- Content model ----------------------------------------------------------
  collections: [Services, CaseStudies, Posts, Testimonials, Media, Users],
  globals: [SiteSettings],

  //--- Editor & media processing ----------------------------------------------
  editor: lexicalEditor(),
  sharp,

  //--- Database (SQLite file on the persisted ./data volume) -------------------
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI ?? "file:./data/ignitox.db",
    },
    // Auto-sync the schema at startup. Fine for a single-instance site with
    // file backups; move to generated migrations before scaling out.
    push: true,
  }),

  //--- Generated types ----------------------------------------------------------
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.gen.ts"),
  },
});
