import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://authui.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://authui.dev/verify",
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.1,
    },
  ];
}
