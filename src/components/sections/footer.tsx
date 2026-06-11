//==============================================================================
// SITE FOOTER
//==============================================================================
// Brand column plus services / company / legal link groups.
//------------------------------------------------------------------------------

import Link from "next/link";
import { COMPANY_NAV, LEGAL_NAV, SITE } from "@/content/site";
import { SERVICES } from "@/content/services";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui/container";

//------------------------------------------------------------------------------
// LINK GROUP
//------------------------------------------------------------------------------
type LinkGroupProps = {
  heading: string;
  links: Array<{ label: string; href: string }>;
};

function LinkGroup({ heading, links }: LinkGroupProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-foreground">{heading}</h3>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

//------------------------------------------------------------------------------
// FOOTER
//------------------------------------------------------------------------------
export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="Ignitox home" className="inline-block">
              <Logo gradientId="ignitox-flame-footer" />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted">{SITE.tagline}.</p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-4 inline-block text-sm text-muted transition-colors hover:text-foreground"
            >
              {SITE.email}
            </a>
          </div>

          {/* Link groups */}
          <LinkGroup
            heading="Services"
            links={SERVICES.map((service) => ({
              label: service.name,
              href: `/services/${service.slug}`,
            }))}
          />
          <LinkGroup heading="Company" links={COMPANY_NAV} />
          <LinkGroup heading="Legal" links={LEGAL_NAV} />
        </div>

        {/*--------------------------------------------------------------------
          BOTTOM BAR
        --------------------------------------------------------------------*/}
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono">Built on our own stack — Next.js · Docker · Hetzner</p>
        </div>
      </Container>
    </footer>
  );
}
