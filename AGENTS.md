<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- =========================================================================
     IGNITOX WEBSITE — ENGINEERING CONVENTIONS
     ========================================================================= -->

# Ignitox Website — Engineering Conventions

## Banner comments (mandatory)

**Every file** starts with a header banner and **every logical section** gets
a section banner — `=` for file headers and top-level sections, `-` for
sub-sections, text in UPPERCASE, line ending at column 79. Adapt the comment
syntax per language:

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

**Exemptions:** pure-JSON files (`package.json`, lockfiles — JSON forbids
comments), binary assets, and generated files (`src/lib/api/types.gen.ts`
keeps its generator header; never edit it by hand).

## Stack rules

- Only mainstream, actively maintained, vendor-backed dependencies — current
  stable/LTS versions. Think hard before adding any new dependency.
- **APIs are OpenAPI-first:** edit `openapi/openapi.yaml`, run
  `npm run gen:api`, then implement handlers against the generated types.
  CI fails if the generated types drift from the schema.
- Validate **all** external input with Zod; never trust the client.
- Secrets live only in `.env*` files (gitignored) and GitHub Actions
  secrets — never in code, images or NEXT_PUBLIC_* variables.
- Every animation must respect `prefers-reduced-motion`.
- Site content lives in `src/content/` — components stay content-free.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server at http://localhost:3000 |
| `npm run build` | Production build (standalone output) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run gen:api` | Regenerate API types from the OpenAPI spec |

## Layout

- `src/app` — routes, layouts, API handlers, SEO files
- `src/components` — `ui/` primitives, `motion/` animation, `sections/` page blocks
- `src/content` — all copy/data (services, nav, stats)
- `src/lib` — validation, rate limiting, Turnstile, email, generated API types
- `openapi/` — API contract (source of truth)
- `deploy/` — docker-compose, nginx, server bootstrap (synced to the VPS)
- `PLAN.md` — the full project plan and roadmap
