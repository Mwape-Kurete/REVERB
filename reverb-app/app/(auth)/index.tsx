import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function AuthLanding() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Welcome to REVERB</Text>
        <Text>Taking journaling to whole new level</Text>
      </View>
      <View>
        <TouchableOpacity>
          <Text onPress={() => router.push("/(auth)/LoginScreen")}>Log In</Text>
        </TouchableOpacity>
        <TouchableHighlight
          onPress={() => router.push("/(auth)/RegistrationScreen")}
        >
          <Text>Dont Have an Account? Sign Up!</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
