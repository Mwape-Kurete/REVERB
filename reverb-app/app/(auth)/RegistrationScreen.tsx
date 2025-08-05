import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import GlobalStyles from "@/styles/GlobalStyles";

const RegistrationScreen = () => {
  const router = useRouter();

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
        />
        <TextInput
          style={[
            GlobalStyles.formInput,
            GlobalStyles.spacerSmaller,
            GlobalStyles.spacerMed,
          ]}
          placeholder="Full Name"
          placeholderTextColor={GlobalStyles.textPlaceholder.color}
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
        />
      </View>
      <View style={styles.buttonContainer}>
        {/* replace the onPress below with the authContext  */}
        <TouchableOpacity
          style={GlobalStyles.primaryButton}
          onPress={() => router.push("../(tabs)")}
        >
          <Text style={GlobalStyles.textPrimary}>Create an Account</Text>
        </TouchableOpacity>
        <TouchableHighlight
          underlayColor="#F5EDFC"
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
