//==============================================================================
// THEME TOGGLE
//==============================================================================
// Light/dark switch. Renders a neutral placeholder until mounted so the
// server-rendered HTML never disagrees with the client (hydration safety).
//------------------------------------------------------------------------------

"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/components/icons";

// Hydration detector: false on the server snapshot, true on the client.
const emptySubscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
    >
      {/* Icon is hidden until mounted to avoid a hydration mismatch. */}
      {mounted ? (
        isDark ? (
          <SunIcon className="size-4" />
        ) : (
          <MoonIcon className="size-4" />
        )
      ) : (
        <span className="size-4" />
      )}
    </button>
  );
}
