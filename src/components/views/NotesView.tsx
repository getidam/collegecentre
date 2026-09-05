import React, { useMemo, useState } from "react";
import { ResourceCard } from "@/components/cards";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";
import { COLLEGES, COURSES } from "@/lib/data/colleges";
import { KIND_LABEL, RESOURCES, type ResourceKind } from "@/lib/data/notes";
import { usePrefs } from "@/lib/stores/prefs";

const KINDS: Array<ResourceKind | "all"> = ["all", "notes", "pyq", "syllabus", "lab"];

export function NotesView() {
  const collegePref = usePrefs((s) => s.college);
  const [q, setQ] = useState("");
  const [college, setCollege] = useState("all");
  const [course, setCourse] = useState("all");
  const [kind, setKind] = useState<ResourceKind | "all">("all");

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return RESOURCES.filter((r) => {
      if (college !== "all" && r.college !== college) return false;
      if (course !== "all" && r.course !== course) return false;
      if (kind !== "all" && r.kind !== kind) return false;
      if (!query) return true;
      const hay = `${r.title} ${r.subject} ${r.college} ${r.tags.join(" ")}`.toLowerCase();
      return hay.includes(query);
    });
  }, [q, college, course, kind]);

  const campusCount = RESOURCES.filter((r) => r.college === collegePref).length;

  return (
    <div className="stagger-in flex flex-col gap-6">
      <header>
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Study material
        </p>
        <h1 className="mt-1 font-display text-4xl font-medium tracking-tight">
          Notes & PYQs
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Syllabus-mapped notes, previous-year papers, and lab records. {campusCount}{" "}
          items tagged {collegePref} — the rest still search.
        </p>
      </header>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search subject, college, tag…"
          aria-label="Search notes"
        />
        <SelectField value={college} onChange={(e) => setCollege(e.target.value)}>
          <option value="all">All campuses</option>
          {COLLEGES.filter((c) => c !== "Any campus").map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </SelectField>
        <SelectField value={course} onChange={(e) => setCourse(e.target.value)}>
          <option value="all">All courses</option>
          {COURSES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </SelectField>
        <SelectField
          value={kind}
          onChange={(e) => setKind(e.target.value as ResourceKind | "all")}
        >
          {KINDS.map((k) => (
            <option key={k} value={k}>
              {k === "all" ? "All types" : KIND_LABEL[k]}
            </option>
          ))}
        </SelectField>
      </div>

      {list.length === 0 ? (
        <p className="rounded-3xl bg-card px-5 py-12 text-center text-sm text-muted-foreground shadow-card">
          No material matches those filters. Clear a dropdown and try again.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {list.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      )}
    </div>
  );
}
