import { JsonLd } from "@/Schema/json-ld";
import { siteConfig } from "@/lib/site";

export function SiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/favicon.svg`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: "en",
      },
      {
        "@type": "WebApplication",
        "@id": `${siteConfig.url}/#app`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        applicationCategory: "ProductivityApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Private notes visible only to the owner",
          "JWT authentication",
          "Bcrypt password hashing",
          "Role-based access control for USER and ADMIN",
          "Admin user and note management",
        ],
        publisher: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };

  return <JsonLd id="site-schema" data={data} />;
}
