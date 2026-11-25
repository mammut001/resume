export const LOCALES = ['en', 'fr', 'zh', 'ja', 'ko', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export const SITE_URL = 'https://cv.paytonpei.top';
/** The page's own path on the cv site. Links are root-relative: there is no basePath. */
export const PAGE_PATH = '/lifemint';

export const ICON_SRC = '/lifemint/lifemint-icon.webp';
export const OG_IMAGE = '/lifemint/og-image.jpg';

/** LifeMint on the App Store (Apple ID 6759029810). */
export const APP_STORE_ID = '6759029810';
export const APP_STORE_URL = 'https://apps.apple.com/us/app/focus-mint-focus-timer-study/id6759029810';

/** The site's source, now part of the cv repository. */
export const GITHUB_URL = 'https://github.com/mammut001/resume';

/** The privacy policy and support pages on this site. Chinese readers land on their section (#zh). */
export function privacyUrl(lang: Locale) {
  return `/lifemint/privacy${lang === 'zh' ? '#zh' : ''}`;
}
export function supportUrl(lang: Locale) {
  return `/lifemint/support${lang === 'zh' ? '#zh' : ''}`;
}

/** A language's page, or a page under it (subpath '' or '/changelog'). */
export function pageUrl(lang: Locale, subpath = '') {
  return `${PAGE_PATH}/${lang}${subpath}`;
}

export const HREFLANG: Record<Locale, string> = {
  en: 'en',
  fr: 'fr',
  zh: 'zh-CN',
  ja: 'ja',
  ko: 'ko',
  es: 'es',
};

/** App Store regional tags that share a marketing locale URL. */
export const HREFLANG_REGIONAL: Record<string, Locale> = {
  'en-CA': 'en',
  'fr-CA': 'fr',
  'es-MX': 'es',
};

const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  zh: 'zh_CN',
  ja: 'ja_JP',
  ko: 'ko_KR',
  es: 'es_MX',
};

/** The short labels in the language switcher. */
export const LANGUAGE_LABELS: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  es: 'Español',
};

/** Canonical + hreflang alternates for a path under each locale (e.g. '' or '/changelog'). */
export function localeAlternates(lang: Locale, subpath = '') {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[HREFLANG[l]] = pageUrl(l, subpath);
  for (const [tag, locale] of Object.entries(HREFLANG_REGIONAL)) {
    if (!languages[tag]) languages[tag] = pageUrl(locale, subpath);
  }
  languages['x-default'] = pageUrl('en', subpath);
  return { canonical: pageUrl(lang, subpath), languages };
}

export function ogLocale(lang: Locale) {
  return OG_LOCALE[lang];
}

/** The page language for a browser language tag such as "zh-Hans-CN" or "fr-CA"; English for anything else. */
export function pickLocale(tag: string | undefined): Locale {
  const lower = (tag || 'en').toLowerCase();
  return LOCALES.find((l) => lower.startsWith(l)) ?? 'en';
}
