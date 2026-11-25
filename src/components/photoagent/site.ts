export const LOCALES = ['en', 'zh', 'ja', 'ko', 'es', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export const SITE_URL = 'https://cv.paytonpei.top';
/** The page's own path on the cv site. Links are root-relative: there is no basePath. */
export const PAGE_PATH = '/photoagent';

export const ICON_SRC = '/photoagent/icon.webp';
export const OG_IMAGE = '/photoagent/og-image.jpg';

/** PhotoAgent on the App Store (bundle doge.PhotoAgent, Apple ID 6838622854). */
export const APP_STORE_URL = 'https://apps.apple.com/app/id6838622854';

/**
 * False until PhotoAgent is on sale. While false, every App Store button reads "Coming soon" and is not a link.
 * Flip this one flag to true on release day.
 */
export const APP_STORE_LIVE = false;

export const LIFEMINT_URL = '/lifemint';
export const DOGETHER_URL = '/dogether';
export const APPS_URL = '/apps';

/** The privacy policy and support pages on this site. Chinese readers land on their section (#zh). */
export function privacyUrl(lang: Locale) {
  return `/photoagent/privacy${lang === 'zh' ? '#zh' : ''}`;
}
export function supportUrl(lang: Locale) {
  return `/photoagent/support${lang === 'zh' ? '#zh' : ''}`;
}

export function pageUrl(lang: Locale) {
  return `${PAGE_PATH}/${lang}`;
}

export const HREFLANG: Record<Locale, string> = {
  en: 'en',
  zh: 'zh-CN',
  ja: 'ja',
  ko: 'ko',
  es: 'es',
  fr: 'fr',
};

const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  zh: 'zh_CN',
  ja: 'ja_JP',
  ko: 'ko_KR',
  es: 'es_ES',
  fr: 'fr_FR',
};

/** The language names in the switcher, each in its own language. */
export const LANGUAGE_NAMES: Record<Locale, string> = {
  en: 'English',
  zh: '简体中文',
  ja: '日本語',
  ko: '한국어',
  es: 'Español',
  fr: 'Français',
};

/** Canonical + hreflang alternates for each language's page. */
export function localeAlternates(lang: Locale) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[HREFLANG[l]] = pageUrl(l);
  languages['x-default'] = pageUrl('en');
  return { canonical: pageUrl(lang), languages };
}

export function ogLocale(lang: Locale) {
  return OG_LOCALE[lang];
}

/** Replaces {name} placeholders. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in values ? String(values[key]) : match));
}

/** The page language for a browser language tag such as "zh-Hans-CN" or "fr-CA"; English for anything else. */
export function pickLocale(tag: string | undefined): Locale {
  const lower = (tag || 'en').toLowerCase();
  return LOCALES.find((l) => lower.startsWith(l)) ?? 'en';
}
