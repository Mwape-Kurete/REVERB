import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import GlobalStyles from "@/styles/GlobalStyles";
import { useLocalSearchParams, useRouter } from "expo-router";

import SearchInput from "@/components/ui/SearchInput";
import ReverbAudioPlayer from "@/components/ReverbAudioPlayer";

const PreviewScreen = () => {
  const router = useRouter();
  // Use useLocalSearchParams to get audioUri param passed via URL
  const params = useLocalSearchParams<{ audioUri?: string }>();
  const audioUri = params.audioUri;

  // State for selected track, mood, reflection
  const [selectedTrack, setSelectedTrack] = useState<{
    name: string;
    artist: string;
    url: string;
  } | null>(null);
  const [mood, setMood] = useState("");
  const [reflection, setReflection] = useState("");

  const handleSongSelect = (track: {
    name: string;
    artist: string;
    url: string;
  }) => {
    setSelectedTrack(track);
  };

  const handleSave = () => {
    if (!selectedTrack) {
      Alert.alert("Please select a song first.");
      return;
    }

    // Add your saving logic here including metadata and audioUri...
    Alert.alert(
      "Saved!",
      `Song: ${selectedTrack.name} by ${selectedTrack.artist}`
    );
    router.push("/(tabs)/TimelineScreen");
  };

  return (
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

          <TextInput
            style={[GlobalStyles.formInput, { marginVertical: 12 }]}
            placeholder="Attach a mood or emotion"
            value={mood}
            onChangeText={setMood}
          />

          <TextInput
            style={[GlobalStyles.formInput, { marginVertical: 12, height: 80 }]}
            placeholder="Write your reflection"
            multiline
            numberOfLines={4}
            value={reflection}
            onChangeText={setReflection}
          />
        </View>

        <View style={styles.playbackContainer}>
          {audioUri ? (
            <ReverbAudioPlayer source={audioUri} />
          ) : selectedTrack ? (
            <Text style={GlobalStyles.headerText}>
              Selected Song: {selectedTrack.name} - {selectedTrack.artist}
            </Text>
          ) : (
            <Text style={GlobalStyles.headerText}>
              Select a song to preview
            </Text>
          )}
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.medButton}>
          <MaterialCommunityIcons name="rewind" size={24} color="#21102F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.medButton}>
          <MaterialCommunityIcons name="play" size={24} color="#21102F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.medButton}>
          <MaterialCommunityIcons
            name="fast-forward"
            size={24}
            color="#21102F"
          />
        </TouchableOpacity>
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
  );
};

export default PreviewScreen;

const styles = StyleSheet.create({
  pageHeader: {
    flexDirection: "row",
    width: "100%",
    paddingBottom: 12,
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
