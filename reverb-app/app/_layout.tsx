import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActivityIndicator, View } from "react-native";
import {
  useFonts,
  MozillaHeadline_400Regular,
} from "@expo-google-fonts/mozilla-headline";
import { Michroma_400Regular } from "@expo-google-fonts/michroma";

// Navigation switches between auth and app depending on user state
function Navigation() {
  const { user, loading } = useAuth();
  const [fontsLoaded] = useFonts({
    MozillaHeadline_400Regular,
    Michroma_400Regular,
  });
  if (loading || !fontsLoaded) {
    // Show a spinner while checking auth state
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5F2F86" />
      </View>
    );
  }

  return (
    // checking if a user is logged in
    //if yes redirect to main app and if no go to auth screns
    <Stack screenOptions={{ headerShown: false }}>
      {user ? <Stack.Screen name="(tabs)" /> : <Stack.Screen name="(auth)" />}
    </Stack>
  );
}
// This is the root layout that wraps everything in the auth provider
export default function RootLayout() {
  return (
    // Wrap the app in AuthProvider so all components can access auth info
    <AuthProvider>
      {/* GestureHandlerRootView is needed for gesture handling in React Native */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation />
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
