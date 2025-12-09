// app/details.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Link } from 'expo-router';
import type { RootState } from '../store';

export default function DetailsScreen() {
  const items = useSelector((state: RootState) => state.tasks.items);

  const total = items.length;
  const completed = items.filter((t) => t.completed).length;

  return (
    <View style={{ flex: 1, padding: 24, paddingTop: 48 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12 }}>
        Maintenance Summary
      </Text>

      {/* Friendly summary sentence */}
      <Text style={{ fontSize: 16, marginBottom: 16 }}>
        You currently have{' '}
        <Text style={{ fontWeight: 'bold' }}>{total}</Text> total maintenance
        task{total === 1 ? '' : 's'}, and{' '}
        <Text style={{ fontWeight: 'bold' }}>{completed}</Text>{' '}
        completed.
      </Text>

      {/* Breakdown */}
      <Text style={{ fontSize: 16, marginBottom: 4 }}>
        Total tasks: {total}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>
        Completed tasks: {completed}
      </Text>

      <Link href="/">
        <Text style={{ color: 'blue' }}>← Back to task list</Text>
      </Link>
    </View>
  );
}
