import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // User is logged in — navigate to main app tabs
        router.replace("/(tabs)/HomeScreen");
      } else {
        // Not logged in — navigate to auth landing
        router.replace("/(auth)/OnboardingScreen");
      }
    }
  }, [user, loading]);

  // Show loading indicator while checking auth state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={"#5F2F86"} />
      </View>
    );
  }

  // Render children (if you want to protect nested routes)
  return <>{children}</>;
}
