import type { Metadata } from "next";

export const siteConfig = {
  name: "SecureNotes",
  title: "SecureNotes — Private notes with role-based access",
  description:
    "Write private notes that only you can read. SecureNotes uses JWT authentication, hashed passwords, and admin role-based access control.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  locale: "en_US",
};

export const noIndex: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

export function pageMetadata({
  title,
  description,
  index = false,
  path,
}: {
  title: string;
  description: string;
  index?: boolean;
  path?: string;
}): Metadata {
  const url = path ? `${siteConfig.url}${path}` : undefined;
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    robots: index
      ? { index: true, follow: true }
      : noIndex,
    alternates: path ? { canonical: url } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
    },
  };
}
