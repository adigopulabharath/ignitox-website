//==============================================================================
// SERVICES CONTENT
//==============================================================================
// Drives the homepage services grid, the /services pages, footer navigation,
// the mega menu, search, the sitemap and the contact-form service selector.
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
    tagline: "Build, migrate and scale on AWS, Azure and Google Cloud",
    summary:
      "We design, migrate and run cloud platforms on the three major providers. The goal is simple: faster systems, lower bills and no surprises at 3 a.m.",
    icon: "cloud",
    features: [
      {
        title: "Cloud migration",
        description:
          "We move you from on-premise or another provider in small, rehearsed steps. Every cutover has a tested rollback plan before it happens.",
      },
      {
        title: "Architecture and landing zones",
        description:
          "Accounts, networking, identity and guardrails set up properly from day one, following each provider's own well-architected guidance.",
      },
      {
        title: "Cost optimization",
        description:
          "Rightsizing, reservations and usage audits. Most bills we review are carrying 20 to 40 percent of pure waste.",
      },
      {
        title: "Managed cloud operations",
        description:
          "Patching, monitoring, alerting and incident response handled for you, around the clock.",
      },
      {
        title: "Infrastructure as Code",
        description:
          "Everything built as Terraform code, so every environment is versioned, reviewable and reproducible.",
      },
      {
        title: "Security and compliance",
        description:
          "Encryption everywhere, least-privilege access and audit trails that hold up when someone asks questions.",
      },
    ],
    technologies: ["AWS", "Microsoft Azure", "Google Cloud", "Terraform", "Kubernetes", "Docker"],
    deliverables: [
      "Architecture diagrams and decision records",
      "Infrastructure-as-Code repository in Terraform",
      "Migration runbook with a rehearsed rollback plan",
      "Cost dashboard and a monthly savings report",
      "On-call runbooks and monitoring setup",
    ],
    faqs: [
      {
        question: "How long does a typical cloud migration take?",
        answer:
          "Most small and mid-sized migrations land somewhere between two and eight weeks. We start with a one-week assessment that produces a fixed plan, timeline and budget, so you know the real answer for your workload before committing to anything.",
      },
      {
        question: "Which cloud should we choose: AWS, Azure or Google Cloud?",
        answer:
          "We work across all three and don't take referral fees from any of them. The honest answer depends on your existing tooling, your team's skills, regional requirements and pricing. The assessment ends with a clear recommendation and the numbers behind it.",
      },
      {
        question: "Can you work alongside our in-house team?",
        answer:
          "Yes, and it's our favourite setup. We pair with your engineers, document everything as we go, and hand over ownership at the end. You should never feel locked into us.",
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
      "Custom marketing sites, web applications and online stores built on modern frameworks. Engineered for speed, search rankings and accessibility from the first commit.",
    icon: "code",
    features: [
      {
        title: "Custom websites and web apps",
        description:
          "React and Next.js applications designed around your brand and built to grow with your business.",
      },
      {
        title: "E-commerce",
        description:
          "Storefronts, payment integrations and order flows that stay fast under real-world traffic.",
      },
      {
        title: "APIs and integrations",
        description:
          "Schema-first backends and clean integrations with the third-party systems you already use.",
      },
      {
        title: "Performance engineering",
        description:
          "Image pipelines, caching and bundle budgets enforced in CI, so Core Web Vitals stay in the green after launch, not just on launch day.",
      },
      {
        title: "Accessibility and SEO",
        description:
          "Semantic markup, WCAG 2.2 practices and structured data built in from the start, not bolted on later.",
      },
      {
        title: "Ongoing improvement",
        description:
          "After launch we measure what visitors actually do and ship improvements in small, regular iterations.",
      },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    deliverables: [
      "Full source code ownership in your repository",
      "Design system and reusable component library",
      "CI/CD pipeline with automated quality gates",
      "Analytics, SEO and Search Console setup",
      "Handover session and editing documentation",
    ],
    faqs: [
      {
        question: "How much does a website or web app cost?",
        answer:
          "After a short discovery call we quote a fixed price for the agreed scope, with no hourly surprises. A marketing site and a complex web application are very different projects, so we'd rather give you a real number than a misleading range on a pricing page.",
      },
      {
        question: "Can you rebuild or improve our existing site?",
        answer:
          "Absolutely. We audit what you have first. Sometimes a performance and SEO overhaul beats a full rebuild, and we'll tell you honestly which one you actually need.",
      },
      {
        question: "Will we be able to edit content ourselves?",
        answer:
          "Yes. Depending on your needs we wire up a content management system or a simple structured-content workflow, and we train your team during handover.",
      },
    ],
  },

  //--------------------------------------------------------------------------
  // WEBSITE HOSTING
  //--------------------------------------------------------------------------
  {
    slug: "website-hosting",
    name: "Website Hosting",
    tagline: "Managed hosting with 99.9% uptime and humans on call",
    summary:
      "Fully managed hosting with TLS, CDN, backups, monitoring and updates handled for you. Clear monthly pricing and a real person answering when something looks off.",
    icon: "server",
    features: [
      {
        title: "Managed infrastructure",
        description:
          "Provisioning, hardening, patching and tuning. Your site runs on servers we treat as our own.",
      },
      {
        title: "Free SSL/TLS",
        description:
          "Automated certificate issuance and renewal, with HTTPS everywhere and top scores on independent security tests.",
      },
      {
        title: "Global CDN and caching",
        description:
          "Edge caching close to your visitors, so pages load fast on every continent and every device.",
      },
      {
        title: "Daily backups",
        description:
          "Automated daily backups with regular restore drills, because a backup you never test isn't really a backup.",
      },
      {
        title: "Uptime monitoring",
        description:
          "Around-the-clock monitoring with alerting and rapid response the moment anything looks unhealthy.",
      },
      {
        title: "Staging environments",
        description:
          "Test every change on an identical staging copy before it ever touches production.",
      },
    ],
    technologies: ["Linux", "Docker", "nginx", "Cloudflare", "Hetzner Cloud", "Let's Encrypt"],
    deliverables: [
      "99.9% uptime target with monitoring and alerting",
      "Automated daily backups with restore drills",
      "TLS, CDN and security headers configured",
      "Staging environment for safe releases",
      "Monthly health and performance report",
    ],
    faqs: [
      {
        question: "What does managed actually include?",
        answer:
          "Everything below your application code: provisioning, OS patching, TLS, backups, monitoring, incident response and capacity planning. You ship your site and we keep it online.",
      },
      {
        question: "Where is our site hosted?",
        answer:
          "On EU data centers by default, which keeps GDPR simple, with a global CDN in front so visitors everywhere get fast loads. Other regions are available on request.",
      },
      {
        question: "What happens if we outgrow our plan?",
        answer:
          "We scale you up with zero-downtime migrations. That's the point of managed hosting. You'll get a heads-up with options well before any limit starts to bite.",
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
      "From CI/CD pipelines to security reviews, we bring pragmatic, vendor-neutral consulting that levels up how your team ships software.",
    icon: "bolt",
    features: [
      {
        title: "DevOps and CI/CD",
        description:
          "Build, test and deploy pipelines that turn releases from a ceremony into a non-event.",
      },
      {
        title: "Containers and orchestration",
        description:
          "Docker and Kubernetes done pragmatically, sized for your workload rather than for a conference talk.",
      },
      {
        title: "Security reviews",
        description:
          "OWASP-aligned audits of your applications and infrastructure, with a prioritized fix list.",
      },
      {
        title: "Observability",
        description:
          "Metrics, logs, traces and service-level objectives that tell you about problems before your customers do.",
      },
      {
        title: "Cloud strategy",
        description:
          "Build-versus-buy decisions, vendor selection and migration roadmaps grounded in your numbers.",
      },
      {
        title: "Team enablement",
        description:
          "Pairing, reviews and documentation, so the improvements stick long after the engagement ends.",
      },
    ],
    technologies: ["GitHub Actions", "Kubernetes", "Terraform", "Prometheus", "Grafana"],
    deliverables: [
      "Audit report with a prioritized fix list",
      "CI/CD pipeline templates your team owns",
      "Observability dashboards and alert rules",
      "Architecture and process documentation",
      "Pairing sessions to transfer the knowledge",
    ],
    faqs: [
      {
        question: "Do you do one-off audits or only retainers?",
        answer:
          "Both. A one-off security or DevOps audit is a low-risk way to start. Many clients then keep a small monthly retainer for ongoing guidance, but that's always your call.",
      },
      {
        question: "Do you work remotely or on-site?",
        answer:
          "Remote-first with full overlap on your core hours. On-site workshops can be arranged for kickoffs and team enablement weeks.",
      },
      {
        question: "Which tools do you standardize on?",
        answer:
          "Boring, proven ones: GitHub Actions, Terraform, Docker, and Kubernetes where it's actually justified, with Prometheus and Grafana for observability. We adapt to your stack rather than forcing ours.",
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
