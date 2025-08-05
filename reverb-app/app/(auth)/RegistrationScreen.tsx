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

const RegistrationScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Log In</Text>
      </View>
      <View>
        <TextInput placeholder="Email Address" />
        <TextInput placeholder="Full Name" />
        <TextInput placeholder="Password" secureTextEntry={true} />
        <TextInput placeholder="Confirm Password" secureTextEntry={true} />
      </View>
      <View>
        {/* replace the onPress below with the authContext  */}
        <TouchableOpacity>
          <Text onPress={() => router.push("../(tabs)")}>
            Create an Account
          </Text>
        </TouchableOpacity>
        <TouchableHighlight onPress={() => router.push("/(auth)/LoginScreen")}>
          <Text>Have an Account? Log In!</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
