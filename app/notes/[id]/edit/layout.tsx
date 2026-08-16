import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Edit note",
  description: "Update a private note. Changes stay on your account and are never shared.",
});

export default function EditNoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
