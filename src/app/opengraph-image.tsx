//==============================================================================
// OPENGRAPH IMAGE (auto-linked for social sharing previews)
//==============================================================================
// Generated at build time with next/og. Inline styles only — Tailwind is not
// available inside ImageResponse.
//------------------------------------------------------------------------------

import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${SITE.name} — ${SITE.tagline}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          color: "#ededed",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            width: "120px",
            height: "10px",
            borderRadius: "999px",
            background: "linear-gradient(90deg, #f97316, #fbbf24)",
          }}
        />

        {/* Brand */}
        <div style={{ marginTop: "48px", fontSize: "92px", fontWeight: 700 }}>
          {SITE.name}
        </div>

        {/* Tagline */}
        <div style={{ marginTop: "20px", fontSize: "40px", color: "#a1a1aa" }}>
          {SITE.tagline}
        </div>

        {/* Footer line */}
        <div style={{ marginTop: "64px", fontSize: "26px", color: "#71717a" }}>
          Cloud · Hosting · Web Development
        </div>
      </div>
    ),
    { ...size },
  );
}
