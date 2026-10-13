import { isDateOnly } from '../../shared/lib/date';
import { isRecord } from '../../shared/lib/guards';
import type { Assignment, AssignmentFilter, Priority } from './types';

export function isPriority(value: unknown): value is Priority {
  return value === 'low' || value === 'medium' || value === 'high';
}

export function isAssignmentFilter(value: unknown): value is AssignmentFilter {
  return (
    value === 'all' ||
    value === 'pending' ||
    value === 'overdue' ||
    value === 'completed'
  );
}

export function isAssignment(value: unknown): value is Assignment {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    value.id.trim().length > 0 &&
    typeof value.course === 'string' &&
    value.course.trim().length > 0 &&
    typeof value.title === 'string' &&
    value.title.trim().length > 0 &&
    isDateOnly(value.dueDate) &&
    isPriority(value.priority) &&
    typeof value.completed === 'boolean' &&
    typeof value.createdAt === 'string' &&
    Number.isFinite(Date.parse(value.createdAt))
  );
}

export function isAssignmentList(value: unknown): value is Assignment[] {
  if (!Array.isArray(value) || !value.every(isAssignment)) return false;
  return new Set(value.map((item) => item.id)).size === value.length;
}
