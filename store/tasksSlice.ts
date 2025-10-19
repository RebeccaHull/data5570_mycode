import { createSlice, PayloadAction, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

export type MaintenanceTask = {
  id: string;
  title: string;
  frequencyDays: number; // how often to repeat
  lastDoneISO?: string; // when user last completed it
  nextDueISO?: string;  // computed
  isDone?: boolean;     // UI toggle for demo
};

type TasksState = {
  items: MaintenanceTask[];
  status: "idle" | "loading" | "error";
  error?: string;
};

function computeNextDue(lastDoneISO: string | undefined, frequencyDays: number) {
  const base = lastDoneISO ? new Date(lastDoneISO) : new Date();
  const due = new Date(base);
  due.setDate(due.getDate() + frequencyDays);
  return due.toISOString();
}

const initialState: TasksState = {
  items: [
    { id: nanoid(), title: "Change engine oil", frequencyDays: 180, lastDoneISO: undefined, nextDueISO: computeNextDue(undefined, 180), isDone: false },
    { id: nanoid(), title: "Rotate tires", frequencyDays: 365, lastDoneISO: undefined, nextDueISO: computeNextDue(undefined, 365), isDone: false },
  ],
  status: "idle",
};

// Optional: fetch from your Django API if you have /api/tasks/
export const fetchTasks = createAsyncThunk<MaintenanceTask[], string | undefined>(
  "tasks/fetch",
  async (apiBase) => {
    const url = `${apiBase ?? "http://localhost:8000"}/api/tasks/`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    // adapt to our shape if your API differs
    return data.map((d: any) => ({
      id: String(d.id ?? nanoid()),
      title: d.title ?? d.name ?? "Untitled",
      frequencyDays: Number(d.frequency_days ?? d.frequencyDays ?? 30),
      lastDoneISO: d.last_done ?? d.lastDone ?? undefined,
      nextDueISO: d.next_due ?? computeNextDue(d.last_done ?? d.lastDone, Number(d.frequency_days ?? 30)),
      isDone: false,
    }));
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action: PayloadAction<MaintenanceTask>) {
        state.items.unshift(action.payload);
      },
      prepare(title: string, frequencyDays: number) {
        const last = undefined as string | undefined;
        return {
          payload: {
            id: nanoid(),
            title,
            frequencyDays,
            lastDoneISO: last,
            nextDueISO: computeNextDue(last, frequencyDays),
            isDone: false,
          } as MaintenanceTask,
        };
      },
    },
    toggleDone(state, action: PayloadAction<string>) {
      const t = state.items.find((i) => i.id === action.payload);
      if (t) t.isDone = !t.isDone;
    },
    markCompletedNow(state, action: PayloadAction<string>) {
      const t = state.items.find((i) => i.id === action.payload);
      if (t) {
        const now = new Date().toISOString();
        t.lastDoneISO = now;
        t.nextDueISO = computeNextDue(now, t.frequencyDays);
        t.isDone = true;
      }
    },
    removeTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCompleted(state) {
      state.items = state.items.filter((i) => !i.isDone);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { addTask, toggleDone, markCompletedNow, removeTask, clearCompleted } = tasksSlice.actions;
export default tasksSlice.reducer;