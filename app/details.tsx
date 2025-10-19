import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link } from "expo-router";

function daysUntil(iso?: string) {
  if (!iso) return "?";
  const now = new Date();
  const due = new Date(iso);
  const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function Details() {
  const items = useSelector((s: RootState) => s.tasks.items);
  const total = items.length;
  const completed = items.filter(t => t.isDone).length;
  const dueSoon = items.filter(t => typeof daysUntil(t.nextDueISO) === "number" && (daysUntil(t.nextDueISO) as number) <= 7).length;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}>Details</Text>
      <Text>Total tasks: {total}</Text>
      <Text>Completed (toggled): {completed}</Text>
      <Text>Due within 7 days: {dueSoon}</Text>
      <Link href="/">
        <Text style={{ marginTop: 16, textDecorationLine: "underline" }}>Back to Home</Text>
      </Link>
    </View>
  );
}