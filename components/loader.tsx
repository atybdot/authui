import { cn } from "@/lib/utils";
import { SpinnerIcon } from "@phosphor-icons/react";
import type React from "react";

export default function Loader({
  iconClassName,
  className,
  ...props
}: {
  iconClassName?: string;
  className?: string;
  props?: React.HTMLAttributes<HTMLDivElement>;
}) {
  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <SpinnerIcon className={cn("animate-spin", iconClassName)} />
    </div>
  );
}
