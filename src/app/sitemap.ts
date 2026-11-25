import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import {
  HREFLANG,
  LOCALES,
  pageUrl,
} from "@/components/photoagent/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  const baseUrl = "https://cv.paytonpei.top";

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // The PhotoAgent page in each of its six languages, each listing the others as alternates.
  const photoAgentEntries: MetadataRoute.Sitemap = LOCALES.map((lang) => ({
    url: `${baseUrl}${pageUrl(lang)}`,
    lastModified: new Date("2026-11-25"),
    changeFrequency: "monthly",
    priority: 0.6,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [HREFLANG[l], `${baseUrl}${pageUrl(l)}`]),
      ),
    },
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kanjo/privacy`,
      lastModified: new Date("2026-11-09"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/apps`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...photoAgentEntries,
    {
      url: `${baseUrl}/photoagent/privacy`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/photoagent/support`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/lifemint/privacy`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/lifemint/support`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/dogether/privacy`,
      lastModified: new Date("2026-11-21"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/dogether/support`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...postEntries,
  ];
}
