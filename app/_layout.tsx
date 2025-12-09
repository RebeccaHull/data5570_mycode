// app/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Tasks' }} />
        <Stack.Screen name="details" options={{ title: 'Summary' }} />
      </Stack>
    </Provider>
  );
}