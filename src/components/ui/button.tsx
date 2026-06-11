//==============================================================================
// BUTTONS
//==============================================================================
// Vercel-style pill buttons. `ButtonLink` for navigation, `Button` for form
// actions — both share the same variant/size styling.
//------------------------------------------------------------------------------

import Link from "next/link";
import { cx } from "@/lib/cx";

//------------------------------------------------------------------------------
// VARIANTS & SIZES
//------------------------------------------------------------------------------
type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-foreground text-background hover:bg-foreground/85",
  secondary:
    "border border-border text-foreground hover:border-foreground/30 hover:bg-surface-2",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-[15px]",
};

function classes(variant: Variant, size: Size, className?: string) {
  return cx(base, variants[variant], sizes[size], className);
}

//------------------------------------------------------------------------------
// LINK BUTTON
//------------------------------------------------------------------------------
type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={classes(variant, size, className)}>
      {children}
    </Link>
  );
}

//------------------------------------------------------------------------------
// ACTION BUTTON
//------------------------------------------------------------------------------
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cx(
        classes(variant, size, className),
        "disabled:cursor-not-allowed disabled:opacity-60",
      )}
    />
  );
}
