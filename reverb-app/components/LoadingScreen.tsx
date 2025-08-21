import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  visible: boolean;
  message: string;
};

const LoadingScreen = ({ visible, message }: Props) => {
  if (!visible) return null;
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Your existing cassette reel component */}
          <View style={styles.reel}>
            {/* Example reel spokes */}
            <View
              style={[styles.spokes, { transform: [{ rotate: "0deg" }] }]}
            />
            <View
              style={[styles.spokes, { transform: [{ rotate: "45deg" }] }]}
            />
            <View
              style={[styles.spokes, { transform: [{ rotate: "90deg" }] }]}
            />
            <View
              style={[styles.spokes, { transform: [{ rotate: "135deg" }] }]}
            />
          </View>

          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // semi-transparent white
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
  },
  reel: {
    width: 150,
    height: 150,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#020103",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#9D4EDD",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 12,
  },
  spokes: {
    width: 4,
    height: 64,
    backgroundColor: "#9d43dd",
    borderRadius: 2,
    position: "absolute",
  },
  message: {
    fontSize: 18,
    color: "#23183f",
    textAlign: "center",
    paddingHorizontal: 20,
    fontWeight: "600",
  },
});
