//==============================================================================
// NEWSLETTER REQUEST VALIDATION (Zod mirror of the OpenAPI contract)
//==============================================================================
// Runtime validation for POST /api/newsletter. openapi/openapi.yaml is the
// source of truth; the satisfies check keeps this file from drifting.
//------------------------------------------------------------------------------

import { z } from "zod";
import type { components } from "@/lib/api/types.gen";

//------------------------------------------------------------------------------
// GENERATED CONTRACT TYPES
//------------------------------------------------------------------------------
export type NewsletterRequest = components["schemas"]["NewsletterRequest"];
export type NewsletterAccepted = components["schemas"]["NewsletterAccepted"];

//------------------------------------------------------------------------------
// SCHEMA
//------------------------------------------------------------------------------
export const newsletterRequestSchema = z.strictObject({
  email: z.email().max(254),
  companyWebsite: z.string().max(0).optional(),
});

// Compile-time drift guard against the generated request type.
const _contractCheck = (value: z.infer<typeof newsletterRequestSchema>) =>
  value satisfies NewsletterRequest;
void _contractCheck;
