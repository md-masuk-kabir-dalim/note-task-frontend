import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Profile",
  description: "Update your SecureNotes name and interests, and publish posts that anyone can read.",
  path: "/profile",
});

export default function AccountShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
