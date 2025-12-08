// app/details.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Link } from 'expo-router';

export default function DetailsScreen() {
  const items = useSelector((state: RootState) => state.tasks.items);
  const total = items.length;
  const completed = items.filter((t) => t.completed).length;

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 48 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Task Summary
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 4 }}>Total tasks: {total}</Text>
      <Text style={{ fontSize: 16, marginBottom: 16 }}>
        Completed tasks: {completed}
      </Text>

      <Link href="/">
        <Text style={{ color: 'blue' }}>← Back to task list</Text>
      </Link>
    </View>
  );
}