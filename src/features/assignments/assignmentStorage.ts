import { createStorage } from '../../shared/lib/storage';
import { isAssignmentList } from './guards';

export const assignmentStorage = createStorage(
  'student-deadline-tracker.assignments.v1',
  isAssignmentList,
);
