import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { toggleDone, removeTask } from "../store/tasksSlice";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const items = useSelector((s: RootState) => s.tasks.items);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View>
      {items.map((it) => (
        <TaskItem
          key={it.id}
          item={it}
          onToggleDone={() => dispatch(toggleDone(it.id))}
          onRemove={() => dispatch(removeTask(it.id))}
        />
      ))}
    </View>
  );
}
