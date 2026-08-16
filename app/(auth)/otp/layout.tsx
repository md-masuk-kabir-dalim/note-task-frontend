import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Verify email",
  description: "Enter the one-time code sent to your email to finish signing in to SecureNotes.",
  path: "/otp",
});

export default function OtpLayout({ children }: { children: React.ReactNode }) {
  return children;
}
