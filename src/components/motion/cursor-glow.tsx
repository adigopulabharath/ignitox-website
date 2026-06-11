//==============================================================================
// CURSOR GLOW — INTERACTIVE CUSTOM CURSOR
//==============================================================================
// A flame ring + soft halo that trail the pointer with spring physics. The
// ring tightens onto links/buttons. Renders nothing on touch devices and for
// visitors who prefer reduced motion; the native cursor stays visible
// (accessibility: this is additive, never a replacement).
//------------------------------------------------------------------------------

"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

//------------------------------------------------------------------------------
// POINTER CAPABILITY — mouse-driven devices only, false during SSR
//------------------------------------------------------------------------------
function subscribePointerFine(callback: () => void) {
  const query = window.matchMedia("(pointer: fine)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

const usePointerFine = () =>
  useSyncExternalStore(
    subscribePointerFine,
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  );

export function CursorGlow() {
  const reduceMotion = useReducedMotion();
  const enabled = usePointerFine();
  const [active, setActive] = useState(false); // hovering an interactive element

  //----------------------------------------------------------------------------
  // POINTER TRACKING (springs give the trailing feel)
  //----------------------------------------------------------------------------
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 500, damping: 35 });
  const ringY = useSpring(y, { stiffness: 500, damping: 35 });
  const haloX = useSpring(x, { stiffness: 140, damping: 22 });
  const haloY = useSpring(y, { stiffness: 140, damping: 22 });

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const handleOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      setActive(Boolean(target?.closest("a, button, [role='button']")));
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [enabled, x, y]);

  if (!enabled || reduceMotion) return null;

  //----------------------------------------------------------------------------
  // RENDER — halo (slow) under ring (fast); both purely decorative
  //----------------------------------------------------------------------------
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <motion.div
        className="absolute size-36 rounded-full bg-flame/10 blur-2xl"
        style={{ x: haloX, y: haloY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="absolute size-5 rounded-full border border-flame/60"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: active ? 1.8 : 1, opacity: active ? 0.9 : 0.6 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
