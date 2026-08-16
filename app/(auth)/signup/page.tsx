import type { Metadata } from "next";
import SignupPageClient from "@/components/auth/signup";
import { BreadcrumbSchema } from "@/Schema/breadcrumb-schema";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Create account",
  description:
    "Create a SecureNotes account to keep private notes. Public registration always creates a USER role, never an admin.",
  index: true,
  path: "/signup",
});

export default function SignupPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Create account", path: "/signup" },
        ]}
      />
      <SignupPageClient />
    </>
  );
}
