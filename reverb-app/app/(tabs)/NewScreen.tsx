import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ReverbCards from "@/components/ui/ReverbCards";
import GlobalStyles from "@/styles/GlobalStyles";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

// Import your recording components and hook
import RecordingAnimation from "@/components/RecordingAnimation"; // update path as needed
import RecordingControls from "@/components/RecordingControls"; // update path as needed
import RecordingLogic from "@/components/RecordingLogic"; // update path as needed

const NewScreen = () => {
  // Use the recording hook to get state & control functions
  const { isRecording, durationMillis, startRecording, stopRecording, uri } =
    RecordingLogic();

  // Format duration as mm:ss for display
  const formatDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <SafeAreaView style={[GlobalStyles.container]}>
      <View style={styles.topSect}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={[
              GlobalStyles.subHeaderText,
              GlobalStyles.spacerSmaller,
              { fontWeight: "400" },
            ]}
          >
            Prompt of the Day
          </Text>
          <Text style={[GlobalStyles.textInfo]}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {/* Render the recording animation */}
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 88,
            }}
          >
            <RecordingAnimation isRecording={isRecording} />
          </View>

          {/* Show recording duration */}
          {isRecording && (
            <Text style={GlobalStyles.headerText}>
              {formatDuration(durationMillis)}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.bottomOut}>
        {/* Render the recording controls */}
        <RecordingControls
          isRecording={isRecording}
          onStart={startRecording}
          onStop={stopRecording}
          disabled={false} // You may disable based on loading or other state
        />
      </View>
    </SafeAreaView>
  );
};

export default NewScreen;

const styles = StyleSheet.create({
  topSect: {
    flexDirection: "column",
    width: "100%",
    height: "75%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 32,
  },
  bottomSect: {
    width: "100%",
    paddingRight: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bottomCardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 16,
    gap: 16,
    width: "95%",
  },
  bottomOut: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 24,
    borderTopWidth: 1,
    borderColor: "#120919",
    backgroundColor: "#120919",
    width: "100%",
    padding: 12,
  },
  medButton: {
    backgroundColor: "#21102F",
    color: "#ffffff",
    height: 56,
    minWidth: "48%",
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  durationText: {
    marginTop: 8,
    fontSize: 24,
    color: "#21102F",
  },
});
