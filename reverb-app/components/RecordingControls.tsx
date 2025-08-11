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
          <FontAwesome5 name="stop" size={40} color="#020103" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.recControl}
          onPress={onStart}
          disabled={disabled}
        >
          <MaterialIcons name="fiber-manual-record" size={58} color="#020103" />
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
    height: 74,
    width: 74,
    borderRadius: 12,
    backgroundColor: "#F5EDFC",
    padding: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
