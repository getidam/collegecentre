import { create } from "zustand";
import { persist } from "zustand/middleware";

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export type Slot = {
  id: string;
  day: number;
  start: string;
  end: string;
  subject: string;
  room: string;
};

export type SubjectRow = {
  name: string;
  present: number;
  total: number;
};

type PlannerState = {
  slots: Slot[];
  subjects: SubjectRow[];
  required: number;
  hydrated: boolean;
  addSlot: (slot: Omit<Slot, "id">) => void;
  removeSlot: (id: string) => void;
  setSlot: (id: string, patch: Partial<Slot>) => void;
  mark: (subject: string, present: boolean) => void;
  undoMark: (subject: string) => void;
  setCounts: (name: string, present: number, total: number) => void;
  addSubject: (name: string) => void;
  removeSubject: (name: string) => void;
  setRequired: (n: number) => void;
  setHydrated: () => void;
};

const DEFAULT_SUBJECTS: SubjectRow[] = [
  { name: "Operating Systems", present: 28, total: 36 },
  { name: "DBMS", present: 24, total: 34 },
  { name: "Computer Networks", present: 30, total: 38 },
  { name: "Software Engineering", present: 18, total: 22 },
  { name: "Theory of Computation", present: 16, total: 28 },
  { name: "OS Lab", present: 10, total: 12 },
];

const DEFAULT_SLOTS: Slot[] = [
  { id: "s1", day: 0, start: "09:00", end: "10:00", subject: "Operating Systems", room: "CS-201" },
  { id: "s2", day: 0, start: "10:00", end: "11:00", subject: "DBMS", room: "CS-201" },
  { id: "s3", day: 0, start: "11:15", end: "12:15", subject: "Computer Networks", room: "CS-104" },
  { id: "s4", day: 0, start: "14:00", end: "16:00", subject: "OS Lab", room: "Lab-2" },
  { id: "s5", day: 1, start: "09:00", end: "10:00", subject: "Theory of Computation", room: "CS-210" },
  { id: "s6", day: 1, start: "10:00", end: "11:00", subject: "Operating Systems", room: "CS-201" },
  { id: "s7", day: 1, start: "11:15", end: "12:15", subject: "Software Engineering", room: "CS-118" },
  { id: "s8", day: 2, start: "09:00", end: "10:00", subject: "DBMS", room: "CS-201" },
  { id: "s9", day: 2, start: "10:00", end: "11:00", subject: "Computer Networks", room: "CS-104" },
  { id: "s10", day: 2, start: "14:00", end: "15:00", subject: "Theory of Computation", room: "CS-210" },
  { id: "s11", day: 3, start: "09:00", end: "10:00", subject: "Software Engineering", room: "CS-118" },
  { id: "s12", day: 3, start: "10:00", end: "11:00", subject: "Operating Systems", room: "CS-201" },
  { id: "s13", day: 3, start: "11:15", end: "13:15", subject: "OS Lab", room: "Lab-2" },
  { id: "s14", day: 4, start: "09:00", end: "10:00", subject: "Computer Networks", room: "CS-104" },
  { id: "s15", day: 4, start: "10:00", end: "11:00", subject: "DBMS", room: "CS-201" },
  { id: "s16", day: 4, start: "11:15", end: "12:15", subject: "Theory of Computation", room: "CS-210" },
  { id: "s17", day: 5, start: "09:00", end: "10:00", subject: "Software Engineering", room: "CS-118" },
  { id: "s18", day: 5, start: "10:00", end: "12:00", subject: "DBMS", room: "CS-201" },
];

export const usePlanner = create<PlannerState>()(
  persist(
    (set, get) => ({
      slots: DEFAULT_SLOTS,
      subjects: DEFAULT_SUBJECTS,
      required: 0.75,
      hydrated: false,
      addSlot: (slot) =>
        set({ slots: [...get().slots, { ...slot, id: crypto.randomUUID() }] }),
      removeSlot: (id) => set({ slots: get().slots.filter((s) => s.id !== id) }),
      setSlot: (id, patch) =>
        set({
          slots: get().slots.map((s) => (s.id === id ? { ...s, ...patch } : s)),
        }),
      mark: (subject, present) =>
        set({
          subjects: get().subjects.map((row) =>
            row.name === subject
              ? {
                  ...row,
                  present: row.present + (present ? 1 : 0),
                  total: row.total + 1,
                }
              : row,
          ),
        }),
      undoMark: (subject) =>
        set({
          subjects: get().subjects.map((row) =>
            row.name === subject && row.total > 0
              ? {
                  ...row,
                  present: Math.max(0, row.present - (row.present === row.total ? 1 : 0)),
                  total: row.total - 1,
                }
              : row,
          ),
        }),
      setCounts: (name, present, total) =>
        set({
          subjects: get().subjects.map((row) =>
            row.name === name
              ? { ...row, present: Math.max(0, present), total: Math.max(0, total) }
              : row,
          ),
        }),
      addSubject: (name) => {
        const trimmed = name.trim();
        if (!trimmed || get().subjects.some((s) => s.name === trimmed)) return;
        set({ subjects: [...get().subjects, { name: trimmed, present: 0, total: 0 }] });
      },
      removeSubject: (name) =>
        set({
          subjects: get().subjects.filter((s) => s.name !== name),
          slots: get().slots.filter((s) => s.subject !== name),
        }),
      setRequired: (n) => set({ required: Math.min(0.95, Math.max(0.5, n)) }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "kosh-planner",
      skipHydration: true,
      partialize: (s) => ({
        slots: s.slots,
        subjects: s.subjects,
        required: s.required,
      }),
    },
  ),
);

export function todayIndex(): number {
  const js = new Date().getDay(); // 0 Sun
  if (js === 0) return -1;
  return js - 1;
}

export function overallAttendance(subjects: SubjectRow[]): {
  present: number;
  total: number;
  pct: number;
} {
  const present = subjects.reduce((a, s) => a + s.present, 0);
  const total = subjects.reduce((a, s) => a + s.total, 0);
  return {
    present,
    total,
    pct: total === 0 ? 100 : (present / total) * 100,
  };
}
