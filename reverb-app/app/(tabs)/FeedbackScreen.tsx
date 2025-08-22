import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import LoadingScreen from "@/components/LoadingScreen";

export default function FeedbackScreen() {
  const router = useRouter();
  const { destination, message } = useLocalSearchParams<{
    destination: string;
    message?: string;
  }>();

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    console.log("FeedbackScreen loaded, destination:", destination);
    if (!destination) return;

    const timer = setTimeout(() => {
      console.log("Navigating to:", destination);

      setVisible(false); //hiding feedback screen

      router.push(destination as any);
    }, 2500);

    setVisible(true);

    return () => clearTimeout(timer);
    console.log("Cleanup FeedbackScreen");
  }, [destination, router]);

  return (
    <View style={styles.container}>
      <LoadingScreen visible={visible} message={message || "Loading..."} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
