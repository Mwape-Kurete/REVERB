import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";

const RegistrationScreen = () => {
  return (
    <SafeAreaView>
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
        <TouchableOpacity>
          <Text>Create an Account</Text>
        </TouchableOpacity>
        <TouchableHighlight>
          <Text>Have an Account? Log In!</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({});
