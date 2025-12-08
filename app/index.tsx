// app/index.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'expo-router';
import { fetchTasks, addTask, Task } from '../store/tasksSlice';
import type { RootState, AppDispatch } from '../store';

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  const [title, setTitle] = useState('');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAdd = () => {
    if (!title.trim()) return;
    dispatch(addTask(title.trim()));
    setTitle('');
  };

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 48 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Maintenance Tasks
      </Text>

      <TextInput
        placeholder="New task..."
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          borderRadius: 4,
          marginBottom: 8,
        }}
      />
      <Button title="Add Task" onPress={handleAdd} />

      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}
      {error && (
        <Text style={{ color: 'red', marginTop: 8 }}>Error: {error}</Text>
      )}

      <FlatList
        style={{ marginTop: 16 }}
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              paddingVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
            }}
          >
            <Text style={{ fontSize: 16 }}>
              {item.completed ? '✅ ' : '⬜ '} {item.title}
            </Text>
          </View>
        )}
      />

      <Link href="/details" style={{ marginTop: 24 }}>
        <Text style={{ color: 'blue' }}>See summary page →</Text>
      </Link>
    </View>
  );
}