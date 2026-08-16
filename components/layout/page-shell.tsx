import type { ReactNode } from "react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { cn } from "@/lib/utils";

export function PageShell({
  children,
  admin = false,
  className,
}: {
  children: ReactNode;
  admin?: boolean;
  className?: string;
}) {
  return (
    <AuthGuard requireAdmin={admin}>
      <div className={cn("space-y-6", className)}>{children}</div>
    </AuthGuard>
  );
}
