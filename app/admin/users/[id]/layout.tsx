import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Edit user",
  description: "Update a SecureNotes account name, email, role, or interests. Leave password blank to keep the current hash.",
});

export default function EditUserLayout({ children }: { children: React.ReactNode }) {
  return children;
}
