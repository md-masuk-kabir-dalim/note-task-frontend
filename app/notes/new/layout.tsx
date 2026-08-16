import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "New note",
  description: "Write a new private note. Content is stored on your account and hidden from other users.",
  path: "/notes/new",
});

export default function NewNoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
