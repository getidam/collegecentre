import React, { useMemo, useState } from "react";
import { useRouter } from "@/lib/router";
import { OpeningCard } from "@/components/cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { OPENINGS, type Opening, type OpeningKind } from "@/lib/data/openings";
import { useSaved, type JobStatus } from "@/lib/stores/saved";
import { formatDeadline, relativeDeadline } from "@/lib/utils";

export function JobsView() {
  const { search, navigate } = useRouter();
  const openId = search.open;
  const [q, setQ] = useState("");
  const [kind, setKind] = useState<OpeningKind | "all">("all");
  const jobs = useSaved((s) => s.jobs);
  const setJob = useSaved((s) => s.setJob);

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return OPENINGS.filter((o) => {
      if (kind !== "all" && o.kind !== kind) return false;
      if (!query) return true;
      return `${o.title} ${o.company} ${o.location} ${o.tags.join(" ")}`
        .toLowerCase()
        .includes(query);
    });
  }, [q, kind]);

  const selected = OPENINGS.find((o) => o.id === openId) ?? null;

  function setOpen(id: string | undefined) {
    navigate("/jobs", { search: id ? { open: id } : {} });
  }

  return (
    <div className="stagger-in flex flex-col gap-6">
      <header>
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Work
        </p>
        <h1 className="mt-1 font-display text-4xl font-medium tracking-tight">
          Internships &amp; Jobs
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Verified off-campus internships, fresher hiring drives, and research fellowships. Filter by role or search tech stack.
        </p>
      </header>

      <div className="grid gap-2 sm:grid-cols-3">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search company, title, tech…"
          aria-label="Search jobs"
          className="sm:col-span-2"
        />
        <SelectField
          value={kind}
          onChange={(e) => setKind(e.target.value as OpeningKind | "all")}
          aria-label="Filter role kind"
        >
          <option value="all">All openings</option>
          <option value="internship">Internships only</option>
          <option value="fresher">Fresher jobs only</option>
        </SelectField>
      </div>

      {list.length === 0 ? (
        <p className="rounded-3xl bg-card px-5 py-12 text-center text-sm text-muted-foreground shadow-card">
          No openings match that query right now.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((o) => (
            <OpeningCard key={o.id} opening={o} onOpen={setOpen} />
          ))}
        </div>
      )}

      {selected ? (
        <Sheet open={Boolean(selected)} onOpenChange={(open) => !open && setOpen(undefined)}>
          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={selected.kind === "internship" ? "secondary" : "outline"}>
                  {selected.kind === "internship" ? "Internship" : "Fresher"}
                </Badge>
                {selected.remote ? <Badge variant="outline">Remote</Badge> : null}
              </div>
              <p className="mt-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {selected.company}
              </p>
              <SheetTitle>{selected.title}</SheetTitle>
              <p className="text-sm text-muted-foreground">
                {selected.location} · {selected.pay}
              </p>
            </SheetHeader>

            <div className="flex flex-col gap-6 p-6">
              <div className="flex items-center justify-between rounded-2xl bg-secondary px-4 py-3 text-xs">
                <span className="text-muted-foreground">Deadline</span>
                <span className="font-medium">
                  {formatDeadline(selected.deadline)} ({relativeDeadline(selected.deadline)})
                </span>
              </div>

              <div>
                <h4 className="font-display text-base font-medium tracking-tight">
                  Status on your board
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(["saved", "applied", "interview"] as JobStatus[]).map((st) => {
                    const active = jobs[selected.id] === st;
                    return (
                      <Button
                        key={st}
                        type="button"
                        size="sm"
                        variant={active ? "default" : "outline"}
                        onClick={() => setJob(selected.id, active ? null : st)}
                        className="capitalize"
                      >
                        {st}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-display text-base font-medium tracking-tight">About</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {selected.description}
                </p>
              </div>

              {selected.eligibility ? (
                <div>
                  <h4 className="font-display text-base font-medium tracking-tight">
                    Eligibility
                  </h4>
                  <p className="mt-1.5 text-sm text-muted-foreground bg-secondary/40 p-3 rounded-xl">
                    {selected.eligibility}
                  </p>
                </div>
              ) : null}

              {selected.tags.length > 0 ? (
                <div>
                  <h4 className="font-display text-base font-medium tracking-tight">Tags</h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selected.tags.map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="pt-2">
                <Button asChild className="w-full">
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(selected.company + ' ' + selected.title + ' apply careers')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open official application &rarr;
                  </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      ) : null}
    </div>
  );
}
