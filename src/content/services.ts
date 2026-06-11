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
export type ServiceFaq = { question: string; answer: string };

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  icon: ServiceIconName;
  features: ServiceFeature[];
  technologies: string[];
  /** Concrete artifacts every engagement hands over. */
  deliverables: string[];
  faqs: ServiceFaq[];
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
    deliverables: [
      "Architecture diagrams & decision records",
      "Infrastructure-as-Code repository (Terraform)",
      "Migration runbook with rehearsed rollback",
      "Cost dashboard & monthly FinOps report",
      "On-call runbooks & monitoring setup",
    ],
    faqs: [
      {
        question: "How long does a typical cloud migration take?",
        answer:
          "Most small-to-mid migrations land in 2–8 weeks. We start with a one-week assessment that produces a fixed plan, timeline and budget — so you know the answer for your workload before committing.",
      },
      {
        question: "Which cloud should we choose — AWS, Azure or GCP?",
        answer:
          "We're vendor-neutral and certified across all three. The honest answer depends on your existing tooling, team skills, regional needs and pricing — the assessment ends with a recommendation and the numbers behind it.",
      },
      {
        question: "Can you work alongside our in-house team?",
        answer:
          "Yes — that's our favourite setup. We pair with your engineers, document everything as we go, and hand over ownership so you're never locked into us.",
      },
    ],
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
    deliverables: [
      "Full source code ownership in your repository",
      "Design system & reusable component library",
      "CI/CD pipeline with automated quality gates",
      "Analytics, SEO & Search Console setup",
      "Handover session & editing documentation",
    ],
    faqs: [
      {
        question: "How much does a website or web app cost?",
        answer:
          "After a short discovery call we quote a fixed price per scope — no hourly surprises. Marketing sites and complex web applications are very different animals, so we'd rather give you a real number than a misleading range.",
      },
      {
        question: "Can you rebuild or improve our existing site?",
        answer:
          "Absolutely. We audit what you have first — sometimes a performance and SEO overhaul beats a rebuild, and we'll tell you honestly which one you need.",
      },
      {
        question: "Will we be able to edit content ourselves?",
        answer:
          "Yes. Depending on your needs we wire up a headless CMS or a simple structured-content workflow, and train your team during handover.",
      },
    ],
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
    deliverables: [
      "99.9% uptime target with monitoring & alerting",
      "Automated daily backups with restore drills",
      "TLS, CDN and security headers configured",
      "Staging environment for safe releases",
      "Monthly health & performance report",
    ],
    faqs: [
      {
        question: "What does “managed” actually include?",
        answer:
          "Everything below your application code: provisioning, OS patching, TLS, backups, monitoring, incident response and capacity planning. You ship your site; we keep it online.",
      },
      {
        question: "Where is our site hosted?",
        answer:
          "On EU data centers by default (GDPR-friendly), with a global CDN in front so visitors everywhere get fast loads. Other regions are available on request.",
      },
      {
        question: "What happens if we outgrow our plan?",
        answer:
          "We scale you up with zero-downtime migrations — that's the point of managed hosting. You'll get a heads-up with options before limits ever bite.",
      },
    ],
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
    deliverables: [
      "Audit report with prioritized fix list",
      "CI/CD pipeline templates your team owns",
      "Observability dashboards & alert rules",
      "Architecture & process documentation",
      "Pairing sessions to transfer the knowledge",
    ],
    faqs: [
      {
        question: "Do you do one-off audits or only retainers?",
        answer:
          "Both. A one-off security or DevOps audit is a great low-risk way to start — many clients then keep a small monthly retainer for ongoing guidance.",
      },
      {
        question: "Do you work remotely or on-site?",
        answer:
          "Remote-first with full overlap on your core hours. On-site workshops can be arranged for kick-offs and team enablement weeks.",
      },
      {
        question: "Which tools do you standardize on?",
        answer:
          "Boring, proven ones: GitHub Actions, Terraform, Docker, Kubernetes where it's justified, Prometheus/Grafana for observability. We adapt to your stack rather than forcing ours.",
      },
    ],
  },
];

//------------------------------------------------------------------------------
// HELPERS
//------------------------------------------------------------------------------
export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
