//==============================================================================
// SERVICES CONTENT
//==============================================================================
// Drives the homepage services grid, the /services/[slug] pages, footer
// navigation, the sitemap and the contact-form service selector.
//
// NOTE: slugs must stay in sync with the `service` enum in openapi/openapi.yaml
// (compile-time check lives in src/lib/contact-schema.ts).
//------------------------------------------------------------------------------

import type { ServiceIconName } from "@/components/icons";

//------------------------------------------------------------------------------
// TYPES
//------------------------------------------------------------------------------
export type ServiceFeature = { title: string; description: string };

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  icon: ServiceIconName;
  features: ServiceFeature[];
  technologies: string[];
};

//------------------------------------------------------------------------------
// SERVICE DEFINITIONS
//------------------------------------------------------------------------------
export const SERVICES: Service[] = [
  //--------------------------------------------------------------------------
  // CLOUD SOLUTIONS
  //--------------------------------------------------------------------------
  {
    slug: "cloud-solutions",
    name: "Cloud Solutions",
    tagline: "Build, migrate and scale on AWS, Azure & GCP",
    summary:
      "Architecture, migration and around-the-clock management across the three major clouds — engineered for performance, cost-efficiency and security.",
    icon: "cloud",
    features: [
      {
        title: "Cloud migration",
        description:
          "Zero-drama moves from on-prem or another provider, with rehearsed rollback plans and no surprise downtime.",
      },
      {
        title: "Architecture & landing zones",
        description:
          "Well-Architected foundations — accounts, networking, IAM and guardrails done right from day one.",
      },
      {
        title: "Cost optimization (FinOps)",
        description:
          "Rightsizing, reservations and usage audits that routinely cut cloud bills by double digits.",
      },
      {
        title: "Managed cloud operations",
        description:
          "Patching, monitoring, alerting and incident response handled for you, around the clock.",
      },
      {
        title: "Infrastructure as Code",
        description:
          "Terraform-first automation so every environment is versioned, reviewable and reproducible.",
      },
      {
        title: "Security & compliance",
        description:
          "Encryption everywhere, least-privilege access and audit trails aligned with industry baselines.",
      },
    ],
    technologies: ["AWS", "Azure", "Google Cloud", "Terraform", "Kubernetes", "Docker"],
  },

  //--------------------------------------------------------------------------
  // WEB DEVELOPMENT
  //--------------------------------------------------------------------------
  {
    slug: "web-development",
    name: "Web Development",
    tagline: "Fast, accessible web experiences that convert",
    summary:
      "Custom marketing sites, web applications and e-commerce built on modern frameworks — engineered for speed, SEO and accessibility.",
    icon: "code",
    features: [
      {
        title: "Custom websites & web apps",
        description:
          "React and Next.js applications designed around your brand and built to grow with your business.",
      },
      {
        title: "E-commerce",
        description:
          "Storefronts, payment integrations and order flows that stay fast under real-world traffic.",
      },
      {
        title: "APIs & integrations",
        description:
          "OpenAPI-first backends and clean integrations with the third-party systems you already use.",
      },
      {
        title: "Performance engineering",
        description:
          "Core Web Vitals in the green — image pipelines, caching and bundle budgets enforced in CI.",
      },
      {
        title: "Accessibility & SEO",
        description:
          "WCAG 2.2 AA practices, semantic markup and structured data baked in, not bolted on.",
      },
      {
        title: "Ongoing evolution",
        description:
          "Iterative roadmaps after launch — measure, learn and ship improvements every sprint.",
      },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
  },

  //--------------------------------------------------------------------------
  // WEBSITE HOSTING
  //--------------------------------------------------------------------------
  {
    slug: "website-hosting",
    name: "Website Hosting",
    tagline: "Managed hosting with 99.9% uptime — and humans on call",
    summary:
      "Fully managed hosting with TLS, CDN, backups, monitoring and updates handled for you — clear monthly pricing, no surprises.",
    icon: "server",
    features: [
      {
        title: "Managed infrastructure",
        description:
          "Provisioning, hardening, patching and tuning — your site runs on servers we treat as our own.",
      },
      {
        title: "Free SSL/TLS",
        description:
          "Automated certificate issuance and renewal — HTTPS everywhere, scored A+ on independent tests.",
      },
      {
        title: "Global CDN & caching",
        description:
          "Edge caching close to your visitors for fast loads on every continent and every device.",
      },
      {
        title: "Daily backups",
        description:
          "Automated daily backups with regular restore drills — because a backup you never test isn't one.",
      },
      {
        title: "Uptime monitoring",
        description:
          "24/7 monitoring with alerting and rapid response the moment anything looks unhealthy.",
      },
      {
        title: "Staging environments",
        description:
          "Test every change on an identical staging copy before it ever touches production.",
      },
    ],
    technologies: ["Linux", "Docker", "nginx", "Cloudflare", "Hetzner Cloud", "Let's Encrypt"],
  },

  //--------------------------------------------------------------------------
  // IT CONSULTING & DEVOPS
  //--------------------------------------------------------------------------
  {
    slug: "it-consulting",
    name: "IT Consulting & DevOps",
    tagline: "Senior engineering guidance, embedded in your team",
    summary:
      "From CI/CD pipelines to security reviews — pragmatic, vendor-neutral consulting that levels up how your team ships software.",
    icon: "bolt",
    features: [
      {
        title: "DevOps & CI/CD",
        description:
          "Build, test and deploy pipelines that turn releases from a ceremony into a non-event.",
      },
      {
        title: "Containers & orchestration",
        description:
          "Docker and Kubernetes done pragmatically — sized for your workload, not for a conference talk.",
      },
      {
        title: "Security reviews",
        description:
          "OWASP-aligned audits of your applications and infrastructure, with a prioritized fix list.",
      },
      {
        title: "Observability",
        description:
          "Metrics, logs, traces and SLOs that tell you about problems before your customers do.",
      },
      {
        title: "Cloud strategy",
        description:
          "Build-vs-buy decisions, vendor selection and migration roadmaps grounded in your numbers.",
      },
      {
        title: "Team enablement",
        description:
          "Pairing, reviews and documentation so the improvements stick after the engagement ends.",
      },
    ],
    technologies: ["GitHub Actions", "Kubernetes", "Terraform", "Prometheus", "Grafana"],
  },
];

//------------------------------------------------------------------------------
// HELPERS
//------------------------------------------------------------------------------
export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
