import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { addTask, clearCompleted, fetchTasks, markCompletedNow } from "../store/tasksSlice";
import TaskList from "../components/TaskList";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [freq, setFreq] = useState("180"); // days
  const [mountedAt, setMountedAt] = useState<string | null>(null);
  const status = useSelector((s: RootState) => s.tasks.status);

  useEffect(() => {
    setMountedAt(new Date().toLocaleTimeString());
    // Optional: load from your Django API (set your URL below)
    // dispatch(fetchTasks("http://localhost:8000")).catch(() => {});
  }, [dispatch]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>Maintenance Tracker</Text>
        {mountedAt && <Text style={{ marginBottom: 12 }}>Mounted at: {mountedAt} {status === "loading" ? "(loading…)" : ""}</Text>}

        <View style={{ gap: 8 }}>
          <TextInput
            placeholder="Task title (e.g., Oil change)"
            value={title}
            onChangeText={setTitle}
            style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10 }}
          />
          <TextInput
            placeholder="Frequency (days)"
            keyboardType="numeric"
            value={freq}
            onChangeText={setFreq}
            style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10 }}
          />
          <Pressable
            onPress={() => {
              const f = parseInt(freq, 10) || 30;
              if (title.trim()) {
                dispatch(addTask(title.trim(), f));
                setTitle("");
              }
            }}
            style={{ padding: 12, borderWidth: 1, borderColor: "#333", borderRadius: 8, alignItems: "center" }}
          >
            <Text accessibilityRole="button">Add Task</Text>
          </Pressable>
        </View>

        <View style={{ marginTop: 16 }}>
          <TaskList />
        </View>

        <Pressable onPress={() => dispatch(clearCompleted())} style={{ marginTop: 8 }}>
          <Text accessibilityRole="button">Clear Completed</Text>
        </Pressable>

        <Pressable onPress={() => {
          // quick demo: mark the first task as completed now
          const first = (global as any).__store?.getState?.().tasks.items[0];
          if (first) dispatch(markCompletedNow(first.id));
        }} style={{ marginTop: 8 }}>
          <Text accessibilityRole="button">Mark first task completed now (demo)</Text>
        </Pressable>

        <View style={{ height: 24 }} />

        <Link href="/details">
          <Text style={{ textDecorationLine: "underline" }}>Go to Details</Text>
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}