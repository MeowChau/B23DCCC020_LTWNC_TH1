export type Priority = 'low' | 'medium' | 'high';
export type AssignmentFilter = 'all' | 'pending' | 'overdue' | 'completed';
export type AssignmentCounts = Record<AssignmentFilter, number>;

export interface AssignmentQuery {
  search: string;
  course: string;
  priority: Priority | 'all';
}

export interface Assignment {
  id: string;
  course: string;
  title: string;
  dueDate: string;
  priority: Priority;
  completed: boolean;
  createdAt: string;
}

export type CreateAssignmentInput = Omit<
  Assignment,
  'id' | 'completed' | 'createdAt'
>;
export type UpdateAssignmentInput = Partial<CreateAssignmentInput>;
export type AssignmentFormValues = Pick<
  Assignment,
  'course' | 'title' | 'dueDate' | 'priority'
>;

export type DeadlineInfo =
  | { kind: 'upcoming'; days: number; label: string }
  | { kind: 'today'; days: 0; label: string }
  | { kind: 'overdue'; days: number; label: string };

export interface AssignmentsState {
  items: Assignment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
