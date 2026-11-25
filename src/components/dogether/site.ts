export const LOCALES = ["en", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export const SITE_URL = "https://cv.paytonpei.top";
/** The page's own path on the cv site. Links are root-relative: there is no basePath. */
export const PAGE_PATH = "/dogether";

export const ICON_SRC = "/dogether/apple-touch-icon.png";
/** The app icon doubles as the share card, as on the old site. */
export const OG_IMAGE = "/dogether/icon.png";

/** Dogether on the App Store (bundle dongpei.dogether, Apple ID 6804425374). */
export const APP_STORE_URL = "https://apps.apple.com/app/id6804425374";
export const APP_STORE_ID = "6804425374";

export const PARLEMIAO_URL = "https://french.paytonpei.top/";
export const APPS_URL = "/apps";

/** The privacy policy and support pages on this site. Chinese readers land on their section (#zh). */
export function privacyUrl(lang: Locale) {
  return `/dogether/privacy${lang === "zh" ? "#zh" : ""}`;
}
export function supportUrl(lang: Locale) {
  return `/dogether/support${lang === "zh" ? "#zh" : ""}`;
}

export function pageUrl(lang: Locale) {
  return `${PAGE_PATH}/${lang}`;
}

export const HREFLANG: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
};

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  zh: "zh_CN",
};

/** The language names in the switcher, each in its own language. */
export const LANGUAGE_NAMES: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
};

/** Canonical + hreflang alternates for each language's page. */
export function localeAlternates(lang: Locale) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[HREFLANG[l]] = pageUrl(l);
  languages["x-default"] = pageUrl("en");
  return { canonical: pageUrl(lang), languages };
}

export function ogLocale(lang: Locale) {
  return OG_LOCALE[lang];
}

/** The page language for a browser language tag such as "zh-Hans-CN"; English for anything else. */
export function pickLocale(tag: string | undefined): Locale {
  const lower = (tag || "en").toLowerCase();
  return LOCALES.find((l) => lower.startsWith(l)) ?? "en";
}
