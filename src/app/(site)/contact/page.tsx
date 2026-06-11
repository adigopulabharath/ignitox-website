//==============================================================================
// PAGE: CONTACT
//==============================================================================
// Contact details + the lead form (posts to /api/contact).
//------------------------------------------------------------------------------

import type { Metadata } from "next";
import { SITE } from "@/content/site";
import { SERVICE_OPTIONS } from "@/lib/contact-schema";
import { getServices } from "@/lib/content";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/sections/contact-form";
import { ClockIcon, MailIcon, MapPinIcon } from "@/components/icons";

//------------------------------------------------------------------------------
// METADATA
//------------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project, whether it's cloud, hosting or web development. We reply within one business day.",
};

//------------------------------------------------------------------------------
// CONTACT DETAILS
//------------------------------------------------------------------------------
const DETAILS = [
  {
    icon: MailIcon,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: ClockIcon,
    label: "Response time",
    value: "Within one business day",
  },
  {
    icon: MapPinIcon,
    label: "Location",
    value: "Remote-first, worldwide", // PLACEHOLDER — add a real office if any
  },
];

//------------------------------------------------------------------------------
// PAGE
//------------------------------------------------------------------------------
export default async function ContactPage() {
  // Only offer services the API contract actually accepts.
  const allowed = new Set<string>(SERVICE_OPTIONS);
  const services = (await getServices())
    .filter((service) => allowed.has(service.slug))
    .map((service) => ({ slug: service.slug, name: service.name }));

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[-260px] h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-flame/10 blur-[140px]"
      />
      <Container className="relative grid gap-12 pb-20 pt-20 md:pt-28 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        {/*--------------------------------------------------------------------
          INTRO & DETAILS
        --------------------------------------------------------------------*/}
        <div>
          <p className="animate-fade-up font-mono text-xs font-medium uppercase tracking-[0.2em] text-flame">
            Contact
          </p>
          <h1 className="animate-fade-up mt-4 text-4xl font-semibold tracking-tighter text-foreground [animation-delay:100ms] md:text-5xl">
            Let&apos;s build something
          </h1>
          <p className="animate-fade-up mt-5 max-w-md text-base text-muted [animation-delay:200ms]">
            Tell us about your project. A cloud migration, a new website,
            hosting that just works, or something you can&apos;t quite name
            yet. A senior engineer, not a sales script, will get back to you.
          </p>

          <dl className="animate-fade-up mt-10 space-y-6 [animation-delay:300ms]">
            {DETAILS.map((detail) => (
              <div key={detail.label} className="flex items-start gap-4">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-flame">
                  <detail.icon className="size-5" />
                </span>
                <div>
                  <dt className="text-sm text-muted">{detail.label}</dt>
                  <dd className="mt-0.5 text-sm font-medium text-foreground">
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="transition-colors hover:text-flame"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/*--------------------------------------------------------------------
          FORM
        --------------------------------------------------------------------*/}
        <div className="animate-fade-up [animation-delay:200ms]">
          <ContactForm services={services} />
        </div>
      </Container>
    </section>
  );
}
