export function localDateISO(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const LAUNCH_EPOCH = Date.UTC(2021, 5, 19);
const DAY_MS = 86_400_000;

export function daysSinceLaunch(dateISO: string): number {
  const [y, m, d] = dateISO.split("-").map(Number);
  const t = Date.UTC(y, m - 1, d);
  return Math.floor((t - LAUNCH_EPOCH) / DAY_MS);
}

export function isValidDateISO(s: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(s);
}
