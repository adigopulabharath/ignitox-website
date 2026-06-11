//==============================================================================
// CLASSNAME HELPER
//==============================================================================
// Tiny `clsx`-style join so we don't pull in a dependency for one line.
//------------------------------------------------------------------------------

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
