import type { LucideIcon } from "lucide-react";
import {
  FileText,
  LayoutGrid,
  Shield,
  StickyNote,
  Tags,
  UserRound,
  Users,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const workspaceNav: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/notes", label: "My Notes", icon: FileText },
  { href: "/profile", label: "Profile", icon: UserRound },
];

export const adminNav: NavItem[] = [
  { href: "/admin", label: "Overview", icon: Shield },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/notes", label: "All Notes", icon: StickyNote },
  { href: "/admin/interests", label: "Interests", icon: Tags },
];

export const isActivePath = (pathname: string, href: string) => {
  if (pathname === href) return true;
  if (href === "/dashboard" || href === "/admin") return false;
  return pathname.startsWith(href);
};

export const currentNavLabel = (pathname: string, includeAdmin = false) => {
  const items = includeAdmin ? [...workspaceNav, ...adminNav] : workspaceNav;
  const match = items
    .filter((item) => isActivePath(pathname, item.href) || pathname === item.href)
    .sort((a, b) => b.href.length - a.href.length)[0];

  if (pathname.startsWith("/notes/new")) return "New note";
  if (pathname.includes("/edit")) return "Edit";
  return match?.label ?? "Workspace";
};
