//==============================================================================
// PAYLOAD ADMIN — REST API MOUNT (standard template)
//==============================================================================
// Serves Payload's REST API under /api/*. The site's own endpoints
// (/api/contact, /api/newsletter) are more specific routes and take priority.
//------------------------------------------------------------------------------

/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import config from "@payload-config";
import "@payloadcms/next/css";
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from "@payloadcms/next/routes";

export const GET = REST_GET(config);
export const POST = REST_POST(config);
export const DELETE = REST_DELETE(config);
export const PATCH = REST_PATCH(config);
export const PUT = REST_PUT(config);
export const OPTIONS = REST_OPTIONS(config);
