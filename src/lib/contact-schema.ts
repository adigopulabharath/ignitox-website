//==============================================================================
// CONTACT REQUEST VALIDATION (Zod mirror of the OpenAPI contract)
//==============================================================================
// Runtime validation for POST /api/contact. The OpenAPI schema in
// openapi/openapi.yaml is the source of truth; the `satisfies` checks below
// make the TypeScript compiler fail if this file drifts from the generated
// types (so CI catches schema/validator mismatches).
//------------------------------------------------------------------------------

import { z } from "zod";
import type { components } from "@/lib/api/types.gen";

//------------------------------------------------------------------------------
// GENERATED CONTRACT TYPES
//------------------------------------------------------------------------------
export type ContactRequest = components["schemas"]["ContactRequest"];
export type ContactAccepted = components["schemas"]["ContactAccepted"];
export type ApiError = components["schemas"]["ApiError"];

//------------------------------------------------------------------------------
// SERVICE OPTIONS — must match the OpenAPI `service` enum (compile-checked)
//------------------------------------------------------------------------------
export const SERVICE_OPTIONS = [
  "cloud-solutions",
  "web-development",
  "website-hosting",
  "it-consulting",
  "general",
] as const satisfies readonly ContactRequest["service"][];

//------------------------------------------------------------------------------
// SCHEMA
//------------------------------------------------------------------------------
export const contactRequestSchema = z.strictObject({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(254),
  service: z.enum(SERVICE_OPTIONS),
  message: z.string().trim().min(10).max(2000),
  companyWebsite: z.string().max(0).optional(),
  turnstileToken: z.string().max(4096).optional(),
});

// Compile-time drift guard: the schema's output must satisfy the generated
// request type exactly.
const _contractCheck = (value: z.infer<typeof contactRequestSchema>) =>
  value satisfies ContactRequest;
void _contractCheck;
