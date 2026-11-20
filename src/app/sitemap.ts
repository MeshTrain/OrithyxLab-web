import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://orithyxlab.com",
      lastModified: new Date("2026-11-20"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
