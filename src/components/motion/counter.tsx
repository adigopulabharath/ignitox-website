//==============================================================================
// COUNTER — ANIMATED NUMBER
//==============================================================================
// Counts from 0 to `value` the first time it scrolls into view, using a
// dependency-free requestAnimationFrame loop. Jumps straight to the final
// value when the visitor prefers reduced motion.
//------------------------------------------------------------------------------

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

type CounterProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
};

export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  durationMs = 1400,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);

  // Reduced motion renders the final value directly — no animation state.
  const displayed = reduceMotion ? value : current;

  //----------------------------------------------------------------------------
  // ANIMATION LOOP (setState only inside rAF callbacks, never synchronously)
  //----------------------------------------------------------------------------
  useEffect(() => {
    if (!inView || reduceMotion) return;

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCurrent(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, value, durationMs]);

  return (
    <span ref={ref}>
      {prefix}
      {displayed.toFixed(decimals)}
      {suffix}
    </span>
  );
}
