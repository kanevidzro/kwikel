import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dugble.com";
  const now = new Date();

  const staticPages = [
    "",
    "about",
    "brand",
    "resellers",
    "careers",
    "pricing",
    "contact",
    "sms-api",
    "otp",
    "email-api",
    "use-cases",
  ];

  return staticPages.map((path) => {
    const url = path ? `${baseUrl}/${path}` : baseUrl;

    return {
      url,
      lastModified: now,
    };
  });
}
