import React from "react";
import { Link, useRouter } from "@/lib/router";
import { ArrowLeft, Bookmark, BookmarkCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getResource, KIND_LABEL, RESOURCES } from "@/lib/data/notes";
import { useSaved } from "@/lib/stores/saved";

const EMPTY_CHECKS: string[] = [];

export function NoteDetailView({ id }: { id: string }) {
  const resource = getResource(id);
  const saved = useSaved((s) => s.notes.includes(id));
  const toggle = useSaved((s) => s.toggleNote);
  const checks = useSaved((s) => s.checks[id]);
  const toggleCheck = useSaved((s) => s.toggleCheck);
  const checkedTopics = checks ?? EMPTY_CHECKS;

  if (!resource) {
    return (
      <div className="py-16 text-center">
        <p className="font-display text-2xl">That note is not in the vault.</p>
        <Link
          to="/notes"
          className="mt-4 inline-flex h-11 items-center text-sm font-medium text-primary hover:underline"
        >
          Back to notes
        </Link>
      </div>
    );
  }

  const related = RESOURCES.filter(
    (r) => r.id !== id && (r.subject === resource.subject || r.college === resource.college),
  ).slice(0, 3);

  const topics = resource.units.flatMap((u) =>
    u.topics.map((t) => ({ unit: u.title, topic: t })),
  );
  const done = topics.filter((t) => checkedTopics.includes(t.topic)).length;

  return (
    <div className="stagger-in mx-auto flex max-w-3xl flex-col gap-8">
      <div>
        <Link
          to="/notes"
          className="inline-flex h-11 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          All notes
        </Link>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant="outline">{KIND_LABEL[resource.kind]}</Badge>
          <Badge variant="secondary">{resource.subject}</Badge>
          <span className="text-xs text-faint">
            Sem {resource.semester} · {resource.year} · {resource.pages} pages
          </span>
        </div>
        <h1 className="mt-3 font-display text-3xl font-medium tracking-tight md:text-4xl">
          {resource.title}
        </h1>
        <p className="mt-3 text-muted-foreground">{resource.summary}</p>
        <p className="mt-2 text-sm text-faint">
          {resource.college} · {resource.course}
        </p>
        <div className="mt-5">
          <Button
            type="button"
            variant={saved ? "secondary" : "default"}
            onClick={() => toggle(id)}
          >
            {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
            {saved ? "Saved in vault" : "Save for later"}
          </Button>
        </div>
      </div>

      {topics.length > 0 ? (
        <section className="rounded-3xl bg-card p-5 shadow-card">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-display text-xl font-medium tracking-tight">
              Revision checklist
            </h2>
            <span className="text-xs tabular-nums text-muted-foreground">
              {done}/{topics.length} completed
            </span>
          </div>
          <ul className="flex flex-col gap-1">
            {topics.map((t) => {
              const on = checkedTopics.includes(t.topic);
              return (
                <li key={`${t.unit}-${t.topic}`}>
                  <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-xl px-2 py-2 hover:bg-secondary transition-colors">
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => toggleCheck(id, t.topic)}
                      className="mt-1 size-4 rounded border-input accent-primary"
                    />
                    <span>
                      <span className="block text-sm font-medium">{t.topic}</span>
                      <span className="text-xs text-faint">{t.unit}</span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {resource.units.length > 0 ? (
        <section>
          <h2 className="font-display text-xl font-medium tracking-tight">Units & Syllabus Breakdown</h2>
          <Accordion type="multiple" className="mt-3 rounded-3xl bg-card px-5 shadow-card">
            {resource.units.map((unit, i) => (
              <AccordionItem key={unit.title} value={`u-${i}`}>
                <AccordionTrigger>{unit.title}</AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
                    {unit.topics.map((topic) => (
                      <li key={topic}>• {topic}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      ) : null}

      {resource.pyqs.length > 0 ? (
        <section>
          <h2 className="font-display text-xl font-medium tracking-tight">
            Previous-year questions (Solved)
          </h2>
          <ol className="mt-3 flex flex-col gap-3">
            {resource.pyqs.map((q) => (
              <li key={`${q.year}-${q.question}`} className="rounded-3xl bg-card p-4 shadow-card">
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {q.year} · {q.marks} marks
                </p>
                <p className="mt-2 text-sm leading-relaxed">{q.question}</p>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {resource.formulas.length > 0 ? (
        <section>
          <h2 className="font-display text-xl font-medium tracking-tight">Key Formulas & Rules</h2>
          <dl className="mt-3 grid gap-2">
            {resource.formulas.map((f) => (
              <div key={f.name} className="rounded-2xl bg-card px-4 py-3 shadow-card">
                <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  {f.name}
                </dt>
                <dd className="mt-1 font-mono text-sm font-semibold text-primary">{f.body}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section>
          <h2 className="font-display text-xl font-medium tracking-tight">Related Material</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  to={`/notes/${r.id}`}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-card px-4 py-3 shadow-card hover:shadow-card-hover transition-shadow"
                >
                  <span className="text-sm font-medium">{r.title}</span>
                  <Badge variant="outline">{KIND_LABEL[r.kind]}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
