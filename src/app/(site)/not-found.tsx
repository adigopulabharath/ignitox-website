//==============================================================================
// PAGE: 404 NOT FOUND
//==============================================================================

import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-32 text-center md:py-44">
      <p className="font-mono text-sm text-flame">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tighter text-foreground md:text-5xl">
        This page burned out
      </h1>
      <p className="mt-4 max-w-md text-base text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
        Let&apos;s get you back on track.
      </p>
      <ButtonLink href="/" size="lg" className="mt-8">
        Back to home
      </ButtonLink>
    </Container>
  );
}
