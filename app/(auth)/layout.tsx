import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "Sign in or create a SecureNotes account to manage private notes.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
