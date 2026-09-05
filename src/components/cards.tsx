import React from "react";
import { Link } from "@/lib/router";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KIND_LABEL, type Resource } from "@/lib/data/notes";
import type { Opening } from "@/lib/data/openings";
import type { Deadline } from "@/lib/data/deadlines";
import { useSaved } from "@/lib/stores/saved";
import { cn, relativeDeadline, deadlineTone } from "@/lib/utils";

export function ResourceCard({ resource }: { resource: Resource }) {
  const saved = useSaved((s) => s.notes.includes(resource.id));
  const toggle = useSaved((s) => s.toggleNote);
  return (
    <article className="group relative flex flex-col rounded-3xl bg-card p-4 shadow-card transition-[box-shadow] duration-200 hover:shadow-card-hover">
      <div className="mb-3 flex items-center justify-between gap-2">
        <Badge variant="outline">{KIND_LABEL[resource.kind]}</Badge>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={saved ? "Remove bookmark" : "Bookmark"}
          onClick={(e) => {
            e.preventDefault();
            toggle(resource.id);
          }}
        >
          {saved ? (
            <BookmarkCheck className="size-4 text-primary" />
          ) : (
            <Bookmark className="size-4" />
          )}
        </Button>
      </div>
      <Link to={`/notes/${resource.id}`} className="flex flex-1 flex-col">
        <h3 className="font-display text-lg leading-snug font-medium tracking-tight">
          {resource.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {resource.summary}
        </p>
        <p className="mt-auto pt-4 text-xs text-faint">
          {resource.subject} · {resource.college} · Sem {resource.semester}
        </p>
      </Link>
    </article>
  );
}

export function OpeningCard({
  opening,
  onOpen,
}: {
  opening: Opening;
  onOpen: (id: string) => void;
}) {
  const tone = deadlineTone(opening.deadline);
  return (
    <button
      type="button"
      onClick={() => onOpen(opening.id)}
      className="flex flex-col rounded-3xl bg-card p-4 text-left shadow-card transition-[box-shadow] duration-200 hover:shadow-card-hover"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <Badge variant={opening.kind === "internship" ? "secondary" : "outline"}>
          {opening.kind === "internship" ? "Internship" : "Fresher"}
        </Badge>
        <Badge
          variant={
            tone === "danger" ? "danger" : tone === "warn" ? "warn" : "outline"
          }
        >
          {relativeDeadline(opening.deadline)}
        </Badge>
      </div>
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {opening.company}
      </p>
      <h3 className="mt-1 font-display text-lg leading-snug font-medium tracking-tight">
        {opening.title}
      </h3>
      <p className="mt-3 text-sm text-muted-foreground">
        {opening.location}
        {opening.remote ? " · Remote ok" : ""} · {opening.pay}
      </p>
    </button>
  );
}

export function DeadlineRow({ item }: { item: Deadline }) {
  const tone = deadlineTone(item.date);
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl bg-card px-4 py-3 shadow-card">
      <div className="min-w-0">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <Badge variant={item.kind === "exam" ? "outline" : "secondary"}>
            {item.kind === "exam" ? "Exam" : "Scholarship"}
          </Badge>
          <span className="text-xs text-faint">{item.org}</span>
        </div>
        <h3 className="font-display text-base font-medium tracking-tight">
          {item.title}
        </h3>
        <p className="text-xs text-muted-foreground">{item.summary}</p>
      </div>
      <div className="shrink-0 text-right">
        <Badge
          variant={
            tone === "danger" ? "danger" : tone === "warn" ? "warn" : "outline"
          }
        >
          {relativeDeadline(item.date)}
        </Badge>
        <p className="mt-1 text-xs text-faint">{item.date}</p>
      </div>
    </div>
  );
}
