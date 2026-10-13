import type { Assignment, AssignmentQuery } from './types';

export const EMPTY_QUERY: AssignmentQuery = {
  search: '',
  course: '',
  priority: 'all',
};

function normalizeSearch(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase('vi-VN')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');
}

export function hasQuery(query: AssignmentQuery): boolean {
  return Boolean(
    query.search.trim() || query.course || query.priority !== 'all',
  );
}

export function searchAssignments(
  items: Assignment[],
  query: AssignmentQuery,
): Assignment[] {
  const terms = normalizeSearch(query.search).split(/\s+/).filter(Boolean);
  return items.filter((item) => {
    if (query.course && item.course !== query.course) return false;
    if (query.priority !== 'all' && item.priority !== query.priority)
      return false;
    const text = normalizeSearch(`${item.title} ${item.course}`);
    return terms.every((term) => text.includes(term));
  });
}
