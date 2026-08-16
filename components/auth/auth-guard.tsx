"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import Loading from "@/components/share/loading";

export function AuthGuard({
  children,
  requireAdmin = false,
}: {
  children: React.ReactNode;
  requireAdmin?: boolean;
}) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (requireAdmin && !isAdmin) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isAdmin, loading, requireAdmin, router]);

  if (loading || !isAuthenticated || (requireAdmin && !isAdmin)) {
    return <Loading />;
  }

  return <>{children}</>;
}
