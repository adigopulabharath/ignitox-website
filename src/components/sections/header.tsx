//==============================================================================
// SITE HEADER
//==============================================================================
// Sticky, backdrop-blurred header with desktop nav and an accessible mobile
// menu. Client component only because of the mobile-menu toggle state.
//------------------------------------------------------------------------------

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAV } from "@/content/site";
import { Logo } from "@/components/logo";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { cx } from "@/lib/cx";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const linkClasses = (href: string) =>
    cx(
      "transition-colors hover:text-foreground",
      pathname === href ? "text-foreground" : "text-muted",
    );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        {/*--------------------------------------------------------------------
          BRAND
        --------------------------------------------------------------------*/}
        <Link href="/" aria-label="Ignitox home" onClick={() => setOpen(false)}>
          <Logo gradientId="ignitox-flame-header" />
        </Link>

        {/*--------------------------------------------------------------------
          DESKTOP NAVIGATION
        --------------------------------------------------------------------*/}
        <nav aria-label="Main" className="hidden items-center gap-8 text-sm md:flex">
          {MAIN_NAV.map((item) => (
            <Link key={item.href} href={item.href} className={linkClasses(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <ButtonLink href="/contact" size="sm">
            Start a project
          </ButtonLink>
        </div>

        {/*--------------------------------------------------------------------
          MOBILE MENU TOGGLE
        --------------------------------------------------------------------*/}
        <button
          type="button"
          className="-mr-2 inline-flex size-10 items-center justify-center rounded-lg text-muted hover:text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>
      </Container>

      {/*----------------------------------------------------------------------
        MOBILE MENU PANEL
      ----------------------------------------------------------------------*/}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-background/95 backdrop-blur-md md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-base text-muted transition-colors hover:bg-white/5 hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink href="/contact" className="mt-3 w-full" size="lg">
              Start a project
            </ButtonLink>
          </Container>
        </div>
      )}
    </header>
  );
}
