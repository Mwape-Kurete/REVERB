import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const OnboardingScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Welcome to REVERB</Text>
        <Text>Taking journaling to whole new level</Text>
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

export default OnboardingScreen;

const styles = StyleSheet.create({});
