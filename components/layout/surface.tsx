import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Surface({
  children,
  className,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-violet-100/90 bg-white shadow-[0_1px_2px_rgba(26,11,58,0.04),0_8px_24px_rgba(26,11,58,0.04)]",
        padded && "p-4 sm:p-5",
        className
      )}
    >
      {children}
    </div>
  );
}
