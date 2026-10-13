const MILLISECONDS_PER_DAY = 86_400_000;

export function isDateOnly(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return (
    Number.isFinite(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}

export function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Compare calendar dates, not elapsed hours; this also avoids daylight-saving drift.
export function differenceInCalendarDays(dueDate: string, today: Date): number {
  if (!isDateOnly(dueDate)) throw new Error('Hạn nộp không hợp lệ.');
  const deadline = new Date(`${dueDate}T00:00:00Z`).getTime();
  const current = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  return (deadline - current) / MILLISECONDS_PER_DAY;
}

export function formatDueDate(value: string): string {
  return new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
}
