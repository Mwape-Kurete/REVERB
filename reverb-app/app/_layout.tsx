import { Stack } from "expo-router";
//main layout -> deciding which flow to show
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Auth Flow Group */}
      <Stack.Screen name="(auth)" options={{ presentation: "modal" }} />
      {/* Main App Tabs Group */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
