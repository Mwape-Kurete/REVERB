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

const LoginScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Log In</Text>
      </View>
      <View>
        <TextInput placeholder="Email Address" />
        <TextInput placeholder="Password" secureTextEntry={true} />
      </View>
      <View>
        {/* replace the onPress below with the authContext  */}
        <TouchableOpacity>
          <Text onPress={() => router.push("../(tabs)/")}>Log In</Text>
        </TouchableOpacity>
        <TouchableHighlight>
          <Text onPress={() => router.push("/(auth)/RegistrationScreen")}>
            Dont Have an Account? Sign Up!
          </Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
