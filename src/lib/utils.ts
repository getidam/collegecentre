import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDeadline(iso: string): string {
  const date = new Date(iso + (iso.length === 10 ? "T12:00:00" : ""));
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function daysUntil(iso: string): number {
  const date = new Date(iso + (iso.length === 10 ? "T23:59:59" : ""));
  const now = new Date();
  const ms = date.getTime() - now.getTime();
  return Math.ceil(ms / 86_400_000);
}

export function deadlineTone(iso: string): "danger" | "warn" | "good" | "muted" {
  const d = daysUntil(iso);
  if (d < 0) return "muted";
  if (d <= 5) return "danger";
  if (d <= 14) return "warn";
  return "good";
}

export function relativeDeadline(iso: string): string {
  const d = daysUntil(iso);
  if (d < 0) return "Closed";
  if (d === 0) return "Due today";
  if (d === 1) return "Due tomorrow";
  if (d < 14) return `${d} days left`;
  if (d < 45) return `${Math.round(d / 7)} weeks left`;
  return formatDeadline(iso);
}
