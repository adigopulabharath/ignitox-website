//==============================================================================
// CONTAINER
//==============================================================================
// Standard page gutter: centered, max-width, responsive padding.
//------------------------------------------------------------------------------

import { cx } from "@/lib/cx";

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cx("mx-auto w-full max-w-6xl px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
