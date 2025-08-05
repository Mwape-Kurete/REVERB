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
      <View>
        <Text style={[GlobalStyles.headerText, GlobalStyles.spacerLarge]}>
          Welcome to REVERB
        </Text>
        <Text style={GlobalStyles.subHeaderText}>
          Taking journaling to whole new level
        </Text>
      </View>
      <View>
        <TouchableOpacity style={GlobalStyles.primaryButton}>
          <Text
            style={GlobalStyles.textPrimary}
            onPress={() => router.push("/(auth)/LoginScreen")}
          >
            Log In
          </Text>
        </TouchableOpacity>
        <TouchableHighlight
          style={GlobalStyles.ghostButton}
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

const styles = StyleSheet.create({});
