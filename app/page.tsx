import type { Metadata } from "next";
import { HomeRedirect } from "@/components/home-redirect";
import { BreadcrumbSchema } from "@/Schema/breadcrumb-schema";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }]} />
      <HomeRedirect />
    </>
  );
}
