//==============================================================================
// JSON-LD STRUCTURED DATA
//==============================================================================
// Renders schema.org JSON-LD. `<` is escaped to prevent the payload from ever
// closing the script tag (XSS hardening for serialized JSON).
//------------------------------------------------------------------------------

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
