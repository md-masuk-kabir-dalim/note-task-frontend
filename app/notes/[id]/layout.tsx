import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Note",
  description: "Read a private note. Only the owner can view this content.",
});

export default function NoteDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
