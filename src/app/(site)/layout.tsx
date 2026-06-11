//==============================================================================
// ROOT LAYOUT
//==============================================================================
// Self-hosted Geist fonts, site-wide metadata defaults, Organization JSON-LD
// and the header/footer shell shared by every page.
//------------------------------------------------------------------------------

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/content/site";
import { getServices } from "@/lib/content";
import { ThemeProvider } from "@/components/theme-provider";
import { Header, type NavService } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { CursorGlow } from "@/components/motion/cursor-glow";
import { JsonLd } from "@/components/json-ld";

//------------------------------------------------------------------------------
// FONTS (self-hosted at build time — zero external font requests)
//------------------------------------------------------------------------------
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//------------------------------------------------------------------------------
// SITE-WIDE METADATA
//------------------------------------------------------------------------------
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | IT Solutions for Cloud, Hosting and Web Development`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    url: "./",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

//------------------------------------------------------------------------------
// ORGANIZATION JSON-LD
//------------------------------------------------------------------------------
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  email: SITE.email,
  logo: `${SITE.url}/icon.svg`,
};

//------------------------------------------------------------------------------
// LAYOUT
//------------------------------------------------------------------------------
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Mega menu + mobile nav data (client components can't query the CMS).
  const navServices: NavService[] = (await getServices()).map((service) => ({
    slug: service.slug,
    name: service.name,
    tagline: service.tagline,
    icon: service.icon,
  }));

  return (
    // suppressHydrationWarning: next-themes mutates the class on <html> before
    // hydration to apply the persisted theme.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-svh flex-col bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <JsonLd data={organizationJsonLd} />
          <CursorGlow />
          <Header services={navServices} />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
