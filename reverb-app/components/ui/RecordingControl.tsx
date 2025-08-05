import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const RecordingControl: React.FC<CardProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export default RecordingControl;

const styles = StyleSheet.create({
  card: {
    height: 95,
    width: 113,
    borderRadius: 12,
    backgroundColor: "#5F2F86",
    padding: 16,
  },
});
