//==============================================================================
// POSTCSS CONFIGURATION
//==============================================================================
// Tailwind v4 runs as a single PostCSS plugin; theme config lives in
// src/app/globals.css (CSS-first — there is no tailwind.config file).
//------------------------------------------------------------------------------

const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
