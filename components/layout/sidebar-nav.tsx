"use client";

import Link from "next/link";
import type { NavItem } from "@/lib/navigation";
import { isActivePath } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function SidebarNav({
  title,
  items,
  pathname,
  onNavigate,
}: {
  title: string;
  items: NavItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="space-y-1">
      <p className="px-3 pb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">
        {title}
      </p>
      {items.map((item) => {
        const Icon = item.icon;
        const active = isActivePath(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] text-white/60 transition-colors hover:bg-white/8 hover:text-white lg:min-h-0 lg:py-2 lg:text-[13px]",
              active && "bg-white/14 font-medium text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
            )}
          >
            <Icon className={cn("size-4", active && "text-violet-200")} />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
