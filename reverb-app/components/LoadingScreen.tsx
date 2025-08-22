import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import RecordingAnimation from "./RecordingAnimation";

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
          <RecordingAnimation isRecording={true} />
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
    borderColor: "#030000",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#F89DA5",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 12,
  },
  message: {
    fontSize: 16,
    fontFamily: "Michroma_400Regular",
    color: "#030000",
    textAlign: "center",
    paddingVertical: 58,
    paddingHorizontal: 20,
    fontWeight: "200",
  },
});
