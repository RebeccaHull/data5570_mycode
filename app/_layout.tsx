import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../store";
import { SafeAreaProvider } from "react-native-safe-area-context";

// expose store for the demo helper in Home
(global as any).__store = store;

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Home" }} />
          <Stack.Screen name="details" options={{ title: "Details" }} />
        </Stack>
      </SafeAreaProvider>
    </Provider>
  );
}