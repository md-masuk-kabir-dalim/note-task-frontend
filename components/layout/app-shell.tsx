"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { adminNav, currentNavLabel, workspaceNav } from "@/lib/navigation";
import { BrandMark } from "@/components/layout/brand-mark";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { UserAvatar } from "@/components/layout/user-avatar";
import { Button } from "@/components/ui/button";

const AUTH_ROUTES = ["/login", "/signup", "/otp", "/forgot-password"];

const isAuthRoute = (pathname: string) =>
  AUTH_ROUTES.some((route) => pathname.startsWith(route));

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (isAuthRoute(pathname)) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-dvh bg-background">
        <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6 sm:py-4">
          <Link href="/login" className="min-w-0">
            <BrandMark />
          </Link>
          <div className="flex shrink-0 items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/signup">Get started</Link>
            </Button>
          </div>
        </header>
        <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">{children}</main>
      </div>
    );
  }

  return (
    <div className="relative h-dvh overflow-hidden bg-[#140627]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_12%_-10%,rgba(167,139,250,0.28),transparent_42%),radial-gradient(700px_circle_at_100%_100%,rgba(59,29,115,0.55),transparent_46%)]"
        aria-hidden
      />
      <div className="relative flex h-dvh p-0 lg:p-3">
        <aside
          className={cn(
            "fixed z-40 flex flex-col border-white/10 bg-[#1a0b3a]/95 p-4 text-white backdrop-blur-xl transition-transform duration-300 lg:bg-white/6 lg:backdrop-blur-md",
            "inset-y-0 left-0 h-dvh w-[min(18.5rem,calc(100vw-2.5rem))] rounded-none border-r pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]",
            "lg:inset-y-3 lg:left-3 lg:h-[calc(100dvh-24px)] lg:w-[232px] lg:rounded-[22px] lg:border lg:pt-4 lg:pb-4",
            open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <div className="mb-6 flex items-center justify-between gap-2 px-2 lg:mb-7">
            <Link href="/dashboard" onClick={() => setOpen(false)}>
              <BrandMark inverted />
            </Link>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-xl text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>
          <div className="flex-1 space-y-6 overflow-y-auto overscroll-contain">
            <SidebarNav
              title="Workspace"
              items={workspaceNav}
              pathname={pathname}
              onNavigate={() => setOpen(false)}
            />
            {isAdmin ? (
              <SidebarNav
                title="Admin"
                items={adminNav}
                pathname={pathname}
                onNavigate={() => setOpen(false)}
              />
            ) : null}
          </div>
          <div className="rounded-2xl bg-white/8 p-2.5">
            <div className="flex items-center gap-2.5">
              <UserAvatar name={user?.name} size="sm" inverted />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-white">{user?.name}</p>
                <p className="truncate text-[11px] text-white/45">{user?.email}</p>
              </div>
              <button
                type="button"
                onClick={async () => {
                  await logout();
                  router.push("/login");
                }}
                className="flex size-10 items-center justify-center rounded-lg text-white/45 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Sign out"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          </div>
        </aside>

        {open ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-[2px] lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />
        ) : null}

        <div className="hidden w-[232px] shrink-0 lg:block" aria-hidden />
        <div className="ml-0 flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-none bg-[#fbfaff] shadow-none lg:ml-3 lg:rounded-[22px] lg:shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
          <header className="flex min-h-14 shrink-0 items-center justify-between gap-3 border-b border-violet-100/80 px-3 pt-[env(safe-area-inset-top)] sm:px-7 lg:h-14 lg:pt-0">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <button
                type="button"
                className="flex size-10 shrink-0 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </button>
              <p className="truncate text-sm font-medium text-foreground">
                {currentNavLabel(pathname, isAdmin)}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-[13px] font-medium leading-none">{user?.name}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{user?.role}</p>
              </div>
              <UserAvatar name={user?.name} />
            </div>
          </header>
          <main className="mx-auto w-full max-w-6xl flex-1 overflow-y-auto overscroll-contain px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-8 sm:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
