//==============================================================================
// SITE-WIDE CONTENT & CONSTANTS
//==============================================================================
// Single source of truth for company info, navigation and homepage copy.
// Anything marked PLACEHOLDER must be replaced with real figures/details
// before launch.
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// COMPANY
//------------------------------------------------------------------------------
export const SITE = {
  name: "Ignitox",
  // Canonical origin — override per environment via NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ignitox.com",
  tagline: "IT solutions that ignite your business",
  description:
    "Ignitox delivers cloud solutions on AWS, Azure & GCP, managed website hosting, and high-performance web development — one accountable partner from first deploy to day-2 operations.",
  email: "hello@ignitox.com", // PLACEHOLDER — point at the real inbox before launch
} as const;

//------------------------------------------------------------------------------
// NAVIGATION
//------------------------------------------------------------------------------
export type NavLink = { label: string; href: string };

export const MAIN_NAV: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const COMPANY_NAV: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const LEGAL_NAV: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

//------------------------------------------------------------------------------
// HOMEPAGE — STATS BAND (PLACEHOLDER figures — update with real numbers)
//------------------------------------------------------------------------------
export type Stat = {
  /** Numeric stats animate with a counter; `display` renders verbatim. */
  value?: number;
  decimals?: number;
  suffix?: string;
  display?: string;
  label: string;
};

export const STATS: Stat[] = [
  { value: 99.9, decimals: 1, suffix: "%", label: "Uptime across managed infrastructure" },
  { value: 120, suffix: "+", label: "Projects shipped to production" },
  { value: 40, suffix: "+", label: "Businesses supported worldwide" },
  { display: "24/7", label: "Monitoring, response & support" },
];

//------------------------------------------------------------------------------
// HOMEPAGE — PROCESS STEPS
//------------------------------------------------------------------------------
export type ProcessStep = { number: string; title: string; description: string };

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "We audit your goals, current infrastructure and constraints, then agree on scope, timeline and a fixed, transparent budget.",
  },
  {
    number: "02",
    title: "Design & build",
    description:
      "Senior engineers design the architecture and build in short, reviewable iterations — you see working software every week.",
  },
  {
    number: "03",
    title: "Launch & manage",
    description:
      "We ship to production with monitoring, backups and runbooks in place — then keep it fast, patched and online, 24/7.",
  },
];

//------------------------------------------------------------------------------
// HOMEPAGE — TECHNOLOGY MARQUEE
//------------------------------------------------------------------------------
export const TECH_MARQUEE = [
  "AWS",
  "Microsoft Azure",
  "Google Cloud",
  "Kubernetes",
  "Docker",
  "Terraform",
  "Next.js",
  "React",
  "Node.js",
  "PostgreSQL",
  "Cloudflare",
  "GitHub Actions",
] as const;
