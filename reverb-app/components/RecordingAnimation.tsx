//Shows animation based on isRecording or duration props.
import { Easing, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

type Props = {
  isRecording: boolean;
};

const RecordingAnimation = ({ isRecording }: Props) => {
  //old tape recorder animation vibes
  const spinValueLeft = useRef(new Animated.Value(0)).current;
  const spinValueRight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.timing(spinValueLeft, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();

      Animated.loop(
        Animated.timing(spinValueRight, {
          toValue: 1,
          duration: 1800,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValueLeft.stopAnimation(() => spinValueLeft.setValue(0));
      spinValueRight.stopAnimation(() => spinValueRight.setValue(0));
    }
  }, [isRecording, spinValueLeft, spinValueRight]);

  const spinLeft = spinValueLeft.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const spinRight = spinValueRight.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.reel, { transform: [{ rotate: spinLeft }] }]}
      >
        <View style={styles.spokes} />
      </Animated.View>
      <Animated.View
        style={[styles.reel, { transform: [{ rotate: spinRight }] }]}
      >
        <View style={styles.spokes} />
      </Animated.View>
    </View>
  );
};

export default RecordingAnimation;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  reel: {
    width: 150,
    height: 150,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#030000",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    shadowColor: "#250206",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 12, // for Android shadow
  },
  spokes: {
    width: 4,
    height: 64,
    backgroundColor: "#F45B69",
    borderRadius: 2,
    position: "absolute",
  },
});
