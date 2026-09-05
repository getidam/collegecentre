import { useEffect } from "react";
import { usePlanner } from "@/lib/stores/planner";
import { usePrefs } from "@/lib/stores/prefs";
import { useSaved } from "@/lib/stores/saved";

export function useHydrateStores() {
  useEffect(() => {
    const mark = () => {
      usePrefs.getState().setHydrated();
      useSaved.getState().setHydrated();
      usePlanner.getState().setHydrated();
    };
    void Promise.all([
      Promise.resolve(usePrefs.persist.rehydrate()),
      Promise.resolve(useSaved.persist.rehydrate()),
      Promise.resolve(usePlanner.persist.rehydrate()),
    ]).then(mark);
  }, []);
}
