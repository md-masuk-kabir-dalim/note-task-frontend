import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Admin",
  description: "Administer SecureNotes users, inspect notes, and review interest groupings.",
  path: "/admin",
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
