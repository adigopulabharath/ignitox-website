//==============================================================================
// SPOTLIGHT CARD
//==============================================================================
// Card whose border-glow follows the cursor (radial gradient tracking the
// pointer via CSS variables). Pure hover styling — static and harmless for
// touch devices and reduced-motion users.
//------------------------------------------------------------------------------

"use client";

import { useRef } from "react";
import { cx } from "@/lib/cx";

type SpotlightCardProps = {
  className?: string;
  children: React.ReactNode;
};

export function SpotlightCard({ className, children }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  //----------------------------------------------------------------------------
  // POINTER → CSS VARIABLES (no re-render per mousemove)
  //----------------------------------------------------------------------------
  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    element.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cx("group relative overflow-hidden", className)}
    >
      {/* Spotlight overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--flame) 10%, transparent), transparent 70%)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
