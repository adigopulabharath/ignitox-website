//==============================================================================
// IGNITOX LOGO
//==============================================================================
// Wordmark with a gradient flame glyph. `gradientId` must be unique per
// instance on a page (SVG gradient defs are document-global).
//------------------------------------------------------------------------------

type LogoProps = {
  gradientId?: string;
  className?: string;
};

export function Logo({ gradientId = "ignitox-flame", className }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--flame)" />
            <stop offset="100%" stopColor="var(--ember)" />
          </linearGradient>
        </defs>
        <path
          fill={`url(#${gradientId})`}
          fillRule="evenodd"
          d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Zm-3.857 9.318A5.99 5.99 0 0 1 12.495 10.532 3.75 3.75 0 1 1 8.437 13.546a5.975 5.975 0 0 0 3.068.986Z"
        />
      </svg>
      <span className="text-lg font-semibold tracking-tight text-foreground">
        Ignitox
      </span>
    </span>
  );
}
