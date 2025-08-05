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

const LoginScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Log In</Text>
      </View>
      <View>
        <TextInput placeholder="Email Address" />
        <TextInput placeholder="Password" secureTextEntry={true} />
      </View>
      <View>
        <TouchableOpacity>
          <Text>Log In</Text>
        </TouchableOpacity>
        <TouchableHighlight>
          <Text>Don`&apsos`t Have an Account? Sign Up!</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
