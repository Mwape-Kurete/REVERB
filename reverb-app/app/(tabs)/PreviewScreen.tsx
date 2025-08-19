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
              placeholderTextColor="#F45B69"
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
              styles.saveBtn,
              {
                marginTop: 10,
                justifyContent: "center",
                alignContent: "center",
              },
              !selectedTrack && { opacity: 0.5 },
            ]}
            onPress={handleSave}
            disabled={!selectedTrack}
          >
            <Text style={[GlobalStyles.textPrimary, { fontSize: 16 }]}>
              Save
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
    borderBottomColor: "#030000",
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
    padding: 12,
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
  saveBtn: {
    backgroundColor: "#feeff0d4",
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: "#F45B69",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    color: "#030000",
    height: 56,
    width: "100%",
    marginBottom: 12,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
