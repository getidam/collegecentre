import { RESOURCES } from "@/lib/data/notes";
import { OPENINGS } from "@/lib/data/openings";
import { DEADLINES } from "@/lib/data/deadlines";

export type SearchHit = {
  id: string;
  title: string;
  hint: string;
  to: string;
  group: "Pages" | "Notes" | "Jobs" | "Deadlines";
};

const PAGES: SearchHit[] = [
  { id: "p-home", title: "Home", hint: "Dashboard", to: "/", group: "Pages" },
  { id: "p-notes", title: "Notes & PYQs", hint: "Study material", to: "/notes", group: "Pages" },
  { id: "p-jobs", title: "Internships & jobs", hint: "Openings", to: "/jobs", group: "Pages" },
  { id: "p-alerts", title: "Scholarships & exams", hint: "Deadlines", to: "/alerts", group: "Pages" },
  { id: "p-plan", title: "Timetable & attendance", hint: "75% rule", to: "/planner", group: "Pages" },
  { id: "p-campus", title: "Campus board", hint: "Anonymous", to: "/campus", group: "Pages" },
];

export function searchCatalog(q: string): SearchHit[] {
  const query = q.trim().toLowerCase();
  const pool: SearchHit[] = [
    ...PAGES,
    ...RESOURCES.map((r) => ({
      id: `n-${r.id}`,
      title: r.title,
      hint: `${r.subject} · ${r.college}`,
      to: `/notes/${r.id}`,
      group: "Notes" as const,
    })),
    ...OPENINGS.map((o) => ({
      id: `j-${o.id}`,
      title: `${o.company} — ${o.title}`,
      hint: `${o.kind} · ${o.location}`,
      to: `/jobs?open=${o.id}`,
      group: "Jobs" as const,
    })),
    ...DEADLINES.map((d) => ({
      id: `d-${d.id}`,
      title: d.title,
      hint: d.org,
      to: "/alerts",
      group: "Deadlines" as const,
    })),
  ];
  if (!query) return PAGES;
  return pool
    .filter((h) => (h.title + " " + h.hint).toLowerCase().includes(query))
    .slice(0, 16);
}
