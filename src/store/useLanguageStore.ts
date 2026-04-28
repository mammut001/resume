import { create } from "zustand";

export type Lang = "english" | "french" | "chinese";

type LanguageState = {
  name: Lang;
  updateLang: (lang: Lang) => void;
};

export const useLanguageStore = create<LanguageState>()((set) => ({
  name: "english",
  updateLang: (lang: Lang) => set({ name: lang }),
}));
