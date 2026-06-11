<!-- =========================================================================
     IGNITOX WEBSITE — README
     ========================================================================= -->

# Ignitox Website

Marketing site for **Ignitox** — IT solutions: Cloud (AWS, Azure, GCP),
Website Hosting, Web Development and IT Consulting. Dark, Vercel-inspired
design; static-first Next.js; self-hosted on a Hetzner VPS for the price of
the server and a domain — everything else is free tier.

📋 **Read [PLAN.md](./PLAN.md) first** — architecture, security model and
roadmap. Conventions live in [AGENTS.md](./AGENTS.md).

## Stack

Next.js 16 (App Router, standalone output) · React 19 · TypeScript ·
Tailwind CSS v4 · Motion · next-themes (light/dark) · Zod · OpenAPI 3.1
(schema-first API) · Docker + nginx · GitHub Actions → GHCR → Hetzner ·
Cloudflare free tier in front.

Everything is content-driven: services and Insights posts live in
`src/content/` — adding an entry there generates the page and updates the
nav, mega menu, footer and sitemap automatically.

## Quick start

```bash
npm ci
cp .env.example .env.local   # optional — the form logs to stdout without keys
npm run dev                  # http://localhost:3000
```

## Content management (Payload CMS)

The admin panel lives at `/admin` on the same app (cookie auth, same origin,
no client secrets). Content is stored in SQLite at `./data/ignitox.db`,
which is a mounted volume in production. Back it up with a nightly file copy.

- First run: `npm run seed` imports the static content and creates the first
  admin user. Set `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` first, and
  change the password right after logging in.
- Services, posts, case studies, testimonials and site settings are all
  editable. Published changes reach the live site within five minutes.
- Pages read the CMS first and fall back to `src/content/` when the database
  is empty or unavailable, so CI builds never depend on a database.
- Set `PAYLOAD_SECRET` in production (`openssl rand -hex 32`).

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` / `npm run typecheck` | Quality gates (same as CI) |
| `npm run gen:api` | Regenerate API types from `openapi/openapi.yaml` |

## Environment variables

See [.env.example](./.env.example). Summary:

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | build | Canonical origin for metadata/sitemap |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | build | Turnstile widget (public) |
| `TURNSTILE_SECRET_KEY` | runtime | Server-side Turnstile verification |
| `RESEND_API_KEY` | runtime | Contact-form email delivery |
| `CONTACT_TO_EMAIL` / `CONTACT_FROM_EMAIL` | runtime | Inbox & verified sender |

## Deployment

The VPS never builds — CI builds the image, the server pulls and runs it:

1. **Once:** run `deploy/server-bootstrap.sh` on a fresh Ubuntu 24.04 server,
   then follow its printed next steps (Cloudflare Origin cert, `.env`,
   domain in nginx config).
2. **In GitHub:** set secrets `SSH_HOST`, `SSH_USER`, `SSH_PRIVATE_KEY`,
   `SSH_KNOWN_HOSTS`; set variables `DEPLOY_ENABLED=true`, `SITE_URL` and
   (recommended) `TURNSTILE_SITE_KEY`.
3. **Every push to `main`:** `.github/workflows/deploy.yml` builds → pushes
   to GHCR → SSH-deploys `deploy/` → `docker compose up -d` → health-checks.

Rollback: re-run the deploy with a previous image tag
(`IGNITOX_IMAGE_TAG=<old sha> docker compose up -d` on the server).

## Security

OWASP-aligned throughout — strict security headers (nginx), Turnstile +
honeypot + two-layer rate limiting on the API, strict Zod validation,
non-root containers, hardened VPS (key-only SSH, UFW, fail2ban), Dependabot
+ `npm audit` gating CI, weekly OWASP ZAP baseline scan. Details in
[PLAN.md §7](./PLAN.md).
