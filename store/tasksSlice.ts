// store/tasksSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

// 🚨 Put your EC2 IP here. Match exactly what works in the browser.
const API_URL = "http://13.59.104.129:8000/api/tasks/";

interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk<Task[]>(
  'tasks/fetchTasks',
  async () => {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`Fetch error: ${res.status}`);
    }
    return (await res.json()) as Task[];
  }
);

export const addTask = createAsyncThunk<Task, string>(
  'tasks/addTask',
  async (title) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed: false }),
    });
    if (!res.ok) {
      throw new Error(`Add error: ${res.status}`);
    }
    return (await res.json()) as Task;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load tasks';
      })
      .addCase(addTask.pending, (state) => {
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.items.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to add task';
      });
  },
});

export default tasksSlice.reducer;
