//==============================================================================
// TESTIMONIALS & CLIENT TRUST CONTENT
//==============================================================================
// PLACEHOLDER: every quote, name and client below is illustrative sample
// content. Replace with real testimonials (with written permission) and real
// client logos before launch.
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// TYPES
//------------------------------------------------------------------------------
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

//------------------------------------------------------------------------------
// TESTIMONIALS (PLACEHOLDER)
//------------------------------------------------------------------------------
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They migrated our whole platform to AWS over a quarter and our customers never noticed a thing. The bill went down, the pager went quiet, and we finally got our evenings back.",
    name: "Maria K.",
    role: "CTO",
    company: "Logistics platform",
  },
  {
    quote:
      "Our old site took eight seconds to load on a phone. The rebuild loads before you finish blinking, and our signup rate jumped within the first month.",
    name: "Daniel R.",
    role: "Head of Growth",
    company: "B2B SaaS",
  },
  {
    quote:
      "What sold us was the honesty. They talked us out of a bigger contract because we didn't need half of it. We've worked with them ever since.",
    name: "Priya S.",
    role: "Operations Director",
    company: "Retail group",
  },
];

//------------------------------------------------------------------------------
// CLIENT LOGO STRIP (PLACEHOLDER wordmarks, replace with real client SVGs)
//------------------------------------------------------------------------------
export const CLIENT_LOGOS = [
  "Contoso",
  "Northwind",
  "Fabrikam",
  "Litware",
  "Proseware",
  "Adventure Works",
] as const;
