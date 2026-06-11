//==============================================================================
// SECTION & SECTION HEADING
//==============================================================================
// Vertical rhythm wrapper plus the eyebrow/title/lead heading pattern used by
// every content section.
//------------------------------------------------------------------------------

import { Container } from "@/components/ui/container";
import { cx } from "@/lib/cx";

//------------------------------------------------------------------------------
// SECTION WRAPPER
//------------------------------------------------------------------------------
type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cx("py-20 md:py-28", className)}>
      <Container>{children}</Container>
    </section>
  );
}

//------------------------------------------------------------------------------
// SECTION HEADING
//------------------------------------------------------------------------------
type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cx(centered && "text-center", className)}>
      {eyebrow && (
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-flame">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {lead && (
        <p
          className={cx(
            "mt-4 max-w-2xl text-base text-muted md:text-lg",
            centered && "mx-auto",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
