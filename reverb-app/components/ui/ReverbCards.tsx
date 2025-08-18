import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TouchableOpacity,
} from "react-native";
import React from "react";

interface CardProps {
  onPress?: () => void; // optional function type
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ReverbCards: React.FC<CardProps> = ({ onPress, children, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, style]}>
      {children}
    </TouchableOpacity>
  );
};

export default ReverbCards;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: "#F5EDFC",
    padding: 16,
  },
});
