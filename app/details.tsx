// app/details.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export default function DetailsScreen() {
  const { items } = useSelector((state: RootState) => state.tasks);
  const total = items.length;
  const completed = items.filter((t) => t.completed).length;

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 48 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Summary
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>Total tasks: {total}</Text>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>
        Completed tasks: {completed}
      </Text>

      <Link href="/">
        <Text style={{ color: 'blue', marginTop: 24 }}>
          ← Back to task list
        </Text>
      </Link>
    </View>
  );
}