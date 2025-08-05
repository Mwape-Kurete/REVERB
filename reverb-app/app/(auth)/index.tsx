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

import GlobalStyles from "@/styles/GlobalStyles";

export default function AuthLanding() {
  const router = useRouter();

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.headerContain}>
        <Text style={[GlobalStyles.headerText, GlobalStyles.spacerLarge]}>
          Welcome to REVERB
        </Text>
        <Text style={GlobalStyles.subHeaderText}>
          Taking journaling to a whole new level
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={GlobalStyles.primaryButton}
          onPress={() => router.push("/(auth)/LoginScreen")}
        >
          <Text style={GlobalStyles.textPrimary}>Log In</Text>
        </TouchableOpacity>
        <TouchableHighlight
          style={GlobalStyles.ghostButton}
          underlayColor="#F5EDFC"
          onPress={() => router.push("/(auth)/RegistrationScreen")}
        >
          <Text style={GlobalStyles.textInfo}>
            Dont Have an Account? Sign Up!
          </Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContain: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "50%",
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
