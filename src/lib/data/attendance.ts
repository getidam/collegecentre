export const DEFAULT_REQUIRED = 0.75;

export function attendancePct(present: number, total: number): number {
  if (total <= 0) return 100;
  return (present / total) * 100;
}

/** How many future classes can be missed while staying at `required`. */
export function bunksLeft(
  present: number,
  total: number,
  required = DEFAULT_REQUIRED,
): number {
  if (total < 0 || present < 0) return 0;
  if (required <= 0) return Infinity;
  const x = Math.floor(present / required - total);
  return Math.max(0, x);
}

/** How many consecutive classes must be attended to climb back to `required`. */
export function mustAttend(
  present: number,
  total: number,
  required = DEFAULT_REQUIRED,
): number {
  if (required >= 1) return present >= total ? 0 : Infinity;
  const need = required * total - present;
  if (need <= 0) return 0;
  const y = Math.ceil(need / (1 - required));
  return Math.max(0, y);
}

export function statusFor(
  present: number,
  total: number,
  required = DEFAULT_REQUIRED,
): "safe" | "edge" | "risk" {
  const pct = attendancePct(present, total);
  if (pct >= required * 100 + 5) return "safe";
  if (pct >= required * 100) return "edge";
  return "risk";
}
