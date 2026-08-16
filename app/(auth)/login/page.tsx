import type { Metadata } from "next";
import LoginPageClient from "@/components/auth/login";
import { BreadcrumbSchema } from "@/Schema/breadcrumb-schema";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Sign in",
  description:
    "Sign in to SecureNotes to open notes that only you can read. Access is protected with JWT authentication.",
  index: true,
  path: "/login",
});

export default function LoginPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Sign in", path: "/login" },
        ]}
      />
      <LoginPageClient />
    </>
  );
}
