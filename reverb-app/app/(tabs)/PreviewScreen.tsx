import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import GlobalStyles from "@/styles/GlobalStyles";
import { useLocalSearchParams, useRouter } from "expo-router";

import SearchInput from "@/components/ui/SearchInput";
import ReverbAudioPlayer from "@/components/ReverbAudioPlayer";
import MoodInput from "@/components/ui/MoodInput";

import { useAudioRecording } from "@/contexts/AudioRecordingContext";

const PreviewScreen = () => {
  const router = useRouter();

  const { addRecording } = useAudioRecording();

  // Use useLocalSearchParams to get audioUri param passed via URL
  const params = useLocalSearchParams<{ audioUri?: string }>();
  const audioUri = params.audioUri;

  // State for selected track, mood, reflection
  const [selectedTrack, setSelectedTrack] = useState<{
    name: string;
    artist: string;
    url: string;
  } | null>(null);

  const [moodTags, setMoodTags] = useState<string[]>([]);
  const [reflection, setReflection] = useState("");

  const handleSongSelect = (track: {
    name: string;
    artist: string;
    url: string;
  }) => {
    setSelectedTrack(track);
  };

  const handleAddMood = () => {
    //somehow gotta fetch moodTags from MoodInput
  };

  const handleSave = async () => {
    if (!audioUri) {
      Alert.alert("No audio to sace :(");
      return;
    }

    // Adding audio to firebase storage:
    //1. Converting URI to a blob if needed
    const response = await fetch(audioUri);
    const audioBlob = await response.blob();

    const payload = {
      songTitle: selectedTrack?.name || "",
      songArtist: selectedTrack?.artist || "",
      moodTags: moodTags || [],
      reflection: reflection || "",
    };

    await addRecording(audioBlob, payload);
    router.push("/(tabs)/TimelineScreen");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={GlobalStyles.container}>
        <View style={styles.pageHeader}>
          <Text style={[GlobalStyles.headerText, { fontSize: 20 }]}>
            REVERB #00{" "}
          </Text>
          <MaterialCommunityIcons
            name="record-circle-outline"
            size={48}
            color="#21102F"
          />
        </View>

        <View style={styles.mainContent}>
          <View style={styles.infoContainer}>
            <SearchInput onSelect={handleSongSelect} />

            <MoodInput
              onChangeMoodTags={(tags) => setMoodTags(tags)}
              initialMoodTags={moodTags}
            />

            <TextInput
              style={[
                GlobalStyles.formInput,
                { marginVertical: 12, height: 80 },
              ]}
              placeholder="Write your reflection"
              placeholderTextColor="#D8B8F1"
              multiline
              numberOfLines={4}
              value={reflection}
              onChangeText={setReflection}
            />
          </View>

          <View style={styles.bottomContainer}>
            <View style={styles.playbackContainer}>
              {audioUri ? (
                <ReverbAudioPlayer source={audioUri} />
              ) : (
                <Text style={GlobalStyles.textPrimary}>
                  Error loading recording
                  <Text style={GlobalStyles.textInfo}>Try Again</Text>
                </Text>
              )}
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={[
              GlobalStyles.ghostButton,
              { maxWidth: 120, alignSelf: "center", marginTop: 10 },
              !selectedTrack && { opacity: 0.5 },
            ]}
            onPress={handleSave}
            disabled={!selectedTrack}
          >
            <Text
              style={[
                GlobalStyles.textPrimary,
                { fontSize: 16, textAlign: "center" },
              ]}
            >
              Save REVERB
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PreviewScreen;

const styles = StyleSheet.create({
  pageHeader: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#21102F",
  },
  mainContent: {
    flex: 1,
    width: "100%",
    height: "70%",
  },
  infoContainer: {
    width: "100%",
    height: "50%",
    paddingTop: 24,
  },
  playbackContainer: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    width: "100%",
    height: "15%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  medButton: {
    backgroundColor: "#D8B8F1",
    height: 56,
    width: 100,
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
