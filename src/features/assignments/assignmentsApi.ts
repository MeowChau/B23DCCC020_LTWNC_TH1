import { requestJson } from '../../shared/lib/http';
import { isAssignmentList } from './guards';

export function getAssignments(signal?: AbortSignal) {
  return requestJson(
    `${import.meta.env.BASE_URL}api/assignments.json`,
    isAssignmentList,
    signal,
  );
}
