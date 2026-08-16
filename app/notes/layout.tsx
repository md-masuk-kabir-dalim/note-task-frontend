import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "My notes",
  description: "Browse private notes that only your account can read, edit, or delete.",
  path: "/notes",
});

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
