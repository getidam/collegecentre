import React, { useMemo, useState } from "react";
import { DeadlineRow } from "@/components/cards";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEADLINES, type DeadlineKind } from "@/lib/data/deadlines";
import { daysUntil } from "@/lib/utils";

export function AlertsView() {
  const [tab, setTab] = useState<"all" | DeadlineKind>("all");
  const list = useMemo(() => {
    return DEADLINES.filter((d) => (tab === "all" ? true : d.kind === tab)).sort(
      (a, b) => a.date.localeCompare(b.date),
    );
  }, [tab]);

  const open = list.filter((d) => daysUntil(d.date) >= 0);
  const closed = list.filter((d) => daysUntil(d.date) < 0);

  return (
    <div className="stagger-in flex flex-col gap-6">
      <header>
        <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Calendar
        </p>
        <h1 className="mt-1 font-display text-4xl font-medium tracking-tight">
          Scholarships &amp; Exams
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Central schemes, state portals, GATE, CAT, NET, and the semester dates
          that actually move your academic schedule.
        </p>
      </header>

      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
        <TabsList>
          <TabsTrigger value="all">All Deadlines</TabsTrigger>
          <TabsTrigger value="scholarship">Scholarships</TabsTrigger>
          <TabsTrigger value="exam">Competitive Exams</TabsTrigger>
        </TabsList>
      </Tabs>

      <section className="flex flex-col gap-2">
        {open.map((d) => (
          <article key={d.id} className="flex flex-col gap-2">
            <DeadlineRow item={d} />
            <p className="px-4 pb-2 text-sm text-muted-foreground">{d.summary}</p>
          </article>
        ))}
      </section>

      {closed.length > 0 ? (
        <section className="mt-4">
          <h2 className="mb-3 font-display text-xl font-medium tracking-tight text-muted-foreground">
            Past / Closed
          </h2>
          <div className="flex flex-col gap-2 opacity-60">
            {closed.map((d) => (
              <DeadlineRow key={d.id} item={d} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
