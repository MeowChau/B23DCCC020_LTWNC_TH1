import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getErrorMessage } from '../../shared/lib/guards';
import { getAssignments } from './assignmentsApi';
import { assignmentStorage } from './assignmentStorage';
import type {
  Assignment,
  AssignmentsState,
  CreateAssignmentInput,
  UpdateAssignmentInput,
} from './types';

export const initialAssignmentsState: AssignmentsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchAssignments = createAsyncThunk<
  Assignment[],
  void,
  { state: { assignments: AssignmentsState }; rejectValue: string }
>(
  'assignments/fetchAll',
  async (_, { signal, rejectWithValue }) => {
    try {
      const response = await getAssignments(signal);
      // The mock API supplies first-run data; local changes take precedence on later visits.
      return assignmentStorage.read() ?? response.data;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
  {
    // Prevent duplicate initial requests when React StrictMode re-runs effects.
    condition: (_, { getState }) => getState().assignments.status !== 'loading',
  },
);

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState: initialAssignmentsState,
  reducers: {
    addAssignment: {
      reducer(state, action: PayloadAction<Assignment>) {
        state.items.push(action.payload);
      },
      prepare(input: CreateAssignmentInput) {
        return {
          payload: {
            ...input,
            course: input.course.trim(),
            title: input.title.trim(),
            id: nanoid(),
            completed: false,
            createdAt: new Date().toISOString(),
          } satisfies Assignment,
        };
      },
    },
    updateAssignment(
      state,
      action: PayloadAction<{ id: string; changes: UpdateAssignmentInput }>,
    ) {
      const item = state.items.find(
        (assignment) => assignment.id === action.payload.id,
      );
      if (!item) return;
      const { course, title, dueDate, priority } = action.payload.changes;
      // Only editable fields can change; completion, id and creation time are preserved.
      if (course !== undefined) item.course = course.trim();
      if (title !== undefined) item.title = title.trim();
      if (dueDate !== undefined) item.dueDate = dueDate;
      if (priority !== undefined) item.priority = priority;
    },
    toggleAssignment(state, action: PayloadAction<string>) {
      const item = state.items.find(
        (assignment) => assignment.id === action.payload,
      );
      if (item) item.completed = !item.completed;
    },
    removeAssignment(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (assignment) => assignment.id !== action.payload,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.payload ?? action.error.message ?? 'Không tải được bài tập.';
      });
  },
});

export const {
  addAssignment,
  updateAssignment,
  toggleAssignment,
  removeAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
