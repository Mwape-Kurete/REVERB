import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ReverbCards: React.FC<CardProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export default ReverbCards;

const styles = StyleSheet.create({
  card: {
    height: 240,
    width: 170,
    borderRadius: 12,
    backgroundColor: "#D8B8F1",
    padding: 16,
  },
});
