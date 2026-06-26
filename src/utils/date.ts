/** Date helpers — all keyed to local time, YYYY-MM-DD strings. */

export function toKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function todayKey(): string {
  return toKey(new Date());
}

export function addDays(d: Date, n: number): Date {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + n);
  return copy;
}

export function keyMinus(n: number): string {
  return toKey(addDays(new Date(), -n));
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function weekdayShort(d: Date): string {
  return WEEKDAYS[d.getDay()];
}

export function greeting(hour: number): string {
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export function prettyToday(d: Date): string {
  return `${WEEKDAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

/** Last 7 day-keys ending today (oldest first). */
export function lastSevenDays(): { key: string; date: Date; label: string }[] {
  const out: { key: string; date: Date; label: string }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = addDays(new Date(), -i);
    out.push({ key: toKey(d), date: d, label: WEEKDAYS[d.getDay()][0] });
  }
  return out;
}
