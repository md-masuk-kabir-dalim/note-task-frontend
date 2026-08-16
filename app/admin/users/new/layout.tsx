import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Add user",
  description: "Create a SecureNotes user and optionally assign an ADMIN role. Password is stored as a bcrypt hash.",
  path: "/admin/users/new",
});

export default function AddUserLayout({ children }: { children: React.ReactNode }) {
  return children;
}
