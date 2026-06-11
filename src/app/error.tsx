//==============================================================================
// GLOBAL ERROR BOUNDARY
//==============================================================================
// Friendly fallback for unexpected runtime errors, with a retry affordance.
// Must be a client component per the Next.js error-file convention.
//------------------------------------------------------------------------------

"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  //----------------------------------------------------------------------------
  // ERROR REPORTING (server logs carry the digest; nothing sensitive client-side)
  //----------------------------------------------------------------------------
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-col items-center py-32 text-center md:py-44">
      <p className="font-mono text-sm text-flame">500</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tighter text-foreground md:text-5xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-base text-muted">
        An unexpected error occurred. It has been logged — please try again.
      </p>
      <Button size="lg" className="mt-8" onClick={() => reset()}>
        Try again
      </Button>
    </Container>
  );
}
