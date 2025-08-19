//Accepts handlers and state as props and renders buttons, disabled state
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef } from "react";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
  disabled?: boolean;
};

const RecordingControls = ({
  isRecording,
  onStart,
  onStop,
  disabled,
}: Props) => {
  return (
    <View style={styles.recordingContainer}>
      {isRecording ? (
        <TouchableOpacity
          style={styles.recControl}
          onPress={onStop}
          disabled={disabled}
        >
          <FontAwesome5 name="stop" size={20} color="#3A0B10" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.recControl}
          onPress={onStart}
          disabled={disabled}
        >
          <MaterialIcons name="fiber-manual-record" size={24} color="#CB4955" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RecordingControls;

const styles = StyleSheet.create({
  recordingContainer: {
    marginVertical: 20,
    flexDirection: "row",
  },
  recControl: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
