//==============================================================================
// SITE FOOTER
//==============================================================================
// Brand column plus services / company / legal link groups.
//------------------------------------------------------------------------------

import Link from "next/link";
import { COMPANY_NAV, LEGAL_NAV, SITE } from "@/content/site";
import { getServices } from "@/lib/content";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/sections/newsletter-form";

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
export async function Footer() {
  const services = await getServices();

  return (
    <footer className="border-t border-border">
      <Container className="py-16">
        {/*--------------------------------------------------------------------
          NEWSLETTER ROW
        --------------------------------------------------------------------*/}
        <div className="flex flex-col gap-6 border-b border-border pb-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              The Ignitox newsletter
            </h2>
            <p className="mt-1 text-sm text-muted">
              One practical engineering email a month. No fluff, unsubscribe
              anytime.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
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
            links={services.map((service) => ({
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
        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono">Built with Next.js, Docker and Hetzner</p>
        </div>
      </Container>
    </footer>
  );
}
