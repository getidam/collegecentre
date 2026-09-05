import { create } from "zustand";
import { persist } from "zustand/middleware";

type PrefsState = {
  college: string;
  hydrated: boolean;
  setCollege: (college: string) => void;
  setHydrated: () => void;
};

export const usePrefs = create<PrefsState>()(
  persist(
    (set) => ({
      college: "Anna University",
      hydrated: false,
      setCollege: (college) => set({ college }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "kosh-prefs",
      skipHydration: true,
      partialize: (s) => ({ college: s.college }),
    },
  ),
);
