import type { Dictionary } from "./dictionaries/en";
import type { Locale } from "./site";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((module) => module.en),
  zh: () => import("./dictionaries/zh").then((module) => module.zh),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
