//==============================================================================
// REVEAL — SCROLL-TRIGGERED FADE-UP
//==============================================================================
// Fades content up the first time it enters the viewport. Renders without any
// transform when the visitor prefers reduced motion.
//------------------------------------------------------------------------------

"use client";

import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

export function Reveal({ delay = 0, className, children }: RevealProps) {
  const reduceMotion = useReducedMotion();

  //----------------------------------------------------------------------------
  // STATIC FALLBACK (prefers-reduced-motion)
  //----------------------------------------------------------------------------
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  //----------------------------------------------------------------------------
  // ANIMATED VARIANT
  //----------------------------------------------------------------------------
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
