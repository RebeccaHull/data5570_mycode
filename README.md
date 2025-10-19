# Expo HW3 – Maintenance Tracker (expo-router + Redux Toolkit)

This app satisfies the four requirements:

1) **React hooks**: `useState` & `useEffect` in `app/index.tsx`.
2) **Parent → child components**: `components/TaskList` (parent) renders many `TaskItem` (child).
3) **Two pages & navigation**: `app/index.tsx` and `app/details.tsx` with `expo-router` Stack in `_layout.tsx`.
4) **Redux store & reducer**: `store/` with `tasksSlice` and usage via `useDispatch`/`useSelector`.

## Optional Django integration
If your Project 2 exposed a REST endpoint at `/api/tasks/`, uncomment the `dispatch(fetchTasks(...))` line in `app/index.tsx` and set your API base URL. Adapt the mapping in `fetchTasks` if your field names differ.

## Quick Start

```bash
npm i
npx expo start
```

Open in Expo Go or a simulator, add tasks, toggle/complete them, and navigate to Details.