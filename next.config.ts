//==============================================================================
// NEXT.JS CONFIGURATION
//==============================================================================
// The production build is a self-contained Node server (`output: "standalone"`)
// consumed by the root Dockerfile. Full security headers (CSP, HSTS) are owned
// by the nginx reverse proxy in deploy/nginx; the baseline headers below exist
// so local dev behaves like production.
//------------------------------------------------------------------------------

import type { NextConfig } from "next";

//------------------------------------------------------------------------------
// BASELINE SECURITY HEADERS (NGINX IS THE SOURCE OF TRUTH IN PRODUCTION)
//------------------------------------------------------------------------------
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

//------------------------------------------------------------------------------
// CONFIGURATION
//------------------------------------------------------------------------------
const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
