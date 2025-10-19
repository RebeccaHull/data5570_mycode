import { View, Text, Pressable } from "react-native";
import { MaintenanceTask } from "../store/tasksSlice";

type Props = {
  item: MaintenanceTask;
  onToggleDone: () => void;
  onRemove: () => void;
};

function formatDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString();
}

export default function TaskItem({ item, onToggleDone, onRemove }: Props) {
  return (
    <View style={{
      padding: 12,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      marginBottom: 8,
      backgroundColor: item.isDone ? "#e8f5e9" : "#fff"
    }}>
      <Pressable onPress={onToggleDone}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>{item.title}</Text>
        <Text>Every {item.frequencyDays} days</Text>
        <Text>Last done: {formatDate(item.lastDoneISO)}</Text>
        <Text>Next due: {formatDate(item.nextDueISO)}</Text>
      </Pressable>
      <Pressable onPress={onRemove} style={{ marginTop: 6 }}>
        <Text accessibilityRole="button">Remove</Text>
      </Pressable>
    </View>
  );
}