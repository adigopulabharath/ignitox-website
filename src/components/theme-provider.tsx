//==============================================================================
// THEME PROVIDER
//==============================================================================
// next-themes wrapper: light by default, class-based dark mode, preference
// persisted in localStorage. `disableTransitionOnChange` prevents a flash of
// mid-transition colors when switching.
//------------------------------------------------------------------------------

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
