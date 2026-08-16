import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "All notes",
  description: "Review every private note in SecureNotes. Regular users never see each other’s notes.",
  path: "/admin/notes",
});

export default function AdminNotesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
