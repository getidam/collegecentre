import { create } from "zustand";
import { persist } from "zustand/middleware";

export type JobStatus = "saved" | "applied" | "interview";

type SavedState = {
  notes: string[];
  jobs: Record<string, JobStatus>;
  checks: Record<string, string[]>;
  voted: number[];
  hydrated: boolean;
  toggleNote: (id: string) => void;
  setJob: (id: string, status: JobStatus | null) => void;
  toggleCheck: (resourceId: string, topic: string) => void;
  markVoted: (id: number) => void;
  setHydrated: () => void;
};

export const useSaved = create<SavedState>()(
  persist(
    (set, get) => ({
      notes: [],
      jobs: {},
      checks: {},
      voted: [],
      hydrated: false,
      toggleNote: (id) =>
        set({
          notes: get().notes.includes(id)
            ? get().notes.filter((x) => x !== id)
            : [...get().notes, id],
        }),
      setJob: (id, status) => {
        const next = { ...get().jobs };
        if (!status) delete next[id];
        else next[id] = status;
        set({ jobs: next });
      },
      toggleCheck: (resourceId, topic) => {
        const current = get().checks[resourceId] ?? [];
        const next = current.includes(topic)
          ? current.filter((t) => t !== topic)
          : [...current, topic];
        set({ checks: { ...get().checks, [resourceId]: next } });
      },
      markVoted: (id) => {
        if (get().voted.includes(id)) return;
        set({ voted: [...get().voted, id] });
      },
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "kosh-saved",
      skipHydration: true,
      partialize: (s) => ({
        notes: s.notes,
        jobs: s.jobs,
        checks: s.checks,
        voted: s.voted,
      }),
    },
  ),
);
