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
  onLongPress?: () => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ReverbCards: React.FC<CardProps> = ({
  onPress,
  onLongPress,
  children,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={[styles.card, style]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default ReverbCards;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    marginVertical: 12,
    // Subtle shadow for "card lift"
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 8, // Android
  },
});
