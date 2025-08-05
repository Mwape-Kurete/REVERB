import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function TabsIndex() {
  const router = useRouter();

  // Redirect to actual default tab (HomeScreen here)
  useEffect(() => {
    router.replace("/(tabs)/HomeScreen");
  }, []);

  return null; // or splash/loading UI
}
