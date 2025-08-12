import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "@/styles/GlobalStyles";

const ProfileScreen = () => {
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
      <TouchableOpacity style={styles.btnAction}>
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
