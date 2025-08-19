import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ReverbCards from "@/components/ui/ReverbCards";
import GlobalStyles from "@/styles/GlobalStyles";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

// Import your recording components and hook
import RecordingAnimation from "@/components/RecordingAnimation"; // update path as needed
import RecordingControls from "@/components/RecordingControls"; // update path as needed
import RecordingLogic from "@/components/RecordingLogic"; // update path as needed
import { useRouter } from "expo-router";

const NewScreen = () => {
  const router = useRouter();
  // Use the recording hook to get state & control functions
  const {
    isRecording,
    durationMillis,
    startRecording,
    stopRecording,
    currentUri,
  } = RecordingLogic();

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
          <Text style={GlobalStyles.headerText}>
            {formatDuration(durationMillis)}
          </Text>
        </View>
      </View>

      <View style={styles.bottomOut}>
        {/* Render the recording controls */}
        <View>
          <RecordingControls
            isRecording={isRecording}
            onStart={startRecording}
            onStop={stopRecording}
            disabled={false} // You may disable based on loading or other state
          />
        </View>
        <View style={{ width: "100%" }}>
          <TouchableOpacity
            style={styles.medButton}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/PreviewScreen",
                params: { audioUri: currentUri }, // passing recorded audio URI here
              })
            }
          >
            <Text style={[GlobalStyles.textSecondary, { color: "#120919" }]}>
              SAVE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewScreen;

const styles = StyleSheet.create({
  topSect: {
    flexDirection: "column",
    width: "100%",
    height: "55%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 32,
  },
  bottomOut: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    borderTopWidth: 1,
    borderColor: "#120919",
    backgroundColor: "#ffffff",
    width: "100%",
    padding: 12,
  },
  medButton: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: "#020103", // Your palette
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    color: "#120919",
    height: 56,
    width: "100%",
    padding: 12,
    marginBottom: 12,
    marginTop: 12,
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
