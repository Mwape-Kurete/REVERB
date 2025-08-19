import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import GlobalStyles from "@/styles/GlobalStyles";
import { useAuth } from "@/contexts/AuthContext";

const LoginScreen = () => {
  const router = useRouter();
  const { login, loading } = useAuth();

  // State for controlled inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Login handler
  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert("Please enter email and password");
      return;
    }

    try {
      await login(email, password);
      // On success, replace stack with main app (tabs)
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Login failed", error.message || "Unknown error");
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.headerContain}>
        <Text style={GlobalStyles.headerText}>Log In</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={[
            GlobalStyles.formInput,
            GlobalStyles.spacerSmaller,
            GlobalStyles.spacerMed,
          ]}
          placeholder="Email Address"
          placeholderTextColor={GlobalStyles.textPlaceholder.color}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[
            GlobalStyles.formInput,
            GlobalStyles.spacerSmaller,
            GlobalStyles.spacerMed,
          ]}
          placeholder="Password"
          placeholderTextColor={GlobalStyles.textPlaceholder.color}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={GlobalStyles.primaryButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={GlobalStyles.textPrimary}>Log In</Text>
          )}
        </TouchableOpacity>
        <TouchableHighlight
          underlayColor="#FEEFF0"
          style={GlobalStyles.ghostButton}
          onPress={() => router.push("/(auth)/RegistrationScreen")}
        >
          <Text style={GlobalStyles.textInfo}>
            Don&#39;t Have an Account? Sign Up!
          </Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  headerContain: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "25%",
  },
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
