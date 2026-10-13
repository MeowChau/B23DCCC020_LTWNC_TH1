import { configureStore } from '@reduxjs/toolkit';
import assignmentsReducer, {
  initialAssignmentsState,
} from '../features/assignments/assignmentsSlice';
import { assignmentStorage } from '../features/assignments/assignmentStorage';

const cached = assignmentStorage.read();

export const store = configureStore({
  reducer: { assignments: assignmentsReducer },
  preloadedState: cached
    ? {
        assignments: { ...initialAssignmentsState, items: cached },
      }
    : undefined,
});

// Persistence belongs outside reducers; only save when the assignment list changes.
let previousItems = store.getState().assignments.items;
store.subscribe(() => {
  const { items } = store.getState().assignments;
  if (items !== previousItems) {
    previousItems = items;
    assignmentStorage.write(items);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
