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
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
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
    default: `${SITE.name} — IT Solutions for Cloud, Hosting & Web`,
    template: `%s · ${SITE.name}`,
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
  themeColor: "#0a0a0a",
  colorScheme: "dark",
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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-svh flex-col bg-background font-sans text-foreground antialiased">
        <JsonLd data={organizationJsonLd} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
