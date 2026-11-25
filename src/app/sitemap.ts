import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import {
  HREFLANG,
  LOCALES,
  pageUrl,
} from "@/components/photoagent/site";
import {
  HREFLANG as DOGETHER_HREFLANG,
  LOCALES as DOGETHER_LOCALES,
  pageUrl as dogetherPageUrl,
} from "@/components/dogether/site";
import {
  HREFLANG as LIFEMINT_HREFLANG,
  LOCALES as LIFEMINT_LOCALES,
  pageUrl as lifemintPageUrl,
} from "@/components/lifemint/site";

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

  // The Dogether page in English and Chinese.
  const dogetherEntries: MetadataRoute.Sitemap = DOGETHER_LOCALES.map((lang) => ({
    url: `${baseUrl}${dogetherPageUrl(lang)}`,
    lastModified: new Date("2026-11-25"),
    changeFrequency: "monthly",
    priority: 0.6,
    alternates: {
      languages: Object.fromEntries(
        DOGETHER_LOCALES.map((l) => [DOGETHER_HREFLANG[l], `${baseUrl}${dogetherPageUrl(l)}`]),
      ),
    },
  }));

  // The LifeMint page and its changelog in each of its six languages.
  const lifemintEntries: MetadataRoute.Sitemap = (
    [
      { subpath: "", priority: 0.6 },
      { subpath: "/changelog", priority: 0.4 },
    ] as const
  ).flatMap(({ subpath, priority }) =>
    LIFEMINT_LOCALES.map((lang) => ({
      url: `${baseUrl}${lifemintPageUrl(lang, subpath)}`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(
          LIFEMINT_LOCALES.map((l) => [LIFEMINT_HREFLANG[l], `${baseUrl}${lifemintPageUrl(l, subpath)}`]),
        ),
      },
    })),
  );

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
    ...lifemintEntries,
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
    ...dogetherEntries,
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
