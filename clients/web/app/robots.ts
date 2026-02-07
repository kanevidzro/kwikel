import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/api/", "/setting", "/projects"],
      },
    ],
    sitemap: "https://dugble.com/sitemap.xml",
  };
}
