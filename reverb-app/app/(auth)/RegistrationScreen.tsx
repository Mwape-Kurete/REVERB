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

const RegistrationScreen = () => {
  const router = useRouter();
  const { register, loading } = useAuth();

  // State variables for form inputs
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Form submission handler
  const handleRegister = async () => {
    // Simple validation
    if (!email || !fullName || !password || !confirmPassword) {
      Alert.alert("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    try {
      // Call register from AuthContext
      await register({ email, password, fullName });

      // Navigate to main app flow after successful registration
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Registration failed", error.message || "Unknown error");

      router.replace("/(auth)/RegistrationScreen");
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.headerContain}>
        <Text style={GlobalStyles.headerText}>Create an Account</Text>
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
          placeholder="Full Name"
          placeholderTextColor={GlobalStyles.textPlaceholder.color}
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
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
        <TextInput
          style={[
            GlobalStyles.formInput,
            GlobalStyles.spacerSmaller,
            GlobalStyles.spacerMed,
          ]}
          placeholder="Confirm Password"
          placeholderTextColor={GlobalStyles.textPlaceholder.color}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={GlobalStyles.primaryButton}
          onPress={handleRegister}
          disabled={loading} // disable button when loading
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={GlobalStyles.textPrimary}>Create an Account</Text>
          )}
        </TouchableOpacity>
        <TouchableHighlight
          underlayColor="#FEEFF0"
          style={GlobalStyles.ghostButton}
          onPress={() => router.push("/(auth)/LoginScreen")}
        >
          <Text style={GlobalStyles.textInfo}>Have an Account? Log In!</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

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
