<!-- =========================================================================
     IGNITOX WEBSITE — PROJECT PLAN
     =========================================================================
     Purpose : Master plan for building, securing, and shipping the Ignitox
               company website (IT solutions: Cloud, Hosting, Web Development).
     Budget  : Hetzner CX23 VPS + domain name. Everything else is free tier
               or open source.
     ========================================================================= -->

# Ignitox Website — Project Plan

Ignitox provides IT solutions: Cloud (AWS, Azure, GCP), Website Hosting, Web
Development, and related services. This document is the single source of truth
for **what** we build, **how** we build it, and **in what order**.

---

## 1. Goals & Constraints

| Item | Decision |
|---|---|
| Purpose | Marketing site that wins trust and generates leads (contact / quote requests) |
| Design bar | Vercel-grade: dark, minimal, fast, subtle animations, flawless typography |
| Devices | Friendly to **every** device — phones, tablets, laptops, TVs, kiosks, low-power IoT browsers. Mobile-first, lightweight, progressive enhancement |
| Paid budget | Hetzner CX23 (small shared-vCPU VPS) + one domain name. **Nothing else paid** |
| Everything else | Free tiers and well-maintained open source only |

---

## 2. Tech Stack

Only mainstream, actively maintained, vendor-backed technology — current
stable / LTS versions throughout.

| Layer | Choice | Maintained by | Why |
|---|---|---|---|
| Framework | **Next.js** (App Router, latest stable) | Vercel | The exact stack behind vercel.com's look and feel; static generation = fast + tiny attack surface |
| UI library | **React 19** | Meta | Industry standard |
| Language | **TypeScript** | Microsoft | Type safety end to end |
| Styling | **Tailwind CSS v4** | Tailwind Labs | Design-token driven, small CSS output |
| Animation | **Motion** (framer-motion) + CSS transitions | Motion | The standard React animation library; CSS-first where possible |
| Fonts | **Geist Sans / Geist Mono** (self-hosted via `next/font`) | Vercel (OFL licensed, free) | The Vercel aesthetic, zero external font requests |
| Icons | **Heroicons** or **Lucide** | Tailwind Labs / Lucide | Lightweight SVG icons |
| Validation | **Zod** | Zod (industry standard) | Runtime validation of all API input |
| Runtime | **Node.js LTS** | OpenJS Foundation | Supported LTS only |
| Containers | **Docker Engine + Compose v2** | Docker Inc. | Reproducible deploys on the VPS |
| Reverse proxy | **Nginx** (stable) | F5 | TLS termination, security headers, rate limiting, caching |
| Server OS | **Ubuntu 24.04 LTS** | Canonical | 5 years of security updates |
| Edge / DNS | **Cloudflare Free** | Cloudflare | Free CDN, DNS, DDoS protection, TLS, Turnstile, Web Analytics |
| CI/CD & registry | **GitHub Actions + GHCR** | GitHub/Microsoft | Free build, scan, and deploy pipeline |

**Content lives in the repo** (typed TS/MDX content files) — no database, no
CMS to host, patch, or secure. A blog via MDX can be added later with zero
infra change.

---

## 3. Architecture

```
                      ┌────────────────────────────────────────┐
                      │            CLOUDFLARE (free)           │
  Visitor ──HTTPS──▶  │  DNS · CDN cache · DDoS · WAF basics    │
                      │  TLS (edge) · Turnstile · Analytics     │
                      └────────────────┬───────────────────────┘
                                       │ HTTPS (Full strict,
                                       │ Cloudflare Origin cert)
                      ┌────────────────▼───────────────────────┐
                      │        HETZNER CX23 · Ubuntu LTS        │
                      │  UFW · fail2ban · unattended-upgrades   │
                      │ ┌────────────────────────────────────┐ │
                      │ │           Docker Compose           │ │
                      │ │  ┌─────────┐      ┌─────────────┐  │ │
                      │ │  │  nginx  │ ───▶ │  Next.js    │  │ │
                      │ │  │  proxy  │      │  (standalone│  │ │
                      │ │  │ 80/443  │      │   non-root) │  │ │
                      │ │  └─────────┘      └─────────────┘  │ │
                      │ └────────────────────────────────────┘ │
                      └────────────────────────────────────────┘

  GitHub repo ──▶ GitHub Actions (lint/test/audit/build)
              ──▶ image pushed to GHCR
              ──▶ SSH deploy: docker compose pull && up -d
```

Key principles:

- **Static-first.** Every marketing page is pre-rendered at build time. The
  only dynamic code path is the contact API. Fast everywhere, cheap to serve,
  minimal attack surface.
- **The VPS never builds.** GitHub Actions (free) builds the Docker image;
  the CX23 only pulls and runs it. Keeps RAM free and deploys reproducible.
- **The server is disposable.** Everything needed to rebuild it lives in the
  repo (`deploy/` scripts + compose + nginx config). No state worth backing
  up lives on the box — that's the free backup strategy.

---

## 4. API Development Pattern — OpenAPI First (mandatory)

Every API endpoint, starting with the contact form, follows **schema-first**
development:

1. **Define** the endpoint in `openapi/openapi.yaml` (OpenAPI 3.1) — the
   single source of truth for paths, request/response shapes, and errors.
2. **Lint** the schema in CI with Spectral.
3. **Generate** TypeScript types from it (`openapi-typescript`) into
   `src/lib/api/` — handlers and the frontend client both import these
   generated types, so code can never drift from the contract.
4. **Implement** the Next.js route handler against the generated types, with
   Zod validating every request at runtime.

First contract: `POST /api/contact` — name, email, service interest, message,
Turnstile token → `202 Accepted` | `400` | `429`.

Future endpoints (quote request, newsletter signup) follow the same pattern:
schema first, generate, then implement.

### API protection

There are no user accounts at launch, but **every endpoint ships protected**:

- Cloudflare **Turnstile** (free, privacy-friendly CAPTCHA) verified
  server-side on every submission.
- **Rate limiting** at two layers: nginx (`limit_req` per IP on `/api/`) and
  in-handler.
- **Honeypot field** + strict Zod validation + payload size caps.
- Same-origin only — no CORS opened.
- If an authenticated area (admin/CMS/client portal) is ever added: OIDC
  **Authorization Code + PKCE** behind a **BFF** that issues HttpOnly,
  SameSite cookies. **No client secrets, no tokens in browser storage.**

---

## 5. Design Direction (Vercel-inspired)

- **Theme:** near-black background (`#0a0a0a`), white/zinc text, one electric
  accent for Ignitox (e.g. flame orange→amber gradient — "ignite"), subtle
  radial glows and 1px borders (`white/10`).
- **Typography:** Geist Sans for UI, Geist Mono for technical accents
  (terminal snippets, stats). Large, tight-tracked headlines.
- **Layout:** generous whitespace, max-width container, bento-grid feature
  sections, sticky translucent header with backdrop blur.
- **Animations** (tasteful, never decorative-only):
  - Hero: staggered fade-up on load; animated gradient/grid background.
  - Scroll-reveal sections (`whileInView`, once).
  - Micro-interactions: button glows, card border highlights, animated
    counters for stats, marquee of cloud provider logos.
  - **`prefers-reduced-motion` always respected** — every animation has a
    static fallback.

### Every-device friendliness (the "IoT friendly" requirement)

- Mobile-first responsive layout, fluid `clamp()` typography, large touch
  targets, no hover-only interactions.
- Progressive enhancement: all content is server-rendered HTML — the site is
  fully readable with JavaScript disabled or on underpowered browsers.
- **Performance budget:** initial JS ≤ ~150 KB gzipped, LCP < 2.5 s on
  slow 4G, CLS ≈ 0, Lighthouse ≥ 95 on every page (enforced with Lighthouse
  CI in the pipeline).
- AVIF/WebP via `next/image`, self-hosted subset fonts, zero third-party
  scripts except (optional) Cloudflare analytics beacon.
- Accessibility: WCAG 2.2 AA — semantic HTML, focus states, contrast-checked
  dark palette, `eslint-plugin-jsx-a11y` in CI.

---

## 6. Site Map & Content

| Page | Content |
|---|---|
| `/` | Hero (value prop + CTA), services overview grid, "why Ignitox" (stats/process), cloud logos (AWS · Azure · GCP), testimonials placeholder, CTA banner |
| `/services/cloud-solutions` | AWS / Azure / GCP: migration, architecture, cost optimization, managed cloud |
| `/services/web-development` | Custom sites & apps, stack, process, portfolio placeholder |
| `/services/website-hosting` | Managed hosting plans, uptime, SSL, support |
| `/services/it-consulting` | (optional 4th pillar) DevOps, security, support |
| `/about` | Mission, story, team, values |
| `/contact` | Contact form (the API), email, location, response-time promise |
| `/privacy`, `/terms` | Legal (required since the form collects personal data) |
| Later | `/blog` (MDX), case studies, careers |

SEO from day one: Next.js Metadata API, OpenGraph images via `next/og`,
`sitemap.ts` + `robots.ts`, JSON-LD structured data (`Organization`,
`Service`, `BreadcrumbList`), canonical URLs, Google Search Console (free).

---

## 7. Security Plan (OWASP-aligned)

Mapped to the OWASP Top 10; verified before launch and continuously in CI.

| Area | Control |
|---|---|
| Transport | TLS 1.2+/1.3 only; Cloudflare **Full (strict)** with a free 15-year Origin CA cert on nginx (no renewal automation to break); HSTS with preload |
| Headers | CSP (strict, no `unsafe-inline` where possible), `X-Content-Type-Options`, `frame-ancestors 'none'`, `Referrer-Policy`, `Permissions-Policy` — set in nginx; target A+ on securityheaders.com / Mozilla Observatory |
| Injection | Zod validation on all input; React auto-escaping; no database at launch |
| Abuse | Turnstile + nginx & app-level rate limits + honeypot + body size limits |
| Components | Dependabot (weekly), `npm audit` gating CI, only mainstream supported deps, lockfile committed, GitHub Actions pinned to commit SHAs |
| Containers | Multi-stage Dockerfile, non-root `USER`, read-only root FS where possible, no secrets in images, memory limits, healthchecks, capped log sizes |
| VPS hardening | SSH key-only (passwords + root login disabled), UFW (22/80/443 only — optionally 80/443 restricted to Cloudflare IP ranges), fail2ban, unattended-upgrades, 2 GB swap |
| Secrets | Only in GitHub Actions secrets and a server-side `.env` (never committed); `.gitignore`d from day one; GitHub secret scanning on |
| DAST | **OWASP ZAP baseline scan** in CI (weekly + pre-launch) against the live site |
| Logging | Nginx + app logs to journald/docker with rotation; UptimeRobot (free) alerting |
| SSRF | Outbound calls only to fixed, allow-listed URLs (Turnstile verify, email API) |

---

## 8. Infrastructure & Deployment

### One-time setup (manual, ~1 hour)

1. **Domain → Cloudflare Free:** create account, point nameservers, enable
   proxy (orange cloud), SSL mode *Full (strict)*, issue Origin CA cert.
2. **Hetzner CX23:** Ubuntu 24.04 LTS, SSH key added at creation. Run
   `deploy/server-bootstrap.sh` (in repo): creates non-root deploy user,
   hardens SSH, UFW, fail2ban, unattended-upgrades, swap, installs Docker.
3. **GitHub:** add `SSH_HOST`, `SSH_USER`, `SSH_KEY` secrets for the deploy
   workflow; enable Dependabot + secret scanning.

### Continuous deployment (automatic)

- `ci.yml` — every PR/push: lint, typecheck, test, `npm audit`, Spectral
  (OpenAPI lint), build, Lighthouse CI.
- `deploy.yml` — on push to `main`: build multi-stage image → push to GHCR →
  SSH to VPS → sync `deploy/` → `docker compose pull && docker compose up -d`.
  Rollback = re-deploy the previous image tag (images are tagged by SHA).
- `zap.yml` — weekly OWASP ZAP baseline scan against production.

### Docker Compose (on the VPS)

- `proxy` — nginx: TLS termination, security headers, gzip, static asset
  caching, `/api/` rate limiting. Only container with published ports.
- `web` — Next.js standalone build, non-root, internal network only,
  `restart: unless-stopped`, mem limit, healthcheck.

---

## 9. Free-Tier Inventory (everything that costs €0)

| Need | Free solution |
|---|---|
| CDN, DNS, DDoS, edge TLS | Cloudflare Free |
| CAPTCHA | Cloudflare Turnstile |
| Analytics | Cloudflare Web Analytics (cookieless, GDPR-friendly) |
| CI/CD + container registry | GitHub Actions + GHCR |
| Dependency & secret scanning | Dependabot, GitHub secret scanning, `npm audit` |
| DAST | OWASP ZAP baseline (in Actions) |
| Transactional email (contact form) | Resend free tier (3k/month) — or Brevo (300/day) |
| Uptime monitoring | UptimeRobot free |
| SEO tooling | Google Search Console, Bing Webmaster |
| Origin TLS cert | Cloudflare Origin CA (15-year) — Let's Encrypt if we ever drop Cloudflare |
| Fonts/icons | Geist (OFL), Heroicons/Lucide (MIT/ISC) |

**Total recurring cost: the CX23 + domain renewal. Nothing else.**

---

## 10. Code Conventions — Mandatory Banner Comments

**Every file** gets a header banner, and **every logical section** within a
file gets a section banner — same width (line ends at column 79), text in
UPPERCASE, adapted to each language's comment syntax:

```yaml
#==============================================================================
# DOCKER COMPOSE CONFIGURATION
#==============================================================================

#------------------------------------------------------------------------------
# WEB APPLICATION SERVICE
#------------------------------------------------------------------------------
```

```ts
//==============================================================================
// SITE HEADER COMPONENT
//==============================================================================

//------------------------------------------------------------------------------
// NAVIGATION ITEMS
//------------------------------------------------------------------------------
```

```css
/*============================================================================*/
/* GLOBAL DESIGN TOKENS                                                       */
/*============================================================================*/
```

```html
<!-- =========================================================================
     PAGE: HOME
     ========================================================================= -->
```

Rules:

- `=` banner: file header (what the file is for) and top-level sections.
- `-` banner: sub-sections inside a top-level section.
- Applies to **all** files: TS/TSX, CSS, YAML, Dockerfile, nginx conf, shell
  scripts, workflows, MDX.
- The convention is documented in `CLAUDE.md` so all future (AI-assisted)
  work follows it automatically.

---

## 11. Planned Repository Layout

```
ignitox-website/
├── PLAN.md                      # This document
├── README.md                    # Quick start + project overview
├── CLAUDE.md                    # Conventions (banner comments, stack rules)
├── Dockerfile                   # Multi-stage, non-root production image
├── openapi/
│   └── openapi.yaml             # API contract — single source of truth
├── src/
│   ├── app/                     # App Router: pages, layouts, metadata, og
│   │   └── api/contact/route.ts # Implements the OpenAPI contract
│   ├── components/
│   │   ├── ui/                  # Primitives: Button, Container, Section…
│   │   ├── motion/              # Reveal, FadeIn, Stagger, Counter…
│   │   └── sections/            # Hero, ServicesGrid, CtaBanner, Footer…
│   ├── content/                 # Typed site content (services, nav, company)
│   ├── lib/                     # Generated API types, email client, utils
│   └── styles/                  # Tailwind theme / design tokens
├── public/                      # Static assets, favicons, logos
├── deploy/
│   ├── docker-compose.yml       # proxy + web
│   ├── nginx/                   # nginx.conf, security headers, rate limits
│   └── server-bootstrap.sh      # One-shot VPS hardening + Docker install
└── .github/
    ├── workflows/               # ci.yml, deploy.yml, zap.yml
    └── dependabot.yml
```

---

## 12. Roadmap

| Phase | Deliverable | Done when |
|---|---|---|
| **0 — Foundations** | Next.js + TS + Tailwind scaffold, banner conventions, `CLAUDE.md`, ESLint/Prettier, `ci.yml` running | CI green on a hello-world page |
| **1 — Design system** | Tokens (colors/type/spacing), dark theme, Header/Footer, motion primitives, UI primitives | Storybook-quality component page renders |
| **2 — Pages** | Home, 3–4 service pages, About, Contact (UI), Privacy/Terms — full content + animations | All pages responsive 320 px → 4K, reduced-motion verified |
| **3 — Contact API** | `openapi.yaml`, generated types, route handler, Turnstile, email delivery, rate limits | Form delivers email; abuse tests rejected (429/400) |
| **4 — Infra & launch** | Dockerfile, compose, nginx, bootstrap script, Cloudflare setup, `deploy.yml` | **Site live on the domain over HTTPS, auto-deploy on push to `main`** |
| **5 — Quality & SEO** | Lighthouse ≥ 95 everywhere, securityheaders.com A+, sitemap/JSON-LD/OG images, Search Console, analytics, UptimeRobot | Audits pass, ZAP baseline clean |
| **6 — Post-launch** | Blog (MDX), case studies, testimonials, careers | As business needs |

Phases 0–2 need nothing but the repo — **the server and domain aren't
blockers to start building.**

---

## 13. Where to Start — First Actions

**You (one-time, ~1 hour, can happen in parallel):**

1. Put the domain's DNS on Cloudflare Free.
2. Create the Hetzner CX23 with Ubuntu 24.04 LTS and your SSH public key.
3. Create a free Resend (or Brevo) account for contact-form email.

**In this repo (Phase 0, can start immediately):**

1. Scaffold Next.js (TypeScript, Tailwind, App Router, ESLint).
2. Add `CLAUDE.md` with the banner-comment convention and stack rules.
3. Set up `ci.yml` + Dependabot.
4. Build the design tokens and layout shell — then iterate page by page.

## 14. Open Decisions (recommendations included)

| Decision | Recommendation |
|---|---|
| Cloudflare in front of the VPS? | **Yes** — free CDN/DDoS/TLS/analytics; biggest free win available |
| Email provider for the form | **Resend** free tier (cleaner DX); Brevo if >100 emails/day ever needed |
| Repo visibility | **Public** if acceptable (unlocks free CodeQL + unlimited Actions minutes); private also works on the free plan |
| Brand accent color | Flame orange/amber gradient on near-black (plays on "Ignite") — to be validated with a moodboard in Phase 1 |
