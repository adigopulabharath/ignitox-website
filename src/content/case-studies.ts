//==============================================================================
// CASE STUDIES CONTENT
//==============================================================================
// Drives /case-studies, the detail pages, the homepage preview, search and
// the sitemap. PLACEHOLDER: these are illustrative, anonymized sample
// engagements. Replace with real, client-approved case studies before launch.
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// TYPES
//------------------------------------------------------------------------------
export type CaseStudyResult = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
  /** Paragraphs describing the starting situation. */
  challenge: string[];
  /** Paragraphs describing what we did. */
  solution: string[];
  /** Bullet list of concrete things delivered or changed. */
  outcomes: string[];
  /** Headline numbers for the results band. */
  results: CaseStudyResult[];
  stack: string[];
  quote?: { text: string; name: string; role: string };
  date: string;
};

//------------------------------------------------------------------------------
// CASE STUDIES (newest first)
//------------------------------------------------------------------------------
export const CASE_STUDIES: CaseStudy[] = [
  //--------------------------------------------------------------------------
  // CLOUD MIGRATION
  //--------------------------------------------------------------------------
  {
    slug: "logistics-cloud-migration",
    title: "Forty services moved to AWS with zero downtime",
    client: "European logistics provider",
    industry: "Logistics",
    summary:
      "A logistics company running on aging on-premise servers needed to move to the cloud without interrupting deliveries that run around the clock.",
    challenge: [
      "The company ran forty internal services on hardware in a single office server room. Deliveries depend on these systems day and night, so the business could not accept a maintenance window longer than a few minutes.",
      "Nobody on the team had deep cloud experience, and an earlier attempt with another vendor had stalled after three months of planning documents and no actual migration.",
    ],
    solution: [
      "We started by moving the two least critical services in the first week. That gave the team a working landing zone, a CI pipeline and real confidence instead of more slideware.",
      "From there we migrated in small weekly batches. Every service got an automated rollback path before it moved, and we rehearsed each cutover on a staging copy first. The team paired with us throughout, so by the final batch they were running migrations themselves.",
    ],
    outcomes: [
      "All forty services on AWS behind a single, audited landing zone",
      "Infrastructure rebuilt as Terraform code with peer review",
      "Cutovers rehearsed and rolled out with no customer-facing downtime",
      "Monthly infrastructure cost down by almost a third",
      "Internal team trained to own the platform going forward",
    ],
    results: [
      { value: "0", label: "Minutes of downtime during migration" },
      { value: "31%", label: "Lower monthly infrastructure cost" },
      { value: "12", label: "Weeks from kickoff to completion" },
    ],
    stack: ["AWS", "Terraform", "Docker", "Kubernetes", "GitHub Actions"],
    quote: {
      text: "They migrated our whole platform and our customers never noticed a thing. The bill went down and the pager went quiet.",
      name: "Maria K.",
      role: "CTO",
    },
    date: "2026-03-15",
  },

  //--------------------------------------------------------------------------
  // E-COMMERCE REBUILD
  //--------------------------------------------------------------------------
  {
    slug: "fashion-retail-replatform",
    title: "A storefront that loads in under a second",
    client: "Fashion retailer",
    industry: "Retail and e-commerce",
    summary:
      "A growing fashion brand was losing mobile shoppers to an eight second page load. We rebuilt the storefront for speed and the numbers followed.",
    challenge: [
      "The old storefront was built on a heavyweight theme stuffed with plugins. Pages took eight seconds on an average phone, search rankings were slipping, and paid traffic converted poorly because visitors left before the page finished loading.",
      "The team wanted a modern site but could not afford a long content freeze or a risky big-bang launch in the middle of the season.",
    ],
    solution: [
      "We rebuilt the storefront on Next.js with static rendering for catalog pages and a tested image pipeline. The new site shipped behind the old domain section by section, starting with the highest traffic landing pages.",
      "A performance budget went into the build pipeline on day one. If a change pushes a page over the budget, the build fails and the regression never reaches shoppers.",
    ],
    outcomes: [
      "Largest Contentful Paint down from 8.1s to 0.9s on mobile",
      "Checkout flow simplified from five steps to three",
      "Search rankings recovered within two months of launch",
      "Performance budget enforced automatically in CI",
      "Content team can publish without developer help",
    ],
    results: [
      { value: "0.9s", label: "Mobile page load, down from 8.1s" },
      { value: "+23%", label: "Conversion rate after relaunch" },
      { value: "97", label: "Lighthouse performance score" },
    ],
    stack: ["Next.js", "React", "Tailwind CSS", "Cloudflare", "Node.js"],
    quote: {
      text: "The rebuild loads before you finish blinking, and our signup rate jumped within the first month.",
      name: "Daniel R.",
      role: "Head of Growth",
    },
    date: "2026-01-20",
  },

  //--------------------------------------------------------------------------
  // MANAGED HOSTING
  //--------------------------------------------------------------------------
  {
    slug: "saas-managed-hosting",
    title: "A two person startup stopped doing ops",
    client: "B2B SaaS startup",
    industry: "Software",
    summary:
      "Two founders were spending their weekends patching servers instead of talking to customers. Our managed hosting took the whole burden off their plate.",
    challenge: [
      "The founders ran their product on servers they had set up themselves. It worked, but every security patch, certificate renewal and disk alert landed on the same two people who were also building the product and selling it.",
      "An expired TLS certificate took the app down on a Saturday and cost them their biggest trial customer. That was the week they called us.",
    ],
    solution: [
      "We moved the product onto our managed hosting in one weekend cutover that we rehearsed twice on staging first. Monitoring, automated backups with restore drills, TLS automation and on-call response all came as part of the package.",
      "The founders kept full access to everything. The difference is that the boring, critical work now happens on our schedule instead of stealing theirs.",
    ],
    outcomes: [
      "Production moved in one rehearsed weekend cutover",
      "Daily backups with monthly restore drills",
      "Certificate and patching automation in place",
      "24/7 monitoring with a human on call",
      "Founders' ops workload reduced to roughly zero",
    ],
    results: [
      { value: "99.98%", label: "Uptime since migration" },
      { value: "10h", label: "Founder hours per week given back" },
      { value: "0", label: "Missed renewals or patch incidents" },
    ],
    stack: ["Hetzner Cloud", "Docker", "nginx", "Cloudflare", "Linux"],
    quote: {
      text: "What sold us was the honesty. They talked us out of a bigger contract because we didn't need half of it.",
      name: "Priya S.",
      role: "Co-founder",
    },
    date: "2025-11-10",
  },
];

//------------------------------------------------------------------------------
// HELPERS
//------------------------------------------------------------------------------
export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
