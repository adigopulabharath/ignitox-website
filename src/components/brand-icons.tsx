//==============================================================================
// BRAND ICONS
//==============================================================================
// Monochrome brand marks for the technology marquee and tooling chips. Most
// paths come from simple-icons (icon paths are CC0). AWS and Azure are no
// longer distributed by simple-icons, so those two are embedded from the
// devicon project (MIT) via brand-paths.gen.ts.
//------------------------------------------------------------------------------

import {
  siCloudflare,
  siDocker,
  siGithubactions,
  siGooglecloud,
  siKubernetes,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siTerraform,
} from "simple-icons";
import {
  AWS_BRAND,
  AZURE_BRAND,
  type BrandPath,
} from "@/components/brand-paths.gen";

//------------------------------------------------------------------------------
// REGISTRY (keys match the display names used in src/content)
//------------------------------------------------------------------------------
function fromSimpleIcon(icon: { path: string }): BrandPath {
  return { viewBox: "0 0 24 24", paths: [icon.path] };
}

export const BRAND_ICONS: Record<string, BrandPath> = {
  AWS: AWS_BRAND,
  "Microsoft Azure": AZURE_BRAND,
  "Google Cloud": fromSimpleIcon(siGooglecloud),
  Kubernetes: fromSimpleIcon(siKubernetes),
  Docker: fromSimpleIcon(siDocker),
  Terraform: fromSimpleIcon(siTerraform),
  "Next.js": fromSimpleIcon(siNextdotjs),
  React: fromSimpleIcon(siReact),
  "Node.js": fromSimpleIcon(siNodedotjs),
  PostgreSQL: fromSimpleIcon(siPostgresql),
  Cloudflare: fromSimpleIcon(siCloudflare),
  "GitHub Actions": fromSimpleIcon(siGithubactions),
};

//------------------------------------------------------------------------------
// COMPONENT
//------------------------------------------------------------------------------
type BrandIconProps = {
  name: string;
  className?: string;
};

export function BrandIcon({ name, className }: BrandIconProps) {
  const definition = BRAND_ICONS[name];
  if (!definition) return null;

  return (
    <svg
      viewBox={definition.viewBox}
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      {definition.paths.map((d) => (
        <path key={d.slice(0, 24)} d={d} />
      ))}
    </svg>
  );
}
