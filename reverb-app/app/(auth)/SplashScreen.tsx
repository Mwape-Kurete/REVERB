import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    //start up sim
    setTimeout(() => {
      router.replace("/(auth)/OnboardingScreen");
    }, 2000); //simulating a 2 second loading time
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={"#5F2F86"} />
        <Text>Loading...</Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
