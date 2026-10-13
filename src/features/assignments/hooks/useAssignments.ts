import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useToday } from '../../../shared/hooks/useToday';
import {
  addAssignment,
  fetchAssignments,
  removeAssignment,
  toggleAssignment,
  updateAssignment,
} from '../assignmentsSlice';
import {
  countAssignments,
  filterAssignments,
  isDueSoon,
  sortAssignments,
} from '../deadline';
import { EMPTY_QUERY, hasQuery, searchAssignments } from '../query';
import type {
  AssignmentFilter,
  AssignmentQuery,
  CreateAssignmentInput,
  UpdateAssignmentInput,
} from '../types';

export function useAssignments() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.assignments);
  const [filter, setFilter] = useState<AssignmentFilter>('all');
  const [query, setQuery] = useState<AssignmentQuery>(EMPTY_QUERY);
  const today = useToday();

  useEffect(() => {
    void dispatch(fetchAssignments());
  }, [dispatch]);

  const sortedItems = useMemo(() => sortAssignments(items), [items]);
  const counts = useMemo(() => countAssignments(items, today), [items, today]);
  const visibleItems = useMemo(
    () =>
      searchAssignments(filterAssignments(sortedItems, filter, today), query),
    [sortedItems, filter, today, query],
  );
  const courses = useMemo(
    () =>
      [...new Set(items.map((item) => item.course))].sort((a, b) =>
        a.localeCompare(b, 'vi'),
      ),
    [items],
  );
  // Keep a selected course available even after its last assignment is edited/deleted.
  const filterCourses =
    query.course && !courses.includes(query.course)
      ? [...courses, query.course]
      : courses;
  const dueSoonCount = useMemo(
    () => items.filter((item) => isDueSoon(item, today)).length,
    [items, today],
  );
  const nextAssignment = sortedItems.find((item) => !item.completed);

  function changeQuery<K extends keyof AssignmentQuery>(
    field: K,
    value: AssignmentQuery[K],
  ) {
    setQuery((previous) => ({ ...previous, [field]: value }));
  }

  function resetFilters() {
    setFilter('all');
    setQuery(EMPTY_QUERY);
  }

  return {
    visibleItems,
    courses,
    filterCourses,
    nextAssignment,
    dueSoonCount,
    busy: status === 'loading' || status === 'idle',
    error,
    filter,
    setFilter,
    query,
    changeQuery,
    resetFilters,
    hasQuery: hasQuery(query),
    today,
    counts,
    add: (input: CreateAssignmentInput) => dispatch(addAssignment(input)),
    update: (id: string, changes: UpdateAssignmentInput) =>
      dispatch(updateAssignment({ id, changes })),
    toggle: (id: string) => dispatch(toggleAssignment(id)),
    remove: (id: string) => dispatch(removeAssignment(id)),
    retry: () => {
      void dispatch(fetchAssignments());
    },
  };
}
