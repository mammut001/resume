import type { Dictionary } from './dictionaries/en';
import type { Locale } from './site';

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en').then((module) => module.en),
  fr: () => import('./dictionaries/fr').then((module) => module.fr),
  zh: () => import('./dictionaries/zh').then((module) => module.zh),
  ja: () => import('./dictionaries/ja').then((module) => module.ja),
  ko: () => import('./dictionaries/ko').then((module) => module.ko),
  es: () => import('./dictionaries/es').then((module) => module.es),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
