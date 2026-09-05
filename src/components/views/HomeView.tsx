import React from "react";
import { Link, useRouter } from "@/lib/router";
import { ArrowRight } from "lucide-react";
import { ResourceCard, OpeningCard, DeadlineRow } from "@/components/cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RESOURCES } from "@/lib/data/notes";
import { OPENINGS } from "@/lib/data/openings";
import { upcomingDeadlines } from "@/lib/data/deadlines";
import { attendancePct, mustAttend, statusFor } from "@/lib/data/attendance";
import { DAYS, overallAttendance, todayIndex, usePlanner } from "@/lib/stores/planner";
import { usePrefs } from "@/lib/stores/prefs";
import { useSaved } from "@/lib/stores/saved";

function greeting(): string {
  const h = new Date().getHours();
  if (h < 5) return "Still up";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function HomeView() {
  const { navigate } = useRouter();
  const college = usePrefs((s) => s.college);
  const subjects = usePlanner((s) => s.subjects);
  const slots = usePlanner((s) => s.slots);
  const required = usePlanner((s) => s.required);
  const savedNotes = useSaved((s) => s.notes);
  const overall = overallAttendance(subjects);
  const today = todayIndex();
  const todaySlots = slots
    .filter((s) => s.day === today)
    .sort((a, b) => a.start.localeCompare(b.start));
  const atRisk = subjects.filter((s) => statusFor(s.present, s.total, required) === "risk");
  const featured = [
    ...RESOURCES.filter((r) => r.college === college),
    ...RESOURCES,
  ]
    .filter((r, i, arr) => arr.findIndex((x) => x.id === r.id) === i)
    .slice(0, 4);
  const jobs = OPENINGS.slice(0, 3);
  const soon = upcomingDeadlines(30).slice(0, 4);
  const dateLabel = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="stagger-in flex flex-col gap-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            {dateLabel}
          </p>
          <h1 className="mt-1 font-display text-4xl font-medium tracking-tight text-pretty md:text-5xl">
            {greeting()}.
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            {college} · {savedNotes.length} saved notes · keep the{" "}
            {(required * 100).toFixed(0)}% line, then everything else.
          </p>
        </div>
        <Button asChild>
          <Link to="/planner">
            Open planner
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-primary p-5 text-primary-foreground md:col-span-1">
          <p className="text-xs font-medium tracking-wide uppercase opacity-80">
            Attendance
          </p>
          <p className="mt-3 font-display text-5xl font-medium tabular-nums tracking-tight">
            {overall.pct.toFixed(0)}
            <span className="text-2xl opacity-70">%</span>
          </p>
          <p className="mt-2 text-sm opacity-80">
            {overall.present}/{overall.total} classes · bar is {(required * 100).toFixed(0)}%
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-primary-foreground/20">
            <div
              className="h-full rounded-full bg-primary-foreground"
              style={{ width: `${Math.min(100, overall.pct)}%` }}
            />
          </div>
          {atRisk.length > 0 ? (
            <p className="mt-3 text-sm font-medium">
              {atRisk.length} subject{atRisk.length > 1 ? "s" : ""} below the line.
            </p>
          ) : (
            <p className="mt-3 text-sm opacity-80">All subjects are holding.</p>
          )}
        </div>
        <div className="rounded-3xl bg-card p-5 shadow-card md:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-xl font-medium tracking-tight">
              Today
            </h2>
            <Badge variant="outline">
              {today < 0 ? "Sunday" : DAYS[today]}
            </Badge>
          </div>
          {today < 0 || todaySlots.length === 0 ? (
            <p className="py-8 text-sm text-muted-foreground">
              No classes on the timetable for today. Use the extra day on a PYQ
              paper.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {todaySlots.map((slot) => (
                <li
                  key={slot.id}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-secondary px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-medium">{slot.subject}</p>
                    <p className="text-xs text-muted-foreground">{slot.room}</p>
                  </div>
                  <p className="font-mono text-xs tabular-nums text-muted-foreground">
                    {slot.start}–{slot.end}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {atRisk.length > 0 ? (
        <section className="rounded-3xl bg-card p-5 shadow-card">
          <h2 className="font-display text-xl font-medium tracking-tight">
            Below the line
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {atRisk.map((row) => {
              const pct = attendancePct(row.present, row.total);
              const need = mustAttend(row.present, row.total, required);
              return (
                <li key={row.name}>
                  <div className="mb-1 flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium">{row.name}</span>
                    <span className="text-xs tabular-nums text-destructive">
                      {pct.toFixed(1)}% · attend {need} more
                    </span>
                  </div>
                  <Progress value={pct} barClassName="bg-destructive" />
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="font-display text-2xl font-medium tracking-tight">
            Deadlines
          </h2>
          <Link
            to="/alerts"
            className="text-sm font-medium text-primary hover:underline"
          >
            All alerts
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {soon.map((d) => (
            <DeadlineRow key={d.id} item={d} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="font-display text-2xl font-medium tracking-tight">
            Notes near you
          </h2>
          <Link
            to="/notes"
            className="text-sm font-medium text-primary hover:underline"
          >
            Browse all
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {featured.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="font-display text-2xl font-medium tracking-tight">
            Openings
          </h2>
          <Link
            to="/jobs"
            className="text-sm font-medium text-primary hover:underline"
          >
            Internships & jobs
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {jobs.map((o) => (
            <OpeningCard
              key={o.id}
              opening={o}
              onOpen={(id) => {
                navigate("/jobs", { search: { open: id } });
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
