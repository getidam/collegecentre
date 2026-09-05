import React, { useMemo, useState } from "react";
import { Plus, Trash2, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { SelectField } from "@/components/ui/select-field";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  attendancePct,
  bunksLeft,
  mustAttend,
  statusFor,
} from "@/lib/data/attendance";
import {
  DAYS,
  overallAttendance,
  todayIndex,
  usePlanner,
  type Slot,
} from "@/lib/stores/planner";
import { cn } from "@/lib/utils";

const HOURS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

export function PlannerView() {
  const slots = usePlanner((s) => s.slots);
  const subjects = usePlanner((s) => s.subjects);
  const required = usePlanner((s) => s.required);
  const mark = usePlanner((s) => s.mark);
  const addSubject = usePlanner((s) => s.addSubject);
  const removeSubject = usePlanner((s) => s.removeSubject);
  const addSlot = usePlanner((s) => s.addSlot);
  const removeSlot = usePlanner((s) => s.removeSlot);
  const setRequired = usePlanner((s) => s.setRequired);
  const [newSubject, setNewSubject] = useState("");
  const [editing, setEditing] = useState<Partial<Slot> | null>(null);
  const today = todayIndex();
  const overall = overallAttendance(subjects);

  const todaySlots = useMemo(
    () =>
      slots
        .filter((s) => s.day === today)
        .sort((a, b) => a.start.localeCompare(b.start)),
    [slots, today],
  );

  function cell(day: number, hour: string): Slot | undefined {
    return slots.find((s) => s.day === day && s.start <= hour && s.end > hour);
  }

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim()) return;
    addSubject(newSubject.trim());
    setNewSubject("");
  };

  const handleSaveSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing || !editing.subject || editing.day === undefined || !editing.start || !editing.end) return;
    addSlot({
      day: editing.day,
      start: editing.start,
      end: editing.end,
      subject: editing.subject,
      room: editing.room || "Room",
    });
    setEditing(null);
  };

  return (
    <div className="stagger-in flex flex-col gap-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Personal vault
          </p>
          <h1 className="mt-1 font-display text-4xl font-medium tracking-tight">
            Timetable &amp; Attendance
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Indian colleges detain students below {(required * 100).toFixed(0)}%. Mark your attendance daily and know exactly how many bunks you have left.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="req" className="text-xs text-muted-foreground">
            Target
          </Label>
          <SelectField
            id="req"
            value={String(required)}
            onChange={(e) => setRequired(Number(e.target.value))}
            className="h-11 w-28"
          >
            <option value="0.7">70%</option>
            <option value="0.75">75%</option>
            <option value="0.8">80%</option>
            <option value="0.85">85%</option>
          </SelectField>
        </div>
      </header>

      {/* Attendance Stats Overview */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-primary p-6 text-primary-foreground">
          <p className="text-xs font-medium tracking-wide uppercase opacity-80">
            Overall Attendance
          </p>
          <p className="mt-3 font-display text-5xl font-medium tabular-nums tracking-tight">
            {overall.pct.toFixed(0)}
            <span className="text-2xl opacity-70">%</span>
          </p>
          <p className="mt-2 text-sm opacity-80">
            {overall.present}/{overall.total} total lectures attended
          </p>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-primary-foreground/20">
            <div
              className="h-full rounded-full bg-primary-foreground transition-all duration-300"
              style={{ width: `${Math.min(100, overall.pct)}%` }}
            />
          </div>
          <p className="mt-3 text-xs opacity-75">
            Minimum threshold: {(required * 100).toFixed(0)}%
          </p>
        </div>

        <div className="rounded-3xl bg-card p-6 shadow-card md:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-medium tracking-tight">
              Today's Lectures ({today < 0 ? "Sunday" : DAYS[today]})
            </h2>
            <Button size="sm" variant="outline" onClick={() => setEditing({ day: Math.max(0, today), start: "09:00", end: "10:00", subject: subjects[0]?.name || "" })}>
              <Plus className="size-3.5 mr-1" /> Add class
            </Button>
          </div>
          {today < 0 || todaySlots.length === 0 ? (
            <p className="py-6 text-sm text-muted-foreground text-center">
              No classes scheduled for today. Enjoy your day or revise key subjects!
            </p>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {todaySlots.map((slot) => (
                <div
                  key={slot.id}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-secondary px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold">{slot.subject}</p>
                    <p className="text-xs text-muted-foreground">{slot.room} · {slot.start}–{slot.end}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      title="Mark Present"
                      onClick={() => mark(slot.subject, true)}
                      className="p-1.5 rounded-lg bg-good/10 text-good hover:bg-good hover:text-white transition-colors"
                    >
                      <Check className="size-3.5" />
                    </button>
                    <button
                      title="Mark Absent"
                      onClick={() => mark(slot.subject, false)}
                      className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-colors"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subject-Wise Tracker */}
      <section className="rounded-3xl bg-card p-6 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-2xl font-medium tracking-tight">
              Subject Bunk Calculator
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live status: green = safe to miss, red = mandatory attendance.
            </p>
          </div>
          <form onSubmit={handleAddSubject} className="flex gap-2">
            <Input
              placeholder="Add new subject…"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="h-9 w-48 text-xs"
            />
            <Button size="sm" type="submit">
              Add
            </Button>
          </form>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((sub) => {
            const pct = attendancePct(sub.present, sub.total);
            const status = statusFor(sub.present, sub.total, required);
            const canBunk = bunksLeft(sub.present, sub.total, required);
            const need = mustAttend(sub.present, sub.total, required);

            return (
              <div
                key={sub.name}
                className="flex flex-col justify-between rounded-2xl bg-secondary/60 p-4 border border-border"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-display text-base font-semibold leading-snug">
                      {sub.name}
                    </span>
                    <button
                      onClick={() => removeSubject(sub.name)}
                      className="text-muted-foreground hover:text-destructive p-1"
                      title="Delete subject"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>

                  <div className="flex items-baseline justify-between mb-1.5 text-xs">
                    <span className="tabular-nums font-bold">
                      {pct.toFixed(0)}% ({sub.present}/{sub.total})
                    </span>
                    <span
                      className={cn(
                        "font-semibold",
                        status === "safe" ? "text-good" : "text-destructive",
                      )}
                    >
                      {status === "safe"
                        ? `Can skip ${canBunk} class${canBunk > 1 ? "es" : ""}`
                        : `Attend next ${need} class${need > 1 ? "es" : ""}`}
                    </span>
                  </div>

                  <Progress
                    value={pct}
                    barClassName={status === "safe" ? "bg-good" : "bg-destructive"}
                  />
                </div>

                <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-border/60">
                  <span className="text-[11px] text-muted-foreground">Log lecture:</span>
                  <div className="flex items-center gap-1.5">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2.5 text-good border-good/40 hover:bg-good/10"
                      onClick={() => mark(sub.name, true)}
                    >
                      + Present
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 px-2.5 text-destructive border-destructive/40 hover:bg-destructive/10"
                      onClick={() => mark(sub.name, false)}
                    >
                      - Absent
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Weekly Schedule Grid */}
      <section className="rounded-3xl bg-card p-6 shadow-card overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-medium tracking-tight">
            Weekly Timetable Matrix
          </h2>
          <Button size="sm" variant="outline" onClick={() => setEditing({ day: 0, start: "09:00", end: "10:00", subject: subjects[0]?.name || "" })}>
            <Plus className="size-3.5 mr-1" /> Add Period
          </Button>
        </div>

        <div className="min-w-[640px]">
          <div className="grid grid-cols-7 gap-1 border-b border-border pb-2 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <div>Time</div>
            {DAYS.map((d, i) => (
              <div key={d} className={cn(today === i && "text-primary font-bold")}>
                {d}
              </div>
            ))}
          </div>

          <div className="divide-y divide-border/60">
            {HOURS.map((hr) => (
              <div key={hr} className="grid grid-cols-7 gap-1 py-1.5 items-center">
                <div className="font-mono text-xs text-muted-foreground text-center">
                  {hr}
                </div>
                {DAYS.map((_, dayIdx) => {
                  const match = cell(dayIdx, hr);
                  return (
                    <div
                      key={dayIdx}
                      className={cn(
                        "h-12 rounded-xl p-1.5 text-xs flex flex-col justify-center border transition-all",
                        match
                          ? "bg-primary/10 border-primary/30 text-primary font-medium shadow-xs"
                          : "bg-secondary/20 border-transparent text-muted-foreground/30",
                      )}
                    >
                      {match ? (
                        <>
                          <span className="truncate font-semibold text-[11px] leading-tight">
                            {match.subject}
                          </span>
                          <span className="text-[10px] opacity-75">{match.room}</span>
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add Slot Dialog */}
      {editing ? (
        <Dialog open={Boolean(editing)} onOpenChange={(o) => !o && setEditing(null)}>
          <DialogContent className="sm:max-w-md bg-card border-border">
            <DialogHeader>
              <DialogTitle>Add Timetable Period</DialogTitle>
              <DialogDescription>Assign a lecture or lab to your weekly grid.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSaveSlot} className="space-y-4 pt-2">
              <div>
                <Label>Subject</Label>
                <SelectField
                  value={editing.subject || ""}
                  onChange={(e) => setEditing({ ...editing, subject: e.target.value })}
                  className="mt-1"
                >
                  {subjects.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </SelectField>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label>Day</Label>
                  <SelectField
                    value={String(editing.day ?? 0)}
                    onChange={(e) => setEditing({ ...editing, day: Number(e.target.value) })}
                    className="mt-1"
                  >
                    {DAYS.map((d, i) => (
                      <option key={d} value={i}>
                        {d}
                      </option>
                    ))}
                  </SelectField>
                </div>
                <div>
                  <Label>Start</Label>
                  <Input
                    type="time"
                    value={editing.start || "09:00"}
                    onChange={(e) => setEditing({ ...editing, start: e.target.value })}
                    className="mt-1 text-xs"
                  />
                </div>
                <div>
                  <Label>End</Label>
                  <Input
                    type="time"
                    value={editing.end || "10:00"}
                    onChange={(e) => setEditing({ ...editing, end: e.target.value })}
                    className="mt-1 text-xs"
                  />
                </div>
              </div>

              <div>
                <Label>Room / Lab</Label>
                <Input
                  placeholder="e.g. CS-201 or Lab 3"
                  value={editing.room || ""}
                  onChange={(e) => setEditing({ ...editing, room: e.target.value })}
                  className="mt-1 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                  Cancel
                </Button>
                <Button type="submit">Save Period</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
}
