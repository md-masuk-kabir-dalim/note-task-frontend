import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Users",
  description: "Create, update, and remove SecureNotes accounts. Admins can assign USER or ADMIN roles.",
  path: "/admin/users",
});

export default function AdminUsersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
