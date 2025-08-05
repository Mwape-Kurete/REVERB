import { Stack } from "expo-router";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthCheck from "@/components/AuthCheck";
import { GestureHandlerRootView } from "react-native-gesture-handler";
//main layout -> deciding which flow to show
export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthCheck>
        <GestureHandlerRootView>
          <Stack screenOptions={{ headerShown: false }}>
            {/* Auth Flow Group */}
            <Stack.Screen name="(auth)" options={{ presentation: "modal" }} />
            {/* Main App Tabs Group */}
            <Stack.Screen name="(tabs)" options={{}} />
          </Stack>
        </GestureHandlerRootView>
      </AuthCheck>
    </AuthProvider>
  );
}
