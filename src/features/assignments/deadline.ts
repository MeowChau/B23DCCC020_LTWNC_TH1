import { differenceInCalendarDays } from '../../shared/lib/date';
import type {
  Assignment,
  AssignmentCounts,
  AssignmentFilter,
  DeadlineInfo,
} from './types';

export function getDeadlineInfo(dueDate: string, today: Date): DeadlineInfo {
  const days = differenceInCalendarDays(dueDate, today);
  if (days < 0)
    return { kind: 'overdue', days: -days, label: `Quá hạn ${-days} ngày` };
  if (days === 0)
    return { kind: 'today', days: 0, label: 'Còn 0 ngày · Hôm nay' };
  return { kind: 'upcoming', days, label: `Còn ${days} ngày` };
}

export function isOverdue(assignment: Assignment, today: Date): boolean {
  return (
    !assignment.completed &&
    getDeadlineInfo(assignment.dueDate, today).kind === 'overdue'
  );
}

export const DUE_SOON_DAYS = 2;

export function isDueSoon(assignment: Assignment, today: Date): boolean {
  const days = differenceInCalendarDays(assignment.dueDate, today);
  return !assignment.completed && days >= 0 && days <= DUE_SOON_DAYS;
}

export function filterAssignments(
  items: Assignment[],
  filter: AssignmentFilter,
  today: Date,
): Assignment[] {
  return items.filter((item) => {
    switch (filter) {
      case 'pending':
        return !item.completed;
      case 'overdue':
        return isOverdue(item, today);
      case 'completed':
        return item.completed;
      default:
        return true;
    }
  });
}

export function sortAssignments(items: Assignment[]): Assignment[] {
  const weight = { high: 0, medium: 1, low: 2 };
  return [...items].sort(
    (a, b) =>
      Number(a.completed) - Number(b.completed) ||
      a.dueDate.localeCompare(b.dueDate) ||
      weight[a.priority] - weight[b.priority] ||
      a.createdAt.localeCompare(b.createdAt),
  );
}

export function countAssignments(
  items: Assignment[],
  today: Date,
): AssignmentCounts {
  const counts: AssignmentCounts = {
    all: items.length,
    pending: 0,
    overdue: 0,
    completed: 0,
  };
  for (const item of items) {
    if (item.completed) counts.completed += 1;
    else {
      counts.pending += 1;
      if (isOverdue(item, today)) counts.overdue += 1;
    }
  }
  return counts;
}
