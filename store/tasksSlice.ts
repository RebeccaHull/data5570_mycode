import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// This is your EC2 backend URL
const BASE_URL = 'http://3.148.185.103:8000/api/tasks/';

// GET tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data;
});

// POST a new task
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task: { title: string; completed: boolean }) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    return data;
  }
);

interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

interface TasksState {
  items: Task[];
  loading: boolean;
}

const initialState: TasksState = {
  items: [],
  loading: false,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default tasksSlice.reducer;