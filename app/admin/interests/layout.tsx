import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Users by interests",
  description: "See SecureNotes users grouped by interest from a single MongoDB aggregation pipeline.",
  path: "/admin/interests",
});

export default function InterestsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
