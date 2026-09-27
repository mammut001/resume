import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Lang = "english" | "french" | "chinese";

type LanguageState = {
  name: Lang;
  updateLang: (lang: Lang) => void;
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      name: "english",
      updateLang: (lang: Lang) => set({ name: lang }),
    }),
    {
      name: "resume-language",
      storage: createJSONStorage(() => localStorage),
      // Rehydrated on the client after mount so server and client markup match.
      skipHydration: true,
    },
  ),
);
