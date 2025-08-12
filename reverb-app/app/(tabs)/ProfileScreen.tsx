import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/contexts/AuthContext";
import { router, useRouter } from "expo-router";
import GlobalStyles from "@/styles/GlobalStyles";

const ProfileScreen = () => {
  const { logout } = useAuth(); // Get logout function from your auth context
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      // Optionally redirect to login screen after logout
      router.replace("/(auth)/LoginScreen");
    } catch (error: any) {
      Alert.alert("Logout failed", error.message || "Please try again.");
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <Text style={GlobalStyles.headerText}> Your Profile</Text>
      <View style={styles.midSect}>
        <Text style={[GlobalStyles.TertiaryButton, GlobalStyles.spacerLarge]}>
          Users Full Name
        </Text>
        <Text style={[GlobalStyles.TertiaryButton, GlobalStyles.spacerLarge]}>
          Email
        </Text>
      </View>
      <TouchableOpacity style={styles.btnAction} onPress={handleLogout}>
        <Text
          style={[
            GlobalStyles.secondaryButton,
            GlobalStyles.textPrimary,
            { textAlign: "center" },
          ]}
        >
          Log out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  btnAction: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  midSect: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 24,
  },
});
function logout() {
  throw new Error("Function not implemented.");
}
