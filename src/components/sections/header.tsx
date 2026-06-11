//==============================================================================
// SITE HEADER — STICKY NAV WITH SERVICES MEGA MENU
//==============================================================================
// Desktop: a full-width mega panel for Services (composed from the services
// content) plus direct links; opens on hover or click, closes on Escape,
// mouse-leave, link click or route change. Mobile: slide-down menu with a
// grouped services list. Theme toggle lives in the header on all sizes.
//------------------------------------------------------------------------------

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { MAIN_NAV } from "@/content/site";
import type { ServiceIconName } from "@/components/icons";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandSearch } from "@/components/search/command-palette";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  CloseIcon,
  MenuIcon,
  SERVICE_ICONS,
} from "@/components/icons";
import { cx } from "@/lib/cx";

//------------------------------------------------------------------------------
// PROPS (services come from the CMS via the root layout)
//------------------------------------------------------------------------------
export type NavService = {
  slug: string;
  name: string;
  tagline: string;
  icon: ServiceIconName;
};

export function Header({ services }: { services: NavService[] }) {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  //----------------------------------------------------------------------------
  // CLOSE EVERYTHING ON NAVIGATION & ON ESCAPE
  //----------------------------------------------------------------------------
  // Render-time state adjustment (not an effect) — closes both menus the
  // moment the route changes.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  const linkClasses = (href: string) =>
    cx(
      "transition-colors hover:text-foreground",
      isActive(href) ? "text-foreground" : "text-muted",
    );

  return (
    <header
      className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md"
      onMouseLeave={() => setMegaOpen(false)}
    >
      <Container className="flex h-16 items-center justify-between">
        {/*--------------------------------------------------------------------
          BRAND
        --------------------------------------------------------------------*/}
        <Link href="/" aria-label="Ignitox home">
          <Logo gradientId="ignitox-flame-header" />
        </Link>

        {/*--------------------------------------------------------------------
          DESKTOP NAVIGATION
        --------------------------------------------------------------------*/}
        <nav aria-label="Main" className="hidden items-center gap-7 text-sm md:flex">
          {/* Services — mega menu trigger */}
          <button
            type="button"
            aria-expanded={megaOpen}
            aria-controls="mega-services"
            onMouseEnter={() => setMegaOpen(true)}
            onClick={() => setMegaOpen((value) => !value)}
            className={cx(
              "inline-flex items-center gap-1.5 transition-colors hover:text-foreground",
              megaOpen || isActive("/services") ? "text-foreground" : "text-muted",
            )}
          >
            Services
            <ChevronDownIcon
              className={cx("size-3.5 transition-transform duration-200", megaOpen && "rotate-180")}
            />
          </button>

          {/* Direct links */}
          {MAIN_NAV.map((item) => (
            <Link key={item.href} href={item.href} className={linkClasses(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/*--------------------------------------------------------------------
          ACTIONS — theme toggle (all sizes), CTA (desktop), burger (mobile)
        --------------------------------------------------------------------*/}
        <div className="flex items-center gap-2.5">
          <CommandSearch />
          <ThemeToggle />
          <div className="hidden md:block">
            <ButtonLink href="/contact" size="sm">
              Start a project
            </ButtonLink>
          </div>
          <button
            type="button"
            className="-mr-2 inline-flex size-10 items-center justify-center rounded-lg text-muted hover:text-foreground md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </Container>

      {/*----------------------------------------------------------------------
        MEGA MENU PANEL (desktop) — services grid + featured CTA column
      ----------------------------------------------------------------------*/}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            id="mega-services"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute inset-x-0 top-full hidden border-b border-border bg-background/95 shadow-xl shadow-black/5 backdrop-blur-xl md:block"
          >
            <Container className="grid grid-cols-[2fr_1fr] gap-8 py-8">
              {/* Service links */}
              <div className="grid grid-cols-2 gap-2">
                {services.map((service) => {
                  const IconComponent = SERVICE_ICONS[service.icon];
                  return (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onClick={() => setMegaOpen(false)}
                      className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-surface-2"
                    >
                      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-flame/30 bg-gradient-to-br from-flame/15 to-ember/10 text-flame transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                        <IconComponent className="size-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-foreground">
                          {service.name}
                        </span>
                        <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted">
                          {service.tagline}
                        </span>
                      </span>
                    </Link>
                  );
                })}
                <Link
                  href="/services"
                  onClick={() => setMegaOpen(false)}
                  className="group col-span-2 mt-1 inline-flex items-center gap-1.5 px-4 text-sm font-medium text-flame"
                >
                  View all services
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Featured column */}
              <div className="flex flex-col rounded-xl border border-border bg-surface-2 p-5">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-flame">
                  Get started
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Not sure where to start? Get a free 30-minute architecture
                  review with a senior engineer. No sales script.
                </p>
                <Link
                  href="/contact"
                  onClick={() => setMegaOpen(false)}
                  className="group mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-foreground"
                >
                  Talk to an engineer
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/*----------------------------------------------------------------------
        MOBILE MENU PANEL
      ----------------------------------------------------------------------*/}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background/95 backdrop-blur-md md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {/* Services group */}
            <p className="px-3 pb-1 pt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted/70">
              Services
            </p>
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="rounded-lg px-3 py-2.5 text-base text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                {service.name}
              </Link>
            ))}
            <Link
              href="/services"
              className="rounded-lg px-3 py-2.5 text-base font-medium text-flame"
            >
              View all services
            </Link>

            {/* Direct links */}
            <div className="mt-2 border-t border-border pt-2">
              {MAIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2.5 text-base text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <ButtonLink href="/contact" className="mt-3 w-full" size="lg">
              Start a project
            </ButtonLink>
          </Container>
        </div>
      )}
    </header>
  );
}
